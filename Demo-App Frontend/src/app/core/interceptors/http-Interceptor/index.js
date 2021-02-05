import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { InterceptorService } from "./interceptor.service";
import { HttpErrorService } from "./http-error.service";

export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: HttpErrorService, multi: true },
];
