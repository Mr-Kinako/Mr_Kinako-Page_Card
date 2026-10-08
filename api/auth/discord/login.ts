// api/auth/discord/login.ts

import { stringifySetCookie } from "cookie";
import { config } from "dotenv";

if (process.env.NODE_ENV !== "production") {
  config({ path: ".env.local" });
  config();
}

interface VercelRequest {
  method?: string;
}

interface VercelResponse {
  status(code: number): VercelResponse;
  json(data: unknown): VercelResponse;
  setHeader(name: string, value: string | string[]): void;
  end(): void;
}

export default function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "method not allowed" });
  }

  const clientId = process.env.DISCORD_CLIENT_ID;
  const redirectUri = process.env.DISCORD_REDIRECT_URI;

  if (!clientId || !redirectUri) {
    console.error(
      "[OAuth Login Error]: DISCORD_CLIENT_ID or DISCORD_REDIRECT_URI is missing in process.env",
    );
    return res.status(500).json({ error: "Server configuration error: missing env variables" });
  }

  const state = crypto.randomUUID();
  const isProd = process.env.NODE_ENV === "production";

  const oauthCookie = stringifySetCookie({
    name: "oauth_state",
    value: state,
    httpOnly: true,
    secure: isProd,
    path: "/",
    sameSite: "lax",
    maxAge: 600,
  });

  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: redirectUri,
    response_type: "code",
    scope: "identify email",
    state,
  });

  res.setHeader("Set-Cookie", oauthCookie);
  res.setHeader("Location", `https://discord.com/oauth2/authorize?${params.toString()}`);
  return res.status(302).end();
}
