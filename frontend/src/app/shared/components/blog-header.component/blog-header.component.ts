import { Component, input } from '@angular/core';
import { blogInterface } from '../../../features/blogs/interfaces/blog.interface';
import { DateFormatPipe } from '../../pipes/date-format-pipe';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-blog-header',
  imports: [DateFormatPipe, RouterLink],
  templateUrl: './blog-header.component.html',
  styleUrl: './blog-header.component.scss',
})
export class BlogHeaderComponent {
  blog = input<blogInterface | null>(null);
}
