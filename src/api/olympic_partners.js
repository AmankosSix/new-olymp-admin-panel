export default {
  urlGet: "olympic_partners",
  url: "olympic_partners",
  detailName: "create-olympic_partners",
  tableType: "simple",
  imagesKeys: [{ key: "avatar", url: "load_file/partners" }],
  postFields: [
    {
      key: "name_ru",
      component: "v-input",
      label: "name_ru",
      required: true,
      defaultValue: "",
    },
    {
      key: "name_kk",
      component: "v-input",
      label: "name_kk",
      defaultValue: "",
    },
    {
      key: "name_en",
      component: "v-input",
      label: "name_en",
      defaultValue: "",
    },
    { key: "href", component: "v-input", label: "href", defaultValue: "" },
    {
      key: "avatar",
      component: "v-image-upload",
      label: "avatar",
      required: true,
    },
  ],
};
