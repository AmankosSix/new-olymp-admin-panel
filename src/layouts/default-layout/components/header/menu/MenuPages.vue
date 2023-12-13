<template>
  <template v-for="(item, i) in MainMenuConfig" :key="i">
    <template v-if="!item.pages"> test </template>
    <template v-else-if="!item.heading">
      <transition name="fade" mode="out-in">
        <div v-if="false" class="menu-item menu-lg-down-accordion me-lg-1">
          <button
            class="btn-success btn"
            style="transform: scale(0.85)"
            data-kt-menu-trigger="click"
            data-kt-menu-placement="bottom-start"
            data-kt-menu-flip="top-end"
          >
            <i class="ki-duotone ki-plus fs-2"> </i>
            <span class="menu-title">{{ translate(createConfig.title) }}</span>
          </button>
          <div
            class="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-sub-lg-dropdown menu-gray-800 menu-state-bg-light-primary fw-semibold p-0 w-100 w-lg-850px mt-5"
            data-kt-menu="true"
          >
            <!--begin::Menu item-->

            <div class="row">
              <!--begin:Col-->
              <div class="col-lg-8 mb-3 mb-lg-0 py-3 px-3 py-lg-6 px-lg-6">
                <!--begin:Row-->
                <div class="row">
                  <!--begin:Col-->
                  <div
                    v-for="(link, i) in createConfig.subList"
                    :key="i"
                    class="col-lg-6 mb-3"
                  >
                    <!--begin:Menu item-->
                    <div class="menu-item p-0 m-0">
                      <!--begin:Menu link-->
                      <router-link
                        :to="{ name: 'create-product' }"
                        class="menu-link"
                      >
                        <KTIcon
                          :icon-name="link.icon"
                          icon-class="fs-2x"
                          style="margin-right: 15px"
                          :class="`text-${link.iconColor}`"
                        />
                        <span class="d-flex flex-column">
                          <span class="fs-6 fw-bold text-gray-800">{{
                            link.title
                          }}</span>
                          <span class="fs-7 fw-semibold text-muted">{{
                            link.subTitle
                          }}</span>
                        </span>
                      </router-link>
                      <!--end:Menu link-->
                    </div>
                    <!--end:Menu item-->
                  </div>
                  <!--end:Col-->
                </div>
                <!--end:Row-->
                <div class="separator separator-dashed mx-5 my-5"></div>
                <!--begin:Landing-->
                <div
                  class="d-flex flex-stack flex-wrap flex-lg-nowrap gap-2 mx-5"
                >
                  <div class="d-flex flex-column me-5">
                    <div class="fs-6 fw-bold text-gray-800">
                      Landing Page Template
                    </div>
                    <div class="fs-7 fw-semibold text-muted">
                      Onpe page landing template with pricing & others
                    </div>
                  </div>
                  <a href="landing.html" class="btn btn-sm btn-primary fw-bold"
                    >Explore</a
                  >
                </div>
                <!--end:Landing-->
              </div>
              <!--end:Col-->
              <!--begin:Col-->
              <div
                class="menu-more bg-light col-lg-4 py-3 px-3 py-lg-6 px-lg-6 rounded-end"
              >
                <!--begin:Heading-->
                <h4 class="fs-6 fs-lg-4 text-gray-800 fw-bold mt-3 mb-3 ms-4">
                  More Dashboards
                </h4>
                <!--end:Heading-->
                <!--begin:Menu item-->
                <div class="menu-item p-0 m-0">
                  <!--begin:Menu link-->
                  <a href="dashboards/logistics.html" class="menu-link py-2">
                    <span class="menu-title">Logistics</span>
                  </a>
                  <!--end:Menu link-->
                </div>
                <!--end:Menu item-->
                <!--begin:Menu item-->
                <div class="menu-item p-0 m-0">
                  <!--begin:Menu link-->
                  <a
                    href="dashboards/website-analytics.html"
                    class="menu-link py-2"
                  >
                    <span class="menu-title">Website Analytics</span>
                  </a>
                  <!--end:Menu link-->
                </div>
                <!--end:Menu item-->
                <!--begin:Menu item-->
                <div class="menu-item p-0 m-0">
                  <!--begin:Menu link-->
                  <a
                    href="dashboards/finance-performance.html"
                    class="menu-link py-2"
                  >
                    <span class="menu-title">Finance Performance</span>
                  </a>
                  <!--end:Menu link-->
                </div>
                <!--end:Menu item-->
                <!--begin:Menu item-->
                <div class="menu-item p-0 m-0">
                  <!--begin:Menu link-->
                  <a
                    href="dashboards/store-analytics.html"
                    class="menu-link py-2"
                  >
                    <span class="menu-title">Store Analytics</span>
                  </a>
                  <!--end:Menu link-->
                </div>
                <!--end:Menu item-->
                <!--begin:Menu item-->
                <div class="menu-item p-0 m-0">
                  <!--begin:Menu link-->
                  <a href="dashboards/social.html" class="menu-link py-2">
                    <span class="menu-title">Social</span>
                  </a>
                  <!--end:Menu link-->
                </div>
                <!--end:Menu item-->
                <!--begin:Menu item-->
                <div class="menu-item p-0 m-0">
                  <!--begin:Menu link-->
                  <a href="dashboards/delivery.html" class="menu-link py-2">
                    <span class="menu-title">Delivery</span>
                  </a>
                  <!--end:Menu link-->
                </div>
                <!--end:Menu item-->
                <!--begin:Menu item-->
                <div class="menu-item p-0 m-0">
                  <!--begin:Menu link-->
                  <a href="dashboards/crypto.html" class="menu-link py-2">
                    <span class="menu-title">Crypto</span>
                  </a>
                  <!--end:Menu link-->
                </div>
                <!--end:Menu item-->
                <!--begin:Menu item-->
                <div class="menu-item p-0 m-0">
                  <!--begin:Menu link-->
                  <a href="dashboards/school.html" class="menu-link py-2">
                    <span class="menu-title">School</span>
                  </a>
                  <!--end:Menu link-->
                </div>
                <!--end:Menu item-->
                <!--begin:Menu item-->
                <div class="menu-item p-0 m-0">
                  <!--begin:Menu link-->
                  <a href="dashboards/podcast.html" class="menu-link py-2">
                    <span class="menu-title">Podcast</span>
                  </a>
                  <!--end:Menu link-->
                </div>
                <!--end:Menu item-->
              </div>
              <!--end:Col-->
            </div>
          </div>
        </div>
      </transition>

      <template v-for="(menuItem, j) in item.pages" :key="j">
        <div v-if="menuItem.heading" class="menu-item me-lg-1">
          <router-link
            v-if="menuItem.route"
            class="menu-link"
            active-class="active"
            :to="menuItem.route"
          >
            <span class="menu-title">{{ translate(menuItem.heading) }}</span>
          </router-link>
        </div>
      </template>
    </template>
    <div
      v-if="item.heading"
      data-kt-menu-trigger="click"
      data-kt-menu-placement="bottom-start"
      class="menu-item menu-lg-down-accordion me-lg-1"
    >
      <span
        v-if="item.route"
        class="menu-link py-3"
        :class="{ active: hasActiveChildren(item.route) }"
      >
        <span class="menu-title">{{ translate(item.heading) }}</span>
        <span class="menu-arrow d-lg-none"></span>
      </span>
      <div
        class="menu-sub menu-sub-lg-down-accordion menu-sub-lg-dropdown menu-rounded-0 py-lg-4 w-lg-225px"
      >
        <template v-for="(menuItem, j) in item.pages" :key="j">
          <div
            v-if="menuItem.sectionTitle"
            data-kt-menu-trigger="{default:'click', lg: 'hover'}"
            data-kt-menu-placement="right-start"
            class="menu-item menu-lg-down-accordion"
          >
            <span
              v-if="menuItem.route"
              class="menu-link py-3"
              :class="{ active: hasActiveChildren(menuItem.route) }"
            >
              <span class="menu-icon">
                <i
                  v-if="headerMenuIcons === 'bootstrap'"
                  :class="menuItem.bootstrapIcon"
                  class="bi fs-3"
                ></i>
                <KTIcon
                  v-if="headerMenuIcons === 'keenthemes'"
                  :icon-name="menuItem.keenthemesIcon"
                  icon-class="fs-2"
                />
              </span>
              <span class="menu-title">{{
                translate(menuItem.sectionTitle)
              }}</span>
              <span class="menu-arrow"></span>
            </span>
            <div
              class="menu-sub menu-sub-lg-down-accordion menu-sub-lg-dropdown menu-active-bg py-lg-4 w-lg-225px"
            >
              <template v-for="(menuItem1, k) in menuItem.sub" :key="k">
                <div
                  v-if="menuItem1.sectionTitle"
                  data-kt-menu-trigger="{default:'click', lg: 'hover'}"
                  data-kt-menu-placement="right-start"
                  class="menu-item menu-lg-down-accordion"
                >
                  <span
                    v-if="menuItem1.route"
                    class="menu-link py-3"
                    :class="{ active: hasActiveChildren(menuItem1.route) }"
                  >
                    <span class="menu-bullet">
                      <span class="bullet bullet-dot"></span>
                    </span>
                    <span class="menu-title">{{
                      translate(menuItem1.sectionTitle)
                    }}</span>
                    <span class="menu-arrow"></span>
                  </span>
                  <div
                    class="menu-sub menu-sub-lg-down-accordion menu-sub-lg-dropdown menu-active-bg py-lg-4 w-lg-225px"
                  >
                    <template v-for="(menuItem2, l) in menuItem1.sub" :key="l">
                      <div
                        class="menu-item"
                        :class="{ disabled: menuItem2.disabled }"
                      >
                        <router-link
                          v-if="menuItem2.route && menuItem2.heading"
                          class="menu-link py-3"
                          active-class="active"
                          :to="menuItem2.route"
                        >
                          <span class="menu-bullet">
                            <span class="bullet bullet-dot"></span>
                          </span>
                          <span class="menu-title">{{
                            translate(menuItem2.heading)
                          }}</span>
                        </router-link>
                      </div>
                    </template>
                  </div>
                </div>
                <div
                  v-if="menuItem1.heading"
                  class="menu-item"
                  :class="{ disabled: menuItem1.disabled }"
                >
                  <router-link
                    v-if="menuItem1.route"
                    class="menu-link"
                    active-class="active"
                    :to="menuItem1.route"
                  >
                    <span class="menu-bullet">
                      <span class="bullet bullet-dot"></span>
                    </span>
                    <span class="menu-title">{{
                      translate(menuItem1.heading)
                    }}</span>
                  </router-link>
                </div>
              </template>
            </div>
          </div>
          <div v-if="menuItem.heading" class="menu-item">
            <!-- :class="{ disabled: menuItem.disabled }" -->
            <router-link
              v-if="menuItem.route && menuItem.route"
              class="menu-link"
              active-class="active"
              :to="menuItem.disabled ? '/disabled-page' : menuItem.route"
            >
              <span class="menu-icon">
                <KTIcon icon-name="element-8" icon-class="fs-2" />
              </span>
              <span class="menu-title">{{ translate(menuItem.heading) }}</span>
            </router-link>
          </div>
        </template>
      </div>
    </div>
  </template>
</template>

<script lang="ts">
import { getAssetPath } from "@/core/helpers/assets";
import { computed, defineComponent, ref, onBeforeMount, onMounted } from "vue";
import { onBeforeRouteUpdate, useRoute } from "vue-router";
import { useI18n } from "vue-i18n";
import MainMenuConfig from "@/layouts/default-layout/config/MainMenuConfig";
import { headerMenuIcons } from "@/layouts/default-layout/config/helper";

export default defineComponent({
  name: "KTMenu",
  components: {},
  setup() {
    const { t, te } = useI18n();
    const myState = ref("Initial State");
    const route = useRoute();
    const createConfig = ref({
      title: "Создать",
      subList: [
        {
          title: "Создать материал",
          subTitle: "Краткое описание",
          name: "create-product",
          icon: "abstract-38",
          iconColor: "primary",
        },
        {
          title: "Создать материал",
          subTitle: "Краткое описание",
          name: "create-product",
          icon: "color-swatch",
          iconColor: "success",
        },
        {
          title: "Создать материал",
          subTitle: "Краткое описание",
          name: "create-product",
          icon: "chart-simple",
          iconColor: "warning",
        },
        {
          title: "Создать материал",
          subTitle: "Краткое описание",
          name: "create-product",
          icon: "abstract-26",
          iconColor: "danger",
        },
        {
          title: "Создать материал",
          subTitle: "Краткое описание",
          name: "create-product",
          icon: "abstract-42",
          iconColor: "info",
        },
        {
          title: "Создать материал",
          subTitle: "Краткое описание",
          name: "create-product",
          icon: "abstract-9",
          iconColor: "black",
        },
        {
          title: "Создать материал",
          subTitle: "Краткое описание",
          name: "create-product",
          icon: "abstract-30",
          iconColor: "primary",
        },
        {
          title: "Создать материал",
          subTitle: "Краткое описание",
          name: "create-product",
          icon: "element-11",
          iconColor: "primary",
        },
      ],
    });
    const shouldShowMenu = ref(false);
    const hasActiveChildren = (match: string) => {
      return route.path.indexOf(match) !== -1;
    };
    const createBtnActive = computed(() => {
      return route.meta.breadcrumbs.includes("Материалы");
    });
    const translate = (text: string) => {
      if (te(text)) {
        return t(text);
      } else {
        return text;
      }
    };
    onMounted(() => {
      setTimeout(() => {
        shouldShowMenu.value = !shouldShowMenu.value;
      }, 1000);
    });

    return {
      hasActiveChildren,
      headerMenuIcons,
      MainMenuConfig,
      createConfig,
      translate,
      shouldShowMenu,
      createBtnActive,
      getAssetPath,
    };
  },
});
</script>

<style lang="scss">
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
