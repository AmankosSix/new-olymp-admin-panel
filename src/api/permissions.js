export default {
  urlGet: "permissions",
  url: "permissions",
  detailName: "create-permissions",
  tableType: "simple", // если нужна обычная таблица
  postFields: [
    { key: "name", component: "v-input", label: "name" },
    { key: "slug", component: "v-input", label: "slug" },
    { key: "description", component: "v-input", label: "description" },
  ],
};
