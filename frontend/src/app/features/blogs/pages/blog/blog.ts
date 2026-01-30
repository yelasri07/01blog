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
import { popupInterface } from '../../../../shared/interfaces/popup.interface';
import { Popup2Component } from "../../../../shared/components/popup.component/popup.component";

@Component({
  selector: 'app-blog',
  imports: [ErrorComponent, BlogHeaderComponent, BlogFooterComponent, DateFormatPipe, IntersectionobserverDirective, Popup2Component],
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
  isAbleToFetchComments = signal(true);
  lastCommentId = signal(0);

  popup = signal<popupInterface>({});

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
      this.lastCommentId.set(0)
      return;
    }

    this.isAbleToFetchComments.set(true);
    this.comments.set([])
    this.fetchComments()
  }

  onFetchNextCommentsSet(value: boolean) {
    if (!value) return;
    if (this.comments() && this.comments()?.length! > 0 && this.isAbleToFetchComments()) {
      this.fetchComments(this.lastCommentId())
    }
  }

  private fetchComments(lastId?: number) {
    this.blogService.getComments(this.blog()?.id!, lastId).subscribe({
      next: respnse => {
        this.showComments.set(true)
        if (respnse.length === 0) {
          this.isAbleToFetchComments.set(false);
          return;
        }
        if (respnse![respnse?.length! - 1].id === this.lastCommentId()) return;
        this.comments.update(prev => [...prev || [], ...respnse])
        this.lastCommentId.set(this.comments()![this.comments()?.length! - 1].id)
      },
      error: err => {
        const errObj: popupInterface = {
          isValid: false,
          show: true,
        }

        if (err.error.detail) {
          errObj.message = err.error.detail
        } else {
          errObj.message = "Ooops! something wrong"
        }

        this.popup.set(errObj)
      }
    })
  }
}
