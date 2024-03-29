export default {
  urlGet: "federations",
  url: "federations",
  detailName: "create-federations",
  tableType: "simple", // если нужна обычная таблица
  imagesKeys: [
    { key: "bg", url: "" },
    { key: "avatar", url: "" },
    { key: "icon", url: "" },
  ], // нужен список для цикла запросов на сервер с файлами(materail.ts)
  postFields: [
    {
      key: "season_id",
      component: "v-selection",
      items: [
        { id: 1, title: "Летнее" },
        { id: 2, title: "Зимнее" },
      ],
      label: "Сезон",
    },
    { key: "name_ru", component: "v-input", label: "name_ru", required: true },
    { key: "name_kk", component: "v-input", label: "name_kk" },
    { key: "name_en", component: "v-input", label: "name_en" },
    { key: "description_ru", component: "v-input", label: "description_ru" },
    { key: "description_kk", component: "v-input", label: "description_kk" },
    { key: "description_en", component: "v-input", label: "description_en" },
    { key: "seo_ru", component: "v-input", label: "seo_ru" },
    { key: "seo_kk", component: "v-input", label: "seo_kk" },
    { key: "seo_en", component: "v-input", label: "seo_en" },
    { key: "url", component: "v-input", label: "url" },
    { key: "world_name_ru", component: "v-input", label: "world_name_ru" },
    { key: "world_name_kk", component: "v-input", label: "world_name_kk" },
    { key: "world_name_en", component: "v-input", label: "world_name_en" },
    {
      key: "world_description_ru",
      component: "v-input",
      label: "world_description_ru",
    },
    {
      key: "world_description_kk",
      component: "v-input",
      label: "world_description_kk",
    },
    {
      key: "world_description_en",
      component: "v-input",
      label: "world_description_en",
    },
    { key: "world_url", component: "v-input", label: "world_url" },
    { key: "sport_ru", component: "v-input", label: "sport_ru" },
    { key: "sport_kk", component: "v-input", label: "sport_kk" },
    { key: "sport_en", component: "v-input", label: "sport_en" },
    { key: "man_team", component: "v-input", label: "man_team" },
    { key: "woman_team", component: "v-input", label: "woman_team" },
    { key: "accordion_ru", component: "v-input", label: "accordion_ru" },
    { key: "accordion_kk", component: "v-input", label: "accordion_kk" },
    { key: "accordion_en", component: "v-input", label: "accordion_en" },
    { key: "facts_ru", component: "v-input", label: "facts_ru" },
    { key: "facts_kk", component: "v-input", label: "facts_kk" },
    { key: "facts_en", component: "v-input", label: "facts_en" },
    { key: "quizzes_ru", component: "v-input", label: "quizzes_ru" },
    { key: "quizzes_kk", component: "v-input", label: "quizzes_kk" },
    { key: "quizzes_en", component: "v-input", label: "quizzes_en" },
    { key: "quizzes_en", component: "v-input", label: "quizzes_en" },
    { key: "avatar", component: "v-image-upload", label: "avatar" },
    { key: "icon", component: "v-image-upload", label: "icon" },
    { key: "bg", component: "v-image-upload", label: "bg" },
  ],
};
