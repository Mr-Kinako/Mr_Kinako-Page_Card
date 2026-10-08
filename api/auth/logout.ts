// api/auth/logout.ts

import { parseCookie, stringifySetCookie } from "cookie";
import { sql } from "../_db";

interface VercelRequest {
  method?: string;
  headers: { cookie?: string };
}

interface VercelResponse {
  status(code: number): VercelResponse;
  json(data: unknown): VercelResponse;
  setHeader(name: string, value: string | string[]): void;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "method not allowed" });
  }

  const cookies = parseCookie(req.headers.cookie || "");
  const sessionToken = cookies.kinland_session;

  if (sessionToken) {
    try {
      await sql`DELETE FROM sessions WHERE token = ${sessionToken}`;
    } catch (err) {
      console.error("[Logout Error]:", err);
    }
  }

  const isProd = process.env.NODE_ENV === "production";

  const clearSessionCookie = stringifySetCookie({
    name: "kinland_session",
    value: "",
    httpOnly: true,
    secure: isProd,
    path: "/",
    sameSite: "lax",
    maxAge: 0,
  });

  res.setHeader("Set-Cookie", clearSessionCookie);
  return res.status(200).json({ success: true });
}
