<template>
  <div class="table-responsive">
    <table class="table table-striped gy-7 gs-7">
      <thead>
        <tr
          class="fw-semibold fs-6 text-gray-800 border-bottom border-gray-200"
        >
          <th>№</th>
          <th>Страна</th>
          <th>
            <img
              :src="getAssetPath('media/icons/customs/goldMedal.svg')"
              alt=""
            />
          </th>
          <th>
            <img
              :src="getAssetPath('media/icons/customs/silverMedal.svg')"
              alt=""
            />
          </th>
          <th>
            <img
              :src="getAssetPath('media/icons/customs/bronzeMedal.svg')"
              alt=""
            />
          </th>
          <th>
            <img
              :src="getAssetPath('media/icons/customs/totalMedal.svg')"
              alt=""
            />
          </th>
          <th>Удаление записи</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, i) in internalValue" :key="i">
          <td>
            <v-input
              v-model="item.title"
              type="number"
              min="1"
              @change="updateMedalList"
            />
          </td>
          <td>
            <div class="d-flex align-items-center gap-3">
              <img
                style="width: 25px"
                :src="getAssetPath(item.country?.flag, true)"
                alt=""
              />
              <v-autocomplete
                :item="{ label: 'Федерация', url: 'ru/catalog/countries' }"
                return-object
                no-double
                v-model="item.country"
                @change="updateMedalList"
              />
            </div>
          </td>
          <td>
            <v-input
              v-model="item.gold"
              @change="updateMedalList"
              type="number"
              min="0"
            />
          </td>
          <td>
            <v-input
              v-model="item.silver"
              @change="updateMedalList"
              type="number"
              min="0"
            />
          </td>
          <td>
            <v-input
              v-model="item.bronze"
              @change="updateMedalList"
              type="number"
              min="0"
            />
          </td>
          <td>{{ getAllMedals(item) }}</td>
          <td>
            <el-button type="danger" :icon="Delete" @click="deleteMedal(i)" />
          </td>
        </tr>
      </tbody>
    </table>
    <button class="btn btn-primary mt-3" @click="addMedal()">
      Добавить страну
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch, watchEffect } from "vue";
import { getAssetPath } from "@/core/helpers/assets";
import { Delete } from "@element-plus/icons-vue";
export default defineComponent({
  name: "CMedals",
  props: {
    modelValue: Array || String,
  },
  emits: ["update:modelValue"],
  setup(props, { emit }) {
    const internalValue = ref([]);

    const getTableMedals = (obj) => {
      const medals = JSON.parse(obj);
      return Object.values(medals);
    };

    const getAllMedals = (item) => {
      return +item.bronze + +item.silver + +item.gold;
    };

    const updateMedalList = () => {
      const updatedValue = {};
      for (const key in internalValue.value) {
        if (internalValue.value.hasOwnProperty(key)) {
          const item = internalValue.value[key];
          updatedValue[key] = {
            ...item,
            country: item.country?.id ? item.country?.id : item.country,
          };
        }
      }
      console.log("updatedValue", updatedValue);
      const jsonString = JSON.stringify(updatedValue);
      console.log(jsonString);
      emit("update:modelValue", jsonString);
    };
    const deleteMedal = (index) => {
      delete internalValue.value[index];
      updateMedalList();
    };
    const addMedal = () => {
      const length = Object.values(internalValue.value).length;
      internalValue.value[length + 1] = {
        title: length + 1,
        country: 1,
        gold: 0,
        silver: 0,
        bronze: 0,
      };
    };
    watchEffect(() => {
      // console.log("watchEffect", internalValue.value);
      internalValue.value = props.modelValue
        ? JSON.parse(props.modelValue)
        : {};
    });

    return {
      Delete,
      props,
      internalValue,
      getAssetPath,
      getAllMedals,
      updateMedalList,
      deleteMedal,
      addMedal,
    };
  },
});
</script>
