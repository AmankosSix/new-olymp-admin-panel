<template>
  <!--begin::Modal - View Users-->
  <div
    class="modal fade"
    id="kt_modal_day_news"
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
          <div class="row">
            <div class="col-md-6">
              <div class="row mb-3">
                <div class="col-md-2 fs-6 fw-semibold mt-2 required">
                  Название
                </div>
                <div class="col-md-8">
                  <v-input v-model="models.header" required />
                </div>
              </div>
              <div class="row mb-3">
                <div class="col-md-2 fs-6 fw-semibold mt-2 required">Тайтл</div>
                <div class="col-md-8">
                  <v-input v-model="models.title" />
                </div>
              </div>
              <div class="row mb-3">
                <div class="col-md-2 fs-6 fw-semibold mt-2 required">
                  Ссылка
                </div>
                <div class="col-md-8">
                  <v-input v-model="models.link" />
                </div>
              </div>
            </div>
          </div>
          <button
            :class="{ active: lang == 'en' }"
            class="btn btn-primary my-10"
            @click="openPreview = true"
          >
            Превью новости дня
          </button>

          <div
            class="tab-pane fade show active"
            id="kt_tab_pane_1"
            role="tabpanel"
          >
            <div class="d-flex justify-content-between align-items-center">
              <div class="d-flex gap-5 mb-5">
                <button
                  :class="{ active: lang == 'ru' }"
                  class="btn btn-light-primary"
                  @click="lang = 'ru'"
                >
                  Русский
                </button>
                <button
                  :class="{ active: lang == 'kk' }"
                  class="btn btn-light-primary"
                  @click="lang = 'kk'"
                >
                  Казахский
                </button>
                <button
                  :class="{ active: lang == 'en' }"
                  class="btn btn-light-primary"
                  @click="lang = 'en'"
                >
                  Английский
                </button>
              </div>
            </div>

            <div class="row">
              <div class="col-12 col-md-9">
                <FeedsWidget1
                  v-if="lang == 'ru' && models.article_alt"
                  title="Описание(Рус)"
                  v-model="models.description"
                  widget-classes="mb-5 mb-xl-8"
                  uniqKey="1"
                ></FeedsWidget1>
                <FeedsWidget1
                  v-else-if="lang == 'kk' && models.article_alt"
                  title="Описание(Каз)"
                  widget-classes="mb-5 mb-xl-8"
                  v-model="models.description_kk"
                  uniqKey="2"
                ></FeedsWidget1>
                <FeedsWidget1
                  v-else-if="lang == 'en' && models.article_alt"
                  title="Описание(Англ)"
                  widget-classes="mb-5 mb-xl-8"
                  v-model="models.description_en"
                  uniqKey="3"
                ></FeedsWidget1>
              </div>
              <div class="col-12 col-md-3">
                <v-image-upload v-model="models.img" />
              </div>
            </div>
          </div>
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
            :disabled="loading"
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
import FeedsWidget1 from "@/components/widgets/feeds/Widget1.vue";
import ApiService from "@/core/services/ApiService";
import { addImage } from "@/core/services/Requests";
import Swal from "sweetalert2";
import { Close } from "@element-plus/icons-vue";
import dayNewsPreview from "@/components/previews/dayNewsPreview.vue";
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
  components: { FeedsWidget1, dayNewsPreview },
  setup() {
    const fileUrl = import.meta.env.VITE_API_PROXY_TARGET_FILE;
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
    const imageUrl = computed(() => {
      if (models.value.img instanceof File) {
        console.log(models.value.img);
        // If it's a File, create a URL for it
        return URL.createObjectURL(models.value.img);
      } else {
        // If it's a regular URL, return it
        return `${fileUrl}${models.value.img}`;
      }
    });
    const updateOpenPreview = (el) => {
      openPreview.value = el;
    };
    const validateDayNews = () => {
      let keys = [
        { key: "header", text: "Название" },
        { key: "title", text: "Тайтл" },
        { key: "link", text: "Ссылка" },
        { key: "description", text: "Описание" },
        { key: "img", text: "Изображение" },
      ];
      let message: string[] = [];
      keys.forEach((el) => {
        if (models.value[el.key] instanceof File) return;
        if (!models.value[el.key]?.trim()) message.push(el.text);
      });
      if (message.length) {
        Toast.fire({
          position: "top-end", // Указываем позицию в правом верхнем углу
          icon: "error", // Тип уведомления (success, error, warning и т.д.)
          title: "Заполните все поля",
          text: `Необходимо заполнить:${message.join(", ")}`,
          showConfirmButton: false, // Не отображать кнопку подтверждения
          timer: 4000, // Автоматически скрыть уведомление через 2 секунды
        });
        return false;
      }
      return true;
    };
    const handleClick = async () => {
      if (!validateDayNews()) return false;
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
      () => {
        models.value = modal.data;
      }
    );
    return {
      getAssetPath,
      modal,
      models,
      lang,
      loading,
      handleClick,
      imageUrl,
      openPreview,
      updateOpenPreview,
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
