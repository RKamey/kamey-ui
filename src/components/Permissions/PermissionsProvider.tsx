import { createContext, ReactNode, useMemo } from 'react';
import { normalizePermission, Permission, PermissionAlias } from './types/permissions';

type CrudName = string;

type PermissionsConfig = Record<CrudName, Record<string, (Permission[] | PermissionAlias[])>>;

export interface PermissionsContextProps {
  role: string;
  config: PermissionsConfig;
  hasPermission: (crud: CrudName, action: Permission | PermissionAlias) => boolean;
  // common methods
  canCreate: (crud: CrudName) => boolean;
  canRead: (crud: CrudName) => boolean;
  canUpdate: (crud: CrudName) => boolean;
  canDelete: (crud: CrudName) => boolean;
  canView: (crud: CrudName) => boolean;
}

interface PermissionsProviderProps {
  role: string;
  config: PermissionsConfig;
  children: ReactNode;
}

const PermissionsContext = createContext<PermissionsContextProps | undefined>(undefined);

export const PermissionsProvider = ({ role, config, children }: PermissionsProviderProps) => {
  
  const contextValue = useMemo(() => {
    const hasPermission = (crud: CrudName, action: Permission | PermissionAlias): boolean => {
      const normalizedAction = normalizePermission(action);
      const userPermissions = config[crud]?.[role] || [];
      
      const normalizedPermissions = userPermissions.map(normalizePermission);
      
      return normalizedPermissions.includes(normalizedAction);
    };

    const canCreate = (crud: CrudName): boolean => hasPermission(crud, 'create');
    const canRead = (crud: CrudName): boolean => hasPermission(crud, 'read');
    const canUpdate = (crud: CrudName): boolean => hasPermission(crud, 'update');
    const canDelete = (crud: CrudName): boolean => hasPermission(crud, 'delete');
    const canView = (crud: CrudName): boolean => hasPermission(crud, 'view');

    return {
      role,
      config,
      hasPermission,
      canCreate,
      canRead,
      canUpdate,
      canDelete,
      canView,
    };
  }, [role, config]);

  return (
    <PermissionsContext.Provider value={contextValue}>
      {children}
    </PermissionsContext.Provider>
  );
};

export default PermissionsContext;
