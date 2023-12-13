<template>
  <div class="card p-10 card-body mb-8 h-100">
    <div class="mb-8">
      <!-- Используем input типа file для загрузки изображений -->
      <input
        type="file"
        ref="imageInput"
        accept="image/*"
        @change="uploadImage"
        style="display: none"
      />
      <button
        class="btn btn-sm fw-bold btn-primary d-inline-block"
        :disabled="items.length > 9"
        @click="openImageInput"
      >
        {{
          items.length > 9
            ? "Максимальное кол-во фотографий: 10"
            : "Добавить изображение"
        }}
      </button>
    </div>

    <draggable
      v-if="items.length && items[0]"
      v-model="items"
      group="people"
      @start="drag = true"
      @end="drag = false"
      item-key="id"
      class="row"
    >
      <template #item="{ element, index }">
        <div class="col-3 drag-element">
          <div class="image-container">
            <img :src="getUrl(element)" alt="Preview" class="img-thumbnail" />
            <button
              class="btn btn-sm btn-danger mt-2"
              @click="removeImage(index)"
            >
              Удалить
            </button>
          </div>
        </div>
      </template>
    </draggable>
    <p v-else>Изображения отсутсвтвуют</p>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref, watch } from "vue";
import { useMaterialStore } from "@/stores/material";
import draggable from "vuedraggable";
import { useRoute } from "vue-router";
import { useMyStore } from "@/stores/apiList.js";
import ApiService from "@/core/services/ApiService";
export default defineComponent({
  name: "kt-datatables",
  components: {
    draggable,
  },
  setup() {
    const drag = ref(false);

    const store = useMaterialStore();
    const myStore = useMyStore();
    const route = useRoute();
    const apiKey = ref<string>(route.meta.apiKey as string);
    const envUrl = import.meta.env.VITE_API_PROXY_TARGET_FILE;
    const apiList = myStore.getApiList[apiKey.value];
    const bg = computed(() => {
      return apiList.postFieldsForEdit
        ? apiList.postFieldsForEdit
        : apiList.postFields;
    });
    const list = ref(localStorage.getItem("images") || []);
    const items = ref([]);
    const getList = async () => {
      const { data } = await ApiService.get(
        "/api/settings/mainSlide/" + `${route.params.id}`
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
      items.value = list.value?.split(",");
    });
    const getUrl = (url) => {
      if (typeof url === "string") return `${envUrl}${url}`;
      else if (url instanceof File) {
        const imageUrl = URL.createObjectURL(url);
        return imageUrl;
      }
    };
    const imageInput = ref(null);

    const openImageInput = () => {
      // Просто вызываем метод click у input, чтобы открыть диалог выбора файла
      imageInput.value.click();
    };
    watch(
      () => items.value,
      () => {
        store.material.bg = items.value;
      },
      { deep: true }
    );
    const uploadImage = (event) => {
      const file = event.target.files[0];
      if (file) {
        items.value.push(file);
      }
    };

    const removeImage = (index) => {
      // Удаление элемента из списка по индексу
      items.value.splice(index, 1);
    };

    return {
      items,
      drag,
      openImageInput,
      uploadImage,
      removeImage,
      list,
      imageInput,
      getUrl,
      store,
    };
  },
});
</script>

<style lang="scss">
.horizontal-item {
  display: inline-block;
  margin-right: 10px;
}

.image-container {
  border: 1px solid #ddd;
  padding: 10px;
  text-align: center;
  height: 300px;
  .img-thumbnail {
    max-height: 85%;
    object-fit: cover;
    width: 100%;
  }
}

.drag-element {
  margin-bottom: 15px;
}
</style>
