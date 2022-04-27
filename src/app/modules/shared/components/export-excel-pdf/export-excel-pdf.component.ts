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
  @Input() callEnded: boolean = false;

  constructor() {
  }

  ngOnInit(): void {
    this.callEnded = true;
  }

  exportExcel(): void {
    this.callEnded = false;
    if (this.observableExcel) {
      this.observableExcel.subscribe(data => {
        const contentType = 'application/vnd.ms.excel';
        const blob = new Blob([data], {type: contentType});
        const file = new File([blob], this.nomeFile + '.xlsx', {type: contentType});
        saveAs(file);
        this.callEnded = true;
      }, error => {
        this.callEnded = true;
      });
    }
  }

  exportPDF(): void {
    this.callEnded = false;
    if (this.observablePDF) {
      this.observablePDF.subscribe(data => {
        const contentType = 'application/pdf';
        const blob = new Blob([data], {type: contentType});
        const file = new File([blob], this.nomeFile + '.pdf', {type: contentType});
        this.callEnded = true;
        saveAs(file);
      }, error => {
        this.callEnded = true;
      });
    }
  }
}
