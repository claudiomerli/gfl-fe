import {Component, Input, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import { saveAs } from 'file-saver';


@Component({
  selector: 'app-export-excel-pdf',
  templateUrl: './export-excel-pdf.component.html',
  styleUrls: ['./export-excel-pdf.component.css']
})
export class ExportExcelPdfComponent implements OnInit {

  @Input() nomeFile: string | undefined;
  @Input() observableExcel: Observable<any> | undefined;
  @Input() observablePDF: Observable<any> | undefined;

  constructor() {
  }

  ngOnInit(): void {
  }

  exportExcel(): void {
    if (this.observableExcel) {
      this.observableExcel
    }
  }

  exportPDF(): void {
    if (this.observablePDF) {
      this.observablePDF
    }
  }
}
