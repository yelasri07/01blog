import { Component, inject, OnInit, signal } from '@angular/core';
import { BlogService } from '../../../features/blogs/service/blog.service';
import { blogInterface } from '../../../features/blogs/interfaces/blog.interface';
import { BlogHeaderComponent } from "../blog-header.component/blog-header.component";

@Component({
  selector: 'app-blogs',
  imports: [BlogHeaderComponent],
  templateUrl: './blogs.component.html',
  styleUrl: './blogs.component.scss',
})
export class BlogsComponent implements OnInit {
  private blogService = inject(BlogService);
  blogs = signal<blogInterface[] | null>(null);

  ngOnInit(): void {
    this.blogService.getBlogs().subscribe({
      next: response => {
        this.blogs.set(response);
        console.log(this.blogs())
      },
      error: err => {
        console.error(err);
      }
    })
  }
}
