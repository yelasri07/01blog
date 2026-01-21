import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateFormat',
})
export class DateFormatPipe implements PipeTransform {

  transform(value: Date | undefined): string {
    if (!value) {
      return "";
    }

    const date = new Date(value)
    return date.toDateString();
  }

}
