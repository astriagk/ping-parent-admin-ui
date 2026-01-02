import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AuthService } from '@shared/services/auth.service';
import { Store } from '@ngrx/store';
import { selectAccessToken } from '@store/selectors/auth.selectors';
import { catchError, map, switchMap, take } from 'rxjs/operators';
import { AppState } from '@store/app.state';
import { ROUTE_PATHS } from '@shared/constants/routesPaths';
import { LocalStorageKey } from '@shared/constants/app.enums';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(
    private store: Store<AppState>,
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(): Observable<boolean | UrlTree> {
    console.log('can activate');
    return this.store.select(selectAccessToken).pipe(
      take(1),
      switchMap((token) => {
        console.log(token);
        // Check localStorage if token is not in store (e.g., on page refresh)
        const storageToken = localStorage.getItem(LocalStorageKey.AccessToken);
        const activeToken = token || storageToken;

        if (!activeToken) {
          return of(this.router.createUrlTree([ROUTE_PATHS.LOGIN]));
        }
        return this.authService.verifyToken().pipe(
          map((res) => {
            if (res.success && res.data?.tokenValid) {
              return true;
            }
            return this.router.createUrlTree([ROUTE_PATHS.LOGIN]);
          }),
          catchError(() => of(this.router.createUrlTree([ROUTE_PATHS.LOGIN])))
        );
      })
    );
  }
}
