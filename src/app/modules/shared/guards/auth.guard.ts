import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthService} from "../services/auth.service";
import {first, map, switchMap, take} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let availableRoles = route.data.availableRoles || [];

    console.log(availableRoles)

    let currentUser = this.authService.getCurrentUserFromLocalStorage();

    if (currentUser && availableRoles.length == 0) {
      console.log("Caso 1 guardia")
      return true;
    } else if (currentUser && availableRoles.includes(currentUser.role)) {
      console.log("Caso 2 guardia")
      return true;
    } else {
      console.log("Caso 3 guardia")
      this.router.navigate(["/auth/login"]);
      return false;
    }
  }

}
