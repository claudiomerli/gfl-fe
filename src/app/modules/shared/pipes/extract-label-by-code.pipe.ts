import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'extractLabelByCode'
})
export class ExtractLabelByCodePipe implements PipeTransform {

  transform(value: { code: string, label: string }[], ...args: string[]): string {
    return value.filter(value => value.code === args[0])[0]?.label || args[0];
  }

}
