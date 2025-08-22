import { useContext, useMemo } from 'react';
import { Permission } from './types/permissions';
import PermissionsContext from './PermissionsProvider';

interface DirectPermissions {
  create?: boolean;
  read?: boolean;
  update?: boolean;
  delete?: boolean;
  view?: boolean;
  refresh?: boolean;
  export?: boolean;
}

interface PermissionChecker {
  canCreate: boolean;
  canUpdate: boolean;
  canDelete: boolean;
  canView: boolean;
  canRefresh: boolean;
  canExport: boolean;
  hasPermission: (permission: string) => boolean;
}

export const usePermissions = (
  crudName?: string,
  directPermissions?: DirectPermissions
): PermissionChecker => {
  const roleContext = useContext(PermissionsContext);

  return useMemo(() => {
    if (directPermissions) {
      return {
        canCreate: directPermissions.create ?? false,
        canUpdate: directPermissions.update ?? false,
        canDelete: directPermissions.delete ?? false,
        canView: directPermissions.view ?? false,
        canRefresh: directPermissions.refresh ?? false,
        canExport: directPermissions.export ?? false,
        hasPermission: (permission: string) => {
          const action = permission as keyof DirectPermissions;
          return directPermissions[action] ?? false;
        },
      };
    }

    if (roleContext && crudName) {
      return {
        canCreate: roleContext.canCreate(crudName),
        canUpdate: roleContext.canUpdate(crudName),
        canDelete: roleContext.canDelete(crudName),
        canView: roleContext.canView(crudName),
        canRefresh: roleContext.canRefresh(crudName),
        canExport: roleContext.canExport(crudName),
        hasPermission: (permission: string) => 
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
