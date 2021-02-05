import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './Shared/shared/shared.module';
import { PageNotFoundComponent } from './core/Components/page-not-found/page-not-found.component';
import { httpInterceptorProviders} from './core/interceptors/http-Interceptor';
import { HttpErrorService } from './core/interceptors/http-Interceptor/http-error.service';
import { InterceptorService } from './core/interceptors/http-Interceptor/interceptor.service';


@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule
  ],
  providers: [
    httpInterceptorProviders,
    HttpErrorService,
    InterceptorService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
