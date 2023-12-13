<template>
  <!--begin::Toolbar-->
  <div id="kt_app_toolbar" class="app-toolbar py-3 py-lg-6">
    <!--begin::Toolbar container-->
    <div
      id="kt_app_toolbar_container"
      class="app-container d-flex flex-stack"
      :class="{
        'container-fluid': toolbarWidthFluid,
        'container-xxl': !toolbarWidthFluid,
      }"
    >
      <KTPageTitle />
      <!--begin::Actions-->
      <div v-if="pageType === 'create'">
        <button
          class="btn btn-sm fw-bold btn-success"
          :disabled="loading"
          :data-kt-indicator="loading ? 'on' : null"
          @click="addDetail"
        >
          <span v-if="!loading" class="indicator-label"> Сохранить </span>
          <span v-if="loading" class="indicator-progress">
            Загрузка
            <span
              class="spinner-border spinner-border-sm align-middle ms-2"
            ></span>
          </span>
        </button>
      </div>
      <div
        v-else-if="pageType === 'edit'"
        class="d-flex align-items-center gap-2 gap-lg-3"
      >
        <!-- <button
          class="btn btn-sm fw-bold btn-primary"
          :data-kt-indicator="loading ? 'on' : null"
          :disabled="loading"
        >
          <span v-if="!loading" class="indicator-label">
            Сохранить как черновик
          </span>
          <span v-if="loading" class="indicator-progress">
            Загрузка
            <span
              class="spinner-border spinner-border-sm align-middle ms-2"
            ></span>
          </span>
        </button> -->
        <button
          class="btn btn-sm fw-bold btn-success"
          :data-kt-indicator="loading ? 'on' : null"
          :disabled="loading"
          @click="saveDetail"
        >
          <span v-if="!loading" class="indicator-label"> Сохранить </span>
          <span v-if="loading" class="indicator-progress">
            Загрузка
            <span
              class="spinner-border spinner-border-sm align-middle ms-2"
            ></span>
          </span>
        </button>
        <!--end::Primary button-->
      </div>
      <div v-else class="d-flex align-items-center gap-2 gap-lg-3">
        <router-link
          v-if="route.name !== 'create-product' && !apiList?.disabledCreate"
          :to="{
            name:
              apiList?.tableType === 'simple'
                ? apiList.detailName
                : 'create-product',
          }"
          class="btn btn-sm fw-bold btn-success"
          >Создать
          {{
            apiList?.tableType === "simple" ? "Запись" : "Материал"
          }}</router-link
        >
        <button
          v-if="store.deleteItems.length"
          class="btn btn-sm fw-bold btn-danger"
          @click="openDeleteModal"
        >
          Удалить записи
        </button>
      </div>
      <!--end::Actions-->
    </div>
    <!--end::Toolbar container-->
  </div>
  <!--end::Toolbar-->
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import { toolbarWidthFluid } from "@/layouts/default-layout/config/helper";
import { useRoute } from "vue-router";
import KTPageTitle from "@/layouts/default-layout/components/toolbar/PageTitle.vue";
import { addImage, deleteItems } from "@/core/services/Requests";
import { useMaterialStore } from "@/stores/material";
import { useMyStore } from "@/stores/apiList";

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
  name: "layout-toolbar",
  components: {
    KTPageTitle,
  },
  setup() {
    const route = useRoute();
    const store = useMaterialStore();
    const myStore = useMyStore();
    const apiKey = computed(() => route.meta.apiKey as string);
    const apiList = computed(() => {
      return myStore.getApiList[apiKey.value];
    });

    const pageType = computed(() => route.meta.pageType);
    const requiredData = () => {
      let message = null;
      const requiredList = apiList.value.postFields.filter(
        (el) => el?.required && !store.material[el.key]
      );
      if (requiredList.length) {
        message = requiredList.map((el) => el.label);
        Toast.fire({
          position: "top-end", // Указываем позицию в правом верхнем углу
          icon: "error", // Тип уведомления (success, error, warning и т.д.)
          title: "Заполните все поля",
          text: `Необходимо заполнить:${message.join(", ")}`,
          showConfirmButton: false, // Не отображать кнопку подтверждения
          timer: 4000, // Автоматически скрыть уведомление через 2 секунды
        });
      }
      apiList.value.postFields.forEach((el) => {
        console.log(el);
        if (el.defaultValue !== undefined && !store.material[el.key])
          store.material[el.key] = el.defaultValue;
      });
      return message;
    };
    const validateData = () => {
      const errors = {};
      let err = false;
      const requiredList = apiList.value.postFields.filter(
        (el) => el?.validate
      );
      requiredList.forEach((field) => {
        const value = store.material[field.key];

        try {
          // Валидация с использованием Yup
          field.validate(value);

          // Успешная валидация, очищаем ошибку
          errors[field.key] = null;
        } catch (error) {
          // Ошибка валидации, сохраняем ошибку
          errors[field.key] = error.message;
          err = true;
        }
        store.setValidationErrors(errors);
      });
      return err;
    };
    const loading = computed(() => store.loading);
    const openDeleteModal = () => {
      Swal.fire({
        title: `Вы действительно хотите удалить ${
          store.deleteItems.length > 1 ? "записи" : "запись"
        }?`,
        // showDenyButton: true,
        showCancelButton: true,
        confirmButtonColor: "#F8285A",
        confirmButtonText: "Удалить",
        cancelButtonText: "Отмена",
      }).then(async (result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          await deleteItems(store.deleteItems, apiKey.value);
          store.callDeleteEvent();
        } else if (result.isDenied) {
          Swal.fire("Changes are not saved", "", "info");
        }
      });
    };
    const saveDetail = async () => {
      const messages = requiredData();
      if (messages) return false;
      const validates = validateData();
      if (validates) return false;
      const id = route.params.id;
      if (apiList.value.tableType === "simple") {
        if (apiKey.value === "slider_images") {
          const url = `load_file/mainSlide/${id}`;
          store.saveDetailSliderImage(store.material.bg, url, id);
        } else {
          store.saveDetailSimple(apiList.value, id);
        }
      } else {
        const url: string = `load_file/${
          store.materialType === "news" ? "articles" : store.materialType
        }`;
        if (store.material.avatar instanceof File) {
          const result = await addImage(store.material.avatar, url);
          if (result) {
            store.material.avatar = result;
            store.saveMaterial(id);
          }
        } else store.saveMaterial(id);
      }
    };

    const addDetail = async () => {
      const messages = requiredData();
      if (messages) return false;
      const validates = validateData();
      if (validates) return false;
      if (apiList.value.tableType === "simple") {
        store.addDetailSimple(apiList.value);
      } else {
        if (store.material.avatar) {
          const url: string = `load_file/${
            store.materialType === "news" ? "articles" : store.materialType
          }`;
          const result = await addImage(store.material.avatar, url);
          console.log("result", result);
          if (result) {
            store.material.avatar = result;
            store.addDetailMaterial();
          }
        } else {
          store.addDetailMaterial(route.meta.apiKey);
        }
      }
    };
    return {
      apiList,
      route,
      saveDetail,
      toolbarWidthFluid,
      addDetail,
      pageType,
      store,
      openDeleteModal,
      loading,
    };
  },
});
</script>

<style>
.colored-toast.swal2-icon-success {
  background-color: #00a261 !important;
}

.colored-toast.swal2-icon-error {
  background-color: #e42855 !important;
}

.colored-toast.swal2-icon-warning {
  background-color: #f8bb86 !important;
}

.colored-toast.swal2-icon-info {
  background-color: #3fc3ee !important;
}

.colored-toast.swal2-icon-question {
  background-color: #87adbd !important;
}

.colored-toast .swal2-title {
  color: white;
}

.colored-toast .swal2-close {
  color: white;
}

.colored-toast .swal2-html-container {
  color: white;
}
</style>
