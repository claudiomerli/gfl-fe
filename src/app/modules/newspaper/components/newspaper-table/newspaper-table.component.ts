import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {PageResponseDto} from "../../../shared/messages/common/page-response.dto";
import {Newspaper} from "../../../shared/messages/newspaper/newspaper";
import {Sort} from "@angular/material/sort";
import {regionalGeolocation} from "../../../shared/utils/utils";
import {AuthenticationState} from "../../../store/state/authentication-state";
import {Store} from "@ngxs/store";
import {PageEvent} from "@angular/material/paginator";
import {PaginationDto} from "../../../shared/messages/common/pagination.dto";
import {SelectionModel} from "@angular/cdk/collections";
import {MatDialog} from "@angular/material/dialog";
import {ReportDialogComponent} from "../report-dialog/report-dialog.component";
import {NewspaperDescriptionDialogComponent} from "../newspaper-description-dialog/newspaper-description-dialog.component";

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
  @Input() showReport: boolean = true;

  @Output() sortChange = new EventEmitter<Sort>();
  @Output() delete = new EventEmitter<number>();
  @Output() chooseOrderDialog = new EventEmitter<Newspaper>();
  @Output() pageChange = new EventEmitter<PageEvent>();
  @Output() exportExcel = new EventEmitter<void>();
  @Output() exportPDF = new EventEmitter<void>();
  @Output() createProjectCommission = new EventEmitter<number>();
  regionalGeolocation = regionalGeolocation;
  displayedColumns: string[] = [];

  selection?: SelectionModel<Newspaper>


  constructor(
    private store: Store,
    private dialog: MatDialog
  ) {
  }

  ngOnInit(): void {
    this.defineColumns()
    this.initSelection()
  }

  initSelection() {
    const initialSelection: any[] = [];
    const allowMultiSelect = true;
    this.selection = new SelectionModel<Newspaper>(allowMultiSelect, initialSelection, false, (o1, o2) => o1.id === o2.id);
  }

  defineColumns() {
    const user = this.store.selectSnapshot(AuthenticationState.user);

    if (user?.role === "ADMIN")
      this.displayedColumns.push("select")

    this.displayedColumns.push("id");
    this.displayedColumns.push("name")

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
    this.displayedColumns.push("nofollow")

    if (user?.role === "ADMIN")
      this.displayedColumns.push("hidden")

    if (this.showActionColumn)
      this.displayedColumns.push("actions");

    if (this.showProjectActionColumn) {
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

  onCreateProjectCommissionCommission(newspaper: Newspaper) {
    this.createProjectCommission.emit(newspaper.id)
  }

  isAllSelected() {
    const numRows = this.actualPageValue.content.length;
    const numRowsSelected = this.actualPageValue.content.map(n => n.id).filter(newspaperId => this.selection!.selected.map(value => value.id).includes(newspaperId)).length;
    return numRowsSelected == numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows() {
    this.isAllSelected() ?
      this.selection!.clear() :
      this.actualPageValue.content.forEach(row => this.selection!.select(row));
  }

  showReportDialog() {
    this.dialog.open(ReportDialogComponent, {
      data: this.selection?.selected,
      minWidth: 800,
      disableClose: true
    })
  }

  openDescriptionDialog(element: Newspaper) {
    this.dialog.open(NewspaperDescriptionDialogComponent, {
      data: element,
      minWidth: 1000,
      disableClose: true
    })
  }
}
