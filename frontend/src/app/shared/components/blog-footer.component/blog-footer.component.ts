import { Component, inject, model } from '@angular/core';
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

  blog = model<blogInterface | null>(null);

  handleReact() {
    this.blogService.submitReact(this.blog()?.id!).subscribe({
      next: response => {
        this.blog.update(prev => ({
          ...prev!,
          like_count: response.like_count,
          like: !prev?.like
        }))
      },
      error: err => {
        console.error(err);
      }
    })
  }
}
