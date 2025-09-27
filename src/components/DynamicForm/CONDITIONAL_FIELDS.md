# Campos Condicionales en DynamicForm

Esta funcionalidad permite mostrar/ocultar campos dinámicamente y modificar sus validaciones basándose en el valor de otros campos.

## Características Principales

- ✅ Mostrar/ocultar campos basado en valores de otros campos
- ✅ Cambiar validaciones dinámicamente
- ✅ Limpieza automática de valores cuando un campo se oculta
- ✅ Soporte para múltiples condiciones por campo
- ✅ Compatible con todos los tipos de campos existentes

## Configuración

### Interface `ConditionalConfig`

```typescript
interface ConditionalConfig {
  dependsOn: string; // Nombre del campo del que depende
  conditions: ConditionalRule[]; // Array de reglas de condiciones
}

interface ConditionalRule {
  value: string | number | boolean; // Valor que debe tener el campo dependiente
  show: boolean; // Si se muestra el campo cuando el valor coincide
  validations?: Validations[]; // Validaciones específicas para esta condición
}
```

### Uso en SharedFieldConfig

```typescript
const sharedFields: Record<string, SharedFieldConfig> = {
  tipo_pagina: {
    key: "tipo_pagina",
    type: "select",
    options: [
      { value: "interno", label: "Interna (contenido)" },
      { value: "externo", label: "Externa (enlace)" }
    ],
    validations: [{ required: true }]
  },
  
  etiqueta: {
    key: "etiqueta",
    type: "text",
    // Configuración condicional
    conditionalConfig: {
      dependsOn: "tipo_pagina", // Depende del campo tipo_pagina
      conditions: [
        {
          value: "interno", // Cuando tipo_pagina es "interno"
          show: true, // Mostrar el campo
          validations: [
            { required: true }, // Es requerido
            {
              regex: {
                pattern: "^[a-z0-9-]+$",
                message: "Solo letras minúsculas, números y guiones"
              }
            }
          ]
        },
        {
          value: "externo", // Cuando tipo_pagina es "externo"
          show: false, // Ocultar el campo
          validations: [] // Sin validaciones
        }
      ]
    }
  },

  external_link: {
    key: "external_link",
    type: "text",
    conditionalConfig: {
      dependsOn: "tipo_pagina",
      conditions: [
        {
          value: "externo", // Cuando tipo_pagina es "externo"
          show: true, // Mostrar el campo
          validations: [
            { required: true },
            {
              regex: {
                pattern: "^https?:\\/\\/.+\\..+",
                message: "Debe ser una URL válida"
              }
            }
          ]
        },
        {
          value: "interno", // Cuando tipo_pagina es "interno"
          show: false, // Ocultar el campo
          validations: []
        }
      ]
    }
  }
};
```

## Ejemplo Completo: Gestión de Páginas

```typescript
import { useCrudOperations } from "@/hooks/useCrudOperations";
import { SharedFieldConfig, DynamicCrudProps } from "kamey-components";
import { generateColumns, generateFields } from "kamey-components";

export const useCrudPagesConfig = (): DynamicCrudProps<Page> => {
  const crudOperations = useCrudOperations<Page, PageForm>({
    getAll: () => getPaginas(),
    create: (data) => createPagina(data),
    delete: (page) => deletePagina(page.id),
    entityName: "Página",
    idField: "id",
  });

  const sharedFields: Record<string, SharedFieldConfig> = {
    titulo: {
      key: "titulo",
      title: "Título",
      label: "Título",
      type: "text",
      validations: [{ required: true }],
    },
    
    tipo_pagina: {
      key: "tipo_pagina",
      title: "Tipo",
      label: "Tipo de Página",
      type: "select",
      options: [
        { value: "interno", label: "Interna (contenido)" },
        { value: "externo", label: "Externa (enlace)" }
      ],
      validations: [{ required: true }],
    },
    
    // Campo condicional: solo aparece para páginas internas
    etiqueta: {
      key: "etiqueta",
      title: "Etiqueta",
      label: "Etiqueta",
      type: "text",
      placeholder: ":etiqueta-nueva",
      conditionalConfig: {
        dependsOn: "tipo_pagina",
        conditions: [
          {
            value: "interno",
            show: true,
            validations: [{ required: true }],
          },
          {
            value: "externo",
            show: false,
            validations: [],
          },
        ],
      },
    },
    
    // Campo condicional: solo aparece para páginas externas
    external_link: {
      key: "external_link",
      title: "Enlace Externo",
      label: "URL Externa",
      type: "text",
      placeholder: "https://ejemplo.com",
      conditionalConfig: {
        dependsOn: "tipo_pagina",
        conditions: [
          {
            value: "externo",
            show: true,
            validations: [
              { required: true },
              {
                regex: {
                  pattern: "^https?:\\/\\/.+\\..+",
                  message: "Debe ser una URL válida (http/https)",
                },
              },
            ],
          },
          {
            value: "interno",
            show: false,
            validations: [],
          },
        ],
      },
    },
  };

  const columns = generateColumns<Page>(sharedFields);
  const fields = generateFields(sharedFields);

  return {
    columns,
    fields,
    data: crudOperations.data,
    onCreate: crudOperations.handleCreate,
    onDelete: crudOperations.handleDelete,
    loading: crudOperations.isLoading,
    onRefresh: crudOperations.refetch,
  };
};
```

## Casos de Uso Comunes

### 1. Formulario de Usuario por Roles

```typescript
{
  name: 'rol',
  type: 'select',
  options: [
    { label: 'Admin', value: 'admin' },
    { label: 'Editor', value: 'editor' }
  ]
},
{
  name: 'permisos_especiales',
  type: 'checkbox',
  conditionalConfig: {
    dependsOn: 'rol',
    conditions: [
      {
        value: 'admin',
        show: true,
        validations: [{ required: true }]
      },
      {
        value: 'editor',
        show: false,
        validations: []
      }
    ]
  }
}
```

### 2. Configuración de Envío

```typescript
{
  name: 'tipo_envio',
  type: 'select',
  options: [
    { label: 'Recogida en tienda', value: 'pickup' },
    { label: 'Envío a domicilio', value: 'delivery' }
  ]
},
{
  name: 'direccion_envio',
  type: 'textarea',
  conditionalConfig: {
    dependsOn: 'tipo_envio',
    conditions: [
      {
        value: 'delivery',
        show: true,
        validations: [{ required: true }]
      },
      {
        value: 'pickup',
        show: false,
        validations: []
      }
    ]
  }
}
```

## Comportamiento

1. **Al cambiar el valor del campo dependiente**: Los campos condicionales se evalúan automáticamente
2. **Cuando un campo se oculta**: Su valor se limpia automáticamente (`undefined`)
3. **Validaciones dinámicas**: Las validaciones cambian según la condición activa
4. **Performance**: La evaluación es eficiente y no afecta el rendimiento

## Migración desde Validaciones Estáticas

**Antes:**
```typescript
etiqueta: {
  key: "etiqueta",
  validations: [{ required: false }], // Siempre opcional
}
```

**Después:**
```typescript
etiqueta: {
  key: "etiqueta",
  conditionalConfig: {
    dependsOn: "tipo_pagina",
    conditions: [
      {
        value: "interno",
        show: true,
        validations: [{ required: true }], // Requerido solo si es interno
      },
      {
        value: "externo",
        show: false, // No se muestra si es externo
        validations: [],
      },
    ],
  },
}
```

## Notas Importantes

- Los campos con `conditionalConfig` no necesitan `validations` en el nivel superior
- Si no hay una condición que coincida, el campo se oculta por defecto
- Los campos condicionales son compatibles con todos los tipos de campo existentes
- La limpieza automática de valores previene datos inconsistentes en el formulario