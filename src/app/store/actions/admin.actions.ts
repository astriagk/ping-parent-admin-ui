import { createAction, props } from '@ngrx/store';
import {
  ADMIN_LOAD_LIST,
  ADMIN_LOAD_LIST_SUCCESS,
  ADMIN_LOAD_LIST_FAILURE,
  ADMIN_LOAD_DETAIL,
  ADMIN_LOAD_DETAIL_SUCCESS,
  ADMIN_LOAD_DETAIL_FAILURE,
  ADMIN_ACTIVATE,
  ADMIN_ACTIVATE_SUCCESS,
  ADMIN_ACTIVATE_FAILURE,
  ADMIN_DEACTIVATE,
  ADMIN_DEACTIVATE_SUCCESS,
  ADMIN_DEACTIVATE_FAILURE,
} from '../action-types/admin.action-types';
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
  ADMIN_LOAD_DETAIL,
  props<{ adminId: string }>()
);

export const loadAdminDetailSuccess = createAction(
  ADMIN_LOAD_DETAIL_SUCCESS,
  props<{ admin: AdminDetail }>()
);

export const loadAdminDetailFailure = createAction(
  ADMIN_LOAD_DETAIL_FAILURE,
  props<{ error: AdminError }>()
);

export const activateAdmin = createAction(
  ADMIN_ACTIVATE,
  props<{ adminId: string }>()
);

export const activateAdminSuccess = createAction(
  ADMIN_ACTIVATE_SUCCESS,
  props<{ admin: AdminDetail; message?: string }>()
);

export const activateAdminFailure = createAction(
  ADMIN_ACTIVATE_FAILURE,
  props<{ error: AdminError }>()
);

export const deactivateAdmin = createAction(
  ADMIN_DEACTIVATE,
  props<{ adminId: string }>()
);

export const deactivateAdminSuccess = createAction(
  ADMIN_DEACTIVATE_SUCCESS,
  props<{ admin: AdminDetail; message?: string }>()
);

export const deactivateAdminFailure = createAction(
  ADMIN_DEACTIVATE_FAILURE,
  props<{ error: AdminError }>()
);
