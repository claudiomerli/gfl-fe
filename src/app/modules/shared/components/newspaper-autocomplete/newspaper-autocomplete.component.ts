import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {FormControl} from "@angular/forms";
import {ProjectService} from "../../services/project.service";
import {Project} from "../../messages/project/project";
import {debounceTime} from "rxjs/operators";
import {PaginationDto} from "../../messages/common/pagination.dto";
import {NewspaperService} from "../../services/newspaper.service";
import {Newspaper} from "../../messages/newspaper/newspaper";

@Component({
  selector: 'app-newspaper-autocomplete',
  templateUrl: './newspaper-autocomplete.component.html',
  styleUrls: ['./newspaper-autocomplete.component.scss']
})
export class NewspaperAutocompleteComponent implements OnChanges{

  @Input() formControlInput!: FormControl;

  constructor(private newspaperService: NewspaperService) {
  }

  newspapers: Newspaper[] = [];

  displayFullnameNewspaper = (newspaper: Newspaper) => newspaper?.name || '';

  ngOnChanges(changes: SimpleChanges) {
    if (changes.formControlInput.currentValue) {
      this.formControlInput.valueChanges
        .pipe(debounceTime(1000))
        .subscribe((value) => {
          if (value != null && typeof value === "string" && value !== "") {
            this.newspaperService
              .findForAutocomplete({name: value}, new PaginationDto(0, 10, "ASC", "name"))
              .subscribe(value => {
                this.newspapers = value.content
              })
          } else {
            this.newspapers = []
          }
        })
    }
  }

}
