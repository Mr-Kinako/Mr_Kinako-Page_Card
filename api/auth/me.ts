// api/auth/me.ts

import { parseCookie } from "cookie";
import { sql } from "../_db";

interface VercelRequest {
  method?: string;
  headers: { cookie?: string };
}

interface VercelResponse {
  status(code: number): VercelResponse;
  json(data: unknown): VercelResponse;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "method not allowed" });
  }

  const cookies = parseCookie(req.headers.cookie || "");
  const sessionToken = cookies.kinland_session;

  if (!sessionToken) {
    return res.status(401).json({ error: "unauthorized" });
  }

  try {
    const rows = await sql`
      WITH updated_session AS (
        UPDATE sessions
        SET expires_at = NOW() + INTERVAL '30 days'
        WHERE token = ${sessionToken} AND expires_at > NOW()
        RETURNING user_id
      )
      SELECT u.id, u.username, u.global_name as "globalName", u.avatar_url as "avatarUrl"
      FROM updated_session us
      JOIN users u ON us.user_id = u.id
      LIMIT 1;
    `;

    if (rows.length === 0) {
      return res.status(401).json({ error: "unauthorized" });
    }

    return res.status(200).json(rows[0]);
  } catch (err) {
    console.error("[Me Error]:", err);
    return res.status(500).json({ error: "internal server error" });
  }
}
