import {Component, OnInit} from '@angular/core';
import {debounceTime} from "rxjs/operators";
import {PaginationDto} from "../../../../../shared/messages/common/pagination.dto";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {User} from "../../../../../shared/messages/auth/user";
import {UserService} from "../../../../../shared/services/user.service";
import {DomSanitizer, SafeResourceUrl} from "@angular/platform-browser";
import {getYearList, validateObject} from "../../../../../shared/utils/utils";
import * as moment from "moment";

@Component({
  selector: 'app-editor-statistics-dashboard',
  templateUrl: './editor-statistics-dashboard.component.html',
  styleUrls: ['./editor-statistics-dashboard.component.scss']
})
export class EditorStatisticsDashboardComponent implements OnInit {

  constructor(private userService: UserService, private sanitizer: DomSanitizer) {
  }

  generalSearchForm = new FormGroup({
    start: new FormControl<moment.Moment | null>(moment().startOf('month'), [Validators.required]),
    end: new FormControl<moment.Moment | null>(moment().endOf('month'), [Validators.required]),
  })

  detailSearchForm = new FormGroup({
    editor: new FormControl<User | null | string>(null, [Validators.required,validateObject]),
    year: new FormControl<number | null>(null,[Validators.required])
  })

  editors: User[] = [];
  displayFullnameEditor = (editor: User) => editor?.fullname || ""
  years = getYearList()


  srcIframeGeneralStatisticsBaseUrl = "https://metabase.tilinkotool.it/public/dashboard/b3d5b8fb-2bc1-4d73-913e-a5c80b3859b7";
  srcIframeGeneralStatistics: SafeResourceUrl | null = this.sanitizer.bypassSecurityTrustResourceUrl(`${this.srcIframeGeneralStatisticsBaseUrl}?datefrom=${this.generalSearchForm.value.start?.format("YYYY-MM-DD")}&dateto=${this.generalSearchForm.value.end?.format("YYYY-MM-DD")}#hide_parameters=datefrom,dateto&titled=false`);

  srcIframeDetailedStatisticsBaseUrl = "https://metabase.tilinkotool.it/public/dashboard/fb04f5ea-49d4-43c7-9a4e-d8497eabc0ba";
  srcIframeDetailedStatistics: SafeResourceUrl | null = null;

  ngOnInit(): void {
    this.detailSearchForm.controls.editor.valueChanges
      .pipe(debounceTime(200))
      .subscribe((search) => {
        if (search != null && typeof search === "string" && search !== "") {
          this.userService.findForAutocomplete(search, "EDITOR",
            new PaginationDto(0, 10, "ASC", "fullname")
          ).subscribe(value => {
            this.editors = value.content
          })
        } else if (search === "") {
          this.detailSearchForm.controls.editor.setValue(null)
          this.editors = []
        }
      })

    this.detailSearchForm.valueChanges.subscribe(value => {
      if (this.generalSearchForm.valid) {
        this.srcIframeDetailedStatistics = this.sanitizer.bypassSecurityTrustResourceUrl(`${this.srcIframeDetailedStatisticsBaseUrl}?editorid=${(value.editor as User).id}&year=${value.year}#hide_parameters=editorid,year&titled=false`)
      } else {
        this.srcIframeDetailedStatistics = null;
      }
    })

    this.generalSearchForm.valueChanges.subscribe(value => {
      if (this.generalSearchForm.valid) {
        this.srcIframeGeneralStatistics = this.sanitizer.bypassSecurityTrustResourceUrl(`${this.srcIframeGeneralStatisticsBaseUrl}?datefrom=${value.start?.format("YYYY-MM-DD")}&dateto=${value.end?.format("YYYY-MM-DD")}#hide_parameters=datefrom,dateto&titled=false`)
      } else {
        this.srcIframeGeneralStatistics = null;
      }
    })
  }

}
