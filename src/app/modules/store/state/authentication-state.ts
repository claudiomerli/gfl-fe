import {Action, createSelector, Selector, State, StateContext} from "@ngxs/store";
import {Injectable} from "@angular/core";
import {User} from "../../shared/messages/auth/user";
import {AuthService} from "../../shared/services/auth.service";
import {catchError, tap} from "rxjs/operators";
import {EMPTY} from "rxjs";

export interface AuthenticationStateModel {
  isAuthenticated: boolean
  user?: User
  accessToken?: string
}

export class LoadInitialAuthentication {
  static readonly type = '[Authentication] Initial Authentication'

  constructor() {
  }
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


  static isUserInRole(role: string) {
    return createSelector([AuthenticationState], (state: AuthenticationStateModel) => {
      return state.user?.role === role
    })
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

  @Action(LoadInitialAuthentication)
  loadInitialAuthentication(ctx: StateContext<AuthenticationStateModel>) {
    let token = this.authService.getAccessTokenFromLocalStorage();
    if (token)
      return ctx.dispatch(new LoadUserAction(token))
        .pipe(
          catchError(err => {
            this.authService.clearLocalStorage();
            return EMPTY
          })
        )
    else {
      return EMPTY
    }
  }

}
