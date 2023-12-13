export default {
  urlGet: "settings/mainSlide/1",
  url: "settings/mainSlide/1",
  detailName: "settings/mainSlide/1",
  postFields: [
    { key: "code", component: "v-field", label: "Код" },
    { key: "title", component: "v-field", label: "Название(рус)" },
    { key: "title_kaz", component: "v-field", label: "Название(каз)" },
    {
      key: "active",
      component: "v-selection",
      items: [
        { id: 1, title: "Да" },
        { id: 0, title: "Нет" },
      ],
      label: "Активен?",
    },
  ],
};
