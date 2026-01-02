import { createAction, props } from '@ngrx/store';
import {
  DRIVER_LOAD_DETAIL,
  DRIVER_LOAD_DETAIL_SUCCESS,
  DRIVER_LOAD_DETAIL_FAILURE,
  DRIVER_UPDATE_APPROVAL_STATUS,
  DRIVER_UPDATE_APPROVAL_STATUS_SUCCESS,
  DRIVER_UPDATE_APPROVAL_STATUS_FAILURE,
} from '../action-types/driver.action-types';
import { UpdateApprovalStatusPayload } from '@shared/types/driver.types';

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

export const updateDriverApprovalStatus = createAction(
  DRIVER_UPDATE_APPROVAL_STATUS,
  props<{ driverId: string; payload: UpdateApprovalStatusPayload }>()
);
export const updateDriverApprovalStatusSuccess = createAction(
  DRIVER_UPDATE_APPROVAL_STATUS_SUCCESS,
  props<{ message: string }>()
);
export const updateDriverApprovalStatusFailure = createAction(
  DRIVER_UPDATE_APPROVAL_STATUS_FAILURE,
  props<{ error: any }>()
);
