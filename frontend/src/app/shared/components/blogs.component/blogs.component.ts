import { Component, inject, input, OnInit, signal, WritableSignal } from '@angular/core';
import { BlogService } from '../../../features/blogs/service/blog.service';
import { blogInterface } from '../../../features/blogs/interfaces/blog.interface';
import { BlogHeaderComponent } from "../blog-header.component/blog-header.component";
import { BlogFooterComponent } from "../blog-footer.component/blog-footer.component";
import { ActivatedRoute, RouterLink } from "@angular/router";

@Component({
  selector: 'app-blogs',
  imports: [BlogHeaderComponent, BlogFooterComponent, RouterLink],
  templateUrl: './blogs.component.html',
  styleUrl: './blogs.component.scss',
})
export class BlogsComponent implements OnInit {
  private blogService = inject(BlogService);
  private activatedRoute = inject(ActivatedRoute)
  blogs = signal<WritableSignal<blogInterface>[] | null>(null);

  profileUserId = input<number | undefined>(undefined);

  ngOnInit(): void {
    this.blogService.getBlogs(this.profileUserId()).subscribe({
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
