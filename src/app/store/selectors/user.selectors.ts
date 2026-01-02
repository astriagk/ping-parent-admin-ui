import { createSelector } from '@ngrx/store';
import { AppState } from '../app.state';

export const selectUserState = (state: AppState) => state.user;

export const selectUsers = createSelector(
  selectUserState,
  (state) => state.users
);

export const selectUserLoading = createSelector(
  selectUserState,
  (state) => state.loading
);

export const selectUserError = createSelector(
  selectUserState,
  (state) => state.error
);

export const selectUserTotal = createSelector(
  selectUserState,
  (state) => state.total
);
