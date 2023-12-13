export default {
  urlGet: "truisez",
  url: "truisez",
  detailName: "truisez/detail",
  checkbox: "usage_isez",
  detailPage: true, // если нужно убрать ссылку на детальную страницу - true
  actions: true, // если нужно убрать ссылку на экшены - true
  notCreateBtn: true, // если нужно убрать кнопку создания записи
  postFields: [
    {
      key: "usage_isez",
      component: "v-selection",
      items: [
        { id: 1, title: "Да" },
        { id: 0, title: "Нет" },
      ],
      label: "usage_isez",
    },
  ],
};
// "code": 0,
// "name": "string",
// "title": "string"
