// src/pages/DiscordServers/Kinland/api/types.ts

export interface DiscordUser {
  id: string;
  username: string;
  globalName: string | null;
  avatarUrl: string;
  locale?: string;
}

export interface ServerStats {
  membersTotal: number;
  membersOnline: number;
}

export interface AuthSession {
  user: DiscordUser;
}
