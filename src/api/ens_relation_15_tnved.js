export default {
  urlGet: "ens_relation_15_tnved",
  url: "ens_relation_15_tnved",
  detailName: "ens_relation_15_tnved/detail",
  notDelete: true,
  postFields: [
    {
      key: "code",
      component: "v-autocomplete",
      url: "truslist",
      label: "15-значный код",
    },
    {
      key: "tnveds",
      component: "v-combobox",
      url: "tnvedlist",
      label: "ТН ВЭД",
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
      label: "15-значный код",
    },
    {
      key: "tnveds",
      component: "v-combobox",
      url: "tnvedlist",
      label: "ТН ВЭД",
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
