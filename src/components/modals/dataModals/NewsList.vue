<template>
  <el-dialog v-model="dialogVisible" title="Превью" width="90%" z-index="200">
    <div class="row">
      <div class="col-md-6">
        <div class="row mb-5" v-for="(item, index) in models" :key="index">
          <div class="col-md-3">{{ list[index].label }}</div>
          <div class="col-md-9">
            <v-autocomplete
              :item="list[index]"
              return-object
              v-model="models[index]"
            />
          </div>
        </div>
      </div>
      <div class="col-md-6">
        <h2 style="text-align: center">Превью блока</h2>
        <div
          class="main__screen__list"
          :class="{
            'dark-preview-list': store.mode === 'dark',
            'light-preview-list': store.mode === 'light',
          }"
        >
          <div
            class="main__screen__list--item hover-event"
            v-for="(item, index) in models"
            :key="index"
          >
            <div>
              <span class="main__screen__list--item__type label_type">{{
                item?.tag || "Новость"
              }}</span>
              <p class="main__screen__list--item__desc">
                {{ item?.title }}
              </p>
            </div>

            <span class="main__screen__list--item__link"
              ><el-icon :style="{ 'font-size': '40px', color: '#09bccf' }"
                ><Right /></el-icon
            ></span>
          </div>
        </div>
      </div>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <button type="reset" @click="closeModal" class="btn btn-light me-3">
          Отмена
        </button>
        <!--end::Button-->

        <!--begin::Button-->
        <button
          :data-kt-indicator="loading ? 'on' : null"
          :disabled="loading"
          class="btn btn-lg btn-primary"
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
      </span>
    </template>
  </el-dialog>
</template>
<script>
import { useThemeStore } from "@/stores/theme";
import { modalStore } from "@/stores/modal";
import ApiService from "@/core/services/ApiService";
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
export default {
  name: "UniqBlockPreview",
  props: {
    news: {
      type: Object || Array,
      default() {
        return {};
      },
    },
    openPreview: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      loading: false,
      store: useThemeStore(),
      models: [],
      jsonSlider: {},
      list: [
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
      ],
    };
  },
  watch: {
    modalData: function (val) {
      if (val?.length && !this.models.length) {
        this.models = val[1].map((el) => el.id);
        this.jsonSlider = val[0];
      }
    },
  },
  computed: {
    modalData() {
      const modal = modalStore();
      return modal.data;
    },
    imageUrl() {
      if (this.news.img.includes("data:")) {
        // If it's a Base64 image, set it as the source
        return this.news.img;
      } else {
        // If it's a regular URL, prepend the base URL
        return this.news.img;
      }
    },
    dialogVisible: {
      get() {
        return this.openPreview;
      },
      set(newValue) {
        this.$emit("update:openPreview", newValue);
      },
    },
  },

  methods: {
    closeModal() {
      this.$emit("update:openPreview", false);
    },
    async handleClick() {
      this.loading = true;
      const options = {};
      console.log(this.jsonSlider);
      const id = this.jsonSlider.id;
      const slider = JSON.parse(this.jsonSlider.slider);
      let error = false;
      Object.keys(slider).forEach((el, i) => {
        if (this.models[i] && this.models[i].id) {
          options[this.models[i].id] = slider[el];
        } else {
          Toast.fire({
            position: "top-end", // Указываем позицию в правом верхнем углу
            icon: "error", // Тип уведомления (success, error, warning и т.д.)
            title: "Ошибка!",
            text: "Необходимо заполнить все 3 поля",
            showConfirmButton: false, // Не отображать кнопку подтверждения
            timer: 5000, // Автоматически скрыть уведомление через 2 секунды
          });
          this.loading = false;
          error = true;
        }
      });
      if (error) return false;
      // console.log({
      //   15: {
      //     bgColor: "#ffcc29",
      //     textColor: "#ffffff",
      //     tagBgColor: "#ffffff",
      //     tagTextColor: "#000000de",
      //   },
      //   20: {
      //     bgColor: "#ed4058",
      //     textColor: "#ffffff",
      //     tagBgColor: "#ffffff",
      //     tagTextColor: "#000000de",
      //   },
      //   4: {
      //     bgColor: "#ed4058",
      //     textColor: "#ffffff",
      //     tagBgColor: "#ffffff",
      //     tagTextColor: "#000000de",
      //   },
      // });
      await ApiService.update(`/api/olympic_settings/${id}`, {
        slider: JSON.stringify(options),
      })
        .then((res) => {
          Toast.fire({
            position: "top-end", // Указываем позицию в правом верхнем углу
            icon: "success", // Тип уведомления (success, error, warning и т.д.)
            title: "Успех!",
            text: "Список изменен",
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
          this.loading = false;
        });
    },
    isBase64(str) {
      try {
        return btoa(atob(str)) === str;
      } catch (err) {
        return false;
      }
    },
  },
};
</script>

<style lang="scss">
$blue: #09bccf;
$blue-main: #2d4972;
.label_type {
  background: #ffffff;
  display: inline-block;
  text-transform: uppercase;
  margin-bottom: 30px;
  font-size: 1rem;
  font-weight: 500;
  padding: 5px 10px;
  border-radius: 10px;
}
.dark-preview-list {
  position: relative;
  * {
    color: black !important;
  }
}
.light-preview-list {
  position: relative;
  background: black;
  * {
    color: black !important;
  }
}
.main__screen {
  position: relative;
  &__list {
    * {
      font-family: "Futura PT" !important;
    }
    padding: 1rem;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    height: 100%;
    &--item {
      cursor: pointer;
      width: 100%;
      max-width: 350px;
      padding: 30px 20px;
      background: #ffffff;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      &__type {
        background: $blue !important;
        color: #ffffff;
        margin-bottom: 10px !important;
      }
      &__title {
        color: $blue;
        text-transform: uppercase;
        font-size: 22px;
        text-decoration: underline;
        font-weight: 500;
        margin-bottom: 23px;
      }
      &__desc {
        color: $blue-main;
        font-size: 18px;
        font-weight: 400;
        margin-bottom: 80px;
      }
      &__link {
        display: flex;
        justify-content: flex-end;
        svg {
          path {
            fill: $blue-main;
          }
          float: right;
        }
      }
    }
  }
}
</style>
