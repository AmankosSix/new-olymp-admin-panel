<template>
  <div class="row">
    <div class="col-md-6">
      <div class="row">
        <div class="col-md-3">
          <label class="required fs-6 fw-semibold mt-2">Категория</label>
        </div>
        <div class="col-md-6">
          <el-form-item prop="assign">
            <el-select
              placeholder="Select a Team Member"
              name="assign"
              as="select"
            >
              <el-option value="">Select user...</el-option>
              <el-option label="Karina Clark" value="1">Karina Clark</el-option>
              <el-option label="Robert Doe" value="2">Robert Doe</el-option>
              <el-option label="Niel Owen" value="3">Niel Owen</el-option>
              <el-option label="Olivia Wild" value="4">Olivia Wild</el-option>
              <el-option label="Sean Bean" value="5">Sean Bean</el-option>
            </el-select>
          </el-form-item>
        </div>
      </div>
      <div class="row">
        <div class="col-md-3">
          <label class="required fs-6 fw-semibold mt-3">Важно</label>
        </div>
        <div class="col-md-6 d-flex">
          <button
            href="#"
            class="btn btn-primary btn-sm w-100"
            style="margin-right: 10px"
          >
            Да
          </button>
          <button href="#" class="btn btn-danger btn-sm w-100">Нет</button>
        </div>
      </div>
      <div class="row mt-7">
        <div class="col-md-3">
          <label class="required fs-6 fw-semibold mt-3">Дата публикации</label>
        </div>
        <div class="col-md-6 d-flex">
          <el-form-item prop="name" class="w-100">
            <el-date-picker type="date"> </el-date-picker>
          </el-form-item>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "displayTab",
  props: {
    item: Object,
  },

  setup() {
    return {};
  },
});
</script>
