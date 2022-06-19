import {Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpHeaders, HttpResponse, HttpErrorResponse
} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {AuthService} from "../services/auth.service";
import {catchError, tap} from "rxjs/operators";
import {Router} from "@angular/router";

@Injectable()
export class SecurityInterceptor implements HttpInterceptor {

  constructor(
    private authenticationService: AuthService,
    private router: Router) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let accessTokenFromLocalStorage = this.authenticationService.getAccessTokenFromLocalStorage();
    let responseObserver

    if (accessTokenFromLocalStorage) {
      responseObserver = next.handle(request.clone({
        headers: request.headers
          .append("Authorization", "Bearer " + accessTokenFromLocalStorage)
      }))
    } else {
      responseObserver = next.handle(request)
    }

    return responseObserver
      .pipe(
        catchError(err => {
          if (err instanceof HttpErrorResponse) {
            if (err.status === 401) {
              this.authenticationService.clearLocalStorage();
              this.router.navigate(["/auth/login"]);
            }
          }
          return throwError(err)
        })
      )
  }
}
