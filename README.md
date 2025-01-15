# KameyUI

KameyUI es una librería de componentes para la creación de interfaces de usuario. 

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
