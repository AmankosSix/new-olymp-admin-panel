<template>
  <ul
    class="nav nav-stretch nav-line-tabs nav-line-tabs-2x border-transparent fs-5 fw-bold flex-nowrap"
  >
    <li v-for="tab in tabs" :key="tab.id" class="nav-item">
      <a
        :class="{
          'nav-link': true,
          'me-6': true,
          'text-active-primary': true,
          active: tab.isActive,
        }"
        data-bs-toggle="tab"
        :href="'#kt_tab_pane_' + tab.id"
        @click="activateTab(tab)"
        >{{ tab.label }}</a
      >
    </li>
  </ul>

  <div class="tab-content mt-8" id="myTabContent">
    <div
      v-for="tab in tabs"
      :key="tab.id"
      class="tab-pane fade"
      :class="{ show: tab.isActive, active: tab.isActive }"
      :id="'kt_tab_pane_' + tab.id"
      role="tabpanel"
    >
      <component :is="tab.component" :type="tab.type" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import materialTab from "../tabs/materialTab.vue";
import uniqTab from "../tabs/uniqTab.vue";
import { useRoute } from "vue-router";

export default defineComponent({
  name: "tabType",
  components: {
    uniqTab,
    materialTab,
  },
  props: {
    item: Object,
  },
  setup() {
    const route = useRoute();

    // Инициализация табов
    const tabs = ref([
      {
        id: 1,
        label: "Материал",
        component: "materialTab",
        type: "material",
        isActive: true,
      },
      {
        id: 2,
        label: "Связи",
        component: "uniqTab",
        type: "communications",
        isActive: false,
      },
      {
        id: 3,
        label: "Изображение",
        component: "uniqTab",
        type: "images",
        isActive: false,
      },
      {
        id: 4,
        label: "Отображение",
        component: "uniqTab",
        type: "display",
        isActive: false,
      },
      {
        id: 5,
        label: "Информация",
        component: "uniqTab",
        type: "information",
        isActive: false,
      },
    ]);

    // Функция активации таба
    const activateTab = (selectedTab) => {
      tabs.value.forEach((tab) => {
        tab.isActive = tab.id === selectedTab.id;
      });
    };

    return { route, tabs, activateTab };
  },
});
</script>
