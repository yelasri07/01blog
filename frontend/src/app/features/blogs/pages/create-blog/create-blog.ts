import { Component, inject } from '@angular/core';
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

  constructor() {
    this.editor = new EditorJS({
      holder: 'editorjs',
      tools: {
        header: Header,
        image: {
          class: ImageTool,
          config: {
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
    this.outputData = await this.editor.save()
    this.blogService.submitBlog(this.outputData).subscribe({
      next: response => {
        console.log(response)
      },
      error: err => {
        console.error(err)
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
