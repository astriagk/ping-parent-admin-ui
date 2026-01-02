import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { filter, distinctUntilChanged } from 'rxjs/operators';
import { NON_CLICKABLE_BREADCRUMBS } from '@shared/constants/route.constants';

interface Breadcrumb {
  label: string;
  url: string;
  clickable: boolean;
}

@Component({
  selector: 'app-breadcrumb-two',
  templateUrl: './breadcrumb-two.component.html',
  styleUrls: ['./breadcrumb-two.component.scss'],
  standalone: false,
})
export class BreadcrumbTwoComponent implements OnInit {
  @Input() bg?: string;
  @Input() title!: string;
  @Input() subtitle!: string;

  public bg_img = '/assets/img/page-title/page-title-1.jpg';
  public breadcrumbs: Breadcrumb[] = [];

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    if (this.bg) {
      this.bg_img = this.bg;
    }

    // Build breadcrumbs on initial load
    this.breadcrumbs = this.createBreadcrumbs(this.activatedRoute.root);

    // Rebuild breadcrumbs on route change
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        distinctUntilChanged()
      )
      .subscribe(() => {
        this.breadcrumbs = this.createBreadcrumbs(this.activatedRoute.root);
      });
  }

  private createBreadcrumbs(route: ActivatedRoute): Breadcrumb[] {
    const breadcrumbs: Breadcrumb[] = [];
    let url = '';

    // Build the full route path
    let currentRoute: ActivatedRoute | null = route;
    const routeStack: ActivatedRoute[] = [];

    // Collect all routes from root to current
    while (currentRoute) {
      routeStack.push(currentRoute);
      currentRoute = currentRoute.firstChild;
    }

    // Build breadcrumbs from the route stack
    for (const rt of routeStack) {
      const routeURL = rt.snapshot.url.map((segment) => segment.path).join('/');

      if (routeURL && rt.snapshot.data['breadcrumb']) {
        url += `/${routeURL}`;
        const label = rt.snapshot.data['breadcrumb'];
        const clickable = this.isBreadcrumbClickable(url, breadcrumbs.length);
        breadcrumbs.push({ label, url, clickable });
      }
    }
    console.log(breadcrumbs);
    return breadcrumbs;
  }

  private isBreadcrumbClickable(url: string, index: number): boolean {
    // First breadcrumb (module root like /admin) is not clickable
    if (index === 0) {
      const segments = url.split('/').filter((s) => s);
      const module = segments[0];
      return !(NON_CLICKABLE_BREADCRUMBS as any)[module]?.root;
    }
    // All other breadcrumbs are clickable
    return true;
  }

  private formatLabel(segment: string): string {
    // Convert kebab-case or snake_case to Title Case
    return segment
      .replace(/[-_]/g, ' ')
      .replace(/\b\w/g, (char) => char.toUpperCase());
  }
}
