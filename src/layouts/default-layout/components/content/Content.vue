<template>
  <div id="kt_app_content" class="app-content flex-column-fluid h-100">
    <!--begin::Content container-->
    <div
      id="kt_app_content_container"
      class="app-container h-100"
      :class="{
        'container-fluid': contentWidthFluid,
        'container-xxl': !contentWidthFluid,
      }"
    >
      <RouterView :key="route.path"></RouterView>
    </div>
    <!--end::Content container-->
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { contentWidthFluid } from "@/layouts/default-layout/config/helper";
import { RouterView, useRoute } from "vue-router";

export default defineComponent({
  name: "default-layout-content",
  components: {
    RouterView,
  },
  setup() {
    const route = useRoute();
    return {
      contentWidthFluid,
      route,
    };
  },
});
</script>
