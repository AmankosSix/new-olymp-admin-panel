<template>
  <div class="">
    <div class="row">
      <div class="col-md-2">
        <div class="card gx-5 card-body mb-8">
          <div class="fv-row">
            <!-- {{ apiList.postFilters }} -->
            <label class="required fs-6 fw-semibold mb-2">Тип записи</label>
            <Field
              v-model="actualType"
              name="category"
              data-control="select2"
              data-hide-search="true"
              data-placeholder="Выбрать тип записи..."
              class="form-select form-select-solid"
              as="select"
            >
              <option value="1">Новости</option>
              <option value="2">Спортсмены</option>
              <option value="3">Игры</option>
              <option value="4">Участники</option>
              <option value="5">Секции</option>
              <option value="6">Соревнования</option>
            </Field>
          </div>
        </div>
        <div v-if="actualType == 'news'" class="card gx-5 card-body">
          <div class="fv-row">
            <label class="required fs-6 fw-semibold mb-2">Новость</label>
            <Field
              v-model="actualType"
              name="category"
              data-control="select2"
              data-hide-search="true"
              data-placeholder="Выбрать тип записи..."
              class="form-select form-select-solid"
              as="select"
            >
              <option value="0">Выбрать тип записи...</option>
              <option value="1">Материал</option>
              <option value="2">Новость</option>
              <option value="3">Спортсмен</option>
              <option value="4">Игра</option>
            </Field>
          </div>
        </div>
      </div>
      <div class="col-12 col-md-10">
        <!-- {{ store.materialType }} <br />
        {{ store.material }} -->
        <news-block v-if="actualType == '1'" />
        <champions-block v-else-if="actualType == '2'" />
        <games-block v-else-if="actualType == '3'" />
        <opinions-block v-else-if="actualType == '4'" />
        <sections-block v-else-if="actualType == '5'" />
        <competitions-block v-else-if="actualType == '6'" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref, watch } from "vue";
import { useMyStore } from "@/stores/apiList.js";
import { ErrorMessage, Field, Form as VForm } from "vee-validate";
import ApiService from "@/core/services/ApiService";
import newsBlock from "@/components/details/news/content.vue";
import gamesBlock from "@/components/details/games/content.vue";
import championsBlock from "@/components/details/champions/content.vue";
import opinionsBlock from "@/components/details/opinions/content.vue";
import sectionsBlock from "@/components/details/sections/content.vue";
import competitionsBlock from "@/components/details/competitions/content.vue";
import { useMaterialStore } from "@/stores/material";
import { useRoute } from "vue-router";

interface TableColumn {
  columnName: string;
  columnLabel: string;
  sortEnabled: boolean;
}
interface material {
  name_ru: string;
  name_eng: string;
  name_kk: string;
}
const types = {
  1: { url: "ru/newadmin/articles", name: "news" },
  2: { url: "ru/newadmin/champions", name: "champions" },
  3: { url: "ru/newadmin/games", name: "games" },
  4: { url: "ru/newadmin/opinions", name: "opinions" },
  5: { url: "ru/newadmin/sections", name: "sections" },
  6: { url: "ru/newadmin/olympic_competitions", name: "olympic_competitions" },
};
export default defineComponent({
  name: "kt-datatables",
  components: {
    newsBlock,
    gamesBlock,
    Field,
    championsBlock,
    opinionsBlock,
    sectionsBlock,
    competitionsBlock,
  },
  setup() {
    const store = useMaterialStore();
    const myStore = useMyStore();
    const route = useRoute();
    const actualType = ref(route.query.type || 1);
    const apiKey = ref<string>(route.meta.apiKey as string);
    const apiList = myStore.getApiList[apiKey.value];

    const typeForTabs = computed(() => {
      return types[actualType.value].name;
    });
    const editList = computed(() => {
      return apiList.postFieldsForEdit
        ? apiList.postFieldsForEdit
        : apiList.postFields;
    });

    const getList = async () => {
      const { data } = await ApiService.get(
        "/api/" + `${types[actualType.value].url}/${route.params.id}`
      );
      if (data.length) store.addMaterial(data[0], true);
      else store.addMaterial({});
    };
    const getRequest = computed(() => {
      return apiList?.urlGet ? apiList?.urlGet : apiList?.url;
    });
    watch(
      () => actualType.value,
      async (val) => {
        store.addMaterial({});
        store.addMaterialType(types[actualType.value].name); // имя нужно для табов (communicationTab,imageTab и тд, чтобы определять какой тип материала сейчас)
        await getList();
      }
    );
    onMounted(async () => {
      store.addMaterial({});
      store.addMaterialType(types[actualType.value].name);
      await getList();
    });
    return {
      store,
      apiList,
      getRequest,
      actualType,
      editList,
      typeForTabs,
    };
  },
});
</script>
