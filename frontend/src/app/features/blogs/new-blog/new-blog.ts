import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { marked } from 'marked';
import { MarkdownComponent } from "ngx-markdown";
import { debounceTime, Subject } from 'rxjs';

@Component({
  selector: 'app-new-blog',
  imports: [ReactiveFormsModule, MarkdownComponent],
  templateUrl: './new-blog.html',
  styleUrl: './new-blog.scss',
})
export class NewBlog implements OnInit, OnDestroy {
  resultTitle = signal('');
  resultContent = signal('');
  show = signal(true);

  textarea = new Subject<Event>();

  blogForm = new FormGroup({
    title: new FormControl(''),
    content: new FormControl(''),
    file: new FormControl('')
  })

  ngOnInit(): void {
    this.textarea.pipe(
      debounceTime(300)
    ).subscribe(async (event) => {
      const input = event.target as HTMLTextAreaElement
      await this.addToMarkdown(input.value);
    })
  }

  ngOnDestroy(): void {
    this.textarea.complete();
  }

  handleSubmit() {

  }

  async handleTextareaChange(event: Event) {
    if (!this.show()) return;
    this.textarea.next(event)
  }

  async blogResult() {
    if (this.show()) {
      this.show.set(false)
      return;
    }

    this.show.set(true)

    if (this.title.value !== null) this.resultTitle.set(this.title.value)
    if (this.content.value !== null) await this.addToMarkdown(this.content.value)
  }

  uploadFile(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files) return;

    const file = URL.createObjectURL(input.files[0])
    console.log(file)
  }

  private async addToMarkdown(text: string) {
    let res = await marked.parse(text, {
      breaks: true,
    });

    this.resultContent.set(res)
  }

  get title() {
    return this.blogForm.controls.title
  }

  get content() {
    return this.blogForm.controls.content
  }

  get file() {
    return this.blogForm.controls.file
  }
}
