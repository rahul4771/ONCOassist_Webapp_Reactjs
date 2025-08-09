import { AxiosRequestConfig } from 'axios';
/**
 * GET Request
 */
export declare const getApi: <T>(url: string, config?: AxiosRequestConfig) => Promise<T | null>;
/**
 * POST Request
 */
export declare const postApi: <T, R>(url: string, data: T, config?: AxiosRequestConfig) => Promise<R | null>;
/**
 * PUT Request
 */
export declare const putApi: <T, R>(url: string, data: T, config?: AxiosRequestConfig) => Promise<R | null>;
/**
 * DELETE Request
 */
export declare const deleteApi: <R>(url: string, config?: AxiosRequestConfig) => Promise<R | null>;
