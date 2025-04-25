import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {FormControl} from "@angular/forms";
import {debounceTime} from "rxjs/operators";
import {PaginationDto} from "../../messages/common/pagination.dto";
import {User} from "../../messages/auth/user";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-user-autocomplete',
  templateUrl: './user-autocomplete.component.html',
  styleUrls: ['./user-autocomplete.component.scss']
})
export class UserAutocompleteComponent implements OnChanges {

  @Input() formControlInput!: FormControl;
  @Input() role!: string;
  @Input() label!: string;
  @Input() placeholder!: string;

  constructor(private userService: UserService) {
  }

  users: User[] = [];

  displayFullnameUser = (user: User) => user?.fullname || ""

  ngOnChanges(changes: SimpleChanges) {
    if (changes.formControlInput.currentValue) {
      this.formControlInput.valueChanges
        .pipe(debounceTime(1000))
        .subscribe((value) => {
          if (value != null && typeof value === "string" && value !== "") {
            this.userService.findForAutocomplete(value, this.role, new PaginationDto(0, 10, "ASC", "fullname"))
              .subscribe(value => {
                this.users = value.content
              })
          } else {
            this.users = []
          }
        })
    }
  }

}
