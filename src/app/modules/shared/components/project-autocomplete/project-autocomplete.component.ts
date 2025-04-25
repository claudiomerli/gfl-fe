import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Project} from "../../messages/project/project";
import {FormControl} from "@angular/forms";
import {ProjectService} from '../../services/project.service';
import {debounceTime} from "rxjs/operators";
import {PaginationDto} from "../../messages/common/pagination.dto";

@Component({
  selector: 'app-project-autocomplete',
  templateUrl: './project-autocomplete.component.html',
  styleUrls: ['./project-autocomplete.component.scss']
})
export class ProjectAutocompleteComponent implements OnChanges {

  @Input() formControlInput!: FormControl;

  constructor(private projectService: ProjectService) {
  }

  projects: Project[] = [];

  displayFullnameProject = (project: Project) => project?.name || '';

  ngOnChanges(changes: SimpleChanges) {
    if (changes.formControlInput.currentValue) {
      this.formControlInput.valueChanges
        .pipe(debounceTime(1000))
        .subscribe((value) => {
          if (value != null && typeof value === "string" && value !== "") {
            this.projectService
              .findForAutocomplete(value, "", new PaginationDto(0, 10, "ASC", "name"))
              .subscribe(value => {
                this.projects = value.content
              })
          } else {
            this.projects = []
          }
        })
    }
  }

}
