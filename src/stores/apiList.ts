import api from "@/api";
import { defineStore } from "pinia";

export const useMyStore = defineStore("myStore", {
  state: () => ({
    api: api,
  }),
  getters: {
    getApiList(): any {
      return this.api;
    },
  },
});
