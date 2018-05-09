import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { SpinnerInterceptor } from './spinner-interceptor';

import { ApiUrlInterceptor } from './api-url-interceptor';

export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: ApiUrlInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: SpinnerInterceptor, multi: true },
];
