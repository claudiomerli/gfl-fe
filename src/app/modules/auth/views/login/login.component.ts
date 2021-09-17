import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../../shared/services/auth.service";
import {SigninDto} from "../../../shared/messages/signin.dto";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) {
  }

  ngOnInit(): void {
  }


  signinMessage = new SigninDto();
  loginError = false;

  doSignin() {
    this.authService
      .signin(this.signinMessage)
      .subscribe(accessToken => {
          this.authService.storeAccessTokenToLocalStorage(accessToken);
          this.authService.loadUserInfo().subscribe(() => {
            this.router.navigate(["/"]);
          });
        },
        error => {
          this.loginError = true
        });
  }
}
