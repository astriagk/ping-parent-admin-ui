import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

interface Driver {
  id: string;
  name: string;
  email: string;
  phone: string;
  vehicleNumber: string;
  status: string;
  rating: number;
  totalTrips: number;
  joinedDate: Date;
}

@Component({
  selector: 'app-driver-list',
  templateUrl: './driver-list.component.html',
  styleUrls: ['./driver-list.component.scss'],
  standalone: false,
})
export class DriverListComponent implements OnInit {
  drivers: Driver[] = [];
  loading: boolean = true;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.loadDrivers();
  }

  loadDrivers(): void {
    // TODO: Replace with actual API call
    setTimeout(() => {
      this.drivers = [
        {
          id: '1',
          name: 'Michael Brown',
          email: 'michael.brown@example.com',
          phone: '+1 (555) 234-5678',
          vehicleNumber: 'ABC-1234',
          status: 'Active',
          rating: 4.8,
          totalTrips: 245,
          joinedDate: new Date('2024-01-10'),
        },
        {
          id: '2',
          name: 'Sarah Wilson',
          email: 'sarah.wilson@example.com',
          phone: '+1 (555) 345-6789',
          vehicleNumber: 'XYZ-5678',
          status: 'Active',
          rating: 4.9,
          totalTrips: 312,
          joinedDate: new Date('2023-11-15'),
        },
        {
          id: '3',
          name: 'David Lee',
          email: 'david.lee@example.com',
          phone: '+1 (555) 456-7890',
          vehicleNumber: 'DEF-9012',
          status: 'Offline',
          rating: 4.5,
          totalTrips: 178,
          joinedDate: new Date('2024-03-22'),
        },
        {
          id: '4',
          name: 'Emily Davis',
          email: 'emily.davis@example.com',
          phone: '+1 (555) 567-8901',
          vehicleNumber: 'GHI-3456',
          status: 'Active',
          rating: 4.7,
          totalTrips: 203,
          joinedDate: new Date('2024-02-05'),
        },
      ];
      this.loading = false;
    }, 500);
  }

  viewDriverDetails(driverId: string): void {
    this.router.navigate(['/admin/drivers', driverId]);
  }
}
