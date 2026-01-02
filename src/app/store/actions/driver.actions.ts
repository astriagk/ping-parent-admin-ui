import { createAction, props } from '@ngrx/store';
import {
  DRIVER_LOAD_DETAIL,
  DRIVER_LOAD_DETAIL_SUCCESS,
  DRIVER_LOAD_DETAIL_FAILURE,
} from '../action-types/driver.action-types';

export const loadDriverDetail = createAction(
  DRIVER_LOAD_DETAIL,
  props<{ driverId: string }>()
);
export const loadDriverDetailSuccess = createAction(
  DRIVER_LOAD_DETAIL_SUCCESS,
  props<{ driver: any }>()
);
export const loadDriverDetailFailure = createAction(
  DRIVER_LOAD_DETAIL_FAILURE,
  props<{ error: any }>()
);
