import { createApp } from "vue";
import { createPinia } from "pinia";
import { Tooltip } from "bootstrap";
import App from "./App.vue";

/*
TIP: To get started with clean router change path to @/router/clean.ts.
 */
import router from "./router";
import ElementPlus from "element-plus";
import ru from "element-plus/dist/locale/ru.mjs";
import i18n from "@/core/plugins/i18n";

//imports for app initialization
import ApiService from "@/core/services/ApiService";
import { initApexCharts } from "@/core/plugins/apexcharts";
import { initInlineSvg } from "@/core/plugins/inline-svg";
import { initVeeValidate } from "@/core/plugins/vee-validate";
import { initKtIcon } from "@/core/plugins/keenthemes";

//global components
import vInput from "@/components/ui/vInput.vue";
import vSelect from "@/components/ui/vSelect.vue";
import vAutocomplete from "@/components/ui/vAutocomplete.vue";
import vSwitch from "@/components/ui/vSwitch.vue";
import vDatePicker from "@/components/ui/vDatePicker.vue";
import vUploadFile from "@/components/ui/vUploadFile.vue";
import vUploadImage from "@/components/upload-image/index.vue";
import "@/core/plugins/prismjs";

import { Close, Right, Delete } from "@element-plus/icons-vue";

const pinia = createPinia();
pinia.use(({ store }) => {
  store.router = router;
});
const app = createApp(App);

app.use(pinia);
app.use(router);
app.use(ElementPlus, {
  locale: ru,
});

app.component("v-input", vInput);
app.component("v-selection", vSelect);
app.component("v-autocomplete", vAutocomplete);
app.component("v-upload-file", vUploadFile);
app.component("v-switch", vSwitch);
app.component("v-date-picker", vDatePicker);
app.component("v-image-upload", vUploadImage);

app.component("Close", Close);
app.component("Right", Right);

ApiService.init(app);
initApexCharts(app);
initInlineSvg(app);
initKtIcon(app);
initVeeValidate();

app.use(i18n);

app.directive("tooltip", (el) => {
  new Tooltip(el);
});

app.mount("#app");
