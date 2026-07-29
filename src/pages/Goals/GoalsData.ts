export interface GoalStatItem {
   id: string;
   title: string;
   count: number;
}

export type goalStatCategory = Record<string, GoalStatItem>;

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
      description: "Один из приватных серверов по игре \"Osu!\" версии Lazer, созданный в RU сегменте. Кастомный клиент и много другого (а также планируется). Также это мой первый более серьёзный реальный проект.",

      content: {
         0: {
            title: "Pull changes",
            description: "Возможность изменять пока что только mosu!wiki. вместо мгновенных изменений они должны отправляться на сервер, на проверку. Также должна быть админ панель для людей, кто будет рассматривать эти правки. Если правка принята - правки применяются к какой-то текущей правленной ветки, а само изменение архивируется в архив изменении условно до 7 дней. Если отклонена - изменения не применяются, а текущая ветка правок удаляется из очереди.",
            priority: constantPriorities.medium,
            status: constantStatuses.awaiting
         },

         1: {
            title: "Интерактивный плеер реплеев прямо на сайте",
            description: "Чтобы можно было смотреть топ-плеи через Canvas/WebGL прямо в браузере, не скачивая сам реплей в игру",
            priority: constantPriorities.low,
            status: constantStatuses.abandoned
         },

         2: {
            title: "Онлайн-превьюер скинов",
            description: "Раздел, где можно загрузить свой скин и посмотреть, как будут выглядеть кружки, курсор и интерфейс на тестовом геймплее",
            priority: constantPriorities.low,
            status: constantStatuses.abandoned
         },

         3: {
            title: "Показ активности",
            description: "Сделать вместо текста \"Оффлайн\" зеленый значок возле аватарки, когда игрок онлайн, и серый когда оффлайн",
            priority: constantPriorities.high,
            status: constantStatuses.awaiting
         },
      }
   },
   
   "mr-kinako-personal-page": {
      title: "Mr_Kinako Personal-Page",
      description: "Собственно, моя собственная страница, захосченная на Vercel.",
      content: {
         0: {
            title: "Проработать цветовую палитру",
            description: "Поэкспериментировать с цветами, с сочетаниями; Посмотреть пару десятков современных сайтов для общей наглядности/картины; Проработать \"_variables.scss\", от сортировки до категории, также вынеся туда все наиболее встречающиеся варианты цветов в проекте, приведя их к одному виду; Нужно будет пересмотреть использование \"$variables\" и \"--variable\".",
            priority: constantPriorities.medium,
            status: constantStatuses.abandoned
         },
         3: {
            title: "Улучшить бг",
            description: "Вероятно достаточно поиграть с вариациями видов бг генерируя их чистым кодом. Используя условный linear-gradient.",
            priority: constantPriorities.low,
            status: constantStatuses.abandoned
         },
         5: {
            title: "Пересмотреть проект",
            description: "Структуру файлов, внутреннюю структуру файлов, зависимости",
            priority: constantPriorities.medium,
            status: constantStatuses.awaiting
         },
         4: {
            title: "Привести что-то одно к единому подходу",
            description: "Например, хотя бы, привести Home в более порядочный вид.",
            priority: constantPriorities.low,
            status: constantStatuses.awaiting
         },
         1: {
            title: "Пересмотреть вариант с плашками",
            description: "Нужно будет кардинально изменить общий свод в \"/goals\", чтобы он не мешал изначально, а также был красиво подан. Также можно Добавить \"Вкладки\" для проектов, ограничивая до двух-трёх карточек на контейнерную вкладку.",
            priority: constantPriorities.low,
            status: constantStatuses.awaiting
         },
         2: {
            title: "Поработать с адаптацией",
            description: "Немного поработать с общей адаптацией, поправить возможные косяки. Также дополнительно улучшить читаемость, вёрстку при надобности где это надо для скрин-ридеров, ну и в целом проработать UX.",
            priority: constantPriorities.medium,
            status: constantStatuses.abandoned
         },
         100: {
            title: "Довести до рабочего и приемлемого состояния",
            description: "Роут \"/goals\" нужно довести до рабочего состояния. Остальные правки позже.",
            priority: constantPriorities.high,
            status: constantStatuses.completed
         },
      }
   }
}
