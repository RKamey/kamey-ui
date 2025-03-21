const s={title:"Utilities/ApiVersioning",component:()=>null,parameters:{docsOnly:!0,docs:{description:{component:`
**ApiVersioning** es una clase para gestionar instancias de Axios con una URL base, configuración personalizada y soporte para versiones de API.

### Uso:

\`\`\`typescript
// Crear instancia sin configuración extra
const api = new ApiVersioning(import.meta.env.VITE_API_URL);

// Crear instancia con configuración personalizada
const api = new ApiVersioning(import.meta.env.VITE_API_URL, {
  headers: { 'Authorization': 'Bearer token' },
  withCredentials: true
});

// Obtener instancia con versión específica
const apiV1 = api.getInstance('v1');

// Hacer petición sin versión
const response = await api.get('/users');

// Hacer petición con versión
const response = await apiV1.get('/users');
\`\`\`

### Métodos:

- **constructor(baseUrl: string, config?: AxiosRequestConfig)**  
  Crea una nueva instancia de ApiVersioning con la URL base y configuración opcional.

- **version(version: string): AxiosInstance**  
  Alias de \`getInstance(version)\`. Devuelve una instancia de Axios configurada para una versión de la API.

- **getInstance(version: string): AxiosInstance**  
  Devuelve una instancia de Axios para la versión especificada. Si no existe, la crea.
`}}},argTypes:{baseUrl:{description:"URL base de la API.",table:{type:{summary:"string"}}},config:{description:"Configuración personalizada de Axios.",table:{type:{summary:"AxiosRequestConfig"}}},version:{description:"Alias de `getInstance(version)`. Retorna una instancia de Axios para la versión especificada.",table:{type:{summary:"(version: string) => AxiosInstance"},defaultValue:{summary:"v1"}}},getInstance:{description:"Devuelve una instancia de Axios configurada para una versión específica de la API.",table:{type:{summary:"(version: string) => AxiosInstance"},defaultValue:{summary:"v1"}}}}},e={};var a,n,i;e.parameters={...e.parameters,docs:{...(a=e.parameters)==null?void 0:a.docs,source:{originalSource:"{}",...(i=(n=e.parameters)==null?void 0:n.docs)==null?void 0:i.source}}};const r=["Documentacion"];export{e as Documentacion,r as __namedExportsOrder,s as default};
