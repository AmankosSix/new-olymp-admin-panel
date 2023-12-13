<template>
  <div>
    <label for="imageInput">Выберите изображение</label>
    <input
      type="file"
      id="imageInput"
      accept="image/*"
      class="form-control-file"
      @change="handleImageChange"
    />
    <div v-if="file" class="mt-2">
      <!-- Используйте функцию generateFullUrl для формирования полного URL -->
      <img :src="url" alt="Preview" style="max-width: 100%; height: auto" />
    </div>
  </div>
</template>

<script>
import { ref, watch, onMounted, computed } from "vue";

export default {
  name: "ImageUpload",
  props: {
    modelValue: String,
  },
  emits: ["update:modelValue"],
  setup(props, { emit }) {
    const change = ref(false);
    const imageUrl = ref(null);
    const file = ref(null);
    const envUrl = import.meta.env.VITE_API_PROXY_TARGET_FILE;
    const handleImageChange = (event) => {
      change.value = true;
      file.value = event.target.files[0];

      if (file.value) {
        const reader = new FileReader();
        reader.onload = (event) => {
          imageUrl.value = event.target.result;
          emit("update:modelValue", file.value); // Emit the 'input' event to update the parent's v-model
        };
        reader.readAsDataURL(file.value);
      }
    };

    const url = computed(() =>
      change.value ? imageUrl.value : envUrl + file.value
    );

    // При изменении значения извне обновляем предварительное изображение
    watch(
      () => props.modelValue,
      (newValue) => {
        file.value = newValue;
      }
    );

    // При монтировании компонента обновляем предварительное изображение
    onMounted(() => {
      file.value = props.modelValue;
    });

    return {
      handleImageChange,
      url,
      file,
      change,
    };
  },
};
</script>
