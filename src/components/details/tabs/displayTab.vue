<template>
  <div class="row">
    <div class="col-md-6">
      <div class="row" v-for="(item, i) in apiList.news.display" :key="i">
        <div class="col-md-3">
          <label class="required fs-6 fw-semibold mt-2">{{ item.label }}</label>
        </div>
        <div class="col-md-6">
          <v-selection
            v-if="item.component === 'v-selection'"
            :items="item.items"
            v-model="store.material[item.key]"
          />
          <v-autocomplete
            v-if="item.component === 'v-autocomplete'"
            :item="item"
            v-model="store.material[item.key]"
          />
          <v-switch
            v-if="item.component === 'v-switcher'"
            :item="item"
            v-model="store.material[item.key]"
          />
          <v-date-picker
            v-if="item.component === 'v-date-picker'"
            v-model="store.material[item.key]"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useMaterialStore } from "@/stores/material";
export default defineComponent({
  name: "displayTab",
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
