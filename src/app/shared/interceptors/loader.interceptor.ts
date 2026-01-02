import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, finalize, map } from 'rxjs/operators';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {
  private activeRequests = 0;

  constructor(private ngxLoader: NgxUiLoaderService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    // Skip loader for requests with custom header
    if (request.headers.has('X-Skip-Loader')) {
      const modifiedRequest = request.clone({
        headers: request.headers.delete('X-Skip-Loader'),
      });
      return next.handle(modifiedRequest);
    }

    // Show loader for API requests
    this.activeRequests++;
    if (this.activeRequests === 1) {
      this.ngxLoader.start();
    }

    return next.handle(request).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          // Request completed successfully
        }
        return event;
      }),
      catchError((error: HttpErrorResponse) => {
        // Handle errors
        return throwError(() => error);
      }),
      finalize(() => {
        // Hide loader when request completes (success or error)
        this.activeRequests--;
        if (this.activeRequests <= 0) {
          this.activeRequests = 0;
          this.ngxLoader.stop();
        }
      })
    );
  }
}
