import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '@store/app.state';
import {
  loadDriverDetail,
  updateDriverApprovalStatus,
} from '@store/actions/driver.actions';
import {
  selectDriverDetail,
  selectDriverDetailLoading,
  selectDriverDetailError,
  selectDriverUpdateSuccess,
  selectDriverUpdateError,
} from '@store/selectors/driver.selectors';
import { ApprovalStatus } from '@shared/types/driver.types';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-driver-details',
  templateUrl: './driver-details.component.html',
  styleUrls: ['./driver-details.component.scss'],
  standalone: false,
})
export class DriverDetailsComponent implements OnInit {
  driverId: string | null = null;
  driver: any = null;
  loading: boolean = true;
  error: any = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<AppState>,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.driverId = this.route.snapshot.paramMap.get('id');
    if (this.driverId) {
      this.store.dispatch(loadDriverDetail({ driverId: this.driverId }));
      this.store.select(selectDriverDetail).subscribe((driver) => {
        this.driver = driver || null;
      });
      this.store.select(selectDriverDetailLoading).subscribe((loading) => {
        this.loading = loading;
      });
      this.store.select(selectDriverDetailError).subscribe((error) => {
        this.error = error;
      });

      // Subscribe to update success
      this.store.select(selectDriverUpdateSuccess).subscribe((message) => {
        if (message) {
          this.toastrService.success(message);
          // Reload driver details after successful update
          if (this.driverId) {
            this.store.dispatch(loadDriverDetail({ driverId: this.driverId }));
          }
        }
      });

      // Subscribe to update error
      this.store.select(selectDriverUpdateError).subscribe((error) => {
        if (error) {
          this.toastrService.error(error);
        }
      });
    }
  }

  goBack(): void {
    this.router.navigate(['/admin/drivers']);
  }

  async approveDriver(): Promise<void> {
    if (!this.driverId) return;

    const result = await Swal.fire({
      title: 'Approve Driver',
      text: 'Are you sure you want to approve this driver?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#28a745',
      cancelButtonColor: '#6c757d',
      confirmButtonText: 'Yes, approve!',
      cancelButtonText: 'Cancel',
    });

    if (result.isConfirmed) {
      this.store.dispatch(
        updateDriverApprovalStatus({
          driverId: this.driverId,
          payload: {
            approval_status: ApprovalStatus.APPROVED,
          },
        })
      );
    }
  }

  async rejectDriver(): Promise<void> {
    if (!this.driverId) return;

    const { value: rejectionReason } = await Swal.fire({
      title: 'Reject Driver',
      html: '<p>Please provide a reason for rejecting this driver:</p>',
      input: 'textarea',
      inputPlaceholder: 'Enter rejection reason...',
      inputAttributes: {
        'aria-label': 'Rejection reason',
        rows: '4',
      },
      showCancelButton: true,
      confirmButtonColor: '#dc3545',
      cancelButtonColor: '#6c757d',
      confirmButtonText: 'Reject',
      cancelButtonText: 'Cancel',
      inputValidator: (value) => {
        if (!value || !value.trim()) {
          return 'Rejection reason is required!';
        }
        return null;
      },
    });

    if (rejectionReason) {
      this.store.dispatch(
        updateDriverApprovalStatus({
          driverId: this.driverId,
          payload: {
            approval_status: ApprovalStatus.REJECTED,
            rejection_reason: rejectionReason.trim(),
          },
        })
      );
    }
  }

  async suspendDriver(): Promise<void> {
    if (!this.driverId) return;

    const result = await Swal.fire({
      title: 'Suspend Driver',
      text: 'Are you sure you want to suspend this driver? This will set their status to pending.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ffc107',
      cancelButtonColor: '#6c757d',
      confirmButtonText: 'Yes, suspend!',
      cancelButtonText: 'Cancel',
    });

    if (result.isConfirmed) {
      this.store.dispatch(
        updateDriverApprovalStatus({
          driverId: this.driverId,
          payload: {
            approval_status: ApprovalStatus.PENDING,
          },
        })
      );
    }
  }
}
