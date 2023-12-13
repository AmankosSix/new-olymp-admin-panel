export default {
  urlGet: "ens_relation_15_cat",
  url: "ens_relation_15_cat",
  detailName: "ens_relation_15_cat/detail",
  notDelete: true, // если нужно убрать кнопку удаления записи
  notCreateBtn: true, // если нужно убрать кнопку создания записи
  postFields: [
    {
      key: "cat_id",
      component: "v-autocomplete",
      url: "categorieslist",
      label: "Название категории",
    },
  ],
};
// "lvl": 0,
// "parent_id": 0,
// "title": "string"
