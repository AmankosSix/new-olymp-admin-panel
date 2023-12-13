export default {
  urlGet: "trucodes_tru2",
  url: "trucodes_tru",
  detailName: "tru/detail",
  filter: [
    {
      component: "v-selection",
      key: "category",
      items: ["Товар", "Услуга", "Работа"],
      label: "Тип",
      multiple: false,
    },
    {
      component: "v-selection",
      key: "state",
      items: ["Присвоенные", "Удаленные", "Замененные"],
      label: "Состояние",
      multiple: false,
    },
    {
      component: "v-filter",
      key: "created_by",
      url: "/expertslist",
      label: "Ответственный",
      multiple: false,
      formatValue: (id, arr) => {
        if (Array.isArray(arr)) return arr.filter((el) => id == el.id)[0];
        else return arr;
      },
    },
  ],
  postFields: [
    { key: "code", component: "v-field", label: "15 значный код" },
    { key: "title_rus", component: "v-field", label: "Наименование" },
    {
      key: "attr_rus",
      component: "v-attr-list",
      label: "Атрибуты",
    },
    // { key: "attr_kaz", component: "v-field", label: "attr_kaz" },
    // {
    //   key: "cat_id",
    //   component: "v-autocomplete",
    //   label: "cat_id",
    //   url: "categorieslist",
    // },
    // {
    //   key: "is_active",
    //   component: "v-selection",
    //   items: [
    //     { id: 1, title: "Да" },
    //     { id: 0, title: "Нет" },
    //   ],
    //   label: "is_active",
    // },
    // {
    //   key: "mkeis",
    //   component: "v-combobox",
    //   urlList: "mkeislist",
    //   label: "mkeis",
    //   multiple: true,
    //   formatValue: (arr) => {
    //     if (Array.isArray(arr)) return arr.map((a) => a.id).join(", ");
    //     else return arr;
    //   },
    // },
  ],
  postFieldsForEdit: [
    {
      key: "code",
      component: "v-field",
      label: "15 значный код",
      readonly: true,
    },
    { key: "title_rus", component: "v-field", label: "Наименование" },
    {
      key: "attr_rus",
      component: "v-attr-list",
      label: "Атрибуты",
    },
    {
      component: "v-selection",
      key: "state",
      items: [
        {
          id: "NEW",
          title: "Присвоенные",
        },
        {
          id: "DELETED",
          title: "Удаленные",
        },
        {
          id: "CHANGED",
          title: "Замененные",
        },
      ],
      label: "Состояние",
      multiple: false,
    },
  ],
};
