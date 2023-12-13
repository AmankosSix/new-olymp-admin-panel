const ID_TOKEN_KEY = "id_token" as string;
const USER_DATA_KEY = "user" as string;

interface UserData {
  federation_id?: string;
  access_token?: string;
  email?: string;
  federation?: string;
  role?: string;
  title?: string;
}

/**
 * @description get token form localStorage
 */
export const getToken = (): string | null => {
  return window.localStorage.getItem(ID_TOKEN_KEY);
};

/**
 * @description save token into localStorage
 * @param token: string
 */
export const saveToken = (token: string): void => {
  window.localStorage.setItem(ID_TOKEN_KEY, token);
};

/**
 * @description remove token form localStorage
 */
export const destroyToken = (): void => {
  window.localStorage.removeItem(ID_TOKEN_KEY);
};

/**
 * @description get userData form localStorage
 */
export const userData = () => {
  return window.localStorage.getItem(USER_DATA_KEY);
};

/**
 * @description get federationId form localStorage
 */
export const federationId = () => {
  return window.localStorage.getItem("federation_id");
};

/**
 * @description save userData form localStorage
 */
export const saveUserData = (user: UserData): void => {
  if (user.federation_id || user.federation_id === null)
    window.localStorage.setItem("federation_id", user.federation_id ?? 1);
  window.localStorage.setItem(USER_DATA_KEY, JSON.stringify(user));
};

export default { getToken, saveToken, destroyToken, saveUserData, userData };
