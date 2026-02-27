import { AfterViewInit, Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
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
import { SuccessPopupComponent } from "../../../../shared/components/success-popup.component/success-popup.component";
import { VideoTool } from '../../../../shared/tools/video-tool';
import { needConfirmation } from '../../../../shared/decorators/confirm-dialog.decorator';
import { AuthStateService } from '../../../../core/services/auth.state.service';

@Component({
  selector: 'app-blog',
  imports: [ErrorComponent, BlogHeaderComponent, BlogFooterComponent, DateFormatPipe, IntersectionobserverDirective, Popup2Component, SuccessPopupComponent, RouterLink],
  templateUrl: './blog.html',
  styleUrl: './blog.scss',
})
export class Blog implements AfterViewInit {
  private activatedRoute = inject(ActivatedRoute);
  private blogService = inject(BlogService);
  private authStateService = inject(AuthStateService)

  currentUser = signal(this.authStateService.getCurrentUser())
  blog = signal<blogInterface | null>(null);
  blogError = signal<string | null>(null);
  comments = signal<commentInterface[] | null>(null)
  showComments = signal(false);
  isAbleToFetchComments = signal(true);
  lastCommentId = signal(0);
  showSuccessPopup = signal("");

  popup = signal<popupInterface>({});

  editor: EditorJS | undefined;

  ngAfterViewInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      const blogId = Number(params.get('id'))
      if (!blogId || isNaN(blogId)) {
        this.blogError.set("Whoops, blog not found");
        return;
      }

      if (this.editor && typeof this.editor.destroy === 'function') {
        this.editor.destroy()
      }
      this.blogError.set(null);
      this.comments.set(null);
      this.showComments.set(false);
      this.loadBlog(blogId);
    })
  }

  private loadBlog(blogId: number) {
    this.blogService.getBlogById(blogId).subscribe({
      next: response => {
        this.blog.set(response)
        this.editor = new EditorJS({
          holder: "editorjs",
          tools: {
            header: Header,
            image: ImageTool,
            video: VideoTool,
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

  blogDeleted(message: string) {
    this.blogError.set("Whoops, blog not found");
    this.showSuccessPopup.set(message)
  }

  hideSuccessPopup() {
    this.showSuccessPopup.set("");
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

  @needConfirmation()
  deleteComment(commentId: number) {
    this.blogService.submitDeleteComment(commentId).subscribe(res => {
      this.comments.set(
        this.comments()?.filter(comment => comment.id !== commentId) ?? []
      )
      this.showSuccessPopup.set(res.message)
    })
  }
}
