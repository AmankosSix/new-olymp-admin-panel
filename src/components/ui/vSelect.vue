<template>
  <el-select
    v-model="localModel"
    :name="item.name"
    :placeholder="item.placeholder || 'Выбрать...'"
    @change="handleChange"
  >
    <el-option
      v-for="option in items"
      :key="option.id"
      :label="option.title"
      :value="option.id"
    ></el-option>
  </el-select>
</template>

<script>
import { ref, watch } from "vue";

export default {
  name: "VSelect",

  props: {
    item: {
      type: Object,
      default() {
        return {};
      },
    },
    items: {
      type: Array,
      default() {
        return [];
      },
    },
    modelValue: {
      type: [String, Number, Object, Array],
      default: () => null,
    },
  },

  setup(props, { emit }) {
    const localModel = ref(props.modelValue);

    const handleChange = () => {
      emit("update:modelValue", localModel.value);
    };

    watch(
      () => props.modelValue,
      (newValue) => {
        if (newValue) localModel.value = newValue;
      }
    );

    return {
      localModel,
      handleChange,
    };
  },
};
</script>
