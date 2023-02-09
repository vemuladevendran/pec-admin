import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppShellModule } from './components/app-shell/app-shell.module';
import { ToastrModule } from 'ngx-toastr';
import { CommonComponentModule } from './components/common-components/common-component.module';
import { AuthInterceptorService } from './services/auth/auth-interceptor.service';

// HttpClientModule

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AppShellModule,
    HttpClientModule,
    CommonComponentModule,
    ToastrModule.forRoot({
      timeOut: 10000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
      progressBar: true,
    }),
  ],
 providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    }
  ],  bootstrap: [AppComponent],
})
export class AppModule {}
