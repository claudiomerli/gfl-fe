import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../../shared/services/auth.service";
import {SigninDto} from "../../../shared/messages/signin.dto";
import {Router} from "@angular/router";
import {Store} from "@ngxs/store";
import {LoadUserAction} from "../../../store/state/authentication-state";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private store: Store, private authService: AuthService, private router: Router) {
  }

  ngOnInit(): void {
  }

  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  })

  loginError = false;

  doSignin() {
    this.authService
      .signin({
        username: this.loginForm.controls.username.value!,
        password: this.loginForm.controls.password.value!
      })
      .subscribe(accessToken => {
          this.store.dispatch(new LoadUserAction(accessToken.accessToken))
            .subscribe(() => {
              this.router.navigate(['/'])
            })
        },
        () => {
          console.log("Errore")
          this.loginError = true
        });
  }
}
