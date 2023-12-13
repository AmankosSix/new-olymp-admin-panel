export default {
  urlGet: "ru/newadmin/articles",
  url: "ru/newadmin/articles",
  detailName: "news/detail",
  headerSetting: true,
  headerList: ["published", "hot"],
  postFields: [
    {
      key: "name_ru",
      component: "v-input",
      label: "Название",
      required: true,
    },
    {
      key: "category",
      component: "v-selection",
      items: [
        { id: "main", title: "Публичный портал" },
        { id: "news", title: "Новости" },
        { id: "contacts", title: "Контакты" },
        { id: "norma_links", title: "Нормативные ссылки" },
      ],
      label: "Категория",
    },
    { key: "text", component: "c-quill-editor", label: "text" },
  ],
  postFilters: [],
  news: {
    communications: [
      {
        key: "federation_id",
        component: "v-autocomplete",
        label: "Федерация",
        url: "ru/catalog/federations",
      },
      {
        key: "rubric_id",
        component: "v-autocomplete",
        label: "Рубрика",
        url: "ru/catalog/articles/rubrics",
      },
      {
        key: "game_participant_id",
        component: "v-autocomplete",
        label: "Участник",
        url: "ru/catalog/articles/games-participants",
      },
      {
        key: "game_id",
        component: "v-autocomplete",
        label: "Игра",
        url: "ru/catalog/articles/games",
      },
    ],
    images: [
      {
        key: "avatar",
        component: "v-image-upload",
        label: "Изображение",
      },
    ],
    display: [
      {
        key: "category_id",
        component: "v-selection",
        items: [
          { id: 1, title: "Казахстанские" },
          { id: 2, title: "Международные" },
          { id: 3, title: "Интервью" },
          { id: 4, title: "Аналитика" },
        ],
        required: true,
        label: "Категория",
      },
      {
        key: "hot",
        component: "v-switcher",
        label: "Важно",
        required: true,
      },
      {
        key: "primary",
        component: "v-switcher",
        label: "Избранное",
        required: true,
      },
      {
        key: "published",
        component: "v-switcher",
        label: "Опубликовать",
        required: true,
      },
      {
        key: "published_at",
        component: "v-date-picker",
        label: "Время публикации",
      },
    ],
    information: [
      {
        key: "updated_at",
        label: "Время изменения",
        component: "v-date-picker",
        disabled: true,
      },
      {
        key: "views",
        label: "Просмотров",
        component: "v-input",
        disabled: true,
      },
      {
        key: "olympic_materials.created_at",
        label: "Дата создания материала",
        component: "v-date-picker",
        disabled: true,
      },
      {
        key: "olympic_materials.updated_at",
        label: "Дата изменения материала",
        component: "v-date-picker",
        disabled: true,
      },
    ],
  },
  champions: {
    communications: [
      {
        key: "federation_id",
        component: "v-autocomplete",
        label: "Федерация",
        url: "ru/catalog/federations",
      },
      {
        key: "birthday",
        component: "v-date-picker",
        label: "День рождения",
        dataType: "date", // если нужна дата без времени(по умолчанию в компоненте datatime)
      },
      {
        key: "gender",
        component: "v-switcher",
        label: "Пол",
        switcherLabels: ["Муж", "Жен"],
      },
      {
        key: "published",
        component: "v-switcher",
        label: "Опубликовано",
      },
    ],
    images: [
      {
        key: "avatar",
        component: "v-image-upload",
        label: "Изображение",
      },
    ],
    display: [],
    information: [
      {
        key: "views",
        label: "Просмотров",
        component: "v-input",
        disabled: true,
      },
      {
        key: "olympic_materials.created_at",
        label: "Дата создания материала",
        component: "v-date-picker",
        disabled: true,
      },
      {
        key: "olympic_materials.updated_at",
        label: "Дата изменения материала",
        component: "v-date-picker",
        disabled: true,
      },
    ],
  },
  games: {
    communications: [
      {
        key: "started_at",
        component: "v-date-picker",
        label: "Начало игры",
      },
      {
        key: "site",
        component: "v-input",
        label: "Ссылка на сайт",
      },
      {
        key: "type",
        component: "v-selection",
        items: [
          { id: 1, title: "Олимпийские игры" },
          { id: 2, title: "Азиатские игры" },
          { id: 3, title: "Юношеские олимпийские игры" },
        ],
        label: "Тип игры",
      },
    ],
    images: [
      {
        key: "avatar",
        component: "v-image-upload",
        label: "Изображение",
      },
    ],
    display: [
      {
        key: "published",
        component: "v-switcher",
        label: "Опубликовано",
      },
    ],
    information: [
      {
        key: "olympic_materials.created_at",
        label: "Дата создания материала",
        component: "v-date-picker",
        disabled: true,
      },
      {
        key: "olympic_materials.updated_at",
        label: "Дата изменения материала",
        component: "v-date-picker",
        disabled: true,
      },
    ],
  },
  opinions: {
    communications: [
      {
        key: "published",
        component: "v-switcher",
        label: "Опубликовано",
      },
      {
        key: "post_en",
        component: "v-input",
        label: "Post_en",
      },
      {
        key: "post_kk",
        component: "v-input",
        label: "Post_kk",
      },
      {
        key: "post_ru",
        component: "v-input",
        label: "Post_ru",
      },
    ],
    images: [
      {
        key: "avatar",
        component: "v-image-upload",
        label: "Изображение",
      },
    ],
    display: [],
    information: [
      {
        key: "views",
        label: "Просмотров",
        component: "v-input",
        disabled: true,
      },
      {
        key: "olympic_materials.created_at",
        label: "Дата создания материала",
        component: "v-date-picker",
        disabled: true,
      },
      {
        key: "olympic_materials.updated_at",
        label: "Дата изменения материала",
        component: "v-date-picker",
        disabled: true,
      },
    ],
  },
  sections: {
    communications: [
      {
        key: "published",
        component: "v-switcher",
        label: "Опубликовано",
      },
    ],
    images: [
      {
        key: "avatar",
        component: "v-image-upload",
        label: "Изображение",
      },
    ],
    display: [
      {
        key: "template",
        component: "v-input",
        label: "template",
      },
      {
        key: "sort",
        component: "v-input",
        label: "Сортировка",
        type: "number",
      },
    ],
    information: [
      {
        key: "views",
        label: "Просмотров",
        component: "v-input",
        disabled: true,
      },
      {
        key: "olympic_materials.created_at",
        label: "Дата создания",
        component: "v-input",
        disabled: true,
      },
      {
        key: "olympic_materials.updated_at",
        label: "Дата обновления",
        component: "v-input",
        disabled: true,
      },
    ],
  },
  olympic_competitions: {
    communications: [
      {
        key: "published",
        component: "v-switcher",
        label: "Опубликовано",
      },
    ],
    images: [
      {
        key: "avatar",
        component: "v-image-upload",
        label: "Изображение",
      },
    ],
    display: [
      {
        key: "sort",
        component: "v-input",
        label: "Сортировка",
        type: "number",
      },
    ],
    information: [
      {
        key: "views",
        label: "Просмотров",
        component: "v-input",
        disabled: true,
      },
      {
        key: "created_at",
        label: "Дата создания",
        component: "v-input",
        disabled: true,
      },
      {
        key: "updated_at",
        label: "Дата обновления",
        component: "v-input",
        disabled: true,
      },
    ],
  },
};
// "code": 0,
// "name": "string",
// "title": "string"
// main : Публичный портал
// news : Новости
// contacts : Контакты
// norma_links: Нормативные ссылки
