import {Injectable} from '@angular/core';
import {User} from "../model/user";
import {HttpClient} from "@angular/common/http";
import {SigninDto} from "../messages/signin.dto";
import {environment} from "../../../../environments/environment";
import {BehaviorSubject, Observable, Subject} from "rxjs";
import {AccessTokenDto} from "../messages/access-token.dto";
import {tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient) {
  }

  readonly LS_USER_KEY = "current_user";
  readonly LS_ACCESSTOKEN_KEY = "access_token";
  readonly currentUser = new BehaviorSubject<User | undefined>(undefined)

  public getCurrentUserFromLocalStorage(): User | undefined {
    let userJson = localStorage.getItem(this.LS_USER_KEY);

    if (!userJson) {
      return undefined;
    }

    return JSON.parse(userJson) as User;
  }

  public storeUserToLocalStorage(user: User) {
    localStorage.setItem(this.LS_USER_KEY, JSON.stringify(user));
  }

  public getAccessTokenFromLocalStorage(): AccessTokenDto | undefined {
    let accessTokenJson = localStorage.getItem(this.LS_ACCESSTOKEN_KEY);

    if (!accessTokenJson) {
      return undefined;
    }

    return JSON.parse(accessTokenJson) as AccessTokenDto;
  }

  public storeAccessTokenToLocalStorage(accessToken: AccessTokenDto) {
    localStorage.setItem(this.LS_ACCESSTOKEN_KEY, JSON.stringify(accessToken));
  }

  signin(signinDto: SigninDto | undefined): Observable<AccessTokenDto> {
    return this.httpClient.post<AccessTokenDto>(environment.apiBaseurl + "/auth/signin", signinDto);
  }

  loadUserInfo() {
    this.httpClient.get<User>(environment.apiBaseurl + "/auth/userInfo").subscribe(user => {
      this.storeUserToLocalStorage(user);
      this.currentUser.next(user);
    })
  }

  clearLocalStorage() {
    localStorage.clear();
  }
}
