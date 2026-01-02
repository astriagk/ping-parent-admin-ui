import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { ApiEndpoints } from '../constants/api-endpoints';
import {
  AdminListResponse,
  AdminDetailResponse,
} from '../types/Pages/admin.types';

@Injectable({ providedIn: 'root' })
export class AdminService {
  constructor(private api: ApiService) {}

  getAdminList(): Observable<AdminListResponse> {
    return this.api.get<AdminListResponse>(ApiEndpoints.ADMIN_LIST);
  }

  getAdminById(adminId: string): Observable<AdminDetailResponse> {
    return this.api.get<AdminDetailResponse>(
      `${ApiEndpoints.ADMIN_DETAIL}/${adminId}`
    );
  }

  activateAdmin(adminId: string): Observable<AdminDetailResponse> {
    return this.api.patch<AdminDetailResponse>(
      `${ApiEndpoints.ADMIN_ACTIVATE}/${adminId}/activate`,
      {}
    );
  }

  deactivateAdmin(adminId: string): Observable<AdminDetailResponse> {
    return this.api.patch<AdminDetailResponse>(
      `${ApiEndpoints.ADMIN_DEACTIVATE}/${adminId}/deactivate`,
      {}
    );
  }
}
