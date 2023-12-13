export default {
  urlGet: "docs",
  url: "docs",
  detailName: "create-docs",
  tableType: "simple", // если нужна обычная таблица
  imagesKeys: [
    { key: "file_ru", url: "docs" },
    { key: "file_kk", url: "docs" },
    { key: "file_en", url: "docs" },
  ],
  postFields: [
    {
      key: "sort",
      component: "v-input",
      label: "Сортировка",
      type: "number",
      required: true,
    },
    {
      key: "category_id",
      component: "v-autocomplete",
      label: "Категория",
      url: "ru/catalog/docs_categories",
    },
    {
      key: "type",
      component: "v-input",
      label: "type",
      type: "number",
      required: true,
    },
    { key: "name_ru", component: "v-input", label: "Название", required: true },
    { key: "name_kk", component: "v-input", label: "name_kk" },
    { key: "name_en", component: "v-input", label: "name_en" },
    // { key: "avatar", component: "v-input", label: "avatar" },
    { key: "file_ru", component: "v-file-upload", label: "file_ru" },
    { key: "file_kk", component: "v-file-upload", label: "file_kk" },
    { key: "file_en", component: "v-file-upload", label: "file_en" },
    { key: "published_at", component: "v-date-picker", label: "published_at" },
  ],
};
