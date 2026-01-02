import { createReducer, on } from '@ngrx/store';
import * as AdminActions from '../actions/admin.actions';
import {
  AdminListItem,
  AdminError,
  AdminDetail,
} from '@shared/types/Pages/admin.types';

export interface AdminState {
  admins: AdminListItem[];
  loading: boolean;
  error: AdminError | null;
  selectedAdmin: AdminDetail | null;
  detailLoading: boolean;
}

export const initialState: AdminState = {
  admins: [],
  loading: false,
  error: null,
  selectedAdmin: null,
  detailLoading: false,
};

export const adminReducer = createReducer(
  initialState,
  on(AdminActions.loadAdminList, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(AdminActions.loadAdminListSuccess, (state, { admins }) => ({
    ...state,
    admins,
    loading: false,
  })),
  on(AdminActions.loadAdminListFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),
  on(AdminActions.loadAdminDetail, (state) => ({
    ...state,
    detailLoading: true,
    error: null,
    selectedAdmin: null,
  })),
  on(AdminActions.loadAdminDetailSuccess, (state, { admin }) => ({
    ...state,
    selectedAdmin: admin,
    detailLoading: false,
  })),
  on(AdminActions.loadAdminDetailFailure, (state, { error }) => ({
    ...state,
    error,
    detailLoading: false,
    selectedAdmin: null,
  })),
  on(AdminActions.activateAdminSuccess, (state, { admin }) => ({
    ...state,
    selectedAdmin: admin,
  })),
  on(AdminActions.activateAdminFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  on(AdminActions.deactivateAdminSuccess, (state, { admin }) => ({
    ...state,
    selectedAdmin: admin,
  })),
  on(AdminActions.deactivateAdminFailure, (state, { error }) => ({
    ...state,
    error,
  }))
);
