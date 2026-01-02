import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from '@store/app.state';
import * as UserActions from '@store/actions/user.actions';
import {
  selectUsers,
  selectUserError,
  selectUserTotal,
} from '@store/selectors/user.selectors';
import { UserRole, DriverActionType } from '@shared/constants/app.enums';
import { Messages } from '@shared/constants/messages';
import { DriverListItem } from '@shared/types/Pages/admin.types';
import { COLUMNS } from '@shared/constants/tables/colums';
import { ACTIONS } from '@shared/constants/tables/actions';

@Component({
  selector: 'app-driver-list',
  templateUrl: './driver-list.component.html',
  styleUrls: ['./driver-list.component.scss'],
  standalone: false,
})
export class DriverListComponent implements OnInit, OnDestroy {
  messages = Messages;
  columns = COLUMNS.DRIVER_LIST;
  actions = ACTIONS.DRIVER_ACTIONS;
  paginate = {
    currentPage: 1,
    itemsPerPage: 10,
    totalItems: 0,
  };

  drivers: DriverListItem[] = [];
  error$ = this.store.select(selectUserError);

  private subscriptions = new Subscription();

  constructor(private router: Router, private store: Store<AppState>) {}

  ngOnInit(): void {
    this.loadDrivers();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  loadDrivers(): void {
    this.store.dispatch(
      UserActions.loadUserList({
        user_type: UserRole.DRIVER,
        page: this.paginate.currentPage,
        limit: this.paginate.itemsPerPage,
      })
    );
    this.subscriptions.add(
      this.store.select(selectUsers).subscribe((users) => {
        this.drivers = users;
      })
    );
    this.subscriptions.add(
      this.store.select(selectUserTotal).subscribe((total) => {
        this.paginate.totalItems = total;
      })
    );
  }

  setPage(page: number): void {
    this.paginate.currentPage = page;
    this.loadDrivers();
  }

  onRowClicked(driver: DriverListItem): void {
    this.router.navigate(['/admin/drivers', driver._id]);
  }

  onActionClicked(event: { action: string; item: DriverListItem }): void {
    switch (event.action) {
      case DriverActionType.VIEW:
        this.router.navigate(['/admin/drivers', event.item._id]);
        break;
      default:
        console.warn('Unknown action:', event.action);
    }
  }
}
