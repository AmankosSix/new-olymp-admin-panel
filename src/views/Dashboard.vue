<template>
  <!--begin::Row-->
  <div class="row gx-5 gx-xl-10">
    <!--begin::Col-->
    <div class="col-12 col-md-6 mb-5">
      <div class="card-flush card">
        <log-tables
          className="h-md-100"
          scroll
          title="LATEST ACTIONS"
          :data-table="logTableData"
          subtitle="Последнее обновление 1 минут назад"
        />
      </div>
    </div>
    <div class="col-12 col-md-6 mb-5">
      <div class="card-flush card">
        <log-tables
          className="h-md-100"
          scroll
          title="LOGGED-IN USERS"
          :data-table="logTableData"
          subtitle="Последнее обновление 1 минут назад"
        />
      </div>
    </div>
    <div class="col-12 col-md-6 mb-5">
      <div class="card-flush card">
        <log-tables
          className="h-md-100"
          scroll
          title="POPULAR ARTICLES"
          :data-table="logTableData"
          subtitle="Последнее обновление 1 минут назад"
        />
      </div>
    </div>
    <!--end::Col-->
  </div>
</template>

<script lang="ts">
import { getAssetPath } from "@/core/helpers/assets";
import { defineComponent } from "vue";
import LogTables from "@/components/dashboard-tables/LogTables.vue";

export default defineComponent({
  name: "main-dashboard",
  components: {
    LogTables,
  },
  setup() {
    const logTableData = [
      {
        role: "Админ",
        name: "Алишер Муратов",
        logDate: "14-11-2023 17:00",
      },
      {
        role: "Супер Админ",
        name: "Аширов Адиль",
        logDate: "11-12-2023 14:33",
      },
      {
        role: "Контент админ",
        name: "Кусаинов Рустам",
        logDate: "12-12-2023 12:22",
      },
    ];
    return {
      getAssetPath,
      logTableData,
    };
  },
});
</script>
