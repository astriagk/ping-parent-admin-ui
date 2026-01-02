import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLayoutComponent } from '@shared/layouts/admin-layout/admin-layout.component';
import { AdminListComponent } from './admin-list/admin-list.component';
import { AdminDetailsComponent } from './admin-details/admin-details.component';
import { DriverListComponent } from './driver-list/driver-list.component';
import { DriverDetailsComponent } from './driver-details/driver-details.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { BREADCRUMB_LABELS, PAGE_TITLES } from '@shared/constants/route.constants';

const routes: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      {
        path: 'admins',
        data: { breadcrumb: BREADCRUMB_LABELS.admin.admins },
        children: [
          {
            path: '',
            component: AdminListComponent,
            title: PAGE_TITLES.admin.adminList,
          },
          {
            path: ':id',
            component: AdminDetailsComponent,
            title: PAGE_TITLES.admin.adminDetails,
            data: { breadcrumb: BREADCRUMB_LABELS.admin.adminDetails },
          },
        ],
      },
      {
        path: 'drivers',
        data: { breadcrumb: BREADCRUMB_LABELS.admin.drivers },
        children: [
          {
            path: '',
            component: DriverListComponent,
            title: PAGE_TITLES.admin.driverList,
          },
          {
            path: ':id',
            component: DriverDetailsComponent,
            title: PAGE_TITLES.admin.driverDetails,
            data: { breadcrumb: BREADCRUMB_LABELS.admin.driverDetails },
          },
        ],
      },
      {
        path: 'users',
        data: { breadcrumb: BREADCRUMB_LABELS.admin.users },
        children: [
          {
            path: '',
            component: UserListComponent,
            title: PAGE_TITLES.admin.userList,
          },
          {
            path: ':id',
            component: UserDetailsComponent,
            title: PAGE_TITLES.admin.userDetails,
            data: { breadcrumb: BREADCRUMB_LABELS.admin.userDetails },
          },
        ],
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
