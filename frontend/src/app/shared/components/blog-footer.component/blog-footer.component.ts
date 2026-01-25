import { Component, inject, model } from '@angular/core';
import { blogInterface } from '../../../features/blogs/interfaces/blog.interface';
import { BlogService } from '../../../features/blogs/service/blog.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { commentInterface } from '../../../features/blogs/interfaces/comment.interface';

@Component({
  selector: 'app-blog-footer',
  imports: [ReactiveFormsModule],
  templateUrl: './blog-footer.component.html',
  styleUrl: './blog-footer.component.scss',
})
export class BlogFooterComponent {
  private blogService = inject(BlogService);

  blog = model<blogInterface | null>(null);
  comments = model<commentInterface[] | null>(null)

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
        if (!this.comments()) return;
        this.comments.update(prev => [response, ...prev ?? []])
      },
      error: err => {
        console.error(err)
      }
    })
  }

  get comment() {
    return this.commentForm.controls.content;
  }
}
