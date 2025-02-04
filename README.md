# KameyUI

KameyUI es una librería de componentes para la creación de interfaces de usuario. 

## Documentación
[Documentación de KameyUI](https://kameyui-web-starlight.netlify.app/)


## Instalación

```bash
bun i kamey-components
```

## Peer Dependencies
Esta librería requiere que se instalen los siguientes paquetes:

```bash
npm install react react-dom antd axios dayjs
```

## Uso

```tsx
import { DynamicTable } from 'kamey-components'

<DynamicTable />
```

## Componentes

DynamicCrud
El componente DynamicCrud es un wrapper que combina los componentes DynamicTable y DynamicForm para crear una interfaz CRUD completa.

## Props

| Propiedad           | Tipo                           | Descripción                                             |
|---------------------|--------------------------------|---------------------------------------------------------|
| columns             | ColumnsProps[]                 | Las columnas de la tabla.                               |
| data                | unknown[]                      | Los datos de la tabla.                                  |
| title               | string                         | El título de la tabla.                                  |
| formTitle           | string                         | El título del formulario.                               |
| description         | string                         | La descripción de la tabla.                             |
| formDescription     | string                         | La descripción del formulario.                          |
| fields              | FormField[]                    | Los campos del formulario.                              |
| showCreateButton    | boolean                        | Indica si se debe mostrar el botón de crear.            |
| createButtonText    | string                         | El texto del botón de crear.                            |
| createButtonIcon    | React.ReactElement             | El icono del botón de crear.                            |
| icon                | React.ElementType              | El icono de la tabla.                                   |
| layout              | `"horizontal" \| "vertical"`   | El diseño del formulario.                               |
| actionConfig        | ActionConfig                   | La configuración de acciones de la tabla.               |
| searchConfig        | SearchConfig                   | La configuración de búsqueda de la tabla.               |
| loading             | boolean                        | Indica si la tabla está cargando.                       |
| onCreate            | OnCreateHandler                | Función que se ejecuta al hacer clic en el botón de crear. |
| createRedirect      | boolean                        | Indica si se debe redirigir al formulario de creación.  |
| onEdit              | (record: unknown) => void      | Función que se ejecuta al hacer clic en el botón de editar. |
| onDelete            | (record: unknown) => void      | Función que se ejecuta al hacer clic en el botón de eliminar. |
| submitButtonText    | string                         | El texto del botón de enviar en el formulario.          |
| apiConfig           | ApiConfig                      | La configuración de la API para el formulario.          |
| initialData         | Record<string, unknown>        | Los datos iniciales del formulario.                     |
| themeConfig         | ThemeConfig                    | La configuración del tema.                              |
| moreActions         | MoreActions[]                  | Acciones adicionales para la tabla.                     |
| formCols            | `1 \| 2 \| 3 \| 4`             | Número de columnas del formulario.                      |
| formCustomCols      | boolean                        | Indica si se usan columnas personalizadas en el formulario. |

## Ejemplo de uso

```tsx	
import { DynamicCrud, ColumnsProps, FormField } from 'kamey-components';

const columns: ColumnsProps[] = [
  { title: 'Nombre', dataIndex: 'name', key: 'name' },
  { title: 'Edad', dataIndex: 'age', key: 'age' },
];

const fields: FormField[] = [
  { name: 'name', label: 'Nombre', type: 'text' },
  { name: 'age', label: 'Edad', type: 'number' },
];

const data = [
  { name: 'Juan', age: 25 },
  { name: 'Ana', age: 30 },
];

const App = () => (
  <DynamicCrud
    title="Usuarios"
    columns={columns}
    data={data}
    fields={fields}
    showCreateButton
    onCreate={(values) => console.log('Crear:', values)}
    onEdit={(record) => console.log('Editar:', record)}
    onDelete={(record) => console.log('Eliminar:', record)}
  />
);
```

## DynamicForm

El componente DynamicForm es un formulario dinámico que permite crear y actualizar registros.

### Props

| Propiedad         | Tipo                           | Descripción                                      |
|-------------------|--------------------------------|--------------------------------------------------|
| mode              | `"create" \| "update"`         | El modo del formulario (crear o actualizar).     |
| title             | string                         | El título del formulario.                        |
| description       | string                         | La descripción del formulario.                   |
| icon              | React.ElementType              | El icono del formulario.                         |
| layout            | `"vertical" \| "horizontal"`   | El diseño del formulario.                        |
| cols              | `1 \| 2 \| 3 \| 4`             | Número de columnas del formulario.               |
| fields            | `FormField[] \| FormField[][]` | Los campos del formulario.                       |
| submitButtonText  | string                         | El texto del botón de enviar.                    |
| onSubmit          | (data: unknown) => void        | Función que se ejecuta al enviar el formulario.  |
| apiConfig         | ApiConfig                      | La configuración de la API para el formulario.   |
| initialData       | Record<string, unknown>        | Los datos iniciales del formulario.              |
| customCols        | boolean                        | Indica si se usan columnas personalizadas en el formulario. |

### Ejemplo de uso

```tsx
import { DynamicForm, FormField } from 'kamey-components';

const fields: FormField[] = [
  { name: 'name', label: 'Nombre', type: 'text' },
  { name: 'age', label: 'Edad', type: 'number' },
];

const App = () => (
  <DynamicForm
    title="Crear usuario"
    fields={fields}
    onSubmit={(values) => console.log('Enviar:', values)}
  />
);
```

## DynamicTable

El componente DynamicTable es una tabla dinámica que permite mostrar y gestionar datos.

### Props

| Propiedad           | Tipo                           | Descripción                                             |
|---------------------|--------------------------------|---------------------------------------------------------|
| title               | string                         | El título de la tabla.                                  |
| icon                | React.ElementType              | El icono de la tabla.                                   |
| description         | string                         | La descripción de la tabla.                             |
| showCreateButton    | boolean                        | Indica si se debe mostrar el botón de crear.            |
| onCreate            | () => void                     | Función que se ejecuta al hacer clic en el botón de crear. |
| onEdit              | (record: unknown) => void      | Función que se ejecuta al hacer clic en el botón de editar. |
| onDelete            | (record: unknown) => void      | Función que se ejecuta al hacer clic en el botón de eliminar. |
| createButtonText    | string                         | El texto del botón de crear.                            |
| createButtonIcon    | React.ReactElement             | El icono del botón de crear.                            |
| columns             | ColumnsProps[]                 | Las columnas de la tabla.                               |
| data                | unknown[]                      | Los datos de la tabla.                                  |
| loading             | boolean                        | Indica si la tabla está cargando.                       |
| actionConfig        | ActionConfig                   | La configuración de acciones de la tabla.               |
| searchConfig        | SearchConfig                   | La configuración de búsqueda de la tabla.               |
| themeConfig         | ThemeConfig                    | La configuración del tema.                              |

### Ejemplo de uso

```tsx
import { DynamicTable, ColumnsProps } from 'kamey-components';

const columns: ColumnsProps[] = [
  { title: 'Nombre', dataIndex: 'name', key: 'name' },
  { title: 'Edad', dataIndex: 'age', key: 'age' },
];

const data = [
  { name: 'Juan', age: 25 },
  { name: 'Ana', age: 30 },
];

const App = () => (
  <DynamicTable
    title="Usuarios"
    columns={columns}
    data={data}
    showCreateButton
    onCreate={() => console.log('Crear nuevo usuario')}
    onEdit={(record) => console.log('Editar:', record)}
    onDelete={(record) => console.log('Eliminar:', record)}
  />
);
```

## Guía de desarrollo

### Estructura de ramas

- `main` (producción)
  - `feature/*` (nuevas características)
  - `fix/*` (correcciones)
  - `chore/*` (configuración/mantenimiento)
  - `docs/*` (documentación)
- `dev` (desarrollo)

## Flujo de trabajo

### 1. Crear una nueva rama desde `main`

```bash
git checkout -b <tipo>/<descripcion-corta>

# Ejemplos:
git checkout -b feature/new-component
git checkout -b fix/button-style
git checkout -b chore/update-docs
```

### 2. Realizar commits siguiendo la convención:

#### Tipos de Commit y Versionado

##### PATCH (0.0.x):

```bash
git commit -m "fix: corregir bug en el componente Button"
git commit -m "chore: actualizar documentación"
git commit -m "docs: actualizar README"
git commit -m "style: actualizar estilos"
git commit -m "refactor: refactorizar código"
```

##### MINOR (0.x.0):

```bash
git commit -m "feat: agregar nuevo componente DynamicTable"
```

##### MAJOR (x.0.0):

```bash
git commit -m "feat: rediseño de API BREAKING CHANGE"
```

### 3. Crear un pull request a `main`

### Estructura del PR

```
[Tipo] Descripción del cambio

Descripción: Explicación detallada del cambio, incluyendo motivación y contexto.

Cambios realizados: Lista de cambios realizados en el PR

Tipo de cambio: 
- [ ] Configuración (chore)
- [ ] Nueva característica (feature)
- [ ] Corrección (fix)
- [ ] Breaking change
- [ ] Documentación (docs)
```

## Reglas importantes

- No se debe hacer commits a `main` directamente, siempre a través de un PR.
- Cada feature/fix debe tener su propia rama.
- Los commits deben seguir estrictamente el formato para el versionado automático.

### Ejemplos de flujo completo

```bash
# Nueva característica
git checkout -b feature/nuevo-dropdown
git commit -m "feat: implementación inicial del dropdown"
git commit -m "test: agregados tests para dropdown"
git push origin feature/nuevo-dropdown
# Crear PR con título "feat: Nuevo componente Dropdown"

# Corrección de bug

git checkout -b fix/modal-overflow
git commit -m "fix: corregido overflow en modal en dispositivos móviles"
git push origin fix/modal-overflow
# Crear PR con título "fix: Corrección overflow en modal"
```
