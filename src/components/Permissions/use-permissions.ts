import { useContext, useMemo } from 'react';
import { normalizePermission, Permission, PermissionAlias } from './types/permissions';
import PermissionsContext from './PermissionsProvider';

interface DirectPermissions {
  create?: boolean;
  read?: boolean;
  update?: boolean;
  delete?: boolean;
  view?: boolean;
  // Aliases
  c?: boolean;
  r?: boolean;
  u?: boolean;
  d?: boolean;
  v?: boolean;
}

interface PermissionChecker {
  canCreate: boolean;
  canUpdate: boolean;
  canDelete: boolean;
  canView: boolean;
  hasPermission: (permission: Permission | PermissionAlias) => boolean;
}

export const usePermissions = (
  crudName?: string,
  directPermissions?: DirectPermissions
): PermissionChecker => {
  const roleContext = useContext(PermissionsContext);

  return useMemo(() => {
    if (directPermissions) {
      const canCreate = directPermissions.create ?? directPermissions.c ?? false;
      const canRead = directPermissions.read ?? directPermissions.r ?? false;
      const canUpdate = directPermissions.update ?? directPermissions.u ?? false;
      const canDelete = directPermissions.delete ?? directPermissions.d ?? false;
      const canView = directPermissions.view ?? directPermissions.v ?? false;

      return {
        canCreate,
        canRead,
        canUpdate,
        canDelete,
        canView,
        hasPermission: (permission: Permission | PermissionAlias) => {
          const normalizedPermission = normalizePermission(permission);
          switch (normalizedPermission) {
            case 'create': return canCreate;
            case 'read': return canRead;
            case 'update': return canUpdate;
            case 'delete': return canDelete;
            case 'view': return canView;
            default: return false;
          }
        },
      };
    }

    if (roleContext && crudName) {
      return {
        canCreate: roleContext.canCreate(crudName),
        canUpdate: roleContext.canUpdate(crudName),
        canDelete: roleContext.canDelete(crudName),
        canView: roleContext.canView(crudName),
        hasPermission: (permission: Permission | PermissionAlias) =>
          roleContext.hasPermission(crudName, permission as Permission),
      };
    }

    return {
      canCreate: false,
      canUpdate: false,
      canDelete: false,
      canView: false,
      canRefresh: false,
      canExport: false,
      hasPermission: () => false,
    };
  }, [roleContext, crudName, directPermissions]);
};
