export interface AuthError {
  error?: string;
  message?: string;
  [key: string]: any;
}

export interface VerifyTokenResponse {
  success: boolean;
  data?: {
    adminId: string;
    role: string;
    tokenValid: boolean;
  };
  error?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface Admin {
  admin_id: string;
  username: string;
  email: string;
  phone_number: string;
  admin_role: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  last_login: string;
}

export interface LoginResponse {
  success: boolean;
  data?: {
    admin: Admin;
    access_token: string;
    refresh_token: string;
  };
  message?: string;
  error?: string;
}
