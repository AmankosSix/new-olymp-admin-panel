<template>
  <div class="row">
    <div class="col-md-6">
      <div class="row mb-5" v-for="(item, i) in list" :key="i">
        <div class="col-md-3">
          <label
            class="fs-6 fw-semibold mt-2"
            :class="{ required: item.required }"
            >{{ item.label }}</label
          >
        </div>
        <div class="col-md-6">
          <v-input
            v-if="item.component === 'v-input'"
            v-model="data.material[item.key]"
            :disabled="item.disabled"
            :required="item.required"
            :type="item.type"
            :error="data.validationErrors[item.key]"
          />
          <v-selection
            v-if="item.component === 'v-selection'"
            :items="item.items ? item.items : []"
            v-model="data.material[item.key]"
          />
          <v-autocomplete
            v-else-if="item.component === 'v-autocomplete'"
            :item="item"
            v-model="data.material[item.key]"
          />
          <v-switch
            v-else-if="item.component === 'v-switcher'"
            :item="item"
            :switcherLabels="item.switcherLabels"
            v-model="data.material[item.key]"
          />
          <v-date-picker
            v-else-if="item.component === 'v-date-picker'"
            :data-type="item.dataType"
            v-model="data.material[item.key]"
            :disabled="item.disabled"
          />
          <v-image-upload
            v-else-if="item.component === 'v-image-upload'"
            v-model="data.material[item.key]"
          />
          <v-upload-file
            v-else-if="item.component === 'v-file-upload'"
            :key-data="item.key"
            :file-url="data.material[item.key]"
            @onFileChange="handleFileChange"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watch } from "vue";
import { useMaterialStore } from "@/stores/material";
import { useMyStore } from "@/stores/apiList";
import { useRoute } from "vue-router";

export default defineComponent({
  name: "communicationsTab",
  props: {
    item: Object,
    type: { type: String, default: "communications" },
  },
  setup(props) {
    const route = useRoute();
    const handleFileChange = ({ file, key }) => {
      data.material[key] = file;
    };
    const data = useMaterialStore();
    const apiKey = ref<string>(route.meta.apiKey as string);
    const myStore = useMyStore();
    const apiList = myStore.getApiList[apiKey.value];
    const list = computed(() => {
      return apiList.tableType === "simple"
        ? apiList.postFields
        : data.materialType
        ? apiList[data.materialType][props.type]
        : [];
    });
    watch(
      list,
      (newList) => {
        newList.forEach((item) => {
          if (
            item.defaultValue !== undefined &&
            data.material[item.key] === undefined
          ) {
            data.material[item.key] = item.defaultValue;
          }
        });
      },
      { immediate: true }
    );
    return { list, data, handleFileChange };
  },
});
</script>
