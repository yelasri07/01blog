import { Component, input } from '@angular/core';
import { blogInterface } from '../../../features/blogs/interfaces/blog.interface';

@Component({
  selector: 'app-blog-header',
  imports: [],
  templateUrl: './blog-header.component.html',
  styleUrl: './blog-header.component.scss',
})
export class BlogHeaderComponent {
  blogInfos = input<blogInterface | null>(null);
}
