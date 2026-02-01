import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'showMorePipe',
})
export class ShowMorePipePipe implements PipeTransform {

  transform(value: string): string {
    if (value.length > 7) return value.slice(0, 7) + "..."
    return value;
  }

}
