import { Component, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, Validators } from '@angular/forms';
import { filter } from 'rxjs/operators';
import { ValidationMessages } from '@shared/constants/validation-messages';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Messages } from '@shared/constants/messages';
import { ROUTE_PATHS } from '@shared/constants/routesPaths';
import {
  selectAuthError,
  selectAuthLoading,
  selectUser,
} from '@store/selectors/auth.selectors';
import { AppState } from '@store/app.state';
import * as AuthActions from '@store/actions/auth.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: false,
})
export class LoginComponent implements OnDestroy {
  isShowPass = false;

  handleShowPass() {
    this.isShowPass = !this.isShowPass;
  }

  public loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });
  public formSubmitted = false;

  loading$ = this.store.select(selectAuthLoading);
  error$ = this.store.select(selectAuthError);

  private subscriptions = new Subscription();

  constructor(
    private toastrService: ToastrService,
    private store: Store<AppState>,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit() {
    // Reset form and show toast on successful login
    this.subscriptions.add(
      this.store
        .select(selectUser)
        .pipe(filter((user) => !!user))
        .subscribe(() => {
          this.loginForm.reset();
          this.formSubmitted = false;
          this.toastrService.success(Messages.LOGIN.SUCCESS);
          this.router.navigate([ROUTE_PATHS.HOME]);
        })
    );
    // Show toast on login error
    this.subscriptions.add(
      this.error$.pipe(filter((err) => !!err)).subscribe((err: any) => {
        if (err?.error || err?.message) {
          this.toastrService.error(err.error || err.message);
        } else if (typeof err === 'string') {
          this.toastrService.error(err);
        }
      })
    );
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  onSubmit() {
    this.formSubmitted = true;
    console.log(this.loginForm.valid);
    if (this.loginForm.valid) {
      const email = this.loginForm.get('email')?.value ?? '';
      const password = this.loginForm.get('password')?.value ?? '';
      this.store.dispatch(AuthActions.login({ email, password }));
      // Optionally reset form on success (subscribe to store for success)
    }
  }

  getError(controlName: 'email' | 'password'): string {
    const control = this.loginForm.get(controlName);
    if (!control) return '';
    const messages = ValidationMessages.Login[controlName] as Record<
      string,
      string
    >;
    if (control.errors) {
      for (const error in control.errors) {
        if (Object.prototype.hasOwnProperty.call(messages, error)) {
          return messages[error] || '';
        }
      }
    }
    return '';
  }
}
