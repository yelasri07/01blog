import { Component, inject } from '@angular/core';
import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';
import ImageTool from '@editorjs/image';
import { CloudinaryService } from '../../../../core/services/cloudinary.service';
import { signatureData } from '../../../../core/interfaces/signatureData.interface';

@Component({
  selector: 'app-create-blog',
  imports: [],
  templateUrl: './create-blog.html',
  styleUrl: './create-blog.scss',
})
export class CreateBlog {
  private editor: EditorJS;

  private cloudinaryService = inject(CloudinaryService);

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
    let outputData = await this.editor.save()

    console.log(outputData)
  }

  private async uploadImage(file: File) {
    const sigRes = await this.cloudinaryService.getSignature();
    if (!sigRes.ok) return;
    const signature: signatureData = await sigRes.json()
    const fileRes = await this.cloudinaryService.uploadFile(file, signature)
    if (!fileRes.ok) {
      return
    }

    const res = await fileRes.json();
    return {
      success: 1,
      file: {
        url: res.url,
        public_id: res.public_id
      }
    }
  }
}
