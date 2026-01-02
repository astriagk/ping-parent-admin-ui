import { createAction, props } from '@ngrx/store';
import {
  ADMIN_LOAD_LIST,
  ADMIN_LOAD_LIST_SUCCESS,
  ADMIN_LOAD_LIST_FAILURE,
} from './admin.action-types';
import {
  AdminListItem,
  AdminError,
  AdminDetail,
} from '@shared/types/Pages/admin.types';

export const loadAdminList = createAction(ADMIN_LOAD_LIST);

export const loadAdminListSuccess = createAction(
  ADMIN_LOAD_LIST_SUCCESS,
  props<{ admins: AdminListItem[] }>()
);

export const loadAdminListFailure = createAction(
  ADMIN_LOAD_LIST_FAILURE,
  props<{ error: AdminError }>()
);

export const loadAdminDetail = createAction(
  '[Admin] Load Admin Detail',
  props<{ adminId: string }>()
);

export const loadAdminDetailSuccess = createAction(
  '[Admin] Load Admin Detail Success',
  props<{ admin: AdminDetail }>()
);

export const loadAdminDetailFailure = createAction(
  '[Admin] Load Admin Detail Failure',
  props<{ error: AdminError }>()
);

export const activateAdmin = createAction(
  '[Admin] Activate Admin',
  props<{ adminId: string }>()
);

export const activateAdminSuccess = createAction(
  '[Admin] Activate Admin Success',
  props<{ admin: AdminDetail; message?: string }>()
);

export const activateAdminFailure = createAction(
  '[Admin] Activate Admin Failure',
  props<{ error: AdminError }>()
);

export const deactivateAdmin = createAction(
  '[Admin] Deactivate Admin',
  props<{ adminId: string }>()
);

export const deactivateAdminSuccess = createAction(
  '[Admin] Deactivate Admin Success',
  props<{ admin: AdminDetail; message?: string }>()
);

export const deactivateAdminFailure = createAction(
  '[Admin] Deactivate Admin Failure',
  props<{ error: AdminError }>()
);
