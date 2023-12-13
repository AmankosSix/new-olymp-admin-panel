export default {
  urlGet: "trucodes_kpved",
  url: "trucodes_kpved",
  detailName: "kpved/detail",
  catalogUrl: "orgslist",
  catalogKey: "org_id",
  postFields: [
    { key: "code", component: "v-field", label: "Код" },
    { key: "name_kaz", component: "v-field", label: "Название(каз)" },
    { key: "name_rus", component: "v-field", label: "Название(рус)" },
  ],
};
// "code": "string",
// "name_kaz": "string",
// "name_rus": "string"
