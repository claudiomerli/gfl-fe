import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {PaginationDto} from "../../../shared/messages/common/pagination.dto";
import {PageResponseDto} from "../../../shared/messages/common/page-response.dto";
import {PageEvent} from "@angular/material/paginator";
import {MatDialog} from "@angular/material/dialog";
import {ConfirmDialogComponent} from "../../../shared/components/confirm-dialog/confirm-dialog.component";
import {DomainService} from "../../../shared/services/domain.service";
import {Domain} from "../../../shared/messages/domain/domain";
import {Hosting} from "../../../shared/messages/hosting/hosting";
import {momentDatePatternIso, validateObject} from "../../../shared/utils/utils";
import {debounceTime} from "rxjs/operators";
import {HostingService} from "../../../shared/services/hosting.service";
import * as moment from "moment";
import {Sort} from "@angular/material/sort";

@Component({
  selector: 'app-domain-dashboard',
  templateUrl: './domain-dashboard.component.html',
  styleUrls: ['./domain-dashboard.component.scss']
})
export class DomainDashboardComponent implements OnInit {

  constructor(private domainService: DomainService, private hostingService: HostingService, private matDialog: MatDialog) {
  }

  page?: PageResponseDto<Domain>
  pagination: PaginationDto = {
    page: 0,
    pageSize: 10,
    sortBy: "name",
    sortDirection: "ASC"
  }
  displayedColumns = ['name', 'ip', 'expiration', 'hosting', 'project', 'action'];
  searchForm = new FormGroup({
    globalSearch: new FormControl(""),
    expirationFrom: new FormControl<moment.Moment | null>(null),
    expirationTo: new FormControl<moment.Moment | null>(null),
    hosting: new FormControl<Hosting | null | string>(null, [validateObject]),
  });
  displayNameHosting = (editor: Hosting) => editor?.name || ""
  hosting: Hosting[] = [];

  ngOnInit(): void {
    this.searchForm.controls.hosting.valueChanges
      .pipe(debounceTime(200))
      .subscribe((search) => {
          if (search != null && typeof search === "string" && search !== "") {
            this.hostingService.findForAutocomplete(search, new PaginationDto(0, 10, "ASC", "name")
            ).subscribe(value => {
              this.hosting = value.content
            })
          } else if (search === "") {
            this.searchForm.controls.hosting.setValue(null)
            this.hosting = []
          }
        }
      )

    this.searchForm.valueChanges
      .pipe(debounceTime(1000))
      .subscribe(value => {
        this.search()
      })

    this.search()
  }

  search() {
    if (this.searchForm.valid) {
      this.domainService
        .findAll({
          globalSearch: this.searchForm.value.globalSearch!,
          expirationFrom: this.searchForm.value.expirationFrom ? moment(this.searchForm.value.expirationFrom).format(momentDatePatternIso) : null,
          expirationTo: this.searchForm.value.expirationTo ? moment(this.searchForm.value.expirationTo).format(momentDatePatternIso) : null,
          hostingId: this.searchForm.value.hosting ? (this.searchForm.value.hosting as Hosting).id : null
        }, this.pagination)
        .subscribe(domainList => {
          this.page = domainList
        })
    }
  }

  onPageChange($event: PageEvent) {
    this.pagination.page = $event.pageIndex;
    this.pagination.pageSize = $event.pageSize;
    this.search();
  }

  delete(id: number) {
    this.matDialog.open(ConfirmDialogComponent, {
      data: "Sicuro di voler eliminare?"
    })
      .afterClosed()
      .subscribe(answer => {
        if (answer) {
          this.domainService
            .delete(id)
            .subscribe(() => {
              this.search()
            });
        }
      })
  }

  onSortChange($event: Sort) {
    if ($event.direction != '') {
      this.pagination.sortBy = $event.active
      this.pagination.sortDirection = $event.direction?.toUpperCase()
    } else {
      this.pagination.sortBy = "name"
      this.pagination.sortDirection = "ASC"
    }

    this.search()
  }
}
