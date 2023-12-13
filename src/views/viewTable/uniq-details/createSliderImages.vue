<template>
  <div class="card p-10 card-body mb-8 h-100">
    <div>
      <!-- Используем input типа file для загрузки изображений -->
      <input
        type="file"
        ref="imageInput"
        @change="uploadImage"
        style="display: none"
      />
      <button
        class="btn btn-sm fw-bold btn-primary d-inline-block"
        :disabled="items.length > 4"
        @click="openImageInput"
      >
        {{
          items.length > 4
            ? "Максимальное кол-во фотографий"
            : "Добавить изображение"
        }}
      </button>
    </div>
    {{ items.length }}
    <draggable
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
            <img :src="element.image" alt="Preview" class="img-thumbnail" />
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
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import { useMaterialStore } from "@/stores/material";
import draggable from "vuedraggable";

export default defineComponent({
  name: "kt-datatables",
  components: {
    draggable,
  },
  setup() {
    const drag = ref(false);
    const store = useMaterialStore();
    const items = ref([]);

    onMounted(() => {
      store.addMaterialType("");
      store.addMaterial({});
    });

    const imageInput = ref(null);

    const openImageInput = () => {
      // Просто вызываем метод click у input, чтобы открыть диалог выбора файла
      imageInput.value.click();
    };

    const uploadImage = (event) => {
      const file = event.target.files[0];

      if (file) {
        // Примерно так можно загрузить изображение в базу данных или сервер
        // Вам нужно реализовать логику загрузки в соответствии с вашим стеком технологий
        // Например, вы можете использовать axios, FormData и другие инструменты

        // После успешной загрузки изображения, вы можете обновить объект в списке items
        const imageUrl = URL.createObjectURL(file);
        items.value.push({
          id: items.value.length + 1,
          name: `Item ${items.value.length + 1}`,
          image: imageUrl,
        });
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
      imageInput,
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
  .img-thumbnail {
    height: 300px;
    object-fit: cover;
    width: 100%;
  }
}

.drag-element {
  margin-bottom: 15px;
}
</style>
