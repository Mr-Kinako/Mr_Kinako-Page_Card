// src/pages/DiscordServers/Kinland/data/types.ts

export interface Channel {
  id: string;
  name: string;
  category?: string;
}

export interface ServerInfo {
  name: string;
  description: string;
  iconUrl: string;
  bannerUrl: string;
  membersTotal: number;
  membersOnline: number;
  channels: Channel[];
  inviteCode: string;
}
