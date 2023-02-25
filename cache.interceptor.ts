import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable, from } from 'rxjs';

@Injectable()
export class CacheInterceptor implements HttpInterceptor {
  intercept(request: any, next: HttpHandler): Observable<any> {
    if (navigator.onLine) {
      // If online, don't use cache, proceed with the request
      return next.handle(request);
    } else {
      // If offline, try to get the request from the cache
      return from(
        caches.match(request).then((response) => {
          if (response) {
            // If the response is in the cache, return it
            return response;
          } else {
            // If the response is not in the cache, proceed with the request
            return next.handle(request);
          }
        })
      );
    }
  }
}
