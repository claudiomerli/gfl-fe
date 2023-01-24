import {Component, OnInit} from '@angular/core';
import {UserService} from "../../../shared/services/user.service";
import {ActivatedRoute, Router} from "@angular/router";
import {User} from "../../../shared/messages/auth/user";
import {EditUserDto} from "../../../shared/messages/users/edit-user.dto";

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.scss']
})
export class UserUpdateComponent implements OnInit {

  onSaving = false;
  userToUpdate: User | undefined;

  constructor(private userService: UserService, private router: Router, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.activatedRoute
      .paramMap
      .subscribe(params => {
        let id = params.get("id");
        if (id) {
          this.userService.findById(parseInt(id))
            .subscribe(user => {
              this.userToUpdate = user
            })
        }
      })
  }

  onSubmit($event: EditUserDto) {
    this.onSaving = true
    if (this.userToUpdate?.id) {
      this.userService
        .update(this.userToUpdate?.id, $event)
        .subscribe(() => {
          this.onSaving = false
          this.router.navigate(["/users"])
        }, error => {
          this.onSaving = false
          console.error(error)
        });
    }
  }

}
