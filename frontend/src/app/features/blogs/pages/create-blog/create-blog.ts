import { Component, ElementRef, inject, signal, ViewChild } from '@angular/core';
import EditorJS, { OutputData } from '@editorjs/editorjs';
import Header from '@editorjs/header';
import { MediaService } from '../../../../core/services/media.service';
import { signatureData } from '../../../../core/interfaces/signatureData.interface';
import { BlogService } from '../../service/blog.service';
import ImageTool from '@editorjs/image';

@Component({
  selector: 'app-create-blog',
  imports: [],
  templateUrl: './create-blog.html',
  styleUrl: './create-blog.scss',
})
export class CreateBlog {
  private editor: EditorJS;
  private outputData: OutputData | undefined;

  private mediaService = inject(MediaService);
  private blogService = inject(BlogService);

  creationBlogError = signal<string | null>(null);

  @ViewChild('title') title: ElementRef<HTMLInputElement> | undefined

  constructor() {
    this.editor = new EditorJS({
      holder: 'editorjs',
      tools: {
        header: Header,
        image: {
          class: ImageTool,
          config: {
            captionPlaceholder: null,
            uploader: {
              uploadByFile: (file: File) => {
                return this.uploadImage(file);
              }
            }
          }
        },
      },
      autofocus: true,
      placeholder: 'Type text or paste a link',
    })
  }

  async handleSubmit() {
    const titleIpt = this.title?.nativeElement;
    this.outputData = await this.editor.save()
    console.log(this.outputData)
    this.blogService.submitBlog(this.outputData, titleIpt?.value || "").subscribe({
      next: response => {
        console.log(response)
      },
      error: err => {
        let errorMessage = "Ooops, something wrong."
        if (err.error.title) {
          errorMessage = err.error.title
        } else if (err.error.content) {
          errorMessage = err.error.content
        } else if (err.error.detail) {
          errorMessage = err.error.detail
        }

        this.creationBlogError.set(errorMessage);

      }
    })
  }

  private async uploadImage(file: File) {
    const sigRes = await this.mediaService.getSignature();
    if (!sigRes.ok) return;
    const signature: signatureData = await sigRes.json()
    const fileRes = await this.mediaService.uploadFile(file, signature)
    if (!fileRes.ok) {
      return
    }
    const res = await fileRes.json();
    this.mediaService.submitMedia(res.public_id).subscribe({
      error: err => {
        console.error(err);
      }
    })
    return {
      success: 1,
      file: {
        url: res.url,
        public_id: res.public_id
      }
    }
  }
}
