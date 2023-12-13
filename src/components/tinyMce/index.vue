<template>
  <Editor
    apiKey="ktu1mpe12zfnohqoq3fm63rfq917q3euky0e3x7ch15q7ql1"
    :init="{
      height: 500,
      menubar: true, // Включаем панель меню
      plugins: `print preview powerpaste casechange importcss t
        inydrive searchreplace autolink autosave s
        ave directionality advcode visualblocks visualchars fullscreen image link media mediaembed template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists checklist wordcount tinymcespellchecker a11ychecker imagetools textpattern noneditable help formatpainter permanentpen pageembed charmap tinycomments mentions quickbars linkchecker emoticons advtable export`,
      toolbar: `undo redo | formatselect | bold italic | \
        alignleft aligncenter alignright | \
        bullist numlist outdent indent | help | emoticons | textpattern`,
      language: 'ru', // Добавляем кнопки для новых плагинов
    }"
  />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Editor from "@tinymce/tinymce-vue";

export default defineComponent({
  name: "editors-tinymce",
  components: {
    Editor,
  },
});
</script>
