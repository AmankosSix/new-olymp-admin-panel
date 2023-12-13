<template>
  <div class="d-flex flex-column fv-row">
    <label v-if="label" class="d-flex align-items-center fs-6 fw-semibold mb-2">
      <span :class="required ? 'required' : ''">{{ label }}</span>
      <i
        v-if="required"
        class="fas fa-exclamation-circle ms-2 fs-7"
        data-bs-toggle="tooltip"
        title="Specify a target name for future usage and reference"
      ></i>
    </label>

    <el-form-item
      :class="{ 'is-error mb-4': error }"
      class="mb-0"
      prop="targetTitle"
      :size="size"
    >
      <el-input
        v-model="internalValue"
        :type="type"
        :placeholder="placeholder"
        :disabled="disabled"
        :readonly="readonly"
        :controls="false"
        :min="min"
        @keyup.enter="iconRightClickHandler()"
        @input="handleInput"
      >
        <template v-if="iconRightBtn" #append>
          <el-button :icon="Search" @click="iconRightClickHandler" /> </template
      ></el-input>
      <div class="el-form-item__error">{{ error }}</div>
    </el-form-item>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, ref, watch } from "vue";
import { Search } from "@element-plus/icons-vue";
interface propsType {
  modelValue: string | number;
  type?: "text" | "password" | "email" | "number";
  placeholder?: string;
  disabled?: boolean;
  readonly?: boolean;
  required?: boolean;
  label?: string;
  tooltip?: string;
  min?: string;
  error?: string;
  iconRightBtn?: string;
  size?: "large" | "default" | "small";
}
const emit = defineEmits(["update:modelValue", "iconRightClickHandler"]);
const props = defineProps<propsType>();
const internalValue = ref(props.modelValue);

const handleInput = (value: string | number) => {
  if (
    props.type === "number" &&
    typeof value === "string" &&
    value.includes("e") &&
    value.includes("e")
  ) {
    // Можно добавить дополнительные действия, если символ 'e' найден
    return;
  }

  // Добавляем валидацию на минимальное значение
  if (props.min !== undefined && value < props.min) {
    value = props.min;
  }
  if (props.type === "number" && /^\d+\.?\d*$/.test(value.toString())) {
    value = parseFloat(value.toString());
  }
  internalValue.value = value;
  // Сообщаем родительскому компоненту об изменении значения
  emit("update:modelValue", value);
};
const iconRightClickHandler = () => {
  emit("iconRightClickHandler", internalValue.value);
};
// Следим за изменениями в пропсе modelValue и обновляем внутреннее значение
watch(
  () => props.modelValue,
  (newValue) => {
    internalValue.value = newValue;
  }
);
</script>
