export interface AdminDetail {
  admin_id: string;
  username: string;
  email: string;
  phone_number: string;
  admin_role: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  last_login?: string;
}

export interface AdminDetailResponse {
  success: boolean;
  data?: AdminDetail;
  message?: string;
  error?: string | any;
}

export interface AdminListItem {
  admin_id: string;
  username: string;
  email: string;
  phone_number: string;
  admin_role: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  last_login?: string;
}

export interface AdminListResponse {
  success: boolean;
  data?: AdminListItem[];
  message?: string;
  error?: string;
}

export interface AdminError {
  error?: string | any;
  message?: string;
  [key: string]: any;
}

export interface DriverListItem {
  _id: string;
  user_id: string;
  phone_number: string;
  user_type: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}
