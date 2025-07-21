/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Meta, StoryFn } from '@storybook/react';
import { DynamicCrud } from './DynamicCrud';
import { PlusOutlined, UserOutlined } from '@ant-design/icons';

const meta: Meta<typeof DynamicCrud> = {
  title: 'Components/DynamicCrud',
  component: DynamicCrud,
  parameters: {
    docs: {
      description: {
        component:
          `El componente DynamicCrud permite generar un CRUD dinámico basado en configuraciones de columnas, campos y datos.
          Este componente es una recopilacion de los componentes DynamicTable y DynamicForm, permitiendo la creación, edición y eliminación de registros de una tabla.`,
      },
    },
  },
  argTypes: {
    // Títulos y descripciones
    title: {
      description: 'Título del componente.',
      table: {
        type: { summary: 'string | React.ReactElement' },
        defaultValue: { summary: 'Example DynamicCrud' },
      },
    },
    formTitle: {
      description: 'Título del formulario de creación/edición.',
      table: {
        type: { summary: 'string | React.ReactElement' },
        defaultValue: { summary: 'Create' },
      },
    },
    formTitles: {
      description: 'Títulos personalizados para los formularios [crear, editar, ver].',
      table: {
        type: { summary: 'string[]' },
        defaultValue: { summary: '["Create", "Update", "View"]' },
      },
    },
    description: {
      description: 'Descripción del componente.',
      table: {
        type: { summary: 'string | React.ReactElement' },
      },
    },
    formDescription: {
      description: 'Descripción del formulario de creación/edición.',
      table: {
        type: { summary: 'string | React.ReactElement' },
      },
    },

    // Configuración de tabla y formulario
    columns: {
      description: 'Configura las columnas de la tabla.',
      table: {
        type: { summary: 'ColumnsProps[]' },
        defaultValue: { summary: '[]' },
      },
    },
    data: {
      description: 'Datos que se mostrarán en la tabla.',
      table: {
        type: { summary: 'unknown[]' },
      },
    },
    fields: {
      description: 'Define los campos del formulario.',
      table: {
        type: { summary: 'FormField[]' },
      },
    },

    // Botón de crear
    showCreateButton: {
      description: 'Muestra u oculta el botón de creación.',
      control: { type: 'boolean' },
      table: {
        defaultValue: { summary: 'true' },
        type: { summary: 'boolean' },
      },
    },
    createButtonText: {
      description: 'Texto a mostrar en el botón de creación.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'Crear' },
      },
    },
    createButtonIcon: {
      description: 'Icono a mostrar en el botón de creación.',
      table: {
        type: { summary: 'React.ReactElement' },
      },
    },
    createRedirect: {
      description: 'Determina si se redirige al hacer clic en crear.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },

    // Configuración del formulario
    submitButtonText: {
      description: 'Texto a mostrar en el botón de envío del formulario.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'Guardar' },
      },
    },
    layout: {
      description: 'Establece el diseño del formulario.',
      options: ['horizontal', 'vertical'],
      control: { type: 'select' },
      table: {
        type: { summary: '"horizontal" | "vertical"' },
        defaultValue: { summary: 'vertical' },
      }
    },
    formCols: {
      description: 'Número de columnas del formulario.',
      options: [1, 2, 3, 4],
      control: { type: 'select' },
      table: {
        type: { summary: '1 | 2 | 3 | 4' },
        defaultValue: { summary: '1' },
      }
    },
    formCustomCols: {
      description: 'Permite las columnas personalizadas en el formulario.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      }
    },

    // Iconos y tema
    icon: {
      description: 'Icono a mostrar en el título del componente.',
      table: {
        type: { summary: 'React.ReactElement' },
      },
    },
    themeConfig: {
      description: 'Configuración del tema.',
      table: {
        type: { summary: 'ThemeConfig' },
      },
    },

    // Configuración de acciones
    actionConfig: {
      description: 'Configuración de las acciones de la tabla.',
      table: {
        type: { summary: 'ActionConfig' },
      },
    },
    hiddenActions: {
      description: 'Oculta las acciones de la tabla.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    moreActions: {
      description: 'Acciones adicionales a mostrar en la tabla.',
      table: {
        type: { summary: 'MoreActions[]' },
      }
    },
    showView: {
      description: 'Muestra u oculta la acción de ver detalles.',
      table: {
        type: { summary: 'boolean' },
      },
    },

    // Configuración de búsqueda y filtros
    searchConfig: {
      description: 'Configuración de la barra de búsqueda.',
      table: {
        type: { summary: 'SearchConfig' },
      },
    },
    showSearchBar: {
      description: 'Muestra u oculta la barra de búsqueda.',
      table: {
        type: { summary: 'boolean' },
      },
    },
    customFilters: {
      description: 'Filtros personalizados para la tabla.',
      table: {
        type: { summary: 'CustomFilters[]' },
      }
    },

    // Estado y controles
    showRefreshButton: {
      description: 'Determina si se muestra el botón de actualización.',
      table: {
        type: { summary: 'boolean' },
      },
    },
    loading: {
      description: 'Determina si se muestra el indicador de carga.',
      table: {
        type: { summary: 'boolean' },
      },
    },
    headerDirection: {
      description: 'Dirección de la cabecera del componente.',
      options: ['horizontal', 'vertical'],
      control: { type: 'select' },
      table: {
        type: { summary: '"horizontal" | "vertical"' },
        defaultValue: { summary: 'horizontal' },
      },
    },

    // Callbacks/Handlers
    onRefresh: {
      description: 'Función que se ejecuta al actualizar los datos.',
      table: {
        type: { summary: '() => void' },
      },
    },
    onCreate: {
      description: 'Función que se ejecuta al crear un nuevo registro.',
      table: {
        type: { summary: 'OnCreateHandler' },
      },
    },
    onEdit: {
      description: 'Función que se ejecuta al editar un registro existente.',
      table: {
        type: { summary: '(record: T) => void' },
      },
    },
    onDelete: {
      description: 'Función que se ejecuta al eliminar un registro.',
      table: {
        type: { summary: '(record: T) => void' },
      },
    },
    onView: {
      description: 'Función que se ejecuta al ver los detalles de un registro.',
      table: {
        type: { summary: '(record: T) => void' },
      },
    },

    // Configuración adicional
    apiConfig: {
      description: 'Configuración de la API.',
      table: {
        type: { summary: 'ApiConfig' },
      },
    },
    initialData: {
      description: 'Datos iniciales del formulario para modo edición.',
      table: {
        type: { summary: 'T' },
      },
    },
    exportToExcel: {
      description: 'Configuración para exportar los datos a Excel.',
      table: {
        type: { summary: 'ExcelConfigProps' },
      }
    },
    backButton: {
      description: 'Muestra un botón de retroceso o elemento personalizado.',
      table: {
        type: { summary: 'boolean | React.ReactElement' },
      }
    },
    disableWrapper: {
      description: 'Deshabilita el contenedor del componente.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      }
    },
  },
};

export default meta;

const Template: StoryFn<typeof DynamicCrud> = (args) => <DynamicCrud {...args} />;

export const Default = Template.bind({});
Default.args = {
  // Títulos y descripciones
  title: 'User Management',
  description: 'Manage users in the system',
  formTitles: ['Create User', 'Edit User', 'View User'],
  formDescription: 'Fill out the form to manage user information',

  // Configuración de tabla y formulario
  columns: [
    { 
      title: 'Name', 
      dataIndex: 'name', 
      key: 'name', 
      sorter: true, 
      isPrimaryKey: false,
      filters: [
        { text: 'John Brown', value: 'John Brown' },
        { text: 'Jim Green', value: 'Jim Green' },
        { text: 'Joe Black', value: 'Joe Black' },
        { text: 'Jane Doe', value: 'Jane Doe' },
      ],
      onFilter: (value, record) => (record as any).name.includes(value),
    },
    { 
      title: 'Age', 
      dataIndex: 'age', 
      key: 'age', 
      sorter: true,
    },
    { 
      title: 'Email', 
      dataIndex: 'email', 
      key: 'email',
    },
    { 
      title: 'Address', 
      dataIndex: 'address', 
      key: 'address',
      filters: [
        { text: 'New York No. 1 Lake Park', value: 'New York No. 1 Lake Park' },
        { text: 'London No. 1 Lake Park', value: 'London No. 1 Lake Park' },
        { text: 'Sidney No. 1 Lake Park', value: 'Sidney No. 1 Lake Park' },
        { text: 'Toronto No. 2 Lake Park', value: 'Toronto No. 2 Lake Park' },
      ],
      onFilter: (value, record) => (record as any).address.includes(value),
    },
  ],
  fields: [
    { name: 'name', label: 'Full Name', type: 'text' },
    { name: 'age', label: 'Age', type: 'number' },
    { name: 'email', label: 'Email', type: 'email' },
    { name: 'address', label: 'Address', type: 'textarea' },
  ],
  data: [
    { key: '1', name: 'John Brown', age: 32, email: 'john@example.com', address: 'New York No. 1 Lake Park' },
    { key: '2', name: 'Jim Green', age: 42, email: 'jim@example.com', address: 'London No. 1 Lake Park' },
    { key: '3', name: 'Joe Black', age: 32, email: 'joe@example.com', address: 'Sidney No. 1 Lake Park' },
    { key: '4', name: 'Jane Doe', age: 28, email: 'jane@example.com', address: 'Toronto No. 2 Lake Park' },
  ],

  // Botón de crear
  showCreateButton: true,
  createButtonText: 'Add New User',
  createButtonIcon: <PlusOutlined />,
  createRedirect: false,

  // Configuración del formulario
  submitButtonText: 'Save User',
  layout: 'vertical',
  formCols: 2,
  formCustomCols: false,

  // Iconos y tema
  icon: <UserOutlined />,
  themeConfig: {
    components: {
      Table: {
        headerBg: '#f0f2f5',
      },
    },
  },

  // Configuración de acciones
  hiddenActions: false,
  showView: true,
  moreActions: [
    {
      key: 'promote',
      label: 'Promote',
      className: '!bg-blue-600 !text-white',
      onClick: (record) => alert(`Promoting ${record.name}`),
    },
    {
      key: 'suspend',
      label: 'Suspend',
      className: '!bg-orange-600 !text-white',
      onClick: (record) => alert(`Suspending ${record.name}`),
    },
  ],

  // Configuración de búsqueda y filtros
  showSearchBar: true,
  searchConfig: {
      searchableFields: ['name', 'email', 'address'],
  },

  // Estado y controles
  showRefreshButton: true,
  loading: false,
  headerDirection: 'horizontal',

  // Callbacks/Handlers
  onCreate: (values) => {
    console.log('Creating user:', values);
    alert(`Creating user: ${JSON.stringify(values, null, 2)}`);
  },
  onEdit: (record) => {
    console.log('Editing user:', record);
    alert(`Editing user: ${record.name}`);
  },
  onDelete: (record) => {
    console.log('Deleting user:', record);
    alert(`Deleting user: ${record.name}`);
  },
  onView: (record) => {
    console.log('Viewing user:', record);
    alert(`Viewing user: ${record.name}`);
  },
  onRefresh: () => {
    console.log('Refreshing data...');
    alert('Refreshing user data...');
  },

  // Configuración adicional
  backButton: false,
  disableWrapper: false,
};

export const WithExcelExport = Template.bind({});
WithExcelExport.args = {
  ...Default.args,
  exportToExcel: {
    fileName: 'users-export',
    sheetName: 'Users',
    buttonProps: {
      className: 'bg-blue-500 text-white',
      style: { marginBottom: '16px' },
      text: 'Export to Excel',
    },
    data: [],
    columns: []
  },
};

export const WithCustomFilters = Template.bind({});
WithCustomFilters.args = {
  ...Default.args,
  customFilters: [
    {
      key: 'ageRange',
      label: 'Age Range',
      onClick: (record) => {
        // Implement filter logic here
        alert(`Filtering by age range: ${JSON.stringify(record)}`);
      },
    },
  ],
};

export const MinimalSetup = Template.bind({});
MinimalSetup.args = {
  columns: [
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Status', dataIndex: 'status', key: 'status' },
  ],
  fields: [
    { name: 'name', label: 'Name', type: 'text' },
    { name: 'status', label: 'Status', type: 'select', options: [
      { label: 'Active', value: 'active' },
      { label: 'Inactive', value: 'inactive' },
    ]}
  ],
  data: [
    { key: '1', name: 'Item 1', status: 'Active' },
    { key: '2', name: 'Item 2', status: 'Inactive' },
  ],
};