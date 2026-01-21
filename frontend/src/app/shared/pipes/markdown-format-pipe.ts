import { Pipe, PipeTransform } from '@angular/core';
import { marked } from 'marked';

@Pipe({
  name: 'markdownFormat',
})
export class MarkdownFormatPipe implements PipeTransform {

  async transform(value: string | undefined): Promise<string> {
    if (!value) {
      return "";
    }

    const res = await marked.parse(value, {
      breaks: true
    })

    return res;
  }

}
