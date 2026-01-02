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

@Component({
  selector: 'app-driver-details',
  templateUrl: './driver-details.component.html',
  styleUrls: ['./driver-details.component.scss'],
  standalone: false,
})
export class DriverDetailsComponent implements OnInit {
  driverId: string | null = null;
  driver: DriverDetails | null = null;
  loading: boolean = true;

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.driverId = this.route.snapshot.paramMap.get('id');
    if (this.driverId) {
      this.loadDriverDetails(this.driverId);
    }
  }

  loadDriverDetails(id: string): void {
    // TODO: Replace with actual API call
    setTimeout(() => {
      this.driver = {
        id: id,
        name: 'Michael Brown',
        email: 'michael.brown@example.com',
        phone: '+1 (555) 234-5678',
        vehicleNumber: 'ABC-1234',
        vehicleModel: 'Toyota Camry 2022',
        vehicleColor: 'Silver',
        licenseNumber: 'DL12345678',
        status: 'Active',
        rating: 4.8,
        totalTrips: 245,
        totalEarnings: 12450.0,
        joinedDate: new Date('2024-01-10'),
        lastActiveDate: new Date('2025-01-02'),
        address: '456 Driver Lane, City, State 54321',
        emergencyContact: '+1 (555) 987-6543',
      };
      this.loading = false;
    }, 500);
  }

  goBack(): void {
    this.router.navigate(['/admin/drivers']);
  }

  editDriver(): void {
    // TODO: Implement edit functionality
    console.log('Edit driver:', this.driverId);
  }

  suspendDriver(): void {
    // TODO: Implement suspend functionality
    if (confirm('Are you sure you want to suspend this driver?')) {
      console.log('Suspend driver:', this.driverId);
    }
  }

  deleteDriver(): void {
    // TODO: Implement delete functionality
    if (confirm('Are you sure you want to delete this driver?')) {
      console.log('Delete driver:', this.driverId);
    }
  }
}
