import {Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpHeaders, HttpResponse, HttpErrorResponse, HttpResponseBase
} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {AuthService} from "../services/auth.service";
import {catchError, tap} from "rxjs/operators";
import {Router} from "@angular/router";
import {NgxSpinner, NgxSpinnerService} from "ngx-spinner";

@Injectable()
export class SecurityInterceptor implements HttpInterceptor {

  constructor(
    private authenticationService: AuthService,
    private router: Router,
    private spinner: NgxSpinnerService) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let accessTokenFromLocalStorage = this.authenticationService.getAccessTokenFromLocalStorage();
    let responseObserver
    let disableSpinner = request.headers.get("disableSpinner")

    if (accessTokenFromLocalStorage) {
      responseObserver = next.handle(request.clone({
        headers: request.headers.append("Authorization", "Bearer " + accessTokenFromLocalStorage)
      }))
    } else {
      responseObserver = next.handle(request)
    }

    if (!disableSpinner) {
      this.spinner.show()
    }

    return responseObserver
      .pipe(
        tap((response) => {
          if (response instanceof HttpResponseBase) {
            this.spinner.hide()
          }
        }),
        catchError(err => {
          if (err instanceof HttpErrorResponse) {
            this.spinner.hide()
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
