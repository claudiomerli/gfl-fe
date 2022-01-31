import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

@Injectable({
  providedIn: 'root'
})
export class ExportExcelPdfService {

  constructor() { }

  exportExcel(nomeTabella: string, nomeFile: string): void
  {
    /* table id is passed over here */
    let element = document.getElementById(nomeTabella);
    const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Foglio 1');

    /* save to file */
    XLSX.writeFile(wb, nomeFile+".xlsx");

  }

  exportPDF(nomeTabella: string, nomeFile: string):void {
    let DATA = document.getElementById(nomeTabella);

    // @ts-ignore
    html2canvas(DATA).then(canvas => {

      let fileWidth = 208;
      let fileHeight = canvas.height * fileWidth / canvas.width;

      const FILEURI = canvas.toDataURL('image/png')
      let PDF = new jsPDF('p', 'mm', 'a4');
      let position = 0;
      PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight)

      PDF.save(nomeFile+'.pdf');
    });
  }
}
