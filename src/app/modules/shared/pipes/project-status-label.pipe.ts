import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'projectStatusLabel'
})
export class ProjectStatusLabelPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
