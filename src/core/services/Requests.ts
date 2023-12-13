import ApiService from "./ApiService";
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
export const addImage = async (
  file: string,
  url: string = "load_file/mainSlide/1"
) => {
  const formData = new FormData();

  formData.append("file", file);

  if (formData.has("file")) {
    try {
      const res = await ApiService.post(`/files/${url}`, formData);

      return res.data.filename;
    } catch (error) {
      console.error("Ошибка при загрузке файла:", error);
    }
  }
};
export const deleteItems = async (list: number[], url: string) => {
  if (url === "articles") {
    console.log(list);
    await ApiService.delete(`/api/newadmin/materials`, { data: list });
  } else {
    const idList = list.map((el) => {
      return { id: el };
    });
    await ApiService.delete(`/api/${url}`, { data: idList });
  }
  Toast.fire({
    position: "top-end", // Указываем позицию в правом верхнем углу
    icon: "success", // Тип уведомления (success, error, warning и т.д.)
    title: "Успех!",
    text: "Запись удалена",
    showConfirmButton: false, // Не отображать кнопку подтверждения
    timer: 3000, // Автоматически скрыть уведомление через 2 секунды
  });
};
