import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Select, Store} from "@ngxs/store";
import {AuthenticationState} from "../../../store/state/authentication-state";
import {Observable} from "rxjs";
import {User} from "../../messages/auth/user";
import {userRoles} from "../../utils/utils";
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-sidemenu',
  templateUrl: './sidemenu.component.html',
  styleUrls: ['./sidemenu.component.scss']
})
export class SidemenuComponent implements OnInit {

  @Select(AuthenticationState.user) user$!: Observable<User>

  @Output() logout: EventEmitter<void> = new EventEmitter<void>();
  userRoles = userRoles;
  environment = environment;

  ngOnInit(): void {

  }

  onLogout() {
    this.logout.emit()
  }
}
