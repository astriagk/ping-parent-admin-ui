import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgxUiLoaderModule } from 'ngx-ui-loader';

import { SharedModule } from '@shared/shared.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ShopModule } from './shop/shop.module';
import { environment } from '../environments/environment';
import { reducers } from '@store/app.state';
import { AuthEffects } from '@store/effects/auth.effects';
import { AdminEffects } from '@store/effects/admin.effects';
import { LoaderInterceptor } from '@shared/interceptors/loader.interceptor';
import { loaderConfig } from '@shared/config/loader.config';
import { UserEffects } from '@store/effects/user.effects';
import { DriverEffects } from '@store/effects/driver.effects';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    ShopModule,
    BrowserAnimationsModule,
    NgxUiLoaderModule.forRoot(loaderConfig),
    ToastrModule.forRoot({
      timeOut: 3000,
      progressBar: false,
      enableHtml: true,
      positionClass: 'toast-top-center',
    }),
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([
      AuthEffects,
      AdminEffects,
      UserEffects,
      DriverEffects,
    ]),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoaderInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
