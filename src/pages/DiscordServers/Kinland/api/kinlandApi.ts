// src/pages/DiscordServers/Kinland/api/kinlandApi.ts

import { request } from "./client";
import type { AuthSession, DiscordUser, ServerStats } from "./types";

export const kinlandApi = {
  getServerStats: () => request<ServerStats>("/kinland/stats"),

  /** Вызывается со страницы /profile после редиректа Discord с ?code=... &state=... */
  exchangeCode: (code: string, state: string) =>
    request<AuthSession>("/auth/discord/callback", {
      method: "POST",
      body: JSON.stringify({ code, state }),
    }),

  getMe: () => request<DiscordUser>("/auth/me"),

  logout: () => request<void>("/auth/logout", { method: "POST" }),
};
