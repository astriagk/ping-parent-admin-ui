export enum DriverColumnField {
  USER_ID = 'user_id',
  PHONE_NUMBER = 'phone_number',
  IS_ACTIVE = 'is_active',
}

export enum DriverColumnHeader {
  DRIVER_ID = 'DRIVER_ID',
  PHONE_NUMBER = 'PHONE_NUMBER',
  STATUS = 'STATUS',
}

export enum DriverActionLabel {
  VIEW = 'View',
}

export enum DriverActionType {
  VIEW = 'view',
}
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

export enum ColumnField {
  ADMIN_ID = 'admin_id',
  USERNAME = 'username',
  EMAIL = 'email',
  PHONE_NUMBER = 'phone_number',
  ADMIN_ROLE = 'admin_role',
  IS_ACTIVE = 'is_active',
}

export enum ColumnHeader {
  ADMIN_ID = 'ADMIN_ID',
  USERNAME = 'USERNAME',
  EMAIL = 'EMAIL',
  PHONE_NUMBER = 'PHONE_NUMBER',
  ROLE = 'ROLE',
  STATUS = 'STATUS',
}

export enum ActionLabel {
  VIEW = 'View',
}

export enum ActionType {
  VIEW = 'view',
}
