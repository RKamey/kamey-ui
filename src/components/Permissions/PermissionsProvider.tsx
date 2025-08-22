import { createContext, ReactNode, useMemo } from 'react';
import { Permission } from './types/permissions';

type CrudName = string;

type PermissionsConfig = Record<CrudName, Record<string, Permission[]>>;

export interface PermissionsContextProps {
  role: string;
  config: PermissionsConfig;
  hasPermission: (crud: CrudName, action: Permission) => boolean;
  // common methods
  canCreate: (crud: CrudName) => boolean;
  canRead: (crud: CrudName) => boolean;
  canUpdate: (crud: CrudName) => boolean;
  canDelete: (crud: CrudName) => boolean;
  canView: (crud: CrudName) => boolean;
  canRefresh: (crud: CrudName) => boolean;
  canExport: (crud: CrudName) => boolean;
}

interface PermissionsProviderProps {
  role: string;
  config: PermissionsConfig;
  children: ReactNode;
}

const PermissionsContext = createContext<PermissionsContextProps | undefined>(undefined);

export const PermissionsProvider = ({ role, config, children }: PermissionsProviderProps) => {
  
  const contextValue = useMemo(() => {
    const hasPermission = (crud: CrudName, action: Permission): boolean => 
      config[crud]?.[role]?.includes(action) ?? false;

    const canCreate = (crud: CrudName): boolean => hasPermission(crud, 'create');
    const canRead = (crud: CrudName): boolean => hasPermission(crud, 'read');
    const canUpdate = (crud: CrudName): boolean => hasPermission(crud, 'update');
    const canDelete = (crud: CrudName): boolean => hasPermission(crud, 'delete');
    const canView = (crud: CrudName): boolean => hasPermission(crud, 'view');
    const canRefresh = (crud: CrudName): boolean => hasPermission(crud, 'refresh');
    const canExport = (crud: CrudName): boolean => hasPermission(crud, 'export');

    return {
      role,
      config,
      hasPermission,
      canCreate,
      canRead,
      canUpdate,
      canDelete,
      canView,
      canRefresh,
      canExport
    };
  }, [role, config]);

  return (
    <PermissionsContext.Provider value={contextValue}>
      {children}
    </PermissionsContext.Provider>
  );
};

export default PermissionsContext;
