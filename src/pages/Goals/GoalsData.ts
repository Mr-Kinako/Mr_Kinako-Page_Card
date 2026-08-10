import { ProjectData } from "./GoalsTypes";

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
            title: "Рефакторинг файловой структуры",
            description: "",
            priority: constantPriorities.high,
            status: constantStatuses.awaiting
         },

         1: {
            title: "Рефакторинг архитектуры файлов",
            description: "",
            priority: constantPriorities.medium,
            status: constantStatuses.abandoned
         },

         2: {
            title: "Улучшить адаптацию хэдэра",
            description: "Поведение хэдэра на узких экранах менее предсказуемо, нужно сделать поведение более предсказуемым.",
            priority: constantPriorities.medium,
            status: constantStatuses.awaiting
         },
         
         3: {
            title: "Улучшить клан систему (её UI и взаимодействие)",
            description: "Для начала в ближайшем будущем сформировать сюда список задач.",
            priority: constantPriorities.low,
            status: constantStatuses.abandoned
         },

         // 0: {
         //    title: "",
         //    description: "",
         //    priority: constantPriorities.low,
         //    status: constantStatuses.abandoned
         // },
         // 0: {
         //    title: "",
         //    description: "",
         //    priority: constantPriorities.low,
         //    status: constantStatuses.abandoned
         // },
         // 0: {
         //    title: "",
         //    description: "",
         //    priority: constantPriorities.low,
         //    status: constantStatuses.abandoned
         // },
         // 0: {
         //    title: "",
         //    description: "",
         //    priority: constantPriorities.low,
         //    status: constantStatuses.abandoned
         // },

         4: {
            title: "Pull changes",
            description: "Возможность изменять пока что только mosu!wiki. вместо мгновенных изменений они должны отправляться на сервер, на проверку. Также должна быть админ панель для людей, кто будет рассматривать эти правки. Если правка принята - правки применяются к какой-то текущей правленной ветки, а само изменение архивируется в архив изменении условно до 7 дней. Если отклонена - изменения не применяются, а текущая ветка правок удаляется из очереди.",
            priority: constantPriorities.low,
            status: constantStatuses.abandoned
         },

         5: {
            title: "Интерактивный плеер реплеев прямо на сайте",
            description: "Чтобы можно было смотреть топ-плеи через Canvas/WebGL прямо в браузере, не скачивая сам реплей в игру.",
            priority: constantPriorities.low,
            status: constantStatuses.abandoned
         },

         6: {
            title: "Онлайн-превьюер скинов",
            description: "Раздел, где можно загрузить свой скин и посмотреть, как будут выглядеть кружки, курсор и интерфейс на тестовом геймплее.",
            priority: constantPriorities.low,
            status: constantStatuses.abandoned
         },

         100: {
            title: "Создание и комментарии про Taiko&Catch",
            description: "Добавить на роуте rankings в режимы новые режимы TaikoRX & CatchRX. Сделать при их выборе фоллбэк с информацией что данный режим будет в ближайшем будущем.",
            priority: constantPriorities.medium,
            status: constantStatuses.completed
         },

         101: {
            title: "Регистрация",
            description: "Выбор страны: Цвет списка и цвет текста должны быть разными, а не одинаковыми.",
            priority: constantPriorities.high,
            status: constantStatuses.completed
         },

         102: {
            title: "Показ активности",
            description: "Сделать вместо текста \"Оффлайн\" зеленый значок возле аватарки, когда игрок онлайн, и серый когда оффлайн.",
            priority: constantPriorities.high,
            status: constantStatuses.completed
         },
      }
   },
   
   "mr-kinako-personal-page": {
      title: "Mr_Kinako Personal-Page",
      description: "Собственно, моя собственная страница, захосченная на Vercel.",
      content: {
         1: {
            title: "Пересмотреть вариант с плашками",
            description: "Нужно будет кардинально изменить общий свод в \"/goals\", чтобы он не мешал изначально, а также был красиво подан. Также можно Добавить \"Вкладки\" для проектов, ограничивая до двух-трёх карточек на контейнерную вкладку.",
            priority: constantPriorities.low,
            status: constantStatuses.abandoned
         },

         2: {
            title: "Улучшить категоризацию целей",
            description: "Добавить две категории: Выполненные/Невыполненные. Также можно добавить фильтр по приоритетам, добавив по умолчанию условно средний приоритет.",
            priority: constantPriorities.medium,
            status: constantStatuses.abandoned
         },

         100: {
            title: "Улучшить бг",
            description: "Вероятно достаточно поиграть с вариациями видов бг генерируя их чистым кодом. Используя условный linear-gradient.",
            priority: constantPriorities.low,
            status: constantStatuses.completed
         },

         101: {
            title: "Проработать цветовую палитру",
            description: "Поэкспериментировать с цветами, с сочетаниями; Посмотреть пару десятков современных сайтов для общей наглядности/картины; Проработать \"_variables.scss\", от сортировки до категории, также вынеся туда все наиболее встречающиеся варианты цветов в проекте, приведя их к одному виду; Нужно будет пересмотреть использование \"$variables\" и \"--variable\".",
            priority: constantPriorities.medium,
            status: constantStatuses.completed
         },

         102: {
            title: "Пересмотреть проект",
            description: "Структуру файлов, внутреннюю структуру файлов, зависимости",
            priority: constantPriorities.medium,
            status: constantStatuses.completed
         },
         
         103: {
            title: "Поработать с адаптацией",
            description: "Немного поработать с общей адаптацией, поправить возможные косяки. Также дополнительно улучшить читаемость, вёрстку при надобности где это надо для скрин-ридеров, ну и в целом проработать UX.",
            priority: constantPriorities.medium,
            status: constantStatuses.completed
         },
         104: {
            title: "Довести до рабочего и приемлемого состояния",
            description: "Роут \"/goals\" нужно довести до рабочего состояния. Остальные правки позже.",
            priority: constantPriorities.high,
            status: constantStatuses.completed
         },
      }
   },
   "cozybar-discord-server": {
      title: "Discord Server \"CozyBar(sik)\"",
      description: "Discord сервер нацеленный на простое общение юзеров, вероятно также для совместных игр. В основном будет предрасположен к фурри тематике, но также будет открыт и к обычным или другим юзерам.",
      content: {
         1: {
            title: "",
            description: "",
            priority: constantPriorities.low,
            status: constantStatuses.abandoned
         },

      }
   }
}
