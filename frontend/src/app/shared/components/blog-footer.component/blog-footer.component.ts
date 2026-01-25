import { Component, inject, model, signal } from '@angular/core';
import { blogInterface } from '../../../features/blogs/interfaces/blog.interface';
import { BlogService } from '../../../features/blogs/service/blog.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { commentInterface } from '../../../features/blogs/interfaces/comment.interface';
import { Popup2Component } from "../popup.component/popup.component";
import { popupInterface } from '../../interfaces/popup.interface';

@Component({
  selector: 'app-blog-footer',
  imports: [ReactiveFormsModule, Popup2Component],
  templateUrl: './blog-footer.component.html',
  styleUrl: './blog-footer.component.scss',
})
export class BlogFooterComponent {
  private blogService = inject(BlogService);

  blog = model<blogInterface | null>(null);
  comments = model<commentInterface[] | null>(null)

  popup = signal<popupInterface>({});

  commentForm = new FormGroup({
    content: new FormControl('')
  })

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

  handleCommentSubmit() {

    this.blogService.submitComment(this.blog()?.id!, this.commentForm).subscribe({
      next: response => {
        this.comment.setValue("")
        this.popup.set({
          isValid: true,
          show: true,
          message: "Comment created successfully"
        })
        if (!this.comments()) return;
        this.comments.update(prev => [response, ...prev ?? []])
      },
      error: err => {
        const errObj: popupInterface = {
          isValid: false,
          show: true,
        }
        if (err.error.content) {
          errObj.message = err.error.content
        } else if (err.error.detail) {
          errObj.message = err.error.detail
        } else {
          errObj.message = "Ooops! something wrong"
        }

        this.popup.set(errObj)
      }
    })
  }

  get comment() {
    return this.commentForm.controls.content;
  }
}
