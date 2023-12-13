<template>
  <div class="card p-10 card-body mb-8 h-100">
    <uniq-tab />
    <!-- <vImageUpload /> -->
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref, watch } from "vue";
import { useMyStore } from "@/stores/apiList.js";
import ApiService from "@/core/services/ApiService";
import { useMaterialStore } from "@/stores/material";
import { useRoute } from "vue-router";
import uniqTab from "@/components/details/tabs/uniqTab.vue";
//import VImageUpload from "@/components/ui/vImageUpload.vue";

export default defineComponent({
  name: "kt-datatables",
  components: {
    uniqTab,
    // VImageUpload,
  },
  setup() {
    const store = useMaterialStore();
    const myStore = useMyStore();
    const route = useRoute();
    const apiKey = ref<string>(route.meta.apiKey as string);
    const apiList = myStore.getApiList[apiKey.value];
    const editList = computed(() => {
      return apiList.postFieldsForEdit
        ? apiList.postFieldsForEdit
        : apiList.postFields;
    });

    const getList = async () => {
      const { data } = await ApiService.get(
        "/api/" + `${apiList.url}/${route.params.id}`
      );
      if (data.length) store.addMaterial(data[0]);
      else store.addMaterial({});
    };
    const getRequest = computed(() => {
      return apiList?.urlGet ? apiList?.urlGet : apiList?.url;
    });
    onMounted(async () => {
      store.addMaterialType("");
      store.addMaterial({});
      await getList();
    });
    return {
      store,
      apiList,
      getRequest,
      editList,
    };
  },
});
</script>
