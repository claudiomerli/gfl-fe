import {Component, OnInit} from '@angular/core';
import {AuthService} from "./modules/shared/services/auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'gfl-fe';

  constructor(private authenticationService: AuthService) {
  }


  ngOnInit(): void {
    if (this.authenticationService.getAccessTokenFromLocalStorage()) {
      this.authenticationService.loadUserInfo().subscribe();
    }
  }

}
