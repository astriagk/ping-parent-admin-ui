import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

interface DriverDetails {
  id: string;
  name: string;
  email: string;
  phone: string;
  vehicleNumber: string;
  vehicleModel: string;
  vehicleColor: string;
  licenseNumber: string;
  status: string;
  rating: number;
  totalTrips: number;
  totalEarnings: number;
  joinedDate: Date;
  lastActiveDate: Date;
  address: string;
  emergencyContact: string;
}

import { Store } from '@ngrx/store';
import { AppState } from '@store/app.state';
import { loadDriverDetail } from '@store/actions/driver.actions';
import {
  selectDriverDetail,
  selectDriverDetailLoading,
  selectDriverDetailError,
} from '@store/selectors/driver.selectors';

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
    private store: Store<AppState>
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
    }
  }

  goBack(): void {
    this.router.navigate(['/admin/drivers']);
  }

  approveDriver(): void {
    // TODO: Implement approve functionality
    console.log('Approve driver:', this.driverId);
  }

  rejectDriver(): void {
    // TODO: Implement reject functionality
    if (confirm('Are you sure you want to reject this driver?')) {
      console.log('Reject driver:', this.driverId);
    }
  }

  suspendDriver(): void {
    // TODO: Implement suspend functionality
    if (confirm('Are you sure you want to suspend this driver?')) {
      console.log('Suspend driver:', this.driverId);
    }
  }
}
