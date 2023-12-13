import { federationId } from "../core/services/JwtService";
const id = federationId() || 1;
export default {
  urlGet: `settings/mainSlide/${id}`,
  url: `settings/mainSlide/${id}`,
  uniqUrl: "slider_images",
  detailName: "create-slider_images",
  tableType: "simple",
  disabledCheckbox: true,
  disabledCreate: true,
  postFields: [
    {
      key: "bg",
      component: "v-input",
      label: "Категория",
    },
  ],
};
// "code": 0,
// "name": "string",
// "title": "string"
// main : Публичный портал
// news : Новости
// contacts : Контакты
// norma_links: Нормативные ссылки
