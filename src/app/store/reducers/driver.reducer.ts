import { createReducer, on } from '@ngrx/store';
import * as DriverActions from '../actions/driver.actions';

export interface DriverState {
  driver: any | null;
  loading: boolean;
  error: any;
}

const initialState: DriverState = {
  driver: null,
  loading: false,
  error: null,
};

export const driverReducer = createReducer(
  initialState,
  on(DriverActions.loadDriverDetail, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(DriverActions.loadDriverDetailSuccess, (state, { driver }) => ({
    ...state,
    driver,
    loading: false,
  })),
  on(DriverActions.loadDriverDetailFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  }))
);
