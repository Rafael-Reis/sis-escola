import { NgModule , LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { APP_BASE_HREF } from '@angular/common';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
registerLocaleData(localePt);

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { SharedModule} from './shared/shared.module';
import { PainelModule } from './modules/painel/painel.module';

import { AuthInterceptor } from './auth/auth.interceptor';
import { TelaLoginComponent } from './auth/tela-login/tela-login.component';
import { FormLoginComponent } from './auth/form-login/form-login.component';

@NgModule({
  declarations: [
    AppComponent,
    TelaLoginComponent,
    FormLoginComponent
  ],
  imports: [
    SharedModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    PainelModule,
  ],
  exports:[

  ],
  providers: [
    {provide: LOCALE_ID, useValue: 'pt'},
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: APP_BASE_HREF, useValue : '/' },
    { provide: LocationStrategy, useClass: HashLocationStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
