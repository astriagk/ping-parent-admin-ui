import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { ApiEndpoints } from '../constants/api-endpoints';
import { LoginResponse, VerifyTokenResponse } from '../types/Pages/login.types';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private api: ApiService) {}

  verifyToken(): Observable<VerifyTokenResponse> {
    return this.api.get<VerifyTokenResponse>(ApiEndpoints.VERIFY_TOKEN);
  }

  login(email: string, password: string): Observable<LoginResponse> {
    console.log(email, password);
    return this.api.post(ApiEndpoints.LOGIN, {
      email,
      password,
    });
  }

  register(username: string, password: string, email: string): Observable<any> {
    return this.api.post(ApiEndpoints.REGISTER, {
      username,
      password,
      email,
    });
  }
}
