export enum UserStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  PENDING = 'pending',
  PARENT_REQUESTED = 'parent_requested',
  REJECTED = 'rejected',
}

export enum AuthDemoUser {
  Username = 'admin',
  Password = 'admin',
  Token = 'fake-jwt-token',
}

export enum ApiOperationType {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
  PATCH = 'PATCH',
  HEAD = 'HEAD',
  OPTIONS = 'OPTIONS',
}

export enum LocalStorageKey {
  AccessToken = 'access_token',
  RefreshToken = 'refresh_token',
  // Add other keys as needed
}

export enum UserRole {
  ADMIN = 'admin',
  SUPERADMIN = 'superadmin',
  PARENT = 'parent',
  DRIVER = 'driver',
}

// UserRoleLabel.getLabel moved to shared/utils/helpers.ts
