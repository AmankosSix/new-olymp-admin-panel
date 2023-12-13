<template>
  <div class="row">
    <div class="col-md-6">
      <div class="row" v-for="(item, i) in apiList.news.information" :key="i">
        <div class="col-md-3">
          <label class="required fs-6 fw-semibold mt-2">{{ item.label }}</label>
        </div>
        <div class="col-md-6">
          <el-input
            :value="store.material[item.key]"
            disabled
            placeholder="Enter Target Title"
            name="targetTitle"
          ></el-input>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useMaterialStore } from "@/stores/material";
export default defineComponent({
  name: "informationTab",
  props: {
    item: Object,
    apiList: Object,
  },

  setup() {
    const store = useMaterialStore();
    return { store };
  },
});
</script>
