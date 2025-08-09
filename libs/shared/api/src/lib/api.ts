import axios, { AxiosRequestConfig } from "axios";

/**
 * GET Request
 */
export const getApi = async <T>(url: string, config?: AxiosRequestConfig): Promise<T | null> => {
  try {
    const response = await axios.get<T>(url, config);
    return response.data;
  } catch (error) {
    console.error("GET API Error:", error);
    return null;
  }
};

/**
 * POST Request
 */
export const postApi = async <T, R>(url: string, data: T, config?: AxiosRequestConfig): Promise<R | null> => {
  try {
    const response = await axios.post<R>(url, data, config);
    return response.data;
  } catch (error) {
    console.error("POST API Error:", error);
    return null;
  }
};

/**
 * PUT Request
 */
export const putApi = async <T, R>(url: string, data: T, config?: AxiosRequestConfig): Promise<R | null> => {
  try {
    const response = await axios.put<R>(url, data, config);
    return response.data;
  } catch (error) {
    console.error("PUT API Error:", error);
    return null;
  }
};

/**
 * DELETE Request
 */
export const deleteApi = async <R>(url: string, config?: AxiosRequestConfig): Promise<R | null> => {
  try {
    const response = await axios.delete<R>(url, config);
    return response.data;
  } catch (error) {
    console.error("DELETE API Error:", error);
    return null;
  }
};
