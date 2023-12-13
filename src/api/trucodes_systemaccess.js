export default {
  urlGet: "trucodes_systemaccess",
  url: "trucodes_systemaccess",
  detailName: "trucodes_systemaccess/detail",
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
    { key: "user", component: "v-field", label: "Пользователь" },
    { key: "cert", component: "v-field", label: "Сертификат X509" },
  ],
};
// "address": "string",
// "user": "string",
// "cert": "string"
