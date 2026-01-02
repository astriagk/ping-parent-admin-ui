import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { ApiEndpoints } from '@shared/constants/api-endpoints';
import { UserRole } from '@shared/constants/app.enums';

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(private api: ApiService) {}

  getUserList(
    user_type?: UserRole,
    page?: number,
    limit?: number
  ): Observable<any> {
    const params: any = {};
    if (user_type !== undefined) params.user_type = user_type;
    if (page !== undefined) params.page = page;
    if (limit !== undefined) params.limit = limit;

    return this.api.get<any>(ApiEndpoints.USER_LIST, params);
  }
}
