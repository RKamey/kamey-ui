export type Permission = 'create' | 'read' | 'update' | 'delete' | 'view';
export type PermissionAlias = 'c' | 'r' | 'u' | 'd' | 'v';

export type CrudPermissions = Record<string, (Permission[] | PermissionAlias[])>;
export type PermissionConfig = Record<string, CrudPermissions>;

export const PERMISSION_ALIASES: Record<PermissionAlias, Permission> = {
  'c': 'create',
  'r': 'read', 
  'u': 'update',
  'd': 'delete',
  'v': 'view'
};

export const normalizePermission = (permission: Permission | PermissionAlias): Permission => {
  return PERMISSION_ALIASES[permission as PermissionAlias] || permission as Permission;
};
