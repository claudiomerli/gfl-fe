import {Component, Input, OnInit} from '@angular/core';
import {ExportExcelPdfService} from "../../services/export-excel-pdf.service";

@Component({
  selector: 'app-export-excel-pdf',
  templateUrl: './export-excel-pdf.component.html',
  styleUrls: ['./export-excel-pdf.component.css']
})
export class ExportExcelPdfComponent implements OnInit {

  @Input() nomeTabella = '';
  @Input() nomeFile= '';

  constructor(private exportExcelPDFService: ExportExcelPdfService) { }

  ngOnInit(): void {
  }

  exportExcel(): void {
    this.exportExcelPDFService.exportExcel(this.nomeTabella, this.nomeFile);
  }

  exportPDF(): void {
    this.exportExcelPDFService.exportPDF(this.nomeTabella, this.nomeFile);
  }
}
