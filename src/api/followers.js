export default {
  urlGet: "followers",
  url: "followers",
  detailName: "create-followers",
  tableType: "simple",
  postFields: [
    { key: "name", component: "v-input", label: "name" },
    { key: "email", component: "v-input", label: "email" },
    { key: "unsubscribe", component: "v-input", label: "unsubscribe" },
  ],
};
