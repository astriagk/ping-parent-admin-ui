import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({ providedIn: 'root' })
export class DriverService {
  constructor(private api: ApiService) {}

  getDriverDetails(driverId: string): Observable<any> {
    return this.api.get<any>(`/admin/drivers/${driverId}/details`);
  }
}
