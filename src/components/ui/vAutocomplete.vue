<template>
  <div class="autocomplete-container w-100">
    <el-autocomplete
      ref="autocompleteContainerRef"
      class="w-100"
      :popper-class="uniqueClass"
      v-model="propModel"
      :fetch-suggestions="querySearch"
      placeholder="Введите здесь"
      @select="handleSelect"
      @clear="handleClear"
      clearable
      value-key="title"
    >
      <template #default="{ item }">
        {{ item.title }}
      </template></el-autocomplete
    >
  </div>
</template>

<script lang="ts">
import { ref, watch, onMounted, onBeforeUnmount } from "vue";

import ApiService from "@/core/services/ApiService";
export default {
  name: "CCatalogList",
  props: {
    modelValue: {
      type: [String, Number, Object, Array],
      default: () => "",
    },
    item: {
      type: Object,
      default() {
        return {};
      },
    },
    returnObject: {
      type: Boolean,
      default() {
        return false;
      },
    },
    noDouble: {
      type: Boolean,
      default() {
        return false;
      },
    },
  },
  setup(props, { emit }) {
    const uniqueClass = ref(`component-${Math.floor(Math.random() * 1000000)}`);
    const propModel = ref(props.modelValue);
    const autocompleteContainerRef = ref<any>(null);
    const search = ref("null");
    const config = ref({
      page: 1,
      total: 0,
      list: [],
    });
    const firstRender = ref(false);
    let timeReq: ReturnType<typeof setTimeout> | undefined = undefined;
    const querySearch = (queryString: string, cb: any) => {
      clearTimeout(timeReq);
      search.value = queryString == "null" ? "" : queryString;
      if (!search.value && config.value.list?.length && !firstRender.value) {
        cb(config.value.list);
        return false;
      }
      firstRender.value = search.value ? true : false;
      if (!search.value) {
        handleSelect({ title: "", id: null });
      }
      // if (!firstRender.value) {
      //   firstRender.value = true;
      //   cb(config.value.list);
      //   return;
      // }
      timeReq = setTimeout(async () => {
        await getCatalogList({
          page: 1,
          title: search.value,
          eventSearch: true,
        });
        cb(config.value.list);
      }, 800);
    };
    const inputList = async (input) => {};
    const getCatalogList = async ({
      page = 1,
      title = "",
      eventSearch = false,
    } = {}) => {
      await ApiService.get(
        "/api/" + (props.item?.url ? props.item?.url : "categorieslist"),
        {
          params: {
            page: page,
            title: props.modelValue && !eventSearch ? props.modelValue : title,
          },
        }
      ).then((res) => {
        const newList = eventSearch
          ? res.data.data
          : [...config.value.list, ...res.data.data];
        config.value.list = newList;
        config.value.page = res.data.meta?.page ? res.data.meta.page : 1;
        config.value.total = res.data.meta?.total ? res.data.meta.total : 1000;
        if (autocompleteContainerRef.value?.suggestions)
          autocompleteContainerRef.value.suggestions = newList;
      });
    };
    const endIntersect = async () => {
      if (config.value.list?.length < config.value.total) {
        await getCatalogList({
          page: config.value.page + 1,
          title: search.value,
        });
      }
    };

    watch(
      () => props.modelValue,
      async (val, old) => {
        if (val && !old) {
          await getCatalogList({
            page: 1,
            title: val,
            eventSearch: false,
          });
          propModel.value = propModel.value = config.value.list.filter(
            (el) => el.id == props.modelValue
          );
          if (props.returnObject) {
            emit("update:modelValue", propModel.value[0]);
          }
          propModel.value = propModel.value.length
            ? propModel.value[0].title
            : null;
        } else if (!val) {
          await getCatalogList({
            page: 1,
            title: "",
            eventSearch: false,
          });
        }
      },
      { immediate: true }
    );
    onMounted(() => {
      const popperElement = document.querySelector(
        `.${uniqueClass.value} .el-autocomplete-suggestion__wrap`
      );
      popperElement?.classList.add(uniqueClass.value);
      if (popperElement) {
        popperElement.addEventListener("scroll", handlePopperScroll);
      }
    });

    const handlePopperScroll = (event) => {
      const popperElement = event.target;
      const contentHeight = popperElement.scrollHeight;
      const scrollTop = popperElement.scrollTop;
      const clientHeight = popperElement.clientHeight;

      if (scrollTop + clientHeight >= contentHeight) {
        endIntersect();
      }
    };
    const handleSelect = (item) => {
      propModel.value = item.title;
      emit("update:modelValue", props.returnObject ? item : item.id);
      emit("change");
    };
    const handleClear = async () => {
      await getCatalogList({
        page: 1,
        title: "",
        eventSearch: false,
      });
    };
    return {
      propModel,
      querySearch,
      props,
      config,
      getCatalogList,
      handleSelect,
      autocompleteContainerRef,
      uniqueClass,
      handleClear,
    };
  },
};
</script>

<style>
.autocomplete-container {
  max-height: 200px; /* или другая желаемая высота */
  overflow-y: auto;
}
</style>
