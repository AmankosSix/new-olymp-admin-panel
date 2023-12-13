export default {
  urlGet: "photos",
  url: "photos",
  detailName: "create-photos",
  tableType: "simple", // если нужна обычная таблица
  imagesKeys: [
    { key: "img", url: "load_file/photos" },
    { key: "watermarked_img", url: "load_file/photos" },
    { key: "preview_img", url: "load_file/photos" },
  ],
  postFields: [
    {
      key: "category_id",
      component: "v-autocomplete",
      label: "Категория",
      url: "ru/catalog/photo_categories",
      required: true,
    },
    { key: "img", component: "v-image-upload", label: "img" },
    {
      key: "watermarked_img",
      component: "v-image-upload",
      label: "watermarked_img",
    },
    { key: "preview_img", component: "v-image-upload", label: "preview_img" },
  ],
};
