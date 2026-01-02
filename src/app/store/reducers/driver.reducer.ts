import { createReducer, on } from '@ngrx/store';
import * as DriverActions from '../actions/driver.actions';

export interface DriverState {
  driver: any | null;
  loading: boolean;
  error: any;
  updating: boolean;
  updateSuccess: string | null;
  updateError: any;
}

const initialState: DriverState = {
  driver: null,
  loading: false,
  error: null,
  updating: false,
  updateSuccess: null,
  updateError: null,
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
  })),
  on(DriverActions.updateDriverApprovalStatus, (state) => ({
    ...state,
    updating: true,
    updateSuccess: null,
    updateError: null,
  })),
  on(DriverActions.updateDriverApprovalStatusSuccess, (state, { message }) => ({
    ...state,
    updating: false,
    updateSuccess: message,
  })),
  on(DriverActions.updateDriverApprovalStatusFailure, (state, { error }) => ({
    ...state,
    updating: false,
    updateError: error,
  }))
);
