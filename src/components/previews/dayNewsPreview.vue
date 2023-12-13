<template>
  <!--begin::Modal - View Users-->
  <el-dialog
    v-model="dialogVisible"
    title="Превью"
    width="90%"
    :before-close="handleClose"
  >
    <section
      class="pb-15 pt-10 news_section white-text"
      :class="{
        'dark-preview': store.mode === 'dark',
        'light-preview': store.mode === 'light',
      }"
    >
      <div class="container">
        <h2 class="news__day_title mb-10 title-line">
          {{ news.header || "НОВОСТЬ ДНЯ" }}
        </h2>
        <div class="row">
          <div class="col-12 col-md-7">
            <div class="news_day d-flex flex-column justify-space-between">
              <div>
                <p v-if="news.title" class="news_day--text">
                  {{ news.title }}
                </p>
                <p
                  v-if="news.description"
                  class="news_day--sub mb-15"
                  v-html="news.description"
                />
              </div>

              <a class="news_day--link"
                ><base-icon width="31" height="24" icon="arrowLeft"
              /></a>
            </div>
          </div>
          <div class="col-12 col-md-5 news_day">
            <img class="news_day--img" :src="imageUrl" alt="" />
          </div>
        </div>
      </div>
    </section>
  </el-dialog>

  <!--end::Modal - View Users-->
</template>
<script>
import { useThemeStore } from "@/stores/theme";
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
      store: useThemeStore(),
    };
  },
  computed: {
    imageUrl() {
      if (this.news.img) {
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
.news__day_title {
  font-size: 40px;
  font-weight: 600;
}
.dark-preview {
  position: relative;
  * {
    color: white;
  }
}
.light-preview {
  position: relative;
  * {
    color: black;
  }
}
.news_day {
  height: 100%;
  &--text {
    font-size: 26px;
    font-weight: 600;
    margin-bottom: 28px;
  }
  &--sub {
    font-size: 20px;
    font-weight: 400;
    display: -webkit-box;
    -webkit-line-clamp: 3; // количество строк
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  &--img {
    width: 100%;
  }
  &--link {
    path {
      fill: #ffffff !important;
    }
  }
}
.fed_p {
  font-size: 20px;
  font-weight: 400;
}
.reverse {
  flex-direction: row-reverse;
  margin-top: 100px;
}
.reverse .news_day {
  text-align: end;
}
.reverse .news_day--link {
  transform: rotate(180deg);
  text-align: left;
}
</style>
