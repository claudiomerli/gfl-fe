import {Component, OnInit, ViewChild} from '@angular/core';
import {Select, Store} from "@ngxs/store";
import {ApplicationState, SetStateAction} from "./modules/store/state/application-state";
import {Observable} from "rxjs";
import {MatDrawer} from "@angular/material/sidenav";
import {SignoutAction} from "./modules/store/state/authentication-state";
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'gfl-fe';

  @ViewChild("drawer") drawer!: MatDrawer
  @Select(ApplicationState.menuState) menuState!: Observable<ApplicationState>;

  constructor(private store: Store, private router: Router, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.drawer.close()
      }
    })
  }

  toggleMenu(opened: boolean) {
    this.store.dispatch(new SetStateAction({menuOpen: opened}))
  }

  onLogout() {
    this.store.dispatch(new SignoutAction()).subscribe(() => {
      this.router.navigate(['/auth/login'])
    })
  }
}
