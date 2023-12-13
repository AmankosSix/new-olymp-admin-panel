import { defineStore } from "pinia";
import ApiService from "@/core/services/ApiService";
import { addImage } from "@/core/services/Requests";
import { useRouter } from "vue-router";
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
const types = {
  news: 1,
  champions: 2,
  games: 3,
  opinions: 4,
  sections: 5,
};

interface material {
  id?: number;
  category_id?: number | string;
  rubric_id: number | null;
  game_id: number | null;
  game_participant_id: number | null;
  federation_id: number | null;
  avatar: string;
  url: string;
  primary: number | null;
  hot: number | null;
  sort: number | null;
  published: number | null;
  published_at?: string;
  views: 627;
  locked_by: number | null;
  locked_at?: string | null;
  is_editable: number | null;
  modified_by: number | null;
  created_at?: string;
  updated_at?: string;
  material_id: number;
  "olympic_materials.id"?: number;
  link_id: number;
  type_id: number;
  alt: string;
  name_ru: string;
  name_kk: string;
  name_en: string;
  description_ru: string;
  description_kk: string;
  description_en: string;
  annotation_ru: string;
  annotation_kk: string;
  annotation_en: string;
  employees_ru: string;
  employees_kk: string;
  employees_en: string;
  "olympic_materials.created_at"?: string;
  "olympic_materials.updated_at"?: string;
  accordion_ru: string;
  accordion_kk: string;
  accordion_en: string;
  medal_results_ru: string;
  medal_results_kk: string;
  medal_results_en: string;
}
export const useMaterialStore = defineStore("counter", {
  state: () => {
    return {
      material: {} as material,
      materialType: "news" as string,
      deleteItems: [] as number[],
      deleteEvent: false,
      loading: false,
      validationErrors: {},
    };
  },
  // также может быть объявлено как
  // state: () => ({ count: 0 })
  actions: {
    setValidationErrors(errors) {
      this.validationErrors = errors;
    },
    setLoading(bool) {
      this.loading = bool;
    },
    addDeleteItems(list) {
      this.deleteItems = list;
    },
    callDeleteEvent() {
      this.deleteEvent = !this.deleteEvent;
    },
    addMaterial(obj, category_id) {
      this.material = { ...obj };
      if (
        category_id &&
        this.materialType === "news" &&
        !this.material.category_id
      )
        this.material.category_id = 1;
      else if (this.materialType !== "news" && !this.material.category_id) {
        delete this.material.category_id;
      }
    },
    addMaterialType(name) {
      this.materialType = name;
    },

    async addDetailSimple(apiList) {
      this.setLoading(true);
      const key = apiList.url;
      if (apiList.imagesKeys)
        for (const obj of apiList.imagesKeys) {
          if (this.material[obj.key]) {
            const result = await addImage(this.material[obj.key], obj.url);
            this.material[obj.key] = result;
          } else this.material[obj.key] = "";
        }

      await ApiService.post(`/api/${key}`, {
        ...this.material,
      })
        .then((res) => {
          Toast.fire({
            position: "top-end", // Указываем позицию в правом верхнем углу
            icon: "success", // Тип уведомления (success, error, warning и т.д.)
            title: "Успех!",
            text: "Успешно добавлена",
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
          this.setLoading(false);
        });
    },
    async addDetailMaterial() {
      this.setLoading(true);
      {
        let params = { ...this.material };
        if (this.material.published_at)
          params = {
            ...this.material,
            published_at: this.material.published_at.replace("T", " "),
          };
        else delete this.material.published_at;
        await ApiService.post(`/api/newadmin/material`, {
          ...this.material,
          type_id: types[this.materialType],
        })
          .then((res) => {
            Toast.fire({
              position: "top-end", // Указываем позицию в правом верхнем углу
              icon: "success", // Тип уведомления (success, error, warning и т.д.)
              title: "Успех!",
              text: "Успешно добавлена",
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
            this.setLoading(false);
          });
      }
    },

    async saveDetailSliderImage(list = [], url, id) {
      this.setLoading(true);
      // const key = apiList.url;
      // const id = this.material.id;
      let strList = [];
      console.log(list);
      if (list.length)
        for (const obj of list) {
          if (obj instanceof File) {
            console.log(obj);
            const result = await addImage(obj, url);
            strList.push(result);
          } else if (typeof obj == "string") {
            strList.push(obj);
          }
        }
      await ApiService.update(`/api/settings/mainSlide/${id}`, {
        bg: strList.join(","),
      })
        .then((res) => {
          Toast.fire({
            position: "top-end", // Указываем позицию в правом верхнем углу
            icon: "success", // Тип уведомления (success, error, warning и т.д.)
            title: "Успех!",
            text: "Успешно сохранена",
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
          this.setLoading(false);
        });
    },
    async saveDetailSimple(apiList, id) {
      this.setLoading(true);
      const key = apiList.url;
      if (apiList.imagesKeys)
        for (const obj of apiList.imagesKeys) {
          if (this.material[obj.key] instanceof File) {
            const result = await addImage(this.material[obj.key], obj.url);
            this.material[obj.key] = result;
          } else if (this.material[obj.key] === null)
            this.material[obj.key] = "";
        }
      delete this.material.created_at;
      delete this.material.updated_at;
      delete this.material.id;
      await ApiService.update(`/api/${key}/${id}`, {
        ...this.material,
      })
        .then((res) => {
          Toast.fire({
            position: "top-end", // Указываем позицию в правом верхнем углу
            icon: "success", // Тип уведомления (success, error, warning и т.д.)
            title: "Успех!",
            text: "Успешно сохранена",
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
          this.setLoading(false);
        });
    },
    async saveMaterial(test = false) {
      this.setLoading(true);
      const id = this.material["olympic_materials.id"];
      const materialWithoutId = { ...this.material };
      delete materialWithoutId.id;
      delete materialWithoutId.created_at;
      delete materialWithoutId.updated_at;
      delete materialWithoutId["olympic_materials.id"];
      delete materialWithoutId["olympic_materials.created_at"];
      delete materialWithoutId["olympic_materials.updated_at"];
      let params = { ...materialWithoutId };
      if (materialWithoutId.published_at)
        params = {
          ...materialWithoutId,
          published_at: materialWithoutId.published_at.replace("T", " "),
        };
      else delete materialWithoutId.published_at;
      await ApiService.update(`/api/newadmin/material/${id}`, {
        ...params,
      })
        .then((res) => {
          Toast.fire({
            position: "top-end", // Указываем позицию в правом верхнем углу
            icon: "success", // Тип уведомления (success, error, warning и т.д.)
            title: "Успех!",
            text: "Успешно сохранена",
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
          this.setLoading(false);
        });
    },
  },
});
