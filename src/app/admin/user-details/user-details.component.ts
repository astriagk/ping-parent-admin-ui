import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

interface UserDetails {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: string;
  accountType: string;
  totalTrips: number;
  totalSpent: number;
  joinedDate: Date;
  lastActiveDate: Date;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  paymentMethod: string;
}

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss'],
  standalone: false,
})
export class UserDetailsComponent implements OnInit {
  userId: string | null = null;
  user: UserDetails | null = null;
  loading: boolean = true;

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.userId = this.route.snapshot.paramMap.get('id');
    if (this.userId) {
      this.loadUserDetails(this.userId);
    }
  }

  loadUserDetails(id: string): void {
    // TODO: Replace with actual API call
    setTimeout(() => {
      this.user = {
        id: id,
        name: 'Robert Johnson',
        email: 'robert.j@example.com',
        phone: '+1 (555) 111-2222',
        status: 'Active',
        accountType: 'Premium',
        totalTrips: 45,
        totalSpent: 2340.5,
        joinedDate: new Date('2023-12-05'),
        lastActiveDate: new Date('2025-01-01'),
        address: '789 User Avenue',
        city: 'Springfield',
        state: 'IL',
        zipCode: '62701',
        paymentMethod: 'Credit Card ending in 4242',
      };
      this.loading = false;
    }, 500);
  }

  goBack(): void {
    this.router.navigate(['/admin/users']);
  }

  editUser(): void {
    // TODO: Implement edit functionality
    console.log('Edit user:', this.userId);
  }

  suspendUser(): void {
    // TODO: Implement suspend functionality
    if (confirm('Are you sure you want to suspend this user?')) {
      console.log('Suspend user:', this.userId);
    }
  }

  deleteUser(): void {
    // TODO: Implement delete functionality
    if (confirm('Are you sure you want to delete this user?')) {
      console.log('Delete user:', this.userId);
    }
  }
}
