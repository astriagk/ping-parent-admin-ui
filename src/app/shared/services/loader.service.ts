import { Injectable } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  private activeRequests = 0;

  constructor(private ngxLoader: NgxUiLoaderService) {}

  /**
   * Show the loader
   */
  show(): void {
    this.activeRequests++;
    if (this.activeRequests === 1) {
      this.ngxLoader.start();
    }
  }

  /**
   * Hide the loader
   * Only hides when all active requests are completed
   */
  hide(): void {
    this.activeRequests--;
    if (this.activeRequests <= 0) {
      this.activeRequests = 0;
      this.ngxLoader.stop();
    }
  }

  /**
   * Force hide the loader regardless of active requests
   */
  forceHide(): void {
    this.activeRequests = 0;
    this.ngxLoader.stop();
  }

  /**
   * Show loader with a specific task ID
   */
  startBackground(taskId: string = 'default'): void {
    this.ngxLoader.startBackground(taskId);
  }

  /**
   * Stop loader with a specific task ID
   */
  stopBackground(taskId: string = 'default'): void {
    this.ngxLoader.stopBackground(taskId);
  }

  /**
   * Start loader for a specific task
   */
  startLoader(loaderId: string = 'master'): void {
    this.ngxLoader.startLoader(loaderId);
  }

  /**
   * Stop loader for a specific task
   */
  stopLoader(loaderId: string = 'master'): void {
    this.ngxLoader.stopLoader(loaderId);
  }
}
