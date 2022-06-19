import {Action, Selector, State, StateContext} from "@ngxs/store";
import {Injectable} from "@angular/core";
import {User} from "../../shared/model/user";
import {AuthService} from "../../shared/services/auth.service";
import {map, switchMap, tap} from "rxjs/operators";
import {Router} from "@angular/router";
import {Observable, of} from "rxjs";

export interface AuthenticationStateModel {
  isAuthenticated: boolean
  user?: User
  accessToken?: string
}

export class LoadUserAction {
  static readonly type = '[Authentication] Authenticate'

  constructor(public accessToken: string) {
  }
}

export class SignoutAction {
  static readonly type = '[Authentication] Signout'

  constructor() {
  }
}

@State<AuthenticationStateModel>({
  name: 'authentication',
  defaults: {
    isAuthenticated: false
  }
})
@Injectable()
export class AuthenticationState {

  constructor(private authService: AuthService) {
  }

  @Selector()
  static isAuthenticated(state: AuthenticationStateModel) {
    return state.isAuthenticated
  }

  @Selector()
  static user(state: AuthenticationStateModel) {
    return state.user
  }

  @Action(SignoutAction)
  signout(ctx: StateContext<AuthenticationStateModel>) {
    ctx.setState({
      isAuthenticated: false
    })
    this.authService.clearLocalStorage()
  }

  @Action(LoadUserAction)
  setState(ctx: StateContext<AuthenticationStateModel>, action: LoadUserAction) {
    this.authService.storeAccessTokenToLocalStorage(action.accessToken)
    return this.authService.loadUserInfo().pipe(
      tap(user => {
        ctx.setState({
          isAuthenticated: true,
          accessToken: action.accessToken,
          user: user
        });
      }))
  }

}
