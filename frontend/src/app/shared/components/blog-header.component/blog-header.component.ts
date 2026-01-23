import { Component, input } from '@angular/core';
import { blogInterface } from '../../../features/blogs/interfaces/blog.interface';
import { DateFormatPipe } from '../../pipes/date-format-pipe';

@Component({
  selector: 'app-blog-header',
  imports: [DateFormatPipe],
  templateUrl: './blog-header.component.html',
  styleUrl: './blog-header.component.scss',
})
export class BlogHeaderComponent {
  blogInfos = input<blogInterface | null>(null);
}
