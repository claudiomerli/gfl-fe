import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthenticationState} from "../../store/state/authentication-state";
import {Store} from "@ngxs/store";

@Injectable({
  providedIn: 'root'
})
export class RedirectGuard implements CanActivate {

  constructor(private router: Router, private store: Store) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let user = this.store.selectSnapshot(AuthenticationState.user);
    if (!user) {
      this.router.navigate(['/auth/login'])
    } else if (route.url.length === 0) {
      switch (user.role) {
        case "ADMIN":
          this.router.navigate(['/newspapers'])
          break;
        case "CUSTOMER":
          this.router.navigate(['/news'])
          break;
        case "ADMINISTRATION":
        case "PUBLISHER":
        case "CHIEF_EDITOR":
          this.router.navigate(['/projects'])
          break;
      }
    }

    return false;
  }

}
