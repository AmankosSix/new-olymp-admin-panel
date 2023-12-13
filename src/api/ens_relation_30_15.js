export default {
  urlGet: "ens_relation_30_15",
  url: "ens_relation_30_15",
  detailName: "ens_relation_30_15/detail",
    notCreateBtn: true, // если нужно убрать кнопку создания записи
    notChangeBtns: true, // если нужно убрать ссылку на экшены - true
  postFields: [
    { key: "code_30", component: "v-field", label: "code_30" },
    { key: "code_15", component: "v-field", label: "code_15" },
  ],
};
