import { AxiosInstance, AxiosRequestConfig } from 'axios';
/**
 * Clase para gestionar la creación y obtención de instancias de Axios.
 * Permite crear instancias de Axios con una URL base, configuración personalizada
 * y opcionalmente un número de versión específico.
 *
 * @param baseUrl URL base de la API
 * @param config Configuración personalizada de Axios
 *
 * @method version(version: string): AxiosInstance
 * @method getInstance(version: string): AxiosInstance
 *
 * @example
 * ```typescript
 * // Configuración básica
 * const api = new ApiVersioning(import.meta.env.VITE_API_URL);
 *
 * // Configuración personalizada
 * const api = new ApiVersioning(import.meta.env.VITE_API_URL, {
 *   headers: { 'Authorization': 'Bearer token' },
 *   withCredentials: true
 * });
 *
 * // Con versión
 * const apiV1 = api.getInstance('v1');
 *
 * // Sin versión - petición GET
 * const response = await api.get('/users');
 *
 * // Con versión - petición Get
 * const response = await apiV1.get('/users');
 * ```
 */
export declare class ApiVersioning {
    private baseUrl;
    private config?;
    private instances;
    constructor(baseUrl: string, config?: AxiosRequestConfig);
    private createApiInstance;
    version(version: string): AxiosInstance;
    getInstance(version: string): AxiosInstance;
}
