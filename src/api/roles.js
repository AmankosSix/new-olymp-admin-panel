export default {
  urlGet: "roles",
  url: "roles",
  detailName: "create-roles",
  tableType: "simple",
  postFields: [
    { key: "name", component: "v-input", label: "name" },
    { key: "slug", component: "v-input", label: "slug" },
    { key: "description", component: "v-input", label: "description" },
    { key: "special", component: "v-input", label: "special" },
  ],
};
