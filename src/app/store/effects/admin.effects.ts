import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import * as AdminActions from '../actions/admin.actions';
import { AdminService } from '@shared/services/admin.service';
import { AdminDetailResponse } from '@shared/types/Pages/admin.types';
import { Messages } from '@shared/constants/messages';

@Injectable()
export class AdminEffects {
  constructor(private actions$: Actions, private adminService: AdminService) {}

  loadAdminList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AdminActions.loadAdminList),
      mergeMap(() =>
        this.adminService.getAdminList().pipe(
          map((response) => {
            if (response.success && response.data) {
              return AdminActions.loadAdminListSuccess({
                admins: response.data,
              });
            } else {
              return AdminActions.loadAdminListFailure({
                error: { error: response.error || Messages.ADMIN.LIST_ERROR },
              });
            }
          }),
          catchError((error) =>
            of(AdminActions.loadAdminListFailure({ error }))
          )
        )
      )
    )
  );

  loadAdminDetail$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AdminActions.loadAdminDetail),
      mergeMap(({ adminId }) =>
        this.adminService.getAdminById(adminId).pipe(
          map((response: AdminDetailResponse) => {
            if (response.success && response.data) {
              return AdminActions.loadAdminDetailSuccess({
                admin: response.data,
              });
            } else {
              return AdminActions.loadAdminDetailFailure({
                error: {
                  error: response.error || Messages.ADMIN.DETAIL_ERROR,
                },
              });
            }
          }),
          catchError((error) =>
            of(AdminActions.loadAdminDetailFailure({ error }))
          )
        )
      )
    )
  );

  activateAdmin$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AdminActions.activateAdmin),
      mergeMap(({ adminId }) =>
        this.adminService.activateAdmin(adminId).pipe(
          map((response: AdminDetailResponse) => {
            if (response.success && response.data) {
              return AdminActions.activateAdminSuccess({
                admin: response.data,
                message: response.message,
              });
            } else {
              return AdminActions.activateAdminFailure({
                error: {
                  error: response.error || Messages.ADMIN.ACTIVATE_ERROR,
                },
              });
            }
          }),
          catchError((error) =>
            of(AdminActions.activateAdminFailure({ error }))
          )
        )
      )
    )
  );

  deactivateAdmin$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AdminActions.deactivateAdmin),
      mergeMap(({ adminId }) =>
        this.adminService.deactivateAdmin(adminId).pipe(
          map((response: AdminDetailResponse) => {
            if (response.success && response.data) {
              return AdminActions.deactivateAdminSuccess({
                admin: response.data,
                message: response.message,
              });
            } else {
              return AdminActions.deactivateAdminFailure({
                error: {
                  error: response.error || Messages.ADMIN.DEACTIVATE_ERROR,
                },
              });
            }
          }),
          catchError((error) =>
            of(AdminActions.deactivateAdminFailure({ error }))
          )
        )
      )
    )
  );
}
