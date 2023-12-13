export default {
  urlGet: "ens_relation_15_mkei",
  url: "ens_relation_15_mkei",
  detailName: "ens_relation_15_mkei/detail",
  notDelete: true,
  postFields: [
    {
      key: "code",
      component: "v-autocomplete",
      newKey: "id",
      url: "truslist",
      label: "15-значный код",
    },
    {
      key: "mkeis",
      component: "v-combobox",
      url: "mkeislist",
      label: "МКЕИ",
      multiple: true,
      formatValue: (arr) => {
        if (Array.isArray(arr)) return arr.map((a) => a.id).join(", ");
        else return arr;
      },
    },
  ],
  postFieldsForEdit: [
    {
      key: "id",
      component: "v-autocomplete",
      url: "truslist",
      readonly: true,
      label: "15-значный код",
    },
    {
      key: "mkeis",
      component: "v-combobox",
      url: "mkeislist",
      label: "МКЕИ",
      processReply: true, // ожидать ответа, чтобы сделать запрос для списка со специальными ключами
      multiple: true,
      formatValue: (arr) => {
        if (Array.isArray(arr)) return arr.map((a) => a.id).join(", ");
        else return arr;
      },
    },
  ],
};
// "lvl": 0,
// "parent_id": 0,
// "title": "string"
