<template>
  <div class="d-flex">
    <button
      href="#"
      class="btn btn-sm w-100"
      :class="{ 'btn-primary': modelValue, 'btn-secondary': !modelValue }"
      style="margin-right: 10px"
      @click="handleClick(1)"
    >
      {{ switcherLabels[0] }}
    </button>
    <button
      href="#"
      class="btn btn-sm w-100"
      :class="{ 'btn-danger': !modelValue, 'btn-secondary': modelValue }"
      @click="handleClick(0)"
    >
      {{ switcherLabels[1] }}
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps, defineEmits, watch } from "vue";

const emit = defineEmits(["update:modelValue"]);
const props = defineProps({
  modelValue: { type: [String, Number], default: "" },
  switcherLabels: { type: Array, default: () => ["Да", "Нет"] }, // Установите значения по умолчанию
});

const internalValue = ref(props.modelValue);

const handleClick = (value) => {
  emit("update:modelValue", value);
};

watch(
  () => props.modelValue,
  (newValue) => {
    internalValue.value = newValue;
  }
);
</script>
