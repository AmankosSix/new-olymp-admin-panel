export default {
  urlGet: "trucodes_category",
  url: "trucodes_category",
  detailName: "category/detail",

  postFields: [
    { key: "title", component: "v-field", label: "title" },
    {
      key: "parent_id",
      component: "v-autocomplete",
      label: "parent_id",
      url: "categorieslist",
    },
    {
      key: "lvl",
      component: "v-selection",
      items: [
        { id: 1, title: 1 },
        { id: 2, title: 2 },
        { id: 3, title: 3 },
        { id: 4, title: 4 },
        { id: 5, title: 5 },
      ],
      label: "lvl",
    },
  ],
};
// "lvl": 0,
// "parent_id": 0,
// "title": "string"
