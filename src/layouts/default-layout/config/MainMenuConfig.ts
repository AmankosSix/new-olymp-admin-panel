import type { MenuItem } from "@/layouts/default-layout/config/types";

const MainMenuConfig: Array<MenuItem> = [
  {
    pages: [
      {
        heading: "Главная",
        route: "/dashboard",
        keenthemesIcon: "element-11",
        bootstrapIcon: "bi-app-indicator",
      },
      {
        heading: "Материалы",
        route: "/material/news",
        keenthemesIcon: "switch",
        bootstrapIcon: "bi-layers",
      },
    ],
  },
  {
    heading: "Система",
    route: "/crafted",
    pages: [
      {
        heading: "Федерации",
        route: "/system/federations",
        keenthemesIcon: "element-plus",
        bootstrapIcon: "bi-archive",
      },
      {
        heading: "Подписки",
        route: "/system/followers",
        keenthemesIcon: "element-plus",
        bootstrapIcon: "bi-archive",
      },
      {
        sectionTitle: "Глвная стр.",
        route: "/crafted/pages/profile/overview",
        keenthemesIcon: "element-plus",
        bootstrapIcon: "bi-archive",
        sub: [
          {
            heading: "Слайдер",
            route: "/system/slider_images",
          },
          {
            heading: "Настройка",
            route: "/system/settings",
          },
        ],
      },
      {
        sectionTitle: "Footer",
        route: "/crafted/pages/profile/overview",
        keenthemesIcon: "element-plus",
        bootstrapIcon: "bi-archive",
        sub: [
          {
            heading: "Партнеры",
            route: "/system/olympic_partners",
          },
        ],
      },
      {
        heading: "Options",
        route: "/system/options",
        keenthemesIcon: "element-plus",
        bootstrapIcon: "bi-archive",
      },
      {
        heading: "Соц. сети",
        route: "/crafted/pages/profile/overview",
        keenthemesIcon: "element-plus",
        bootstrapIcon: "bi-archive",
        disabled: true,
      },
      {
        heading: "Трансляции",
        route: "/crafted/pages/profile/overview",
        keenthemesIcon: "element-plus",
        bootstrapIcon: "bi-archive",
        disabled: true,
      },
    ],
  },
  // {
  //   heading: "Материал",
  //   route: "/material",
  //   // pages: [
  //   //   {
  //   //     heading: "Новости",
  //   //     route: "/material/news",
  //   //     keenthemesIcon: "abstract-38",
  //   //     bootstrapIcon: "bi-printer",
  //   //   },
  //   //   {
  //   //     heading: "Игры",
  //   //     route: "/apps/calendar",
  //   //     keenthemesIcon: "calendar-8",
  //   //     bootstrapIcon: "bi-calendar3-event",
  //   //   },
  //   //   {
  //   //     heading: "О НОК",
  //   //     route: "/apps/calendar",
  //   //     keenthemesIcon: "calendar-8",
  //   //     bootstrapIcon: "bi-calendar3-event",
  //   //   },
  //   //   {
  //   //     heading: "Соревнования",
  //   //     route: "/apps/calendar",
  //   //     keenthemesIcon: "calendar-8",
  //   //     bootstrapIcon: "bi-calendar3-event",
  //   //   },
  //   //   {
  //   //     heading: "Секции",
  //   //     route: "/apps/calendar",
  //   //     keenthemesIcon: "calendar-8",
  //   //     bootstrapIcon: "bi-calendar3-event",
  //   //   },
  //   // ],
  // },
  {
    heading: "Виджеты/Компоненты",
    route: "/apps",
    pages: [
      {
        heading: "Календарь",
        route: "/sign-in",
        keenthemesIcon: "abstract-38",
        bootstrapIcon: "bi-printer",
        disabled: true,
      },
      {
        heading: "Реклама",
        route: "/apps/calendar",
        keenthemesIcon: "calendar-8",
        bootstrapIcon: "bi-calendar3-event",
        disabled: true,
      },
      {
        heading: "Викторины",
        route: "/apps/calendar",
        keenthemesIcon: "calendar-8",
        bootstrapIcon: "bi-calendar3-event",
        disabled: true,
      },
    ],
  },
  {
    heading: "Файлы",
    route: "/apps",
    pages: [
      {
        heading: "Документы",
        route: "/system/docs",
        keenthemesIcon: "abstract-38",
        bootstrapIcon: "bi-printer",
      },
      {
        heading: "Фотографии",
        route: "/system/photos",
        keenthemesIcon: "calendar-8",
        bootstrapIcon: "bi-calendar3-event",
      },
      {
        heading: "Видеоматериалы",
        route: "/system/videos",
        keenthemesIcon: "calendar-8",
        bootstrapIcon: "bi-calendar3-event",
        disabled: true,
      },
    ],
  },
  {
    heading: "Пользователи",
    route: "/apps",
    pages: [
      {
        heading: "Пользователи",
        route: "/system/users",
        keenthemesIcon: "abstract-38",
        bootstrapIcon: "bi-printer",
      },
      {
        heading: "Авторизация",
        route: "/system/users_tokens",
        keenthemesIcon: "calendar-8",
        bootstrapIcon: "bi-calendar3-event",
      },
      {
        heading: "Доступы",
        route: "/system/permissions",
        keenthemesIcon: "calendar-8",
        bootstrapIcon: "bi-calendar3-event",
      },
      {
        heading: "Роли",
        route: "/system/roles",
        keenthemesIcon: "calendar-8",
        bootstrapIcon: "bi-calendar3-event",
      },
    ],
  },
  {
    heading: "Справка",
    route: "/apps",
    pages: [
      {
        heading: "Логи изменений",
        route: "/sign-in",
        keenthemesIcon: "abstract-38",
        bootstrapIcon: "bi-printer",
      },
    ],
  },
  {
    heading: "Справочники",
    route: "/apps",
    pages: [
      {
        heading: "Чемпионы",
        route: "/sign-in",
        keenthemesIcon: "abstract-38",
        bootstrapIcon: "bi-printer",
      },
      {
        heading: "Акр центры",
        route: "/sign-in",
        keenthemesIcon: "abstract-38",
        bootstrapIcon: "bi-printer",
      },
      {
        heading: "Игры",
        route: "/sign-in",
        keenthemesIcon: "abstract-38",
        bootstrapIcon: "bi-printer",
      },
    ],
  },
];

export default MainMenuConfig;
