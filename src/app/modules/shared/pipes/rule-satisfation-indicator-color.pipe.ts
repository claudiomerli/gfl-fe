import {Pipe, PipeTransform} from '@angular/core';
import {RuleSatisfation} from "../model/rule-satisfation";

@Pipe({
  name: 'ruleSatisfationIndicatorColor'
})
export class RuleSatisfationIndicatorColorPipe implements PipeTransform {

  transform(value: RuleSatisfation | undefined, ...args: unknown[]): string {
    if (!value) {
      return "secondary"
    }
    if (value.characterSatisfied && value.titleSatisfied && value.linkTextSatisfied && value.linkUrlSatisfied && value.expirationDatePlusThenOneDaySatisfied) {
      if (value.expirationDateOneDaySatisfied) {
        return "success"
      } else {
        return "warning"
      }
    } else {
      return "danger"
    }
  }

}
