export default {
  urlGet: "users_tokens",
  url: "users_tokens",
  detailName: "create-users_tokens",
  tableType: "simple",
  postFields: [
    { key: "token", component: "v-input", label: "Токен" },
    { key: "device", component: "v-input", label: "Кол-во девайсов" },
  ],
};
