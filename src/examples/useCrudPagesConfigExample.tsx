// Ejemplo de cómo usar campos condicionales con la nueva funcionalidad
import React from "react";
import { SharedFieldConfig, DynamicCrudProps } from "../main";

// Simulando las interfaces que tendrías en tu proyecto
interface Page {
  id: string;
  titulo: string;
  tipo_pagina: "interno" | "externo";
  etiqueta?: string;
  external_link?: string;
  idMenu?: string;
  estatus: boolean;
}

interface CreatePageBody extends Omit<Page, 'id'> {
  etiquetaDependencia: string;
}

interface PageForm extends Omit<Page, 'id'> {}

// Ejemplo de cómo modificar tu useCrudPagesConfig para usar campos condicionales
export const useCrudPagesConfigExample = (): DynamicCrudProps<Page> & {
  onCreate: (data: CreatePageBody) => void;
  loading: boolean;
  onRefresh: () => void;
} => {
  // Aquí irían tus operaciones CRUD existentes
  // const crudOperations = useCrudOperations<Page, PageForm>({...});

  const sharedFields: Record<string, SharedFieldConfig> = {
    id: {
      key: "id",
      title: "Id",
      hiddenInForm: true,
      sorter: true,
    },
    titulo: {
      key: "titulo",
      title: "Título",
      label: "Título",
      type: "text",
      placeholder: ":titulo-nuevo",
      validations: [
        {
          required: true,
        },
      ],
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
      validations: [
        {
          required: true,
        },
      ],
      render: (value: unknown) => {
        const tipo = value as string;
        return tipo === 'externo' ?
          React.createElement('span', { className: "px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full" }, 'Externa') :
          React.createElement('span', { className: "px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full" }, 'Interna');
      },
    },
    // CAMPO CONDICIONAL: etiqueta - solo se muestra y es requerido cuando tipo_pagina es "interno"
    etiqueta: {
      key: "etiqueta",
      title: "Etiqueta",
      label: "Etiqueta",
      type: "text",
      placeholder: ":etiqueta-nueva",
      // Configuración condicional: se muestra solo cuando tipo_pagina es "interno"
      conditionalConfig: {
        dependsOn: "tipo_pagina",
        conditions: [
          {
            value: "interno",
            show: true,
            validations: [
              {
                required: true,
              },
            ],
          },
          {
            value: "externo",
            show: false,
            validations: [],
          },
        ],
      },
    },
    // CAMPO CONDICIONAL: external_link - solo se muestra y es requerido cuando tipo_pagina es "externo"
    external_link: {
      key: "external_link",
      title: "Enlace Externo",
      label: "URL Externa",
      type: "text",
      placeholder: "https://ejemplo.com",
      width: 300,
      render: (value: unknown) => {
        const url = value as string;
        if (url) {
          return React.createElement('a', {
            href: url,
            target: "_blank",
            rel: "noopener noreferrer",
            className: "!text-blue-600 underline dark:!text-blue-400 truncate block max-w-xs"
          }, url);
        }
        return "-";
      },
      // Configuración condicional: se muestra solo cuando tipo_pagina es "externo"
      conditionalConfig: {
        dependsOn: "tipo_pagina",
        conditions: [
          {
            value: "externo",
            show: true,
            validations: [
              {
                required: true,
              },
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
    idMenu: {
      key: "idMenu",
      title: "Menú",
      label: "Menú",
      type: "select",
      selectConfig: {
        apiConfig: {
          url: `${import.meta.env.VITE_API_URL}/admin/v1/menus/example`,
          method: "GET",
          valueKey: "id",
          labelKey: "titulo",
        },
      },
    },
    estatus: {
      key: "estatus",
      title: "Estatus",
      label: "Estatus",
      type: "switch",
      render: (value: unknown) => {
        // Aquí iría tu función getActiveTag
        return value ? "Activo" : "Inactivo";
      },
    },
  };

  // Generar columnas y campos usando las funciones existentes
  // const columns = generateColumns<Page>(sharedFields);
  // const fields = generateFields(sharedFields);

  return {
    columns: [], // generateColumns<Page>(sharedFields),
    fields: [], // generateFields(sharedFields),
    formCols: 2 as 1 | 2 | 3 | 4 | undefined,
    createButtonText: "Crear Página",
    submitButtonText: "Guardar",
    showSearchBar: true,
    showRefreshButton: true,
    data: [], // crudOperations.data,
    disableWrapper: true,
    onCreate: () => {}, // crudOperations.handleCreate,
    onDelete: () => {}, // crudOperations.handleDelete,
    loading: false, // crudOperations.isLoading,
    onRefresh: () => {}, // crudOperations.refetch,
  };
};