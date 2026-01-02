import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import * as DriverActions from '../actions/driver.actions';
import { DriverService } from '@shared/services/driver.service';
import { Messages } from '@shared/constants/messages';

@Injectable()
export class DriverEffects {
  constructor(
    private actions$: Actions,
    private driverService: DriverService
  ) {}

  loadDriverDetail$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DriverActions.loadDriverDetail),
      mergeMap(({ driverId }) =>
        this.driverService.getDriverDetails(driverId).pipe(
          map((response) => {
            if (response.success && response.data) {
              return DriverActions.loadDriverDetailSuccess({
                driver: response.data,
              });
            } else {
              return DriverActions.loadDriverDetailFailure({
                error: response.error || Messages.DRIVER.DETAIL_ERROR,
              });
            }
          }),
          catchError((error) =>
            of(DriverActions.loadDriverDetailFailure({ error }))
          )
        )
      )
    )
  );
}
