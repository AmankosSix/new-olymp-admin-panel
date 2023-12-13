<template>
  <ul
    class="nav nav-stretch nav-line-tabs nav-line-tabs-2x border-transparent fs-5 fw-bold flex-nowrap"
  >
    <li class="nav-item">
      <a
        class="nav-link me-6 text-active-primary active"
        data-bs-toggle="tab"
        href="#kt_tab_pane_1"
        >Материал</a
      >
    </li>
    <li class="nav-item">
      <a
        class="nav-link me-6 text-active-primary"
        data-bs-toggle="tab"
        href="#kt_tab_pane_2"
        >Связи</a
      >
    </li>
    <li class="nav-item">
      <a
        class="nav-link me-6 text-active-primary"
        data-bs-toggle="tab"
        href="#kt_tab_pane_5"
        >Изображение</a
      >
    </li>
    <li class="nav-item">
      <a
        class="nav-link me-6 text-active-primary"
        data-bs-toggle="tab"
        href="#kt_tab_pane_3"
        >Отображение</a
      >
    </li>

    <li class="nav-item">
      <a
        class="nav-link me-6 text-active-primary"
        data-bs-toggle="tab"
        href="#kt_tab_pane_4"
        >Информация</a
      >
    </li>
  </ul>

  <div class="tab-content mt-8" id="myTabContent">
    <div class="tab-pane fade show active" id="kt_tab_pane_1" role="tabpanel">
      <material-tab />
    </div>
    <div class="tab-pane fade" id="kt_tab_pane_2" role="tabpanel">
      <communications-tab :apiList="apiList" />
    </div>
    <div class="tab-pane fade" id="kt_tab_pane_3" role="tabpanel">
      <display-tab />
    </div>
    <div class="tab-pane fade" id="kt_tab_pane_4" role="tabpanel">
      <information-tab />
    </div>
    <div class="tab-pane fade" id="kt_tab_pane_5" role="tabpanel">
      <image-tab />
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
import materialTab from "./tabs/materialTab.vue";
import communicationsTab from "./tabs/communicationsTab.vue";
import imageTab from "./tabs/imageTab.vue";
import informationTab from "./tabs/informationTab.vue";
import displayTab from "./tabs/displayTab.vue";
import { useRoute } from "vue-router";
import { useMyStore } from "@/stores/apiList";

const typeList = ref<any>([
  {
    id: 1,
    name_ru: "Название(Рус)",
    name_eng: "Название(Англ)",
    name_kk: "Название(Каз)",
  },
  {
    id: 2,
    name_ru: "Описание(Рус)",
    name_eng: "Описание(Англ)",
    name_kk: "Описание(Каз)",
  },
  {
    id: 3,
    name_ru: "Аннотация(Рус)",
    name_eng: "Аннотация(Англ)",
    name_kk: "Аннотация(Каз)",
  },
  {
    id: 4,
    name_ru: "Медали(Рус)",
    name_eng: "Медали(Англ)",
    name_kk: "Медали(Каз)",
  },
  {
    id: 5,
    name_ru: "Медали 2(Рус)",
    name_eng: "Медали 2(Англ)",
    name_kk: "Медали 2(Каз)",
  },
]);
type langTypes = "ru" | "kk" | "en";
export default defineComponent({
  name: "tabType",
  components: {
    communicationsTab,
    materialTab,
    imageTab,
    informationTab,
    displayTab,
  },
  props: {
    item: Object,
  },
  setup() {
    const route = useRoute();
    const apiKey = ref<string>(route.meta.apiKey as string);
    const myStore = useMyStore();
    const apiList = myStore.getApiList[apiKey.value];
    const lang = ref<langTypes>("ru");
    const typeTab = ref(1);
    return { lang, typeTab, typeList, apiList };
  },
});
</script>
