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

    <li v-if="route.name !== 'create-product'" class="nav-item">
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
      <uniq-tab type="communications" />
    </div>
    <div class="tab-pane fade" id="kt_tab_pane_3" role="tabpanel">
      <uniq-tab type="display" />
    </div>
    <div
      v-if="route.name !== 'create-product'"
      class="tab-pane fade"
      id="kt_tab_pane_4"
      role="tabpanel"
    >
      <uniq-tab type="information" />
    </div>
    <div class="tab-pane fade" id="kt_tab_pane_5" role="tabpanel">
      <uniq-tab type="images" />
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
    return { route };
  },
});
</script>
