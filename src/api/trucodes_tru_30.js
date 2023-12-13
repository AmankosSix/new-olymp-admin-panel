export default {
  urlGet: "trucodes_tru_30",
  url: "trucodes_tru_30",
  detailName: "trucodes_tru_30/detail",
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
    {
      component: "v-date-picker",
      key: "date_from_created",
      label: "Дата создания с",
    },
    {
      component: "v-date-picker",
      key: "date_to_created",
      label: "Дата создания по",
    },
    {
      component: "v-date-picker",
      key: "date_from_updated",
      label: "Дата модификации с",
    },
    {
      component: "v-date-picker",
      key: "date_to_updated",
      label: "Дата модификации по",
    },
    {
      component: "v-date-picker",
      key: "date_from_expire",
      label: "Дата отмены с",
    },
    {
      component: "v-date-picker",
      key: "date_to_expire",
      label: "Дата отмены по",
    },
  ],
  postFields: [
    { key: "code_30", component: "v-field", label: "code_30" },
    { key: "code_15", component: "v-field", label: "code_15" },
  ],
};
