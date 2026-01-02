import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import {
  UpdateApprovalStatusPayload,
  UpdateApprovalStatusResponse,
} from '@shared/types/driver.types';

@Injectable({ providedIn: 'root' })
export class DriverService {
  constructor(private api: ApiService) {}

  getDriverDetails(driverId: string): Observable<any> {
    return this.api.get<any>(`/admin/drivers/${driverId}/details`);
  }

  updateDriverApprovalStatus(
    driverId: string,
    payload: UpdateApprovalStatusPayload
  ): Observable<UpdateApprovalStatusResponse> {
    return this.api.patch<UpdateApprovalStatusResponse>(
      `/admin/drivers/${driverId}/approval-status`,
      payload
    );
  }
}
