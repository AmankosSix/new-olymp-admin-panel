import * as yup from "yup";

const emailValidationSchema = yup
  .string()
  .email("Неверный формат почты")
  .required("Email is required");

export default {
  urlGet: "users",
  url: "users",
  detailName: "create-users",
  tableType: "simple", // если нужна обычная таблица
  postFields: [
    {
      key: "federation_id",
      component: "v-autocomplete",
      label: "Федерация",
      url: "ru/catalog/federations",
    },
    {
      key: "name",
      label: "Название",
      component: "v-input",
      required: true,
    },
    {
      key: "email",
      label: "Почта",
      component: "v-input",
      type: "email",
      validate: (email) => {
        try {
          emailValidationSchema.validateSync(email);
        } catch (error) {
          throw new Error("Неверный формат почты");
        }
      },
      required: true,
    },
    {
      key: "password",
      label: "Пароль",
      component: "v-input",
      required: true,
    },
    {
      key: "remember_token",
      label: "Токен",
      component: "v-input",
      defaultValue: "",
    },
  ],
};
