<template>
  <div class="card gx-5 card-flush h-90">
    <div class="card-body">
      <h1 class="mb-0">Раздел на стадии разработки</h1>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "disabled-page",
});
</script>

<style lang="scss">
.template-table {
  max-width: 200px;
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 1; /* Ограничение на количество строк */
  line-clamp: 1;
}
.nowrap {
  white-space: nowrap;
}
</style>
