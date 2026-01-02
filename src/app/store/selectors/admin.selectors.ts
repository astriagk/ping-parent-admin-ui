import { createSelector } from '@ngrx/store';
import { AppState } from '../app.state';
import { AdminState } from '../reducers/admin.reducer';

export const selectAdminState = (state: AppState) => state.admin;

export const selectAdmins = createSelector(
  selectAdminState,
  (state: AdminState) => state.admins
);

export const selectAdminLoading = createSelector(
  selectAdminState,
  (state: AdminState) => state.loading
);

export const selectAdminError = createSelector(
  selectAdminState,
  (state: AdminState) => state.error
);

export const selectSelectedAdmin = createSelector(
  selectAdminState,
  (state: AdminState) => state.selectedAdmin
);

export const selectAdminDetailLoading = createSelector(
  selectAdminState,
  (state: AdminState) => state.detailLoading
);
