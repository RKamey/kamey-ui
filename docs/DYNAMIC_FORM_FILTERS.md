# Filtros en Select API - DynamicForm

La nueva funcionalidad de filtros permite filtrar las opciones que vienen de la API según criterios específicos en el campo `selectConfig.apiConfig.filterBy`.

## Configuración Básica

Para usar los filtros, agrega la propiedad `filterBy` en la configuración de la API del select:

```typescript
{
  name: 'idMenu',
  label: 'Menú',
  type: 'select',
  selectConfig: {
    apiConfig: {
      url: `${import.meta.env.VITE_API_URL}/admin/v1/menus/${etiquetaDep}`,
      method: 'GET',
      valueKey: 'id',
      labelKey: 'titulo',
      responseDataPath: 'data', // Si los datos están anidados
      filterBy: {
        field: 'tipo_menu',
        operator: 'equals',
        value: 'pagina'
      }
    }
  }
}
```

## Ejemplo con tu estructura de datos

Supongamos que tu API devuelve esta estructura:

```json
{
  "error": false,
  "message": "Menús obtenidos correctamente",
  "data": [
    {
      "id": 1,
      "titulo": "Menú con Páginas",
      "tipo_menu": "interno",
      "estatus": 1
    },
    {
      "id": 4,
      "titulo": "Contacto",
      "tipo_menu": "pagina",
      "estatus": 1
    },
    {
      "id": 5,
      "titulo": "Link Externo",
      "tipo_menu": "externo",
      "estatus": 1
    }
  ]
}
```

## Operadores Disponibles

### Operadores de Igualdad
- `equals`: Valor exacto
- `not_equals`: Valor diferente

### Operadores de Contenido
- `contains`: Contiene el texto (insensible a mayúsculas)
- `not_contains`: No contiene el texto

### Operadores Numéricos
- `greater_than`: Mayor que
- `less_than`: Menor que

### Operadores de Lista
- `in`: Valor está en la lista
- `not_in`: Valor no está en la lista

## Ejemplos de Uso con tu estructura

### 1. Solo mostrar páginas
```typescript
filterBy: {
  field: 'tipo_menu',
  operator: 'equals',
  value: 'pagina'
}
```

### 2. Excluir páginas (mostrar interno, externo, etiqueta)
```typescript
filterBy: {
  field: 'tipo_menu',
  operator: 'not_equals',
  value: 'pagina'
}
```

### 3. Solo menús activos
```typescript
filterBy: {
  field: 'estatus',
  operator: 'equals',
  value: 1
}
```

### 4. Solo tipos específicos
```typescript
filterBy: {
  field: 'tipo_menu',
  operator: 'in',
  value: ['pagina', 'interno']
}
```

### 5. Múltiples filtros: páginas activas
```typescript
filterBy: [
  {
    field: 'tipo_menu',
    operator: 'equals',
    value: 'pagina'
  },
  {
    field: 'estatus',
    operator: 'equals',
    value: 1
  }
]
```

### 6. Filtrar por posición del menú
```typescript
filterBy: {
  field: 'position_menu',
  operator: 'less_than',
  value: 3
}
```

## Ejemplos de Uso Anteriores

### Filtro Simple - Excluir páginas
```typescript
filterBy: {
  field: 'tipo_menu',
  operator: 'not_equals',
  value: 'pagina'
}
```

### Múltiples Filtros - Solo categorías activas
```typescript
filterBy: [
  {
    field: 'tipo_menu',
    operator: 'equals',
    value: 'categoria'
  },
  {
    field: 'activo',
    operator: 'equals',
    value: true
  }
]
```

### Filtro por Contenido
```typescript
filterBy: {
  field: 'titulo',
  operator: 'contains',
  value: 'Premium'
}
```

### Filtro por Lista de Valores
```typescript
filterBy: {
  field: 'id',
  operator: 'in',
  value: [1, 2, 3, 5]
}
```

### Filtro Numérico
```typescript
filterBy: {
  field: 'orden',
  operator: 'greater_than',
  value: 10
}
```

## Tipos TypeScript

```typescript
interface FilterConfig {
  field: string;
  operator: 'equals' | 'not_equals' | 'contains' | 'not_contains' | 'greater_than' | 'less_than' | 'in' | 'not_in';
  value: string | number | boolean | (string | number | boolean)[];
}

interface SelectConfig {
  apiConfig?: {
    // ... otras propiedades
    filterBy?: FilterConfig | FilterConfig[];
  };
}
```

## Comportamiento

1. **Múltiples Filtros**: Cuando se proporciona un array de filtros, todos deben cumplirse (operación AND).
2. **Filtros de Texto**: Los operadores `contains` y `not_contains` son insensibles a mayúsculas.
3. **Filtros de Lista**: Para `in` y `not_in`, el valor debe ser un array.
4. **Aplicación**: Los filtros se aplican después de recibir los datos de la API, antes de mostrar las opciones al usuario.

## Casos de Uso Comunes

### E-commerce
```typescript
// Mostrar solo productos activos y en stock
filterBy: [
  { field: 'activo', operator: 'equals', value: true },
  { field: 'stock', operator: 'greater_than', value: 0 }
]
```

### Sistema de Usuarios
```typescript
// Mostrar solo usuarios con roles específicos
filterBy: {
  field: 'rol',
  operator: 'in',
  value: ['admin', 'editor', 'moderator']
}
```

### Content Management
```typescript
// Excluir contenido borrador
filterBy: {
  field: 'estado',
  operator: 'not_equals',
  value: 'borrador'
}
```