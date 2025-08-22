/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Meta, StoryFn } from '@storybook/react';
import { DynamicCrud } from './DynamicCrud';
import { PlusOutlined, UserOutlined } from '@ant-design/icons';
import { createPermissions, createPermissionsConfig, FormField, PERMISSIONS, PermissionsProvider } from '../../main';
import { useState } from 'react';

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

export const WithPermissions = Template.bind({});
WithPermissions.args = {
  ...Default.args,
  title: 'Users with Permission System',
  description: 'Example showing how the DynamicCrud works with different user roles and permissions',
  crudName: 'users',
  actionConfig: {
    showDefaultActions: true
  }
};

WithPermissions.decorators = [
  (Story, context) => {
    const { args } = context;
    
    const permissionsConfig = createPermissionsConfig({
      users: {
        admin: PERMISSIONS.FULL_ACCESS,
        editor: createPermissions('read', 'update', 'view'),
        viewer: createPermissions('read', 'view'),
      },
      products: {
        admin: PERMISSIONS.FULL_ACCESS,
        editor: createPermissions('read', 'update', 'view'),
        viewer: createPermissions('read', 'view'),
      }
    });

    const [currentRole, setCurrentRole] = useState('admin');

    return (
      <div>
        <div style={{ marginBottom: '20px', padding: '16px', backgroundColor: '#f5f5f5', borderRadius: '8px' }}>
          <h4>Permission System Demo</h4>
          <p>Change the user role to see how permissions affect the available actions:</p>
          <div style={{ marginTop: '12px' }}>
            <label htmlFor="role-select" style={{ marginRight: '8px', fontWeight: 'bold' }}>
              Current Role:
            </label>
            <select
              id="role-select"
              value={currentRole}
              onChange={(e) => setCurrentRole(e.target.value)}
              style={{ 
                padding: '4px 8px', 
                borderRadius: '4px', 
                border: '1px solid #ccc',
                marginRight: '16px'
              }}
            >
              <option value="admin">Admin</option>
              <option value="editor">Editor</option>
              <option value="viewer">Viewer</option>
            </select>
            <span style={{ fontSize: '12px', color: '#666' }}>
              Permissions: {JSON.stringify(permissionsConfig.users[currentRole as keyof typeof permissionsConfig.users])}
            </span>
          </div>
        </div>

        <PermissionsProvider role={currentRole} config={permissionsConfig}>
          <Story {...args} />
        </PermissionsProvider>
      </div>
    );
  },
];

export const PermissionsComparison = Template.bind({});
PermissionsComparison.args = {
  ...Default.args,
  title: 'Permission Comparison',
  description: 'Side-by-side comparison of different permission levels',
  crudName: 'users',
  actionConfig: {
    showDefaultActions: true
  }
};

PermissionsComparison.decorators = [
  (_, context) => {
    const { args } = context;
    
    const permissionsConfig = createPermissionsConfig({
      users: {
        admin: PERMISSIONS.FULL_ACCESS,
        editor: createPermissions('read', 'update', 'view'),
        viewer: createPermissions('read', 'view'),
      }
    });

    const roles = ['admin', 'editor', 'viewer'];

    return (
      <div>
        <div style={{ marginBottom: '20px' }}>
          <h3>Permission System Comparison</h3>
          <p>This example shows how the same CRUD component behaves with different permission levels:</p>
          
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(3, 1fr)', 
            gap: '16px',
            marginTop: '20px'
          }}>
            {roles.map((role) => (
              <div key={role} style={{ 
                border: '1px solid #ddd', 
                borderRadius: '8px', 
                padding: '16px',
                backgroundColor: '#fafafa'
              }}>
                <h4 style={{ 
                  margin: '0 0 12px 0', 
                  textTransform: 'capitalize',
                  color: role === 'admin' ? '#52c41a' : role === 'editor' ? '#1890ff' : '#faad14'
                }}>
                  {role} Role
                </h4>
                <div style={{ fontSize: '12px', color: '#666', marginBottom: '16px' }}>
                  <strong>Permissions:</strong>
                  <br />
                  {JSON.stringify(permissionsConfig.users[role as keyof typeof permissionsConfig.users], null, 2)}
                </div>
                
                <PermissionsProvider role={role} config={permissionsConfig}>
                  <DynamicCrud
                    {...args}
                    title={`Users (${role})`}
                    data={args.data?.slice(0, 2) || []}
                    disableWrapper={true}
                  />
                </PermissionsProvider>
              </div>
            ))}
          </div>
        </div>
        
        <div style={{ 
          marginTop: '32px', 
          padding: '16px', 
          backgroundColor: '#e6f7ff', 
          borderRadius: '8px',
          border: '1px solid #91d5ff'
        }}>
          <h4>Permission System Documentation</h4>
          <div style={{ fontSize: '14px', lineHeight: '1.6' }}>
            <p><strong>Available Permissions:</strong></p>
            <ul>
              <li><code>create</code> - Allows creating new records</li>
              <li><code>read</code> - Allows viewing the table data</li>
              <li><code>update</code> - Allows editing existing records</li>
              <li><code>delete</code> - Allows deleting records</li>
              <li><code>view</code> - Allows viewing detailed record information</li>
            </ul>
            
            <p><strong>Pre-defined Permission Sets:</strong></p>
            <ul>
              <li><code>PERMISSIONS.FULL_ACCESS</code> - All permissions enabled</li>
              <li><code>createPermissions('read', 'update')</code> - Custom permission combination</li>
            </ul>
            
            <p><strong>Usage:</strong></p>
            <ol>
              <li>Create a permissions configuration using <code>createPermissionsConfig()</code></li>
              <li>Wrap your components with <code>PermissionsProvider</code></li>
              <li>The DynamicCrud will automatically apply permissions based on the current role</li>
            </ol>
          </div>
        </div>
      </div>
    );
  },
];

export const MultiResourcePermissions = Template.bind({});
MultiResourcePermissions.args = {
  ...Default.args,
};

MultiResourcePermissions.decorators = [
  (_, context) => {
    const permissionsConfig = createPermissionsConfig({
      users: {
        admin: PERMISSIONS.FULL_ACCESS,
        editor: createPermissions('read', 'update', 'view'),
        viewer: createPermissions('read', 'view'),
      },
      products: {
        admin: PERMISSIONS.FULL_ACCESS,
        editor: createPermissions('read', 'update', 'view'),
        viewer: createPermissions('read', 'view'),
      },
      orders: {
        admin: PERMISSIONS.FULL_ACCESS,
        editor: createPermissions('read', 'view'),
        viewer: createPermissions('read'),
      }
    });

    const [currentRole, setCurrentRole] = useState('editor');

    const productsData = [
      { key: '1', name: 'Laptop', price: 999, category: 'Electronics' },
      { key: '2', name: 'Mouse', price: 25, category: 'Accessories' },
    ];

    const productsColumns = [
      { title: 'Name', dataIndex: 'name', key: 'name', isPrimaryKey: false },
      { title: 'Price', dataIndex: 'price', key: 'price' },
      { title: 'Category', dataIndex: 'category', key: 'category' },
    ];

    const productsFields: FormField[] = [
      { name: 'name', label: 'Product Name', type: 'text' },
      { name: 'price', label: 'Price', type: 'number' },
      { name: 'category', label: 'Category', type: 'text' },
    ];

    return (
      <div>
        <div style={{ marginBottom: '20px', padding: '16px', backgroundColor: '#f0f2f5', borderRadius: '8px' }}>
          <h4>Multi-Resource Permission System</h4>
          <p>This example demonstrates how different resources can have different permission configurations:</p>
          <div style={{ marginTop: '12px' }}>
            <label style={{ marginRight: '8px', fontWeight: 'bold' }}>Current Role:</label>
            <select
              value={currentRole}
              onChange={(e) => setCurrentRole(e.target.value)}
              style={{ padding: '4px 8px', borderRadius: '4px', border: '1px solid #ccc' }}
            >
              <option value="admin">Admin</option>
              <option value="editor">Editor</option>
              <option value="viewer">Viewer</option>
            </select>
          </div>
        </div>

        <PermissionsProvider role={currentRole} config={permissionsConfig}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
            {/* Users CRUD */}
            <div>
              <h4>Users Management</h4>
              <p style={{ fontSize: '12px', marginBottom: '16px', color: '#666' }}>
                Permissions: {JSON.stringify(permissionsConfig.users[currentRole as keyof typeof permissionsConfig.users])}
              </p>
              <DynamicCrud
                title="Users"
                crudName='users'
                columns={context.args.columns}
                data={context.args.data}
                fields={context.args.fields}
                actionConfig={{
                  showDefaultActions: true
                }}
                showCreateButton
                showRefreshButton
                disableWrapper={true}
                onCreate={(values) => console.log('Create user:', values)}
                onEdit={(record) => console.log('Edit user:', record)}
                onDelete={(record) => console.log('Delete user:', record)}
                onView={(record) => console.log('View user:', record)}
              />
            </div>

            {/* Products CRUD */}
            <div>
              <h4>Products Management</h4>
              <p style={{ fontSize: '12px', marginBottom: '16px', color: '#666' }}>
                Permissions: {JSON.stringify(permissionsConfig.products[currentRole as keyof typeof permissionsConfig.products])}
              </p>
              <DynamicCrud
                title="Products"
                crudName='products'
                columns={productsColumns}
                data={productsData}
                fields={productsFields}
                actionConfig={{
                  showDefaultActions: true
                }}
                showCreateButton
                showRefreshButton
                disableWrapper={true}
                onCreate={(values) => console.log('Create product:', values)}
                onEdit={(record) => console.log('Edit product:', record)}
                onDelete={(record) => console.log('Delete product:', record)}
                onView={(record) => console.log('View product:', record)}
              />
            </div>
          </div>
        </PermissionsProvider>
      </div>
    );
  },
];