import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import EditorJS from '@editorjs/editorjs';
import { BlogService } from '../../service/blog.service';
import { blogInterface } from '../../interfaces/blog.interface';
import { ErrorComponent } from "../../../../shared/components/error.component/error.component";
import { BlogHeaderComponent } from "../../../../shared/components/blog-header.component/blog-header.component";
import Header from '@editorjs/header';
import ImageTool from '@editorjs/image';
import { BlogFooterComponent } from "../../../../shared/components/blog-footer.component/blog-footer.component";
import { commentInterface } from '../../interfaces/comment.interface';
import { DateFormatPipe } from '../../../../shared/pipes/date-format-pipe';
import { IntersectionobserverDirective } from "../../../../shared/directives/intersectionobserver.directive";

@Component({
  selector: 'app-blog',
  imports: [ErrorComponent, BlogHeaderComponent, BlogFooterComponent, DateFormatPipe, IntersectionobserverDirective],
  templateUrl: './blog.html',
  styleUrl: './blog.scss',
})
export class Blog implements OnInit {
  private activatedRoute = inject(ActivatedRoute);
  private blogService = inject(BlogService);

  blog = signal<blogInterface | null>(null);
  blogError = signal<string | null>(null);
  comments = signal<commentInterface[] | null>(null)
  showComments = signal(false);

  editor: EditorJS | undefined;
  private readonly blogId: number | null;
  constructor() {
    this.blogId = Number(this.activatedRoute.snapshot.paramMap.get('id'))
  }

  ngOnInit(): void {
    if (!this.blogId || isNaN(this.blogId)) {
      this.blogError.set("Whoops, blog not found");
      return;
    }

    this.blogService.getBlogById(this.blogId).subscribe({
      next: response => {
        this.blog.set(response)
        this.editor = new EditorJS({
          holder: "editorjs",
          tools: {
            header: Header,
            image: ImageTool,
          },
          data: response.content as any,
          readOnly: true,
        })
      },
      error: err => {
        if (!err.error) {
          this.blogError.set("Ooops, something wrong!");
          return;
        }

        this.blogError.set(err.error.detail)
      }
    })
  }

  getComments() {
    if (this.showComments()) {
      this.showComments.set(false);
      this.comments.set(null);
      return;
    }

    this.blogService.getComments(this.blog()?.id!).subscribe({
      next: respnse => {
        this.comments.set(respnse)
        this.showComments.set(true)
      },
      error: err => {
        console.error(err)
      }
    })
  }

  onFetchNextSet(value: boolean) {
    if (!value) return;

    console.log(value);
  }
}
