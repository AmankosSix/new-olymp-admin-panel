<template>
  <!--begin::Feeds Widget 1-->
  <div class="card" :class="widgetClasses">
    <!--begin::Body-->
    <div class="card-body pb-0">
      <!--begin::Header-->
      <div class="d-flex align-items-center">
        <!--begin::User-->
        <div class="d-flex align-items-center flex-grow-1">
          <!--begin::Avatar-->
          <h3>{{ title }}</h3>
          <!--end::Info-->
        </div>
        <!--end::User-->

        <!--begin::Menu-->
        <div class="my-0">
          <button
            type="button"
            class="btn btn-sm btn-icon btn-color-primary btn-active-light-primary"
            data-kt-menu-trigger="click"
            data-kt-menu-placement="bottom-end"
            data-kt-menu-flip="top-end"
          >
            <KTIcon icon-name="category" icon-class="fs-2" />
          </button>
          <Dropdown2></Dropdown2>
        </div>
        <!--end::Menu-->
      </div>
      <!--end::Header-->

      <!--begin::Form-->
      <form
        :id="`kt_forms_widget_${uniqKey}_form`"
        class="ql-quil ql-quil-plain pb-3"
      >
        <!--begin::Toolbar-->
        <div
          :id="`kt_forms_widget_${uniqKey}_editor_toolbar`"
          class="ql-toolbar d-flex flex-stack py-2"
        >
          <div class="me-2">
            <span class="ql-formats ql-size ms-0">
              <select
                :key="`kt_forms_widget_select_${uniqKey}`"
                class="ql-size w-75px"
              ></select>
            </span>

            <span class="ql-formats">
              <button class="ql-bold"></button>
              <button class="ql-italic"></button>
              <button class="ql-underline"></button>
              <button class="ql-strike"></button>
              <button class="ql-image"></button>
              <button class="ql-link"></button>
              <button class="ql-clean"></button>
            </span>
          </div>

          <div class="me-n3">
            <span class="btn btn-icon btn-sm btn-active-color-primary">
              <i class="flaticon2-clip-symbol icon-ms"></i>
            </span>

            <span class="btn btn-icon btn-sm btn-active-color-primary">
              <i class="flaticon2-pin icon-ms"></i>
            </span>
          </div>
        </div>
        <!--end::Toolbar-->
        <div class="separator"></div>
        <!--begin::Editor-->
        <div :id="`kt_forms_widget_${uniqKey}_editor`" class="py-6"></div>
        <!--end::Editor-->
      </form>
      <!--end::Form-->
    </div>
    <!--end::Body-->
  </div>
  <!--end::Feeds Widget 1-->
</template>

<script lang="ts">
import { getAssetPath } from "@/core/helpers/assets";
import { defineComponent, onMounted, ref, watch } from "vue";
import Quill from "quill";
import Dropdown2 from "@/components/dropdown/Dropdown2.vue";

export default defineComponent({
  name: "widget-1",
  props: {
    widgetClasses: String,
    title: String,
    uniqKey: String,
    modelValue: String,
  },
  components: {
    Dropdown2,
  },
  setup(props, context) {
    const oldVal = ref(props.modelValue);
    let quill;

    const initQuill = () => {
      const editorId = `kt_forms_widget_${props.uniqKey}_editor`;
      const options = {
        modules: {
          toolbar: {
            container: `#kt_forms_widget_${props.uniqKey}_editor_toolbar`,
          },
        },
        theme: "snow",
      };

      quill = new Quill("#" + editorId, options);

      quill.on("text-change", (el) => {
        const content = quill.root.innerHTML.trim();

        if (isOnlyParagraphsAndBreaks(content)) {
          // If the content is empty, set the model value to an empty string
          context.emit("update:modelValue", "");
        } else {
          // Otherwise, update the model value with the actual content
          context.emit("update:modelValue", content);
        }
      });

      // Обработка асинхронной инициализации clipboard
      if (quill.clipboard) {
        quill.clipboard.dangerouslyPasteHTML(props.modelValue || "");
      } else {
        setTimeout(() => {
          quill.clipboard.dangerouslyPasteHTML(props.modelValue || "");
        }, 0);
      }
    };
    const isOnlyParagraphsAndBreaks = (inputString) => {
      const regex = /^(<p>|<br>|<\/p>|\s)+$/;
      return regex.test(inputString);
    };
    onMounted(() => {
      initQuill();
    });

    // Используйте watch для наблюдения за изменениями modelValue
    watch(
      () => props.modelValue,
      (newVal, oldVal) => {
        if (oldVal !== newVal && quill && quill?.clipboard && !oldVal) {
          // Обновляем редактор Quill при изменении modelValue
          quill.clipboard.dangerouslyPasteHTML(newVal);
        }
      }
    );

    return {
      getAssetPath,
      oldVal,
    };
  },
});
</script>
