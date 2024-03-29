import { Pipe, PipeTransform } from '@angular/core';
import {DomSanitizer} from "@angular/platform-browser";

@Pipe({
  name: 'sanitizeUrl'
})
export class SanitizeUrlPipe implements PipeTransform {

  constructor(private _sanitizer: DomSanitizer) { }


  transform(value: string, ...args: unknown[]): unknown {
    return this._sanitizer.bypassSecurityTrustResourceUrl(value);
  }

}
