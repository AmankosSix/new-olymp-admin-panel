<template>
  <!--begin::Modal - View Users-->
  <div
    class="modal fade"
    id="kt_modal_news_list"
    tabindex="-1"
    aria-hidden="true"
  >
    <!--begin::Modal dialog-->
    <div class="modal-dialog modal-full">
      <!--begin::Modal content-->
      <div class="modal-content" :class="{ 'modal-loading': loading }">
        <!--begin::Modal header-->
        <div class="modal-header">
          <h2>Изменение новости дня</h2>
          <!--begin::Close-->
          <div
            class="btn btn-sm btn-icon btn-active-color-primary"
            data-bs-dismiss="modal"
          >
            <el-icon class="fs-1"><Close /></el-icon>
          </div>
          <!--end::Close-->
        </div>
        <!--begin::Modal header-->

        <!--begin::Modal body-->
        <div class="modal-body scroll-y mx-5 mx-xl-18 pt-0 pb-15 pt-5">
          <!--begin::Heading-->
          <!-- <button
            :class="{ active: lang == 'en' }"
            class="btn btn-primary my-10"
            @click="openPreview = true"
          >
            Превью новости дня
          </button> -->
          <div class="row">
            <div class="col-md-6">
              <div class="row" v-for="(item, index) in models" :key="index">
                <div class="col-md-3">Новость 1</div>
                <div class="col-md-9">
                  <v-autocomplete
                    :key="models"
                    :item="list[index]"
                    v-model="models[index]"
                  />
                </div>
              </div>
              <div class="row">
                <div class="col-md-3">Новость 2</div>
                <div class="col-md-9">
                  <v-autocomplete :item="list[0]" v-model="test" />
                </div>
              </div>
            </div>
          </div>
          {{ models }}1
          <!-- /api/ru/catalog/articles -->
          <!--end::Notice-->
        </div>
        <!--end::Modal body-->
        <div class="modal-footer flex-end">
          <!--begin::Button-->
          <button
            type="reset"
            id="kt_modal_day_news_close"
            data-bs-dismiss="modal"
            class="btn btn-light me-3"
          >
            Отмена
          </button>
          <!--end::Button-->

          <!--begin::Button-->
          <button
            :data-kt-indicator="loading ? 'on' : null"
            class="btn btn-lg btn-primary"
            type="button"
            @click="handleClick"
          >
            <span v-if="!loading" class="indicator-label"> Изменить </span>
            <span v-if="loading" class="indicator-progress">
              Загрузка
              <span
                class="spinner-border spinner-border-sm align-middle ms-2"
              ></span>
            </span>
          </button>
          <!--end::Button-->
        </div>
      </div>
      <!--end::Modal content-->
    </div>

    <!--end::Modal dialog-->
  </div>
  <day-news-preview
    :news="{ ...models, img: imageUrl }"
    :open-preview="openPreview"
    @update:openPreview="updateOpenPreview"
  />
  <!--end::Modal - View Users-->
</template>

<script lang="ts">
import { getAssetPath } from "@/core/helpers/assets";
import { computed, defineComponent, ref, watch } from "vue";
import { modalStore } from "@/stores/modal";
import ApiService from "@/core/services/ApiService";
import { addImage } from "@/core/services/Requests";
import dayNewsPreview from "@/components/previews/dayNewsPreview.vue";
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
export default defineComponent({
  name: "view-users-modal",
  components: { dayNewsPreview },
  setup() {
    const test = ref(1);
    const lang = ref("ru");
    const modal = modalStore();
    const loading = ref(false);
    const openPreview = ref(false);
    const models = ref<any>({
      header: "",
      title: "",
      link: "",
      description: "",
      description_kk: "",
      description_en: "",
      article_alt: 0,
      img: "",
    });
    const list = [
      {
        key: "federation_id",
        component: "v-autocomplete",
        label: "Федерация",
        url: "ru/catalog/articles",
      },
      {
        key: "federation_id",
        component: "v-autocomplete",
        label: "Федерация",
        url: "ru/catalog/articles",
      },
      {
        key: "federation_id",
        component: "v-autocomplete",
        label: "Федерация",
        url: "ru/catalog/articles",
      },
    ];
    const updateOpenPreview = (el) => {
      openPreview.value = el;
    };
    const handleClick = async () => {
      loading.value = true;
      if (models.value.img instanceof File) {
        const result = await addImage(
          models.value.img,
          "load_file/mainSlide/1"
        );
        if (result) models.value.img = result;
      }
      await ApiService.update(`/api/olympic_settings/${models.value.id}`, {
        day_news: JSON.stringify({
          ...models.value,
        }),
      })
        .then((res) => {
          Toast.fire({
            position: "top-end", // Указываем позицию в правом верхнем углу
            icon: "success", // Тип уведомления (success, error, warning и т.д.)
            title: "Успех!",
            text: "Новость дня изменена",
            showConfirmButton: false, // Не отображать кнопку подтверждения
            timer: 3000, // Автоматически скрыть уведомление через 2 секунды
          });
        })
        .catch((err) => {
          Toast.fire({
            position: "top-end", // Указываем позицию в правом верхнем углу
            icon: "error", // Тип уведомления (success, error, warning и т.д.)
            title: "Ошибка!",
            text: err.response.data.message,
            showConfirmButton: false, // Не отображать кнопку подтверждения
            timer: 5000, // Автоматически скрыть уведомление через 2 секунды
          });
        })
        .finally(() => {
          loading.value = false;
        });
    };
    watch(
      () => modal.data,
      (newVal) => {
        if (newVal?.length) models.value = modal.data[1].map((el) => el.id);
      }
    );
    return {
      getAssetPath,
      modal,
      models,
      lang,
      loading,
      handleClick,
      openPreview,
      updateOpenPreview,
      list,
      test,
    };
  },
});
</script>
<style lang="scss">
.modal-full {
  max-width: 90%;
  .modal-content {
    min-height: 92vh;
  }
}
</style>
