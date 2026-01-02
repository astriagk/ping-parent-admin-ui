import { ApiOperationType, LocalStorageKey } from '../constants/app.enums';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ApiService {
  constructor(private http: HttpClient) {}

  // Automatically add Authorization header if token is present in localStorage
  private withAuth(options?: object): object {
    const token = localStorage.getItem(LocalStorageKey.AccessToken);
    if (token) {
      const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
      if (options && 'headers' in options) {
        // Merge with existing headers if present
        const existing = (options as any).headers;
        return {
          ...options,
          headers: existing
            ? existing.append('Authorization', `Bearer ${token}`)
            : headers,
        };
      }
      return { ...(options || {}), headers };
    }
    return options || {};
  }

  private URL(url: string): string {
    return environment.apiUrl + url;
  }

  get<T>(
    url: string,
    params?: HttpParams | { [param: string]: string | string[] },
    options?: object
  ): Observable<T> {
    return this.http.get<T>(this.URL(url), {
      ...(options || {}),
      params,
      ...this.withAuth(options),
    });
  }

  post<T>(url: string, body: any, options?: object): Observable<T> {
    return this.http.post<T>(this.URL(url), body, this.withAuth(options));
  }

  put<T>(url: string, body: any, options?: object): Observable<T> {
    return this.http.put<T>(this.URL(url), body, this.withAuth(options));
  }

  delete<T>(url: string, options?: object): Observable<T> {
    return this.http.delete<T>(this.URL(url), this.withAuth(options));
  }

  patch<T>(url: string, body: any, options?: object): Observable<T> {
    return this.http.patch<T>(this.URL(url), body, this.withAuth(options));
  }
}
