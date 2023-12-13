export default {
  urlGet: "trucodes_tru_17",
  url: "trucodes_tru_17",
  detailName: "trucodes_tru_17/detail",
  notCreateBtn: true, // если нужно убрать кнопку создания записи
  notChangeBtns: true, // если нужно убрать ссылку на экшены - true
  filter: [
    {
      component: "v-selection",
      key: "category",
      items: ["Товар", "Услуга", "Работа"],
      label: "Тип",
      multiple: false,
    },
  ],
  postFields: [
    { key: "code_30", component: "v-field", label: "code_30" },
    { key: "code_15", component: "v-field", label: "code_15" },
  ],
};
