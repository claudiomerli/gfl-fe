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

    console.log("###### Guardia ########")

    let token = this.authService.getAccessTokenFromLocalStorage();
    console.log("###### Token ########", token)
    let currentUser = this.store.selectSnapshot(AuthenticationState.user);
    console.log("###### Current User ########", currentUser)

    if (token && !currentUser) {
      console.log("Token Present but not currentUser")
      return this.store.dispatch(new LoadUserAction(token))
        .pipe(
          map(() => {
            const user = this.store.selectSnapshot(AuthenticationState.user)
            return !!(user && (availableRoles.length == 0 || availableRoles.includes(user.role)));
          }),
          catchError(err => {
            console.log("Error guard")
            this.router.navigate(["/auth/login"]);
            return of(false)
          })
        )
    } else if (currentUser) {
      console.log("currentUser Present")
      return !!(currentUser && (availableRoles.length == 0 || availableRoles.includes(currentUser.role)));
    } else {
      console.log("Not Authenticated, redirect to login")
      this.router.navigate(["/auth/login"]);
      return false;
    }
  }

}
