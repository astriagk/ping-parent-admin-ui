// Root AppState interface for NgRx
import { ActionReducerMap } from '@ngrx/store';
import { AuthState, authReducer } from './reducers/auth.reducer';
import { AdminState, adminReducer } from './reducers/admin.reducer';

export interface AppState {
  auth: AuthState;
  admin: AdminState;
  // Add feature states here, e.g.:
  // cart: CartState;
}

export const reducers: ActionReducerMap<AppState> = {
  auth: authReducer,
  admin: adminReducer,
  // Add feature reducers here
};
