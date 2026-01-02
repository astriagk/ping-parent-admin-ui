// Root AppState interface for NgRx
import { ActionReducerMap } from '@ngrx/store';
import { AuthState, authReducer } from './reducers/auth.reducer';

export interface AppState {
  auth: AuthState;
  // login: LoginState; // Remove if migrating all to auth
  // Add feature states here, e.g.:
  // cart: CartState;
}

export const reducers: ActionReducerMap<AppState> = {
  auth: authReducer,
  // login: loginReducer, // Remove if migrating all to auth
  // Add feature reducers here
};
