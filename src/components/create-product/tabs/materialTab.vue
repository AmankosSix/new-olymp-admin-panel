<template>
  <div class="tab-pane fade show active" id="kt_tab_pane_1" role="tabpanel">
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

    <div class="row">
      <div class="col-12 col-md-9">
        <template v-if="typeTab === 1">
          <div class="card mb-7">
            <div class="card-body">
              <v-input
                v-if="lang == 'ru'"
                v-model="store.material.name_ru"
                size="large"
                :label="typeList[0].name_ru"
              />
              <v-input
                v-if="lang == 'kk'"
                v-model="store.material.name_kk"
                size="large"
                :label="typeList[0].name_kk"
              />
              <v-input
                v-if="lang == 'en'"
                v-model="store.material.name_en"
                size="large"
                :label="typeList[0].name_en"
              />
            </div>
          </div>
        </template>
        <template v-for="tab in typeList" :key="tab.id">
          <template v-if="tab.id == typeTab && typeTab != 1">
            <FeedsWidget1
              v-if="lang == 'ru'"
              widget-classes="mb-5 mb-xl-8"
              :title="tab.name_ru"
              v-model="store.material[`${tab.key}_ru`]"
              uniqKey="1"
            ></FeedsWidget1>
            <FeedsWidget1
              v-else-if="lang == 'kk'"
              widget-classes="mb-5 mb-xl-8"
              :title="tab.name_kk"
              v-model="store.material[`${tab.key}_kk`]"
              uniqKey="2"
            ></FeedsWidget1>
            <FeedsWidget1
              v-else-if="lang == 'en'"
              widget-classes="mb-5 mb-xl-8"
              :title="tab.name_en"
              v-model="store.material[`${tab.key}_en`]"
              uniqKey="3"
            ></FeedsWidget1>
          </template>
        </template>
      </div>
      <div class="col-md-3">
        <div class="card gx-5 card-body">
          <div class="fv-row">
            <label class="required fs-6 fw-semibold mb-2"
              >Обязательные поля</label
            >

            <button
              :class="{
                'btn-primary': typeTab === 1,
                'btn-light': typeTab != 1,
              }"
              class="btn w-100 mt-3"
              @click="typeTab = 1"
            >
              Название
            </button>
            <button
              :class="{
                'btn-primary': typeTab === 2,
                'btn-light': typeTab != 2,
              }"
              class="btn w-100 mt-3"
              @click="typeTab = 2"
            >
              Описание
            </button>
            <button
              :class="{
                'btn-primary': typeTab === 3,
                'btn-light': typeTab != 3,
              }"
              class="btn w-100 mt-3"
              @click="typeTab = 3"
            >
              Аннотация
            </button>
            <button
              :class="{
                'btn-primary': typeTab === 4,
                'btn-light': typeTab != 4,
              }"
              class="btn w-100 mt-3"
              @click="typeTab = 4"
            >
              Медали
            </button>
            <button
              :class="{
                'btn-primary': typeTab === 5,
                'btn-light': typeTab != 5,
              }"
              class="btn w-100 mt-3"
              @click="typeTab = 5"
            >
              Медали 2
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import FeedsWidget1 from "@/components/widgets/feeds/Widget1.vue";
import { useMaterialStore } from "@/stores/material";
const typeList = ref<any>([
  {
    id: 1,
    name_ru: "Название(Рус)",
    name_en: "Название(Англ)",
    name_kk: "Название(Каз)",
    key: "name",
  },
  {
    id: 2,
    name_ru: "Описание(Рус)",
    name_en: "Описание(Англ)",
    name_kk: "Описание(Каз)",
    key: "description",
  },
  {
    id: 3,
    name_ru: "Аннотация(Рус)",
    name_en: "Аннотация(Англ)",
    name_kk: "Аннотация(Каз)",
    key: "annotation",
  },
  {
    id: 4,
    name_ru: "Медали(Рус)",
    name_en: "Медали(Англ)",
    name_kk: "Медали(Каз)",
    key: "medal_results",
  },
  {
    id: 5,
    name_ru: "Участники(Рус)",
    name_en: "Участники(Англ)",
    name_kk: "Участники(Каз)",
    key: "employees",
  },
]);
type langTypes = "ru" | "kk" | "en";
export default defineComponent({
  name: "materialTab",
  components: {
    FeedsWidget1,
  },
  props: {
    item: Object,
  },
  setup() {
    const store = useMaterialStore();

    const lang = ref<langTypes>("ru");
    const mod = ref("test");
    const typeTab = ref(1);
    return { lang, typeTab, typeList, store };
  },
});
</script>
