<template>
  <div class="row mt-5">
    <div class="col-12">
      <h2>Новость дня</h2>
    </div>
    <div class="col-3">
      <StatisticsWidget1
        widget-classes="card-xl-stretch mb-xl-8 h-100"
        background="abstract-4.svg"
        title="Новость дня"
        time="Можно отключить"
        description="Блок новости дня"
        data-bs-toggle="modal"
        :data-bs-target="`#kt_modal_day_news`"
        @click="setDayNews('settings/daynews/')"
      ></StatisticsWidget1>
    </div>
    <div class="col-3">
      <StatisticsWidget1
        widget-classes="card-xl-stretch mb-xl-8 h-100"
        background="abstract-4.svg"
        title="Плитка"
        time="Можно отключить"
        description="Плитка из новостей на главной странице"
        @click="setNewsList('settings/slider/')"
      ></StatisticsWidget1>
      <NewsList
        :open-preview="openPreview"
        @update:openPreview="updateOpenPreview"
      />
    </div>
  </div>
</template>

<script lang="ts">
import StatisticsWidget1 from "@/components/widgets/statsistics/Widget1.vue";
import { computed, defineComponent, onMounted, watch, ref } from "vue";
import Swal from "sweetalert2";
import NewsList from "@/components/modals/dataModals/NewsList.vue";
import { modalStore } from "@/stores/modal";
import { federationId } from "@/core/services/JwtService";

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

export default defineComponent({
  name: "kt-datatables",
  components: {
    StatisticsWidget1,
    NewsList,
  },

  setup() {
    // const json: string | null = userData();
    // const user = json ? JSON.parse(json) : null;
    // const { federation_id } = user;
    const modal = modalStore();
    const openPreview = ref(false);
    const updateOpenPreview = (el) => {
      openPreview.value = el;
    };
    const setDayNews = (url: string) => {
      const id = federationId();
      let urlRequest = url;
      if (id) urlRequest = urlRequest + `${id}`;
      else urlRequest = urlRequest + `1`;
      modal.setData(urlRequest);
    };
    const setNewsList = (url: string) => {
      const id = federationId();
      let urlRequest = url;
      if (id) urlRequest = urlRequest + `${id}`;
      else urlRequest = urlRequest + `1`;
      modal.setListForNews(urlRequest);
      openPreview.value = true;
    };
    return { setDayNews, setNewsList, updateOpenPreview, openPreview };
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
