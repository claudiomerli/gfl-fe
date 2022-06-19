import
{Action, Selector, State, StateContext} from "@ngxs/store";
import {Injectable} from "@angular/core";

export interface ApplicationStateModel {
  menuOpen: boolean;
}

export class SetStateAction {
  static readonly type = '[Application] SetState'

  constructor(public applicationStateModel: ApplicationStateModel) {
  }
}

@State<ApplicationStateModel>({
  name: 'application',
  defaults: {
    menuOpen: false
  }
})
@Injectable()
export class ApplicationState {

  @Selector()
  static menuState(state: ApplicationStateModel) {
    return state.menuOpen
  }

  @Action(SetStateAction)
  setState(ctx: StateContext<ApplicationStateModel>, action: SetStateAction) {
    ctx.setState({
      ...action.applicationStateModel
    })
  }

}
