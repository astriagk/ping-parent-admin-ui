import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '@store/app.state';
import {
  loadAdminDetail,
  activateAdmin,
  deactivateAdmin,
} from '@store/actions/admin.actions';
import {
  getRoleLabel,
  getUserStatusLabel,
  getUserStatusClass,
} from '@shared/utils/helpers';
import { AdminDetail } from '@shared/types/Pages/admin.types';
import { ToastrService } from 'ngx-toastr';
import {
  selectAdminDetailLoading,
  selectAdminError,
  selectSelectedAdmin,
} from '@store/selectors/admin.selectors';

@Component({
  selector: 'app-admin-details',
  templateUrl: './admin-details.component.html',
  styleUrls: ['./admin-details.component.scss'],
  standalone: false,
})
export class AdminDetailsComponent implements OnInit {
  adminId: string | null = null;
  admin: AdminDetail | null = null;
  loading: boolean = true;

  // Helper references for template
  getRoleLabel = getRoleLabel;
  getUserStatusLabel = getUserStatusLabel;
  getUserStatusClass = getUserStatusClass;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<AppState>,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.adminId = this.route.snapshot.paramMap.get('id');
    if (this.adminId) {
      this.store.dispatch(loadAdminDetail({ adminId: this.adminId }));
      this.store.select(selectSelectedAdmin).subscribe((admin) => {
        this.admin = admin || null;
      });
      this.store.select(selectAdminDetailLoading).subscribe((loading) => {
        this.loading = loading;
      });
      this.store.select(selectAdminError).subscribe((error) => {
        if (error && error.error) {
          console.log(error.error);
          this.toastrService.error(error.error.error || 'An error occurred.');
        }
      });
    }
  }

  goBack(): void {
    this.router.navigate(['/admin/admins']);
  }

  editAdmin(): void {
    // TODO: Implement edit functionality
    console.log('Edit admin:', this.adminId);
  }

  toggleAdminStatus(): void {
    if (!this.admin) return;
    const actionType = this.admin.is_active ? 'deactivate' : 'activate';
    const confirmMsg = `Are you sure you want to ${actionType} this admin?`;
    if (window.confirm(confirmMsg)) {
      if (actionType === 'activate') {
        this.store.dispatch(activateAdmin({ adminId: this.admin.admin_id }));
      } else {
        this.store.dispatch(deactivateAdmin({ adminId: this.admin.admin_id }));
      }
    } else {
      this.toastrService.info('Action cancelled.');
    }
  }
}
