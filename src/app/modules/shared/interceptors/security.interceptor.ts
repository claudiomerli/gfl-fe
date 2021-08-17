import {Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpHeaders, HttpResponse
} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AuthService} from "../services/auth.service";
import {tap} from "rxjs/operators";
import {Router} from "@angular/router";

@Injectable()
export class SecurityInterceptor implements HttpInterceptor {

  constructor(private authenticationService: AuthService, private router: Router) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let accessTokenFromLocalStorage = this.authenticationService.getAccessTokenFromLocalStorage();
    let responseObserver

    if (accessTokenFromLocalStorage?.accessToken) {
      responseObserver = next.handle(request.clone({
        headers: request.headers
          .append("Authorization", "Bearer " + accessTokenFromLocalStorage.accessToken)
      }))
    } else {
      responseObserver = next.handle(request)
    }

    return responseObserver
      .pipe(
        tap((response: HttpEvent<any>) => {
          let statusCodeResponse = (response as HttpResponse<any>).status;
          if (statusCodeResponse === 401) {
            this.authenticationService.clearLocalStorage();
            this.router.navigate(["/auth/login"]);
          }
        })
      )
  }
}
