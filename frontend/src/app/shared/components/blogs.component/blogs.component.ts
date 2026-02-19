import { Component, inject, input, OnChanges, OnInit, signal, SimpleChanges, WritableSignal } from '@angular/core';
import { BlogService } from '../../../features/blogs/service/blog.service';
import { blogInterface } from '../../../features/blogs/interfaces/blog.interface';
import { BlogHeaderComponent } from "../blog-header.component/blog-header.component";
import { BlogFooterComponent } from "../blog-footer.component/blog-footer.component";
import { RouterLink } from "@angular/router";
import { IntersectionobserverDirective } from "../../directives/intersectionobserver.directive";
import { SuccessPopupComponent } from "../success-popup.component/success-popup.component";

@Component({
  selector: 'app-blogs',
  imports: [BlogHeaderComponent, BlogFooterComponent, RouterLink, IntersectionobserverDirective, SuccessPopupComponent],
  templateUrl: './blogs.component.html',
  styleUrl: './blogs.component.scss',
})
export class BlogsComponent implements OnChanges {
  private blogService = inject(BlogService);
  blogs = signal<WritableSignal<blogInterface>[] | null>(null);
  lastBlogId = signal(0);
  isAbleToFetchBlogs = signal(true)
  showSuccessPopup = signal("");

  profileUserId = input.required<number>();

  ngOnChanges(changes: SimpleChanges<BlogsComponent>): void {
    if (location.pathname.startsWith('/profile/') && !changes.profileUserId?.currentValue) return;
    if (location.pathname.startsWith('/profile/')) {
      this.blogs.set([])
      this.isAbleToFetchBlogs.set(false)
    }
    this.fetchBlogs()
  }

  onFetchNextBlogSet(value: boolean) {
    if (!value) return;

    if (this.isAbleToFetchBlogs()) {
      this.fetchBlogs(this.lastBlogId())
    }
  }

  deletedBlog(message: string, blogId: number) {
    this.showSuccessPopup.set(message);
    this.blogs.set(
      this.blogs()?.filter(blog => blog().id !== blogId) ?? []
    )
  }

  hideSuccessPopup() {
    this.showSuccessPopup.set("");
  }

  private fetchBlogs(lastId?: number) {
    this.blogService.getBlogs(this.profileUserId(), lastId).subscribe(response => {
      if (response.length === 0) {
        this.isAbleToFetchBlogs.set(false)
        return
      }
      this.isAbleToFetchBlogs.set(true)
      this.blogs.update(prev => (
        [...prev || [], ...response.map(blog => signal(blog))]
      ));
      this.lastBlogId.set(this.blogs()![this.blogs()?.length! - 1]().id)
    })
  }
}
