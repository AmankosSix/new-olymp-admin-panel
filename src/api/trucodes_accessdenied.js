export default {
  urlGet: "trucodes_accessdenied",
  url: "trucodes_accessdenied",
  detailName: "trucodes_accessdenied/detail",
  filter: [
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
  ],
  postFields: [
    { key: "address", component: "v-field", label: "IPv4/v6 адрес" },
    { key: "type", component: "v-field", label: "Тип" },
    { key: "User_Agent", component: "v-field", label: "User-Agent" },
    { key: "info", component: "v-field", label: "Информация" },
  ],
};
// "address": "string",
// "type": "string",
// "User_Agent": "string",
// "info": "string"
