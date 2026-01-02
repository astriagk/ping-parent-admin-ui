import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from '@store/app.state';
import * as AdminActions from '@store/actions/admin.actions';
import {
  selectAdmins,
  selectAdminError,
} from '@store/selectors/admin.selectors';
import { AdminListItem } from '@shared/types/Pages/admin.types';
import { Messages } from '@shared/constants/messages';
import { ROUTE_PATHS } from '@shared/constants/routesPaths';
import { ActionType } from '@shared/constants/app.enums';
import { COLUMNS } from '@shared/constants/tables/colums';
import { ACTIONS } from '@shared/constants/tables/actions';

@Component({
  selector: 'app-admin-list',
  templateUrl: './admin-list.component.html',
  styleUrls: ['./admin-list.component.scss'],
  standalone: false,
})
export class AdminListComponent implements OnInit, OnDestroy {
  messages = Messages;
  columns = COLUMNS.ADMIN_LIST;
  actions = ACTIONS.ADMIN_ACTIONS;

  admins: AdminListItem[] = [];
  error$ = this.store.select(selectAdminError);

  // Pagination
  paginate = {
    currentPage: 1,
    itemsPerPage: 10,
    totalItems: 0,
  };

  // Table helpers will be passed to generic-table

  private subscriptions = new Subscription();

  constructor(private router: Router, private store: Store<AppState>) {}

  ngOnInit(): void {
    this.loadAdmins();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  loadAdmins(): void {
    // Dispatch action to load admins from API
    this.store.dispatch(AdminActions.loadAdminList());
    this.subscriptions.add(
      this.store.select(selectAdmins).subscribe((admins) => {
        this.admins = admins;
        this.paginate.totalItems = admins.length;
      })
    );
    // Error handling can be done in parent or via generic-table output
  }

  setPage(page: number): void {
    this.paginate.currentPage = page;
  }

  onRowClicked(admin: AdminListItem): void {
    // Navigate when user clicks on a row
    this.router.navigate([ROUTE_PATHS.ADMIN_LIST, admin.admin_id]);
  }

  onActionClicked(event: { action: string; item: AdminListItem }): void {
    // Handle action button clicks
    switch (event.action) {
      case ActionType.VIEW:
        this.router.navigate([ROUTE_PATHS.ADMIN_LIST, event.item.admin_id]);
        break;
      default:
        console.warn('Unknown action:', event.action);
    }
  }
}
