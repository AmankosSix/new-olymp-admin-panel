import api from "@/api";
import { defineStore } from "pinia";
import ApiService from "@/core/services/ApiService";

export const modalStore = defineStore("modal", {
  state: () => ({
    data: null,
  }),
  getters: {
    getModalData(): any {
      return this.data;
    },
  },
  actions: {
    async setData(url = "", data = null) {
      if (!url) this.data = data;
      else {
        const result = await ApiService.get(`/api/${url}`);
        const dataJson = JSON.parse(result.data.day_news);
        dataJson.id = result.data.id;
        console.log(dataJson);
        this.data = dataJson;
      }
    },
    async setListForNews(url = "", data = null) {
      if (!url) this.data = data;
      else {
        const result = await ApiService.get(`/api/${url}`);
        const dataJson = result.data;
        this.data = dataJson;
      }
    },
  },
});
