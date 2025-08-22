import { Permission, PermissionConfig } from "../types/permissions";

/**
 * Helper function to create a fully typed permission configuration.
 * Accepts any dynamic role and generates the corresponding permissions.
 * @param config - The permission configuration object.
 * @returns A fully typed permission configuration.
 */
export const createPermissionsConfig = <T extends PermissionConfig>(config: T): T => config;

/**
 * Predefined permission sets for easy configuration
 */
export const PERMISSIONS = {
  FULL_ACCESS: ['create', 'read', 'update', 'delete', 'view', 'refresh', 'export'] as Permission[],
  READ_WRITE: ['create', 'read', 'update', 'view', 'refresh'] as Permission[],
  READ_ONLY: ['read', 'view'] as Permission[],
  VIEW_ONLY: ['view'] as Permission[],
  NO_ACCESS: [] as Permission[],
} as const;

export const createPermissions = (...permissions: Permission[]): Permission[] => permissions;
