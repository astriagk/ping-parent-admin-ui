import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import * as UserActions from '../actions/user.actions';
import { UserService } from '@shared/services/user.service';
import { Messages } from '@shared/constants/messages';

@Injectable()
export class UserEffects {
  constructor(private actions$: Actions, private userService: UserService) {}

  loadUserList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.loadUserList),
      mergeMap((action) =>
        this.userService
          .getUserList(action.user_type, action.page, action.limit)
          .pipe(
            map((response) => {
              if (response.success && response.data) {
                return UserActions.loadUserListSuccess({
                  users: response.data,
                  total: response.total,
                });
              } else {
                return UserActions.loadUserListFailure({
                  error: response.error || Messages.USER.LIST_ERROR,
                });
              }
            }),
            catchError((error) =>
              of(UserActions.loadUserListFailure({ error }))
            )
          )
      )
    )
  );
}
