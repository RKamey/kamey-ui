export type Permission = 'create' | 'read' | 'update' | 'delete' | 'view' | 'refresh' | 'export';

export type CrudPermissions = Record<string, Permission[]>;

export type PermissionConfig = Record<string, CrudPermissions>;
