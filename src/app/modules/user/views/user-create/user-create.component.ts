import {Component, OnInit} from '@angular/core';
import {SaveUserDto} from "../../../shared/messages/users/save-user.dto";
import {UserService} from "../../../shared/services/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.scss']
})
export class UserCreateComponent implements OnInit {

  onSaving = false;

  constructor(private userService: UserService, private router: Router) {
  }

  ngOnInit(): void {
  }

  onSubmit($event: SaveUserDto) {
    this.onSaving = true
    this.userService.save($event).subscribe(() => {
      this.onSaving = false
      this.router.navigate(["/users"])
    }, error => {
      this.onSaving = false
      console.error(error)
    });
  }
}
