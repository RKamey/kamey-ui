import axios from "axios";

/**
 * Clase para gestionar la creación y obtención de instancias de Axios con versionado de API.
 * Permite crear instancias de Axios con una URL base y un número de versión específico.
 *
 * @example
 * ```typescript
 * // Crear una instancia de ApiVersioning con la URL base de la API.
 * const apiVersioning = new ApiVersioning(import.meta.env.VITE_API_URL);
 *
 * // Obtener una instancia de Axios para la versión 'v1'.
 * const apiV1 = apiVersioning.getInstance('v1');
 *
 * // En una sola línea:
 * const api = new ApiVersioning(import.meta.env.VITE_API_URL).getInstance('v1');
 * ```
 */
export class ApiVersioning {
  /** URL base de la API. */
  private baseUrl: string;

  /** Objeto que almacena las instancias de Axios creadas, indexadas por versión. */
  private instances: Record<string, ReturnType<typeof axios.create>>;

  /**
   * Constructor de la clase ApiVersioning.
   * @param baseUrl - La URL base de la API.
   */
  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
    this.instances = {};
  }

  /**
   * Crea una nueva instancia de Axios con la URL base y la versión especificada.
   * @param version - La versión de la API (por ejemplo, 'v1', 'v2').
   * @returns Una instancia de Axios configurada con la URL base y la versión.
   */
  private createApiInstance(version: string) {
    return axios.create({
      baseURL: `${this.baseUrl}/${version}`,
    });
  }

  /**
   * Obtiene una instancia de Axios para la versión especificada.
   * Si la instancia no existe, la crea y la almacena para futuras solicitudes.
   * @param version - La versión de la API (por ejemplo, 'v1', 'v2').
   * @returns La instancia de Axios correspondiente a la versión especificada.
   */
  public getInstance(version: string) {
    if (!this.instances[version]) {
      this.instances[version] = this.createApiInstance(version);
    }
    return this.instances[version];
  }
}