<template>
  <div class="card p-10 card-body mb-8 h-100">
    <uniq-tab />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue";

import { useMaterialStore } from "@/stores/material";

import uniqTab from "@/components/details/tabs/uniqTab.vue";

export default defineComponent({
  name: "kt-datatables",
  components: {
    uniqTab,
  },
  setup() {
    const store = useMaterialStore();

    onMounted(() => {
      store.addMaterialType("");
      store.addMaterial({});
    });
  },
});
</script>
