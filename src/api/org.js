export default {
  urlGet: "trucodes_org",
  url: "trucodes_org",
  detailName: "org/detail",
  postFields: [
    { key: "title", component: "v-field", label: "Наименование(рус)" },
    { key: "title_kaz", component: "v-field", label: "Наименование(каз)" },
    { key: "code", component: "v-field", label: "Обозначение(рус)" },
    { key: "code_kaz", component: "v-field", label: "Обозначение(каз)" },
  ],
};
// "bin": "string",
// "is_locked": 0,
// "is_supervized": 0,
// "org_id": 0,
// "resident": 0,
// "title": "string",
// "title_kaz": "string"
