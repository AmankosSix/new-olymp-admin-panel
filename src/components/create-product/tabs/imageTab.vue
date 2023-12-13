<template>
  <div class="row">
    <div class="col-md-6">
      <div class="row">
        <div class="col-md-3">
          <label class="required fs-6 fw-semibold mt-1">Изображение</label>
        </div>
        <div class="col-md-6 d-flex">
          <ImageUpload />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import ImageUpload from "@/components/upload-image/index.vue";
export default defineComponent({
  name: "imageTab",
  props: {
    item: Object,
  },
  components: {
    ImageUpload,
  },
  setup() {
    return {};
  },
});
</script>
