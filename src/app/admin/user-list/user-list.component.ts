import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: string;
  totalTrips: number;
  accountType: string;
  joinedDate: Date;
}

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
  standalone: false,
})
export class UserListComponent implements OnInit {
  users: User[] = [];
  loading: boolean = true;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    // TODO: Replace with actual API call
    setTimeout(() => {
      this.users = [
        {
          id: '1',
          name: 'Robert Johnson',
          email: 'robert.j@example.com',
          phone: '+1 (555) 111-2222',
          status: 'Active',
          totalTrips: 45,
          accountType: 'Premium',
          joinedDate: new Date('2023-12-05'),
        },
        {
          id: '2',
          name: 'Lisa Anderson',
          email: 'lisa.a@example.com',
          phone: '+1 (555) 222-3333',
          status: 'Active',
          totalTrips: 32,
          accountType: 'Standard',
          joinedDate: new Date('2024-01-20'),
        },
        {
          id: '3',
          name: 'James Wilson',
          email: 'james.w@example.com',
          phone: '+1 (555) 333-4444',
          status: 'Active',
          totalTrips: 78,
          accountType: 'Premium',
          joinedDate: new Date('2023-10-10'),
        },
        {
          id: '4',
          name: 'Maria Garcia',
          email: 'maria.g@example.com',
          phone: '+1 (555) 444-5555',
          status: 'Inactive',
          totalTrips: 12,
          accountType: 'Standard',
          joinedDate: new Date('2024-03-15'),
        },
        {
          id: '5',
          name: 'Thomas Brown',
          email: 'thomas.b@example.com',
          phone: '+1 (555) 555-6666',
          status: 'Active',
          totalTrips: 56,
          accountType: 'Premium',
          joinedDate: new Date('2023-11-28'),
        },
      ];
      this.loading = false;
    }, 500);
  }

  viewUserDetails(userId: string): void {
    this.router.navigate(['/admin/users', userId]);
  }
}
