<template>
  <div class="row">
    <div class="col-md-6">
      <div class="row" v-for="(item, i) in apiList.news.images" :key="i">
        <div class="col-md-3">
          <label class="required fs-6 fw-semibold mt-2">{{ item.label }}</label>
        </div>
        <div class="col-md-6">
          <ImageUpload v-model="store.material[item.key]" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import ImageUpload from "@/components/upload-image/index.vue";
import { useMaterialStore } from "@/stores/material";

export default defineComponent({
  name: "imageTab",
  props: {
    item: Object,
    apiList: Object,
  },
  components: {
    ImageUpload,
  },
  setup() {
    const store = useMaterialStore();
    return { store };
  },
});
</script>
