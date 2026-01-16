import { Component, ElementRef, inject, OnDestroy, OnInit, signal, ViewChild } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { marked } from 'marked';
import { MarkdownComponent } from "ngx-markdown";
import { debounceTime, Subject } from 'rxjs';
import { FileInterface } from '../interfaces/file.interface';

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

  private mediaList: Map<string, FileInterface> = new Map();

  textarea = new Subject<Event>();
  @ViewChild("inputContent") inputContent: ElementRef<HTMLDivElement> | null = null;

  blogForm = new FormGroup({
    title: new FormControl(''),
    content: new FormControl(''),
    file: new FormControl('')
  })

  ngOnInit(): void {
    this.textarea.pipe(
      debounceTime(300)
    ).subscribe(async () => {
      await this.addToMarkdown();
    })
  }

  ngOnDestroy(): void {
    this.textarea.complete();
  }

  handleSubmit() {

  }

  async handleTextareaChange(event: Event) {
    const input = event.target as HTMLDivElement
    if (input.innerHTML === '<br>') {
      input.textContent = ''
    }
    this.updateContent();
    if (!this.show()) return;
    this.textarea.next(event)
  }

  async blogResult() {
    if (this.show()) {
      this.show.set(false)
      return;
    }

    this.show.set(true)
    await this.addToMarkdown()
  }

  async uploadFile(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files) return;

    const file = input.files[0]
    input.value = "";
    this.addToMediaList(file)
  }

  private deleteUnusedFiles() {
    for (const [key, value] of this.mediaList) {
      if (!this.content.value?.match("!\\[.*\\]\\(" + value.tempUrl + "\\)")) {
        URL.revokeObjectURL(value.tempUrl)
        this.mediaList.delete(key)
      }
    }
  }

  private async addToMediaList(file: File) {
    this.deleteUnusedFiles()
    let mediaFile = this.mediaList.get(file.name)
    let imgText: string;
    if (mediaFile) {
      imgText = `![${mediaFile.file.name}](${mediaFile.tempUrl})`
    } else {
      const fileName = URL.createObjectURL(file)
      this.mediaList.set(file.name, {
        file,
        tempUrl: fileName
      })

      imgText = `![${file.name}](${fileName})`
    }

    if (imgText) {
      this.updateContent("\n" + imgText)
      await this.addToMarkdown()
    }
  }

  private updateContent(value?: string) {
    if (value !== null && value !== undefined && this.inputContent) {
      this.inputContent.nativeElement.textContent += value
    }

    let text = this.inputContent?.nativeElement.textContent
    if (text !== null && text !== undefined) this.content.setValue(text)
  }

  private async addToMarkdown() {
    if (this.title.value !== null) this.resultTitle.set(this.title.value)
    if (this.content.value === null) return;
    let res = await marked.parse(this.content.value, {
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
