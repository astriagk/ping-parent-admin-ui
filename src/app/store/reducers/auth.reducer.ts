import { createReducer, on } from '@ngrx/store';
import * as AuthActions from '../actions/auth.actions';
import { Admin, AuthError } from '@shared/types/Pages/login.types';

export interface AuthState {
  user: Admin | null;
  loading: boolean;
  error: AuthError | null;
  access_token: string | null;
  refresh_token: string | null;
}

export const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
  access_token: null,
  refresh_token: null,
};

export const authReducer = createReducer(
  initialState,
  on(AuthActions.login, AuthActions.register, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(
    AuthActions.loginSuccess,
    AuthActions.registerSuccess,
    (state, { user }) => ({
      ...state,
      user: user?.admin ?? null,
      access_token: user?.access_token ?? null,
      refresh_token: user?.refresh_token ?? null,
      loading: false,
    })
  ),
  on(
    AuthActions.loginFailure,
    AuthActions.registerFailure,
    (state, { error }) => ({ ...state, error, loading: false })
  )
);
