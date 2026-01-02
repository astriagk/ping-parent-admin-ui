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
