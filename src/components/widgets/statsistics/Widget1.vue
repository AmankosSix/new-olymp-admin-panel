<template>
  <!--begin::Statistics Widget 1-->
  <div
    :class="widgetClasses"
    class="card bgi-no-repeat card-open bg-hover-light fs-4"
  >
    <!--begin::Body-->
    <a class="card-body">
      <p class="card-title fw-bold text-muted y fs-4">
        {{ title }}
      </p>

      <div class="fw-bold text-primary my-6">{{ time }}</div>

      <p class="text-gray-900-75 fw-semibold fs-5 m-0">
        <span v-html="description"></span>
      </p>
    </a>
    <!--end::Body-->
  </div>
  <!--end::Statistics Widget 1-->
</template>

<script lang="ts">
import { getAssetPath } from "@/core/helpers/assets";
import { defineComponent } from "vue";

export default defineComponent({
  name: "kt-widget-1",
  props: {
    widgetClasses: String,
    background: String,
    title: String,
    time: String,
    description: String,
  },
  components: {},
  setup() {
    return {
      getAssetPath,
    };
  },
});
</script>
<style scss>
.card-open {
  cursor: pointer;
}
</style>
