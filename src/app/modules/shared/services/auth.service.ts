import {Injectable} from '@angular/core';
import {User} from "../messages/auth/user";
import {HttpClient} from "@angular/common/http";
import {SigninDto} from "../messages/auth/signin.dto";
import {environment} from "../../../../environments/environment";
import {BehaviorSubject, Observable, Subject} from "rxjs";
import {AccessTokenDto} from "../messages/auth/access-token.dto";
import {tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient) {
  }

  readonly LS_ACCESSTOKEN_KEY = "access_token";


  public getAccessTokenFromLocalStorage(): string | undefined | null {
    return localStorage.getItem(this.LS_ACCESSTOKEN_KEY);
  }

  public storeAccessTokenToLocalStorage(accessToken: string) {
    localStorage.setItem(this.LS_ACCESSTOKEN_KEY, accessToken);
  }

  signin(signinDto: SigninDto): Observable<AccessTokenDto> {
    return this.httpClient.post<AccessTokenDto>(environment.apiBaseurl + "/auth/signin", signinDto);
  }

  loadUserInfo(): Observable<User> {
    return this.httpClient.get<User>(environment.apiBaseurl + "/auth/userInfo")
  }

  clearLocalStorage() {
    localStorage.clear();
  }
}
