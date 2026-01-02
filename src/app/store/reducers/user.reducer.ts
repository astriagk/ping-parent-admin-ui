import { createReducer, on } from '@ngrx/store';
import * as UserActions from '../actions/user.actions';

export interface UserState {
  users: any[];
  total: number;
  loading: boolean;
  error: any;
}

const initialState: UserState = {
  users: [],
  total: 0,
  loading: false,
  error: null,
};

export const userReducer = createReducer(
  initialState,
  on(UserActions.loadUserList, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(UserActions.loadUserListSuccess, (state, { users, total }) => ({
    ...state,
    users,
    total: total || users.length,
    loading: false,
  })),
  on(UserActions.loadUserListFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  }))
);
