<template>
  <el-upload
    v-model:file-list="fileList"
    ref="upload"
    class="upload-demo"
    :limit="1"
    :on-exceed="handleExceed"
    :auto-upload="false"
    :accept="acceptedFileTypes"
    @change="handleChange"
  >
    <template #trigger>
      <el-button class="btn btn-sm fw-bold btn-primary">Выбрать файл</el-button>
    </template>
    <!-- <template #tip>
        <div class="el-upload__tip text-red">Лимит 1 файл</div>
      </template> -->
    <template #file="{ upload, file, fileList }">
      <div class="file-item d-flex justify-content-between align-items-center">
        <span
          class="d-flex align-items-center el-file-hover"
          @click="downloadFile(file)"
        >
          <el-icon size="18px" :style="{ 'margin-right': '10px' }"
            ><Document /></el-icon
          >{{ file.name }}</span
        >
        <el-icon
          size="18px"
          :style="{ cursor: 'pointer' }"
          @click="removeFile(file)"
          ><Delete
        /></el-icon>
      </div>
    </template>
  </el-upload>
</template>

<script setup lang="ts">
import { ref, defineProps, defineEmits, computed, watch } from "vue";
import { genFileId } from "element-plus";
import type {
  UploadInstance,
  UploadProps,
  UploadRawFile,
  UploadUserFile,
} from "element-plus";
import { Document, Delete } from "@element-plus/icons-vue";

const emit = defineEmits(["onFileChange"]);
const props = defineProps<{
  keyData: string;
  fileUrl: string;
}>();

const upload = ref<UploadInstance>();
const fileList = ref<UploadUserFile[]>([]);
const envUrl = import.meta.env.VITE_API_PROXY_TARGET_FILE;
const acceptedFileTypes = ref("image/*, application/pdf, application/msword,");
const handleExceed: UploadProps["onExceed"] = (files) => {
  upload.value!.clearFiles();
  const file = files[0] as UploadRawFile;
  file.uid = genFileId();
  upload.value!.handleStart(file);
};

const handleChange: UploadProps["onChange"] = (file, fileList) => {
  console.log("file", fileList);
  emit("onFileChange", { file: file.raw, key: props.keyData });
};

const removeFile = (file) => {
  console.log(file);
  const index = fileList.value.findIndex((f) => f.uid === file.uid);
  if (index !== -1) {
    fileList.value.splice(index, 1);
  }
  if (!fileList.value.length)
    emit("onFileChange", { file: "", key: props.keyData });
};

const downloadFile = (file) => {
  if (!file.url) {
    // Если это blob URL
    const reader = new FileReader();
    reader.onloadend = () => {
      const blob = new Blob([reader.result], { type: file.raw.type });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = file.name;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    };
    reader.readAsArrayBuffer(file.raw);
  } else {
    // Если это обычный URL
    const url = envUrl + file.url;
    const link = document.createElement("a");
    link.href = url;
    link.download = file.name;
    document.body.appendChild(link);
    link.click();
  }
};
watch(
  () => props.fileUrl,
  (newValue) => {
    if (!newValue?.uid && newValue) {
      const file = newValue ? newValue.split("/") : "Название файла";
      const name = typeof file === "object" ? file[file.length - 1] : file;
      fileList.value = [
        {
          name: name,
          url: newValue,
        },
      ];
    }
  }
);
</script>
<style lang="scss">
.el-file-hover {
  cursor: pointer;
  &:hover {
    color: #1b84ff;
  }
}
</style>
