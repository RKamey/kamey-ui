import type { Meta, StoryObj } from "@storybook/react";
import {
  ColumnsProps,
  DynamicCrud,
  FormField,
  PERMISSIONS,
  PermissionsProvider,
  createPermissionsConfig,
} from "../../main";

const columns: ColumnsProps[] = [
  { key: "id", title: "ID", dataIndex: "id", width: 100, isPrimaryKey: true },
  { key: "name", title: "Name", dataIndex: "name", width: 200 },
  { key: "email", title: "Email", dataIndex: "email", width: 300 },
];

const data = [
  { id: 1, name: "John Doe", email: "john.doe@example.com" },
  { id: 2, name: "Jane Smith", email: "jane.smith@example.com" },
];

const formFields: FormField[] = [
  { name: "name", label: "Name", type: "text" },
  { name: "email", label: "Email", type: "email" },
];

// ✅ Ejemplo de configuración de permisos usando el helper
const permissionsConfig = createPermissionsConfig({
  users: {
    Administrador: PERMISSIONS.FULL_ACCESS,
    Coordinador: PERMISSIONS.READ_WRITE,
    Importador: PERMISSIONS.READ_ONLY,
    Invitado: PERMISSIONS.NO_ACCESS,
  },
});

const meta: Meta<typeof PermissionsProvider> = {
  title: "Components/PermissionProvider",
  parameters: {
    docs: {
      description: {
        component: `
**PermissionsProvider** es un Context Provider que maneja los permisos y roles de la aplicación.  

Su uso más común es en conjunto con **DynamicCrud**, donde dependiendo del rol y los permisos definidos, se habilitan o deshabilitan automáticamente las acciones del CRUD (crear, editar, eliminar, refrescar, exportar, etc.).

---

### 🔹 Helpers incluidos

\`createPermissionsConfig\` → Helper para crear configuraciones tipadas de permisos por recurso.  
\`PERMISSIONS\` → Conjunto de permisos predefinidos para distintos niveles de acceso:  

- **FULL_ACCESS** → \`['create','read','update','delete','view','refresh','export']\`  
- **READ_WRITE** → \`['create','read','update','view','refresh']\`  
- **READ_ONLY** → \`['read','view']\`  
- **VIEW_ONLY** → \`['view']\`  
- **NO_ACCESS** → \`[]\`  

\`createPermissions(...actions)\` → Helper para definir permisos personalizados.

---

### 🔹 Ejemplo de Configuración
\`\`\`ts
const permissionsConfig = createPermissionsConfig({
  users: {
    Administrador: PERMISSIONS.FULL_ACCESS,
    Coordinador: PERMISSIONS.READ_WRITE,
    Importador: PERMISSIONS.READ_ONLY,
  },
});
\`\`\`

Este objeto se pasa al \`PermissionsProvider\`, junto con el rol actual del usuario (\`role\`).
        `,
      },
    },
  },
  component: PermissionsProvider,
  argTypes: {
    role: {
      control: "text",
      description:
        'Rol actual del usuario (ej: "Administrador", "Coordinador", "Importador")',
    },
    config: {
      control: "object",
      description: "Configuración de permisos por recurso y rol",
    },
    children: {
      control: false,
      description: "Componentes hijos que consumirán el contexto de permisos",
    },
  },
} satisfies Meta<typeof PermissionsProvider>;

export default meta;

type Story = StoryObj<typeof meta>;

// 🔹 Ejemplo 1: Importador (solo lectura)
export const ImportadorRole: Story = {
  args: {
    role: "Importador",
    config: permissionsConfig,
    children: (
      <div className="bg-white shadow-xl rounded-2xl p-6">
        <DynamicCrud
          title="Users"
          crudName="users"
          columns={columns}
          data={data}
          fields={formFields}
          disableWrapper
          showCreateButton
          actionConfig={{ showDefaultActions: true }}
          showRefreshButton
          onRefresh={() => console.log("refresh users")}
          onCreate={(values: Record<string, unknown>) =>
            console.log("create", values)
          }
          onEdit={(record: Record<string, unknown>) =>
            console.log("edit", record)
          }
          onDelete={(record: Record<string, unknown>) =>
            console.log("delete", record)
          }
          onView={(record: Record<string, unknown>) =>
            console.log("view", record)
          }
        />
      </div>
    ),
  },
};

// 🔹 Ejemplo 2: Administrador (todos los permisos)
export const AdminRole: Story = {
  args: {
    role: "Administrador",
    config: permissionsConfig,
    children: (
      <DynamicCrud
        title="Users"
        crudName="users"
        columns={columns}
        data={data}
        fields={formFields}
        showCreateButton
        actionConfig={{ showDefaultActions: true }}
        showRefreshButton
      />
    ),
  },
};
