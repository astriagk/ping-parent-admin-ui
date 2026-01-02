import { createAction, props } from '@ngrx/store';
import { UserRole } from '@shared/constants/app.enums';
import {
  USER_LOAD_LIST,
  USER_LOAD_LIST_SUCCESS,
  USER_LOAD_LIST_FAILURE,
} from '../action-types/user.action-types';

export const loadUserList = createAction(
  USER_LOAD_LIST,
  props<{ user_type?: UserRole; page?: number; limit?: number }>()
);
export const loadUserListSuccess = createAction(
  USER_LOAD_LIST_SUCCESS,
  props<{ users: any[]; total?: number }>()
);
export const loadUserListFailure = createAction(
  USER_LOAD_LIST_FAILURE,
  props<{ error: any }>()
);
