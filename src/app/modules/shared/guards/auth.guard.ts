import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable, of} from 'rxjs';
import {AuthService} from "../services/auth.service";
import {catchError, first, map, switchMap, take, tap} from "rxjs/operators";
import {Store} from "@ngxs/store";
import {AuthenticationState, LoadUserAction} from "../../store/state/authentication-state";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService,
              private router: Router,
              private store: Store
  ) {

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let availableRoles = route.data.availableRoles || [];
    let currentUser = this.store.selectSnapshot(AuthenticationState.user);

    if (currentUser) {
      console.log("currentUser Present")
      if (!!(currentUser && (availableRoles.length == 0 || availableRoles.includes(currentUser.role)))) {
        return true
      } else {
        this.router.navigate(["/"]);
        return false
      }
    } else {
      console.log("Not Authenticated, redirect to login")
      this.router.navigate(["/auth/login"]);
      return false;
    }
  }

}
