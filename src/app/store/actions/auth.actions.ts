import { createAction, props } from '@ngrx/store';
import {
  AUTH_LOGIN,
  AUTH_LOGIN_SUCCESS,
  AUTH_LOGIN_FAILURE,
  AUTH_REGISTER,
  AUTH_REGISTER_SUCCESS,
  AUTH_REGISTER_FAILURE,
} from './auth.action-types';
import {
  LoginRequest,
  LoginResponse,
} from 'src/app/shared/types/Pages/login.types';

export const login = createAction(AUTH_LOGIN, props<LoginRequest>());

export const loginSuccess = createAction(
  AUTH_LOGIN_SUCCESS,
  props<{ user: LoginResponse['data'] }>()
);

export const loginFailure = createAction(
  AUTH_LOGIN_FAILURE,
  props<{ error: any }>()
);

export const register = createAction(
  AUTH_REGISTER,
  props<{ username: string; password: string; email: string }>()
);

export const registerSuccess = createAction(
  AUTH_REGISTER_SUCCESS,
  props<{ user: any }>()
);

export const registerFailure = createAction(
  AUTH_REGISTER_FAILURE,
  props<{ error: any }>()
);
