<template>
  <div class="row">
    <div class="col-md-6">
      <div class="row" v-for="(item, i) in list.communications" :key="i">
        <div class="col-md-3">
          <label class="required fs-6 fw-semibold mt-2">{{ item.label }}</label>
        </div>
        <div class="col-md-6">
          <v-selection
            v-if="item.component === 'v-selection'"
            :items="item.items ? item.items : []"
            v-model="data.material[item.key]"
          />
          <v-autocomplete
            v-if="item.component === 'v-autocomplete'"
            :item="item"
            v-model="data.material[item.key]"
          />
          <v-switch
            v-if="item.component === 'v-switcher'"
            :item="item"
            :switcherLabels="item.switcherLabels"
            v-model="data.material[item.key]"
          />
          <v-date-picker
            v-if="item.component === 'v-date-picker'"
            :data-type="item.dataType"
            v-model="data.material[item.key]"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import { useMaterialStore } from "@/stores/material";
import { useMyStore } from "@/stores/apiList";
import { useRoute } from "vue-router";
export default defineComponent({
  name: "communicationsTab",
  props: {
    item: Object,
    type: String,
  },
  setup() {
    const route = useRoute();
    const data = useMaterialStore();
    const apiKey = ref<string>(route.meta.apiKey as string);
    const myStore = useMyStore();
    const apiList = myStore.getApiList[apiKey.value];
    const list = computed(() => {
      return apiList[data.materialType];
    });

    return { list, data };
  },
});
</script>
