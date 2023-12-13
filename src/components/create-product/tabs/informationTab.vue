<template>
  <div class="row">
    <div class="col-md-6">
      <div class="row">
        <div class="col-md-3">
          <label class="required fs-6 fw-semibold mt-1">Дата публикации</label>
        </div>
        <div class="col-md-6 d-flex">
          <el-form-item prop="targetTitle">
            <el-input
              value="10.11.2023"
              disabled
              placeholder="Enter Target Title"
              name="targetTitle"
            ></el-input>
          </el-form-item>
        </div>
      </div>
      <div class="row">
        <div class="col-md-3">
          <label class="required fs-6 fw-semibold mt-1">Дата обновления</label>
        </div>
        <div class="col-md-6 d-flex">
          <el-form-item prop="targetTitle">
            <el-input
              value="10.11.2023"
              disabled
              placeholder="Enter Target Title"
              name="targetTitle"
            ></el-input>
          </el-form-item>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "informationTab",
  props: {
    item: Object,
  },

  setup() {
    return {};
  },
});
</script>
