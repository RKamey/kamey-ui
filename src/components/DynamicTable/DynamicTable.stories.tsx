import type { Meta, StoryObj } from '@storybook/react';

import { DynamicTable } from './DynamicTable';

const meta: Meta<typeof DynamicTable> = {
  component: DynamicTable,
  title: 'Components/DynamicTable',
  parameters: {
    docs: {
      description: {
        component:
          `**DynamicTable** es un componente que permite mostrar una tabla dinámica con opciones de exportación, filtros y acciones personalizadas.`,
      },
    },
  },
  argTypes: {
    title: {
      description: 'Título del componente.',
      table: {
        type: { summary: 'string | React.ReactElement' },
        defaultValue: { summary: 'Example DynamicTable' },
      },
    },
    description: {
      description: 'Descripción del componente.',
      table: {
        type: { summary: 'string | React.ReactElement' },
      },
    },
    icon: {
      description: 'Icono del componente.',
      table: {
        type: { summary: 'React.ReactElement' },
      },
    },
    columns: {
      description: 'Configura las columnas de la tabla.',
      table: {
        type: { summary: 'Array<{ title: string; dataIndex: string; key: string, sorter?: boolean| { compare: (a: any, b: any) => number }, render?: (text: string, record: Record<string, unknown>) => React.ReactNode }>' },
      },
    },
    data: {
      description: 'Datos que se mostrarán en la tabla.',
      table: {
        type: { summary: 'Array<{ key: string; name: string; age: number; address: string }>' },
      },
    },
    exportToExcel: {
      description: 'Configuración para exportar los datos de la tabla a un archivo Excel.',
      table: {
        type: { summary: 'ExcelExportConfig' },
      },
    },
    createButtonIcon: {
      description: 'Icono para el botón de creación de registros.',
      table: {
        type: { summary: 'React.ReactElement' },
      },
    },
    moreActions: {
      description: 'Acciones adicionales para la tabla.',
      table: {
        type: { summary: 'Array<ActionButton>' },
      },
    },
    customFilters: {
      description: 'Configuración de filtros personalizados.',
      table: {
        type: { summary: 'CustomFilterConfig' },
      },
    },
    actionConfig: {
      description: 'Configuración de acciones personalizadas.',
      table: {
        type: { summary: 'ActionConfig' },
      },
    },
    searchConfig: {
      description: 'Configuración de búsqueda.',
      table: {
        type: { summary: 'SearchConfig' },
      },
    },
    onCreate: {
      description: 'Función que se ejecuta al crear un registro.',
      table: {
        type: { summary: '(values: Record<string, unknown>) => void' },
      },
    },
    onEdit: {
      description: 'Función que se ejecuta al editar un registro.',
      table: {
        type: { summary: '(record: Record<string, unknown>) => void' },
      },
    },
    onView: {
      description: 'Función que se ejecuta al ver un registro.',
      table: {
        type: { summary: '(record: Record<string, unknown>) => void' },
      },
    },
    onDelete: {
      description: 'Función que se ejecuta al eliminar un registro.',
      table: {
        type: { summary: '(record: Record<string, unknown>) => void' },
      },
    },
    onRefresh: {
      description: 'Función que se ejecuta al refrescar la tabla.',
      table: {
        type: { summary: '() => void' },
      },
    },
    customCols: {
      description: 'Columnas personalizadas para la tabla.',
      table: {
        type: { summary: 'CustomCols' },
      },
    },
    showCreateButton: {
      description: 'Muestra u oculta el botón de creación de registros.',
      table: {
        type: { summary: 'boolean' },
      },
    },
    showRefreshButton: {
      description: 'Muestra u oculta el botón de refrescar la tabla.',
      table: {
        type: { summary: 'boolean' },
      },
    },
    disableWrapper: {
      description: 'Desactiva el contenedor de la tabla.',
      table: {
        type: { summary: 'boolean' },
      },
    },
    headerDirection: {
      description: 'Dirección del encabezado de la tabla.',
      table: {
        type: { summary: 'RowDirection' },
      },
    },
    className: {
      description: 'Clase personalizada para el componente.',
      table: {
        type: { summary: 'string' },
      },
    },
    loading: {
      description: 'Determina si se muestra el indicador de carga.',
      table: {
        type: { summary: 'boolean' },
      },
    },
    showSearchBar: {
      description: 'Muestra u oculta la barra de búsqueda.',
      table: {
        type: { summary: 'boolean' },
      },
    },
    createButtonText: {
      description: 'Texto del botón de creación de registros.',
      table: {
        type: { summary: 'string' },
      },
    },
    backButton: {
      description: 'Muestra u oculta el botón de regreso.',
      table: {
        type: { summary: 'boolean | React.ReactElement' },
      },
    },
    themeConfig: {
      description: 'Configuración de temas.',
      table: {
        type: { summary: 'ThemeConfig' },
      },
    },
  }
} satisfies Meta<typeof DynamicTable>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Example DynamicTable',
    description: 'This is an example of DynamicTable component',
    columns: [
      { title: 'Name', dataIndex: 'name', key: 'name', sorter: true },
      { title: 'Age', dataIndex: 'age', key: 'age' },
      { title: 'Address', dataIndex: 'address', key: 'address' },
    ],
    data: [
      { key: '1', name: 'John Brown', age: 32, address: 'New York No. 1 Lake Park' },
      { key: '2', name: 'Jim Green', age: 42, address: 'London No. 1 Lake Park' },
      { key: '3', name: 'Joe Black', age: 32, address: 'Sidney No. 1 Lake Park' },
    ],
    showCreateButton: true,
    showRefreshButton: true,
    disableWrapper: false,
    exportToExcel: {
      fileName: 'example',
      sheetName: 'example',
    },
    backButton: true,
    customCols: false,
  }
};