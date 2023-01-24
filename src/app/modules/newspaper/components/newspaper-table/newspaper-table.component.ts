import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {PageResponseDto} from "../../../shared/messages/common/page-response.dto";
import {Newspaper} from "../../../shared/messages/newspaper/newspaper";
import {Sort} from "@angular/material/sort";
import {regionalGeolocalizzation} from "../../../shared/utils/utils";
import {AuthenticationState} from "../../../store/state/authentication-state";
import {Store} from "@ngxs/store";
import {PageEvent} from "@angular/material/paginator";
import {PaginationDto} from "../../../shared/messages/common/pagination.dto";

@Component({
  selector: 'app-newspaper-table',
  templateUrl: './newspaper-table.component.html',
  styleUrls: ['./newspaper-table.component.scss']
})
export class NewspaperTableComponent implements OnInit {

  @Input() actualPageValue!: PageResponseDto<Newspaper>;
  @Input() actualPagination!: PaginationDto;

  @Input() showActionColumn: boolean = true;
  @Input() showProjectActionColumn: boolean = false;
  @Input() showExport: boolean = true;

  @Output() sortChange = new EventEmitter<Sort>();
  @Output() delete = new EventEmitter<number>();
  @Output() chooseOrderDialog = new EventEmitter<Newspaper>();
  @Output() pageChange = new EventEmitter<PageEvent>();
  @Output() exportExcel = new EventEmitter<void>();
  @Output() exportPDF = new EventEmitter<void>();
  @Output() createProjectCommission = new EventEmitter<number>();
  regionalGeolocalization = regionalGeolocalizzation;
  displayedColumns: string[] = [];

  constructor(private store: Store) {
  }

  ngOnInit(): void {
    this.defineColumns()
  }

  defineColumns() {
    const user = this.store.selectSnapshot(AuthenticationState.user);

    this.displayedColumns.push("id");
    this.displayedColumns.push("name")

    if (user?.role === "ADMIN")
      this.displayedColumns.push("purchasedContent");
    if (user?.role === "ADMIN")
      this.displayedColumns.push("leftContent");
    if (user?.role === "ADMIN")
      this.displayedColumns.push("costEach");

    this.displayedColumns.push("costSell");
    this.displayedColumns.push("za");
    this.displayedColumns.push("ip")

    if (user?.role === "ADMIN")
      this.displayedColumns.push("email");

    this.displayedColumns.push("regionalGeolocalization")
    this.displayedColumns.push("sensitiveTopics")

    if (user?.role === "ADMIN")
      this.displayedColumns.push("hidden")

    if (this.showActionColumn)
      this.displayedColumns.push("actions");

    if(this.showProjectActionColumn){
      this.displayedColumns.push("project_actions");
    }

  }

  onSortChange($event: Sort) {
    this.sortChange.emit($event)
  }

  onDelete(id: number) {
    this.delete.emit(id)
  }

  openChooseOrderDialog(newspaper: Newspaper) {
    this.chooseOrderDialog.emit(newspaper)
  }

  onPageChange(pageEvent: PageEvent) {
    this.pageChange.emit(pageEvent)
  }

  onExportExcel() {
    this.exportExcel.emit()
  }

  onExportPDF() {
    this.exportPDF.emit()
  }

  onCreateProjectCommissionCommission(newspaper : Newspaper) {
    this.createProjectCommission.emit(newspaper.id)
  }
}
