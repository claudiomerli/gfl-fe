import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'statusLabel'
})
export class StatusLabelPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): string {
    switch (value) {
      case 'WORKING' :
        return "In lavorazione";
      case 'DELIVERED' :
        return "Consegnato"
      case 'APPROVED' :
        return "Approvato";
      default:
        return "Sconosciuto"
    }
  }

}
