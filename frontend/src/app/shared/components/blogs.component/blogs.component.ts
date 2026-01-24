import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { BlogService } from '../../../features/blogs/service/blog.service';
import { blogInterface } from '../../../features/blogs/interfaces/blog.interface';
import { BlogHeaderComponent } from "../blog-header.component/blog-header.component";
import { BlogFooterComponent } from "../blog-footer.component/blog-footer.component";
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-blogs',
  imports: [BlogHeaderComponent, BlogFooterComponent, RouterLink],
  templateUrl: './blogs.component.html',
  styleUrl: './blogs.component.scss',
})
export class BlogsComponent implements OnInit {
  private blogService = inject(BlogService);
  blogs = signal<WritableSignal<blogInterface>[] | null>(null);

  ngOnInit(): void {
    this.blogService.getBlogs().subscribe({
      next: response => {
        this.blogs.set(
          response.map(blog => signal(blog))
        );
      },
      error: err => {
        console.error(err);
      }
    })
  }
}
