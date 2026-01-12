import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { marked } from 'marked';
import { MarkdownComponent } from "ngx-markdown";

@Component({
  selector: 'app-new-blog',
  imports: [ReactiveFormsModule, MarkdownComponent],
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

  async blogResult() {
    
    if (this.show()) {
      this.show.set(false)
      return;
    }
    
    this.show.set(true)

    let res = await marked.parse(this.content.value!, {
      breaks: true,
    });
    console.log(res)
    if (this.title.value) this.resultTitle.set(this.title.value)
    if (this.content.value) this.resultContent.set(res)
  }

  get title() {
    return this.blogForm.controls.title
  }

  get content() {
    return this.blogForm.controls.content
  }
}
