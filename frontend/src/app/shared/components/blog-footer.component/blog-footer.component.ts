import { Component, inject, input } from '@angular/core';
import { blogInterface } from '../../../features/blogs/interfaces/blog.interface';
import { BlogService } from '../../../features/blogs/service/blog.service';

@Component({
  selector: 'app-blog-footer',
  imports: [],
  templateUrl: './blog-footer.component.html',
  styleUrl: './blog-footer.component.scss',
})
export class BlogFooterComponent {
  private blogService = inject(BlogService);

  blog = input<blogInterface | null>(null);

  handleReact() {
    if (!this.blog()?.id) return;

    this.blogService.submitReact(this.blog()?.id!).subscribe({
      next: response => {
        console.log(response)
      },
      error: err => {
        console.error(err);
      }
    })
  }
}
