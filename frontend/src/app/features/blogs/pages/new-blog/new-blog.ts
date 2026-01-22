import { Component, ElementRef, inject, OnDestroy, OnInit, signal, ViewChild } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { marked } from 'marked';
import { MarkdownComponent } from "ngx-markdown";
import { debounceTime, Subject } from 'rxjs';
import { FileInterface } from '../../interfaces/file.interface';
import { BlogService } from '../../service/blog.service';
import { MediaService } from '../../../../core/services/media.service';

@Component({
  selector: 'app-new-blog',
  imports: [ReactiveFormsModule, MarkdownComponent],
  templateUrl: './new-blog.html',
  styleUrl: './new-blog.scss',
})
export class NewBlog implements OnInit, OnDestroy {
  private blogService = inject(BlogService)
  private cloudinaryService = inject(MediaService)

  resultTitle = signal('');
  resultContent = signal('');
  show = signal(true);

  private publicIds: Map<string, string> = new Map();
  private deletedFileIds: string[] = []

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
    for (const value of this.publicIds.values()) {
      this.deletedFileIds.push(value);
    }
    this.cleanFileIds()
  }


  // handleSubmit() {
  //   this.updateContent()
  //   this.cleanUnusedFiles()
  //   this.cleanFileIds()
  //   this.blogService.submitBlog(this.blogForm).subscribe({
  //     next: response => {
  //       console.log(response)
  //     },
  //     error: err => {
  //       console.error(err)
  //     }
  //   })
  // }

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
    // this.cloudinaryService.getSignature().subscribe({
    //   next: async response => {
    //     const result = await this.cloudinaryService.uploadFile(file, response)
    //     if (!result.ok) {
    //       return
    //     }
    //     const res = await result.json();
    //     this.addFile(file.name, res.url, res.public_id)
    //   },

    //   error: err => {
    //     console.error(err)
    //   }
    // });

    input.value = "";
  }

  private async addFile(fileName: string, url: string, public_id: string) {
    this.cleanUnusedFiles()
    let imgText = `![${fileName}](${url})`
    this.publicIds.set(url, public_id)
    this.updateContent("\n" + imgText)
    await this.addToMarkdown()
  }

  private cleanUnusedFiles() {
    for (const [key, value] of this.publicIds) {
      if (!this.content.value?.match("!\\[.*\\s{0,1}.*\\]\\(\\s{0,1}" + key + "\\s{0,1}\\)")) {
        this.deletedFileIds.push(value)
        this.publicIds.delete(key)
      }
    }
  }

  private cleanFileIds() {
    // this.cloudinaryService.deleteTempFiles(this.deletedFileIds).subscribe({
    //   error: err => {
    //     console.error(err)
    //   },
    //   complete: () => {
    //     this.deletedFileIds = [];
    //   }
    // })
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
