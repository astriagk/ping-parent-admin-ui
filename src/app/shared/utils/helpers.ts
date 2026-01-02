import { UserRole, UserStatus } from '../constants/app.enums';

export function getRoleLabel(role: UserRole | string): string {
  switch (role) {
    case UserRole.ADMIN:
    case 'admin':
      return 'Admin';
    case UserRole.SUPERADMIN:
    case 'superadmin':
      return 'Super Admin';
    case UserRole.PARENT:
    case 'parent':
      return 'Parent';
    case UserRole.DRIVER:
    case 'driver':
      return 'Driver';
    default:
      return role
        ? role.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())
        : '';
  }
}

export function getUserStatusLabel(isActive: boolean): string {
  return isActive ? 'Active' : 'Inactive';
}

export function getUserStatusClass(isActive: boolean): string {
  return isActive ? UserStatus.ACTIVE : UserStatus.INACTIVE;
}
