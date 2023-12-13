<template>
  <el-date-picker
    v-model="internalValue"
    :disabled="disabled"
    :type="dataType ? dataType : 'datetime'"
    :format="props.dataType === 'date' ? 'YYYY-MM-DD' : 'YYYY-MM-DD HH:mm:ss'"
  >
  </el-date-picker>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, ref, watch } from "vue";
import { format, parseISO } from "date-fns";

interface propsType {
  modelValue: string | number;
  type?: "text" | "password" | "email" | "number";
  placeholder?: string;
  disabled?: boolean;
  readonly?: boolean;
  required?: boolean;
  label?: string;
  tooltip?: string;
  dataType?: string;
  size?: "large" | "default" | "small";
}

const emit = defineEmits(["update:modelValue"]);
const props = defineProps<propsType>();
const internalValue = ref(convertToDate(props.modelValue));

function convertToDate(value: string | number): Date | null {
  if (!value) return null;
  // Если передана строка в формате "YYYY-MM-DDTHH:mm:ss"
  if (
    typeof value === "string" &&
    /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}$/.test(value)
  ) {
    // Убираем 'T' из строки перед парсингом
    return parseISO(value.replace("T", " "));
  }

  // Иначе пытаемся парсить как timestamp
  const timestamp = parseInt(value.toString(), 10);
  if (!isNaN(timestamp)) {
    return new Date(timestamp);
  }

  return null;
}

watch(
  () => props.modelValue,
  (newValue, oldVal) => {
    console.log(newValue);
    if (!oldVal) internalValue.value = newValue;
  }
);
watch(
  () => internalValue.value,
  (newValue) => {
    emit("update:modelValue", formatDate(newValue));
  }
);
function formatDate(date: Date | null): string {
  if (!date) return "";

  // Используем format из date-fns для форматирования даты
  return format(
    date,
    props.dataType === "date" ? "yyyy-MM-dd" : "yyyy-MM-dd HH:mm:ss"
  );
}
</script>
