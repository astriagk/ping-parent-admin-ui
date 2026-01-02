import { createSelector } from '@ngrx/store';
import { AppState } from '../app.state';

export const selectDriverState = (state: AppState) => state.driver;

export const selectDriverDetail = createSelector(
  selectDriverState,
  (state) => state.driver
);

export const selectDriverDetailLoading = createSelector(
  selectDriverState,
  (state) => state.loading
);

export const selectDriverDetailError = createSelector(
  selectDriverState,
  (state) => state.error
);

export const selectDriverUpdating = createSelector(
  selectDriverState,
  (state) => state.updating
);

export const selectDriverUpdateSuccess = createSelector(
  selectDriverState,
  (state) => state.updateSuccess
);

export const selectDriverUpdateError = createSelector(
  selectDriverState,
  (state) => state.updateError
);
