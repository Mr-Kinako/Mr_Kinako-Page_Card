// src/pages/DiscordServers/Kinland/data/mock.ts

import type { ServerInfo } from "./types.js";

export const kinlandServerMock: ServerInfo = {
  name: "Kinland",
  description: "Основной Discord-сервер проекта. Общение, поддержка, новости.",
  iconUrl: "/kinland/icon.png",
  bannerUrl: "/kinland/banner.png",
  membersTotal: 1240,
  membersOnline: 312,
  channels: [
    { id: "1", name: "новости", category: "Информация" },
    { id: "2", name: "правила", category: "Информация" },
    { id: "3", name: "общий", category: "Общение" },
    { id: "4", name: "мемы", category: "Общение" },
    { id: "5", name: "помощь", category: "Поддержка" },
  ],
  inviteCode: "XUFMbkg9vT",
};
