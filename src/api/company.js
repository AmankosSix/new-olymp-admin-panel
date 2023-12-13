export default {
  urlGet: "trucodes_company",
  url: "trucodes_company",
  detailName: "company/detail",
  catalogUrl: "orgslist",
  catalogKey: "org_id",
  postFields: [
    { key: "bin", component: "v-field", label: "БИН" },
    { key: "title", component: "v-field", label: "Название" },
    { key: "title_kaz", component: "v-field", label: "Название(каз)" },
    {
      key: "resident",
      component: "v-field",
      label: "Резидент",
      type: "number",
    },
    {
      key: "is_locked",
      component: "v-selection",
      items: [
        { id: 1, title: "Да" },
        { id: 0, title: "Нет" },
      ],
      label: "Забанен?",
    },
    {
      key: "is_supervized",
      component: "v-selection",
      items: [
        { id: 1, title: "Да" },
        { id: 0, title: "Нет" },
      ],
      label: "is_supervized",
    },
    {
      key: "org_id",
      component: "v-autocomplete",
      url: "orgslist",
      label: "Организация",
    },
  ],
};
// "bin": "string",
// "is_locked": 0,
// "is_supervized": 0,
// "org_id": 0,
// "resident": 0,
// "title": "string",
// "title_kaz": "string"
