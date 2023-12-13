export default {
  urlGet: "ens_relation_15_15",
  url: "ens_relation_15_15",
  detailName: "ens_relation_15_15/detail",
  notChangePancel: true, // если нужно убрать ссылку на экшены - true
  btnCreateText: "Заменить код", // текст кнопки добавить запись
  postFields: [
    {
      key: "code_from",
      component: "v-field",
      label: "Исходный код",
    },
    {
      key: "code_to",
      component: "v-attr-list",
      label: "Код замены",
      formatValue(arr) {
        return arr;
      },
    },
  ],
};
