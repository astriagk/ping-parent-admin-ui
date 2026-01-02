// Root AppState interface for NgRx
import { ActionReducerMap } from '@ngrx/store';

import { AuthState, authReducer } from './reducers/auth.reducer';
import { AdminState, adminReducer } from './reducers/admin.reducer';
import { UserState, userReducer } from './reducers/user.reducer';
import { DriverState, driverReducer } from './reducers/driver.reducer';

export interface AppState {
  auth: AuthState;
  admin: AdminState;
  user: UserState;
  driver: DriverState;
}

export const reducers: ActionReducerMap<AppState> = {
  auth: authReducer,
  admin: adminReducer,
  user: userReducer,
  driver: driverReducer,
};
