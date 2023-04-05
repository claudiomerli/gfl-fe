import {Component, OnInit} from '@angular/core';
import {debounceTime} from "rxjs/operators";
import {PaginationDto} from "../../../../../shared/messages/common/pagination.dto";
import {FormControl, FormGroup} from "@angular/forms";
import {User} from "../../../../../shared/messages/auth/user";
import {UserService} from "../../../../../shared/services/user.service";
import {DomSanitizer, SafeResourceUrl} from "@angular/platform-browser";
import {getYearList} from "../../../../../shared/utils/utils";

@Component({
  selector: 'app-editor-statistics-dashboard',
  templateUrl: './editor-statistics-dashboard.component.html',
  styleUrls: ['./editor-statistics-dashboard.component.scss']
})
export class EditorStatisticsDashboardComponent implements OnInit {

  constructor(private userService: UserService, private sanitizer: DomSanitizer) {
  }

  searchForm = new FormGroup({
    editor: new FormControl<User | null | string>(null),
    year: new FormControl<number | null>(null)
  })

  editors: User[] = [];
  displayFullnameEditor = (editor: User) => editor?.fullname || ""

  srcIframe: SafeResourceUrl | null = null;
  srcIframeBaseUrl = "https://metabase.tilinkotool.it/public/dashboard/fb04f5ea-49d4-43c7-9a4e-d8497eabc0ba";
  years = getYearList()

  ngOnInit(): void {
    this.searchForm.controls.editor.valueChanges
      .pipe(debounceTime(200))
      .subscribe((search) => {
        if (search != null && typeof search === "string" && search !== "") {
          this.userService.findForAutocomplete(search, "EDITOR",
            new PaginationDto(0, 10, "ASC", "fullname")
          ).subscribe(value => {
            this.editors = value.content
          })
        } else if (search === "") {
          this.searchForm.controls.editor.setValue(null)
          this.editors = []
        }
      })
    this.searchForm.valueChanges.subscribe(value => {
      if (typeof value.editor === "object" && value.year) {
        this.srcIframe = this.sanitizer.bypassSecurityTrustResourceUrl(`${this.srcIframeBaseUrl}?editorid=${(value.editor as User).id}&year=${value.year}#hide_parameters=editorid,year`)
      } else {
        this.srcIframe = null;
      }
    })


  }

}
