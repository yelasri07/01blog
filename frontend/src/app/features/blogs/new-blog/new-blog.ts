import { Component, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-new-blog',
  imports: [ReactiveFormsModule],
  templateUrl: './new-blog.html',
  styleUrl: './new-blog.scss',
})
export class NewBlog {
  resultTitle = signal('');
  resultContent = signal('');
  show = signal(false);

  blogForm = new FormGroup({
    title: new FormControl(''),
    content: new FormControl('')
  })

  blogResult() {
    if (this.show()) {
      this.show.set(false)
      return;
    }

    this.show.set(true)
    if (this.title.value) this.resultTitle.set(this.title.value)
  }

  get title() {
    return this.blogForm.controls.title
  }

  get content() {
    return this.blogForm.controls.content
  }
}
