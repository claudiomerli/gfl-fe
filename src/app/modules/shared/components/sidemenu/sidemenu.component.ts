import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Select, Store} from "@ngxs/store";
import {AuthenticationState} from "../../../store/state/authentication-state";
import {Observable} from "rxjs";
import {User} from "../../model/user";

@Component({
  selector: 'app-sidemenu',
  templateUrl: './sidemenu.component.html',
  styleUrls: ['./sidemenu.component.scss']
})
export class SidemenuComponent implements OnInit {

  @Select(AuthenticationState.user) user$!: Observable<User>

  @Output() logout: EventEmitter<void> = new EventEmitter<void>();

  ngOnInit(): void {

  }

  onLogout() {
    this.logout.emit()
  }
}
