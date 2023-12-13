<template>
  <div class="row">
    <div class="col-md-6">
      <div class="row" v-for="(item, i) in apiList.postFilters" :key="i">
        <div class="col-md-3">
          <label class="required fs-6 fw-semibold mt-2">{{ item.label }}</label>
        </div>
        <div class="col-md-6">
          <v-selection
            v-if="item.component === 'v-selection'"
            :items="item.items ? item.items : []"
            v-model="test"
          />
          <v-autocomplete
            v-if="item.component === 'v-autocomplete'"
            :item="item"
            @change="
              (item) => {
                test = item;
              }
            "
          />
          <v-switch
            v-if="item.component === 'v-switcher'"
            :item="item"
            v-model="test"
          />
          <v-date-picker
            v-if="item.component === 'v-date-picker'"
            v-model="test"
          />

          <!-- <el-form-item prop="assign">
            <el-select :placeholder="item.label" name="assign" as="select">
              <el-option value="">Выбрать...</el-option>
              <el-option label="Karina Clark" value="1">Karina Clark</el-option>
              <el-option label="Robert Doe" value="2">Robert Doe</el-option>
              <el-option label="Niel Owen" value="3">Niel Owen</el-option>
              <el-option label="Olivia Wild" value="4">Olivia Wild</el-option>
              <el-option label="Sean Bean" value="5">Sean Bean</el-option>
            </el-select>
          </el-form-item> -->
        </div>
      </div>
    </div>
    <div class="col-md-6"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "communicationsTab",
  props: {
    item: Object,
    apiList: Object,
  },
  setup() {
    const test = ref<string | number>("09-02-2022");
    return { test };
  },
});
</script>
