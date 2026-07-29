export interface GoalsItem {
   title: string;
   description: string;
   priority: string;
   status: string;
}

export interface ProjectData {
   title: string;
   description?: string;
   content?: Record<string, GoalsItem>;
}

export const constantPriorities = {
   "high": "Высокий",
   "medium": "Средний",
   "low": "Низкий",
} as const;

export const constantStatuses = {
   "completed": "Выполнено",
   "inProcess": "В процессе",
   "awaiting": "Ожидает",
   "abandoned": "Заброшено"
} as const;

export const GoalsData: Record<string, ProjectData> = {
   "web-osu-lazer-server": {
      title: "Osu! Lazer Server (web-development)",
      description: "unknown",
      content: {
         0: {
            title: "Показ активности",
            description: "Сделать вместо текста \"Оффлайн\" зеленый значок возле аватарки, когда игрок онлайн, и серый когда оффлайн",
            priority: constantPriorities.low,
            status: constantStatuses.awaiting
         },
      }
   }
}
