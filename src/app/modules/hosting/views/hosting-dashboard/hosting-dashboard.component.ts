import {Component, OnInit} from '@angular/core';
import {HostingService} from "../../../shared/services/hosting.service";
import {FormControl} from "@angular/forms";
import {PaginationDto} from "../../../shared/messages/common/pagination.dto";
import {PageResponseDto} from "../../../shared/messages/common/page-response.dto";
import {Hosting} from "../../../shared/messages/hosting/hosting";
import {LegacyPageEvent as PageEvent} from "@angular/material/legacy-paginator";
import {MatLegacyDialog as MatDialog} from "@angular/material/legacy-dialog";
import {ConfirmDialogComponent} from "../../../shared/components/confirm-dialog/confirm-dialog.component";
import {debounceTime} from "rxjs/operators";
import {Sort} from "@angular/material/sort";

@Component({
  selector: 'app-hosting-dashboard',
  templateUrl: './hosting-dashboard.component.html',
  styleUrls: ['./hosting-dashboard.component.scss']
})
export class HostingDashboardComponent implements OnInit {

  constructor(private hostingService: HostingService, private matDialog: MatDialog) {
  }

  page?: PageResponseDto<Hosting>
  globalSearch = new FormControl<string>("");
  pagination: PaginationDto = {
    page: 0,
    pageSize: 10,
    sortBy: "name",
    sortDirection: "ASC"
  }
  displayedColumns = ['name', 'url', 'username', 'password', 'action'];

  ngOnInit(): void {
    this.globalSearch.valueChanges.pipe(debounceTime(500)).subscribe(value => {
      this.search()
    })

    this.search()
  }

  search() {
    this.hostingService
      .findAll(this.globalSearch.value!, this.pagination)
      .subscribe(hostingList => {
        this.page = hostingList
      })
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
          this.hostingService
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
