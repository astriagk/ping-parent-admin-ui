import { Component, OnInit } from '@angular/core';
import { Router, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    standalone: false
})
export class AppComponent implements OnInit {
  title = 'Outstock - Clean, Minimal eCommerce Angular Template';

  constructor(
    private router: Router,
    private ngxLoader: NgxUiLoaderService
  ) {}

  ngOnInit(): void {
    // Show loader on route navigation start
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.ngxLoader.start();
      }

      if (
        event instanceof NavigationEnd ||
        event instanceof NavigationCancel ||
        event instanceof NavigationError
      ) {
        this.ngxLoader.stop();
      }
    });
  }
}
