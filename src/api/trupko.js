export default {
  urlGet: "trupko",
  url: "trupko",
  detailName: "trupko/detail",
  checkbox: "usage_pko",
  detailPage: true, // если нужно убрать ссылку на детальную страницу - true
  actions: true, // если нужно убрать ссылку на экшены - true
  notCreateBtn: true, // если нужно убрать кнопку создания записи
  postFields: [
    {
      key: "usage_pko",
      component: "v-selection",
      items: [
        { id: 1, title: "Да" },
        { id: 0, title: "Нет" },
      ],
      label: "usage_pko",
    },
  ],
};
// "code": 0,
// "name": "string",
// "title": "string"
