export default {
  urlGet: "truexpired",
  url: "truexpired",
  detailName: "truexpired/detail",
  // checkbox: "is_expired",
  detailPage: true, // если нужно убрать ссылку на детальную страницу - true
  // actions: true, // если нужно убрать ссылку на экшены - true
  // notCreateBtn: true, // если нужно убрать кнопку создания записи
  notDelete: true,
  notChangePancel: true,
  btnCreateText:"Вывод из оборота",
  postFields: [
    {
      key: "id",
      component: "v-autocomplete",
      url:'truslist',
      label: "15-значный код",
    },
    {
      key: "expire_at",
      component: "v-date-picker",
      label: "Дата окончания действия кода",
    },
  ],
};
// "code": 0,
// "name": "string",
// "title": "string"
