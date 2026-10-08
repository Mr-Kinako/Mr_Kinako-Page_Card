// api/auth/discord/callback.ts

import { timingSafeEqual } from "crypto";
import { parseCookie, stringifySetCookie } from "cookie";
import { sql } from "../../_db";

interface VercelRequest {
  method?: string;
  headers: { cookie?: string };
  body?: { code?: unknown; state?: unknown };
}

interface VercelResponse {
  status(code: number): VercelResponse;
  json(data: unknown): VercelResponse;
  setHeader(name: string, value: string | string[]): void;
}

const DISCORD_API = "https://discord.com/api";

function safeCompare(a: string, b: string): boolean {
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  if (bufA.length !== bufB.length) return false;
  return timingSafeEqual(bufA, bufB);
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "method not allowed" });
  }

  const { code, state } = req.body ?? {};

  if (typeof code !== "string" || !code || typeof state != "string" || !state) {
    return res.status(400).json({ error: "code and state are required" });
  }

  const cookies = parseCookie(req.headers.cookie || "");
  const savedState = cookies.oauth_state;

  if (!savedState || !safeCompare(savedState, state)) {
    return res.status(401).json({ error: "invalid or expired state" });
  }

  try {
    const tokenRes = await fetch(`${DISCORD_API}/oauth2/token`, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        client_id: process.env.DISCORD_CLIENT_ID!,
        client_secret: process.env.DISCORD_CLIENT_SECRET!,
        grant_type: "authorization_code",
        code,
        redirect_uri: process.env.DISCORD_REDIRECT_URI!,
      }),
    });

    if (!tokenRes.ok) {
      const errorDetails = await tokenRes.text();
      console.error("[Discord OAuth Error]:", errorDetails);
      return res.status(502).json({ error: "discord token exchange failed" });
    }

    const tokens = await tokenRes.json();

    const userRes = await fetch(`${DISCORD_API}/users/@me`, {
      headers: { Authorization: `Bearer ${tokens.access_token}` },
    });

    if (!userRes.ok) {
      return res.status(502).json({ error: "failed to fetch user profile" });
    }

    const u = await userRes.json();
    const avatarUrl = u.avatar
      ? `https://cdn.discordapp.com/avatars/${u.id}/${u.avatar}.png`
      : `https://cdn.discordapp.com/embed/avatars/${Number(BigInt(u.id) >> 22n) % 6}.png`;

    await sql`
      INSERT INTO users (id, username, global_name, avatar_url, updated_at)
      VALUES (${u.id}, ${u.username}, ${u.global_name ?? null}, ${avatarUrl}, NOW())
      ON CONFLICT (id) DO UPDATE SET
        username = EXCLUDED.username,
        global_name = EXCLUDED.global_name,
        avatar_url = EXCLUDED.avatar_url,
        updated_at = NOW();
    `;

    await sql`DELETE FROM sessions WHERE expires_at < NOW()`;

    const sessionToken = crypto.randomUUID();
    const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString();

    await sql`
      INSERT INTO sessions (token, user_id, expires_at)
      VALUES (${sessionToken}, ${u.id}, ${expiresAt});
    `;

    const isProd = process.env.NODE_ENV === "production";

    const sessionCookie = stringifySetCookie({
      name: "kinland_session",
      value: sessionToken,
      httpOnly: true,
      secure: isProd,
      path: "/",
      sameSite: "lax",
      maxAge: 30 * 24 * 3600,
    });

    const clearStateCookie = stringifySetCookie({
      name: "oauth_state",
      value: "",
      httpOnly: true,
      secure: isProd,
      path: "/",
      sameSite: "lax",
      maxAge: 0,
    });

    res.setHeader("Set-Cookie", [sessionCookie, clearStateCookie]);

    // Возвращаем объект, совпадающий с интерфейсом AuthSession
    return res.status(200).json({
      user: {
        id: u.id,
        username: u.username,
        globalName: u.global_name ?? null,
        avatarUrl,
        locale: u.locale,
      },
    });
  } catch (err) {
    console.error("[Callback Error]:", err);
    return res.status(500).json({ error: "internal server error" });
  }
}
