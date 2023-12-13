import type { App } from "vue";
import type { AxiosResponse, AxiosError, AxiosRequestConfig } from "axios";
import axios from "axios";
import VueAxios from "vue-axios";
import JwtService from "@/core/services/JwtService";
import Swal from "sweetalert2";

interface Options {
  header: object;
}

/**
 * @description service to call HTTP request via Axios
 */
class ApiService {
  /**
   * @description property to share vue instance
   */
  public static vueInstance: App;

  /**
   * @description initialize vue axios
   */
  public static init(app: App<Element>) {
    ApiService.vueInstance = app;
    ApiService.vueInstance.use(VueAxios, axios);
    ApiService.vueInstance.axios.interceptors.response.use(
      (response) => response,
      (error: AxiosError) => {
        if (error.response) {
          // Ошибка с сервера, проверяем коды состояния
          const status = error.response.status;

          if (status === 401) {
            // Обработка ошибки 401 (например, перенаправление на страницу входа)
            window.location.href = "/sign-in";
          } else if (status === 403) {
            // Обработка ошибки 403 (например, вывод сообщения о запрете доступа)
            // window.location.href = "/sign-in";
            Swal.fire({
              text: "У Вас нет доступа к данному разделу",
              icon: "error",
              buttonsStyling: false,
              confirmButtonText: "Вернуться на главную",
              heightAuto: false,
              customClass: {
                confirmButton: "btn fw-semibold btn-light-danger",
              },
            }).then(() => {
              window.location.href = "/";
            });
          }
        } else if (error.request) {
          // Ошибка запроса (например, нет ответа от сервера)
          console.error("No response received from the server.");
        } else {
          // Необработанная ошибка (например, что-то пошло не так при отправке запроса)
          console.error("An unexpected error occurred:", error.message);
        }

        return Promise.reject(error);
      }
    );
  }
  /**
   * @description set the default HTTP request headers
   */
  public static setHeader(): void {
    ApiService.vueInstance.axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${JwtService.getToken()}`;
    ApiService.vueInstance.axios.defaults.headers.common["Accept"] =
      "application/json";
  }

  /**
   * @description send the GET HTTP request
   * @param resource: string
   * @param params: AxiosRequestConfig
   * @returns Promise<AxiosResponse>
   */
  public static query(resource: string, params: any): Promise<AxiosResponse> {
    return ApiService.vueInstance.axios.get(resource, params);
  }

  /**
   * @description send the GET HTTP request
   * @param resource: string
   * @param slug: string
   * @returns Promise<AxiosResponse>
   */
  public static get(
    resource: string | object,
    slug = {} as object
  ): Promise<AxiosResponse> {
    return ApiService.vueInstance.axios.get(`${resource}`, slug);
  }

  /**
   * @description set the POST HTTP request
   * @param resource: string
   * @param params: AxiosRequestConfig
   * @returns Promise<AxiosResponse>
   */
  public static post(
    resource: string,
    params?: any,
    options?: AxiosRequestConfig<Options>
  ): Promise<AxiosResponse> {
    return ApiService.vueInstance.axios.post(`${resource}`, params, options);
  }

  /**
   * @description send the UPDATE HTTP request
   * @param resource: string
   * @param slug: string
   * @param params: AxiosRequestConfig
   * @returns Promise<AxiosResponse>
   */
  public static update(resource: string, params: any): Promise<AxiosResponse> {
    return ApiService.vueInstance.axios.patch(`${resource}`, params);
  }

  /**
   * @description Send the PUT HTTP request
   * @param resource: string
   * @param params: AxiosRequestConfig
   * @returns Promise<AxiosResponse>
   */
  public static put(resource: string, params: any): Promise<AxiosResponse> {
    return ApiService.vueInstance.axios.put(`${resource}`, params);
  }

  /**
   * @description Send the DELETE HTTP request
   * @param resource: string
   * @returns Promise<AxiosResponse>
   */
  public static delete(resource: string, params?: any): Promise<AxiosResponse> {
    return ApiService.vueInstance.axios.delete(resource, params);
  }
}

export default ApiService;
