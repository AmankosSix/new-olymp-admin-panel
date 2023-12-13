<template>
  <!-- <div class="card p-4 card-flush mb-5">
    <div>
      <div class="row">
        <div class="col-md-2"></div>
      </div>
    </div>
  </div> -->
  <div class="card gx-5 card-flush">
    <div class="card-body">
      <div class="row mb-10">
        <div class="col-12 col-sm-4">
          <v-input
            icon-right-btn="Search"
            @iconRightClickHandler="setSearchFilter"
          />
        </div>
        <div v-if="apiKey === 'articles'" class="col-12 col-sm-2">
          <v-selection v-model="filters.type_id" label="test" :items="types" />
        </div>
      </div>
      <!-- {{ meta }} -->
      <Datatable
        :header="tableHeader"
        :apiList="apiList"
        :data="tableData"
        :itemsPerPage="meta.meta?.elements_on_page"
        :total="meta.totalElem"
        :enable-items-per-page-dropdown="true"
        :checkbox-enabled="apiList.disabledCheckbox ? false : true"
        :currentPage="meta.meta?.page"
        :loading="loading"
        @page-change="handlePageChange"
        @on-sort="sort"
        @on-items-select="onItemSelect"
        @on-items-per-page-change="handleCountChange"
      >
        <template
          v-for="key in templateKeys"
          :key="key"
          v-slot:[key]="{ row: data }"
        >
          <template v-if="key === 'uniqColumn'">
            <div class="d-flex gap-5">
              <div class="" data-bs-toggle="tooltip" title="Важно">
                <i
                  class="bi bi-fire fs-2"
                  :style="{ color: data.hot ? 'red' : '' }"
                  @click="setParticle('hot', data.id, data.hot)"
                ></i>
              </div>
              <div class="" data-bs-toggle="tooltip" title="Важно">
                <i
                  class="bi bi-eye-fill fs-2"
                  :class="{ 'text-primary': data.published }"
                  @click="setParticle('published', data.id, data.published)"
                ></i>
              </div>
            </div>
          </template>
          <template v-else-if="key === 'link_detail'">
            <div class="d-flex gap-5">
              <router-link
                :to="{
                  name: `edit-${apiList.uniqUrl || apiList.url}`,
                  params: { id: data.id },
                }"
                @click="setLocalParams(data)"
              >
                Редактировать описание
              </router-link>
            </div>
          </template>

          <template v-else-if="key === 'link_id'">
            <div class="d-flex gap-5">
              <router-link
                :to="{
                  name: 'view-detail',
                  params: { id: data.link_id ? data.link_id : data.id },
                  query: { type: data?.type_id },
                }"
              >
                Редактировать описание
              </router-link>
            </div>
          </template>
          <template v-else-if="key === 'created_at' || key === 'updated_at'">
            <div class="template-table nowrap">
              {{ convertToDate(data[key]) }}
            </div>
          </template>
          <template v-else>
            <div class="template-table">
              <el-tooltip class="box-item" effect="dark" placement="top">
                <template #content>
                  <div style="max-width: 500px">{{ data[key] }}</div>
                </template>
                {{ data[key] }}
              </el-tooltip>
            </div>
          </template>
        </template>
      </Datatable>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, watch, ref } from "vue";
import { useMyStore } from "@/stores/apiList.js";
import Datatable from "@/components/kt-datatable/KTDataTable.vue";
import ApiService from "@/core/services/ApiService";
import { useRoute } from "vue-router";
import { convertToDate } from "@/core/services/StringSettings";
import { useMaterialStore } from "@/stores/material";
import Swal from "sweetalert2";
const Toast = Swal.mixin({
  toast: true,
  position: "center",
  iconColor: "white",
  customClass: {
    popup: "colored-toast",
  },
  showConfirmButton: false,
  timer: 2500,
  timerProgressBar: true,
});
interface TableColumn {
  columnName: string;
  columnLabel: string;
  sortEnabled: boolean;
}

export default defineComponent({
  name: "kt-datatables",
  components: {
    Datatable,
  },

  setup() {
    const types = [
      { id: 1, title: "Новости" },
      { id: 2, title: "Спортсмены" },
      { id: 3, title: "Игры" },
      { id: 4, title: "Участники" },
      { id: 5, title: "Секции" },
      { id: 6, title: "Соревнования" },
    ];

    const route = useRoute();
    const page = ref(1);
    const countTable = ref(10);
    const loading = ref(false);
    const tableHeader = ref<Array<TableColumn>>([]);
    const tableData = ref([]);
    const meta = ref({});
    const myStore = useMyStore();
    const materailStore = useMaterialStore();
    const apiKey = ref<string>(route.meta.apiKey as string);
    const apiList = myStore.getApiList[apiKey.value];
    const sort = (item) => {
      if (item.label) filters.value.sort = `${[item.label]} ${item.order}`;
      console.log(filters.value);
    };

    const setLocalParams = (data) => {
      if (data.bg) localStorage.setItem("images", data.bg);
      else localStorage.removeItem("images");
    };
    const filters = ref(apiKey.value === "articles" ? { type_id: 1 } : {});
    const onItemSelect = (list: Array<number>) => {
      if (apiKey.value === "articles") {
        const deleteArticles = tableData.value
          .filter((item) => list.includes(item.id))
          .map((el) => {
            return { id: el.id, type_id: el.type_id };
          });
        materailStore.addDeleteItems(deleteArticles);
      } else materailStore.addDeleteItems(list);
    };
    const getList = async ({ page = 1, count = 25 } = {}) => {
      loading.value = true;
      const { data } = await ApiService.get(
        "/api/" + getRequest.value + `?page=${page}&count=${countTable.value}`,
        {
          params: { ...filters.value },
        }
      );
      tableHeader.value = data.pop();
      meta.value = data.pop();
      tableData.value = data;
      loading.value = false;
    };
    const templateKeys = computed(() =>
      tableData.value.length
        ? apiList.headerSetting
          ? ["uniqColumn", ...Object.keys(tableData.value[0])]
          : ["link_detail", ...Object.keys(tableData.value[0])]
        : []
    );
    const getRequest = computed(() => {
      return apiList?.urlGet ? apiList?.urlGet : apiList?.url;
    });
    const handlePageChange = (page) => {
      getList({ page });
    };
    const handleCountChange = (cn) => {
      countTable.value = cn;
      getList();
    };
    const setSearchFilter = (search) => {
      console.log(search);
      filters.value.search = String(search);
    };
    const setParticle = async (key, id, val) => {
      let link_id = tableData.value.filter((el) => el.id === id);
      link_id = link_id[0].link_id;
      let str = apiList.url.split("/");
      str.shift();
      const strUrl = str.join("/");
      console.log(strUrl);
      const url = strUrl === "newadmin/articles" ? "newadmin/material" : strUrl;
      await ApiService.update(`/api/${url}/${id}`, {
        [key]: val ? 0 : 1,
        type_id: filters.value.type_id,
        link_id: link_id,
      }).then((res) => {
        const test = tableData.value.findIndex((el) => el.id === id);
        if (test !== -1) {
          tableData.value[test][key] = val ? 0 : 1;
          Toast.fire({
            position: "top-end", // Указываем позицию в правом верхнем углу
            icon: "success", // Тип уведомления (success, error, warning и т.д.)
            title: "Выполнено",
            text: `Запись ${id} успешно изменена`,
            showConfirmButton: false, // Не отображать кнопку подтверждения
            timer: 23000, // Автоматически скрыть уведомление через 2 секунды
          });
        }
      });
    };
    watch(
      [() => filters.value, () => materailStore.deleteEvent],
      async () => {
        await getList();
      },
      { deep: true }
    );
    onMounted(async () => {
      materailStore.addMaterial({});
      await getList();
    });
    return {
      sort,
      onItemSelect,
      setParticle,
      tableHeader,
      apiList,
      tableData,
      templateKeys,
      types,
      filters,
      meta,
      handlePageChange,
      handleCountChange,
      loading,
      convertToDate,
      apiKey,
      materailStore,
      setLocalParams,
      setSearchFilter,
    };
  },
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
