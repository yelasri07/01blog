import { Component, inject, input, OnChanges, OnInit, signal, SimpleChanges, WritableSignal } from '@angular/core';
import { BlogService } from '../../../features/blogs/service/blog.service';
import { blogInterface } from '../../../features/blogs/interfaces/blog.interface';
import { BlogHeaderComponent } from "../blog-header.component/blog-header.component";
import { BlogFooterComponent } from "../blog-footer.component/blog-footer.component";
import { RouterLink } from "@angular/router";
import { IntersectionobserverDirective } from "../../directives/intersectionobserver.directive";

@Component({
  selector: 'app-blogs',
  imports: [BlogHeaderComponent, BlogFooterComponent, RouterLink, IntersectionobserverDirective],
  templateUrl: './blogs.component.html',
  styleUrl: './blogs.component.scss',
})
export class BlogsComponent implements OnChanges {
  private blogService = inject(BlogService);
  blogs = signal<WritableSignal<blogInterface>[] | null>(null);
  lastBlogId = signal(0);
  isAbleToFetchBlogs = signal(true)

  profileUserId = input.required<number>();

  ngOnChanges(changes: SimpleChanges<BlogsComponent>): void {
    if (location.pathname.startsWith('/profile/') && !changes.profileUserId?.currentValue) return;
    if (location.pathname.startsWith('/profile/')) {
      this.blogs.set([])
    }
    this.fetchBlogs()
  }

  onFetchNextBlogSet(value: boolean) {
    console.log(value)
    if (!value) return;

    if (this.isAbleToFetchBlogs()) {
      this.fetchBlogs(this.lastBlogId())

    }
  }

  private fetchBlogs(lastId?: number) {
    this.blogService.getBlogs(this.profileUserId(), lastId).subscribe({
      next: response => {
        console.log(response)
        if (response.length === 0) {
          this.isAbleToFetchBlogs.set(false)
          return
        }
        this.isAbleToFetchBlogs.set(true)
        this.blogs.update(prev => (
          [...prev || [], ...response.map(blog => signal(blog))]
        ));
        this.lastBlogId.set(this.blogs()![this.blogs()?.length! - 1]().id)
      },
      error: err => {
        console.error(err);
      }
    })
  }
}
