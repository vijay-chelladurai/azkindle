import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PagenotfoundComponent } from './shared/pagenotfound/pagenotfound.component';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { UnauthorizedComponent } from './shared/unauthorized/unauthorized.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { AuthService } from './services/auth.services';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './pages/interceptor/global.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    PagenotfoundComponent,
    LandingPageComponent,
    UnauthorizedComponent,
    NavbarComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, NgbModule],
  providers: [
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      multi: true,
      useClass: AuthInterceptor,
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
