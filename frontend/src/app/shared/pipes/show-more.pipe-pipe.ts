import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'showMorePipe',
})
export class ShowMorePipePipe implements PipeTransform {

  transform(value: string, len: number): string {
    if (value.length > len) return value.slice(0, len) + "..."
    return value;
  }

}
