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
import {
  GenericTableAction,
  GenericTableColumn,
} from '@shared/components/generic-table/generic-table.component';
import { ToastrService } from 'ngx-toastr';
import {
  getRoleLabel,
  getUserStatusClass,
  getUserStatusLabel,
} from '@shared/utils/helpers';
import { LoaderService } from '@shared/services/loader.service';

@Component({
  selector: 'app-admin-list',
  templateUrl: './admin-list.component.html',
  styleUrls: ['./admin-list.component.scss'],
  standalone: false,
})
export class AdminListComponent implements OnInit, OnDestroy {
  columns: GenericTableColumn<AdminListItem>[] = [
    { field: 'admin_id', header: 'Admin ID' },
    { field: 'username', header: 'Username' },
    { field: 'email', header: 'Email' },
    { field: 'phone_number', header: 'Phone Number' },
    {
      field: 'admin_role',
      header: 'Role',
      cell: (item) => getRoleLabel(item.admin_role),
    },
    {
      field: 'is_active',
      header: 'Status',
      cell: (item) => ({
        label: getUserStatusLabel(item.is_active),
        class:
          'generic-table-badge generic-table__status-badge--' +
          getUserStatusClass(item.is_active),
      }),
    },
  ];

  actions: GenericTableAction[] = [
    { label: 'View', action: 'view', class: 'btn-view' },
  ];

  admins: AdminListItem[] = [];
  error$ = this.store.select(selectAdminError);

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
      })
    );
    // Error handling can be done in parent or via generic-table output
  }

  onRowClicked(admin: AdminListItem): void {
    // Navigate when user clicks on a row
    this.router.navigate(['/admin/admins', admin.admin_id]);
  }

  onActionClicked(event: { action: string; item: AdminListItem }): void {
    // Handle action button clicks
    switch (event.action) {
      case 'view':
        this.router.navigate(['/admin/admins', event.item.admin_id]);
        break;
      default:
        console.warn('Unknown action:', event.action);
    }
  }
}
