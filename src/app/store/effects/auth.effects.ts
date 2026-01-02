import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import * as AuthActions from '../actions/auth.actions';
import { AuthService } from '@shared/services/auth.service';
import { LocalStorageKey } from '@shared/constants/app.enums';

@Injectable()
export class AuthEffects {
  constructor(private actions$: Actions, private authService: AuthService) {}

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login),
      mergeMap(({ email, password }) =>
        this.authService.login(email, password).pipe(
          map((response) => {
            // Store tokens in localStorage
            if (response.data?.access_token) {
              localStorage.setItem(
                LocalStorageKey.AccessToken,
                response.data.access_token
              );
            }
            if (response.data?.refresh_token) {
              localStorage.setItem(
                LocalStorageKey.RefreshToken,
                response.data.refresh_token
              );
            }
            return AuthActions.loginSuccess({ user: response.data });
          }),
          catchError((error) => of(AuthActions.loginFailure({ error })))
        )
      )
    )
  );

  register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.register),
      mergeMap(({ username, password, email }) =>
        this.authService.register(username, password, email).pipe(
          map((user) => AuthActions.registerSuccess({ user })),
          catchError((error) => of(AuthActions.registerFailure({ error })))
        )
      )
    )
  );
}
