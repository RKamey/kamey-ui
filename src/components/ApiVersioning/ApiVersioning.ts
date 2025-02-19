import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

/**
 * Clase para gestionar la creación y obtención de instancias de Axios.
 * Permite crear instancias de Axios con una URL base, configuración personalizada
 * y opcionalmente un número de versión específico.
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
export class ApiVersioning {
  private baseUrl: string;
  private config?: AxiosRequestConfig;
  private instances: Record<string, AxiosInstance>;

  constructor(baseUrl: string, config?: AxiosRequestConfig) {
    this.baseUrl = baseUrl;
    this.config = config;
    this.instances = {};

    const axiosInstance = axios.create({
      baseURL: this.baseUrl,
      ...this.config
    });

    Object.assign(axiosInstance, {
      getInstance: this.getInstance.bind(this)
    });

    this.instances['default'] = axiosInstance;
  }

  private createApiInstance(version: string): AxiosInstance {
    return axios.create({
      baseURL: `${this.baseUrl}/${version}`,
      ...this.config
    });
  }

  public getInstance(version: string): AxiosInstance {
    if (!this.instances[version]) {
      this.instances[version] = this.createApiInstance(version);
    }
    return this.instances[version];
  }
}