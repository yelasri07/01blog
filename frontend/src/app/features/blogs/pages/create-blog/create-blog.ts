import { AfterViewInit, Component, ElementRef, inject, OnInit, signal, ViewChild } from '@angular/core';
import EditorJS, { OutputData } from '@editorjs/editorjs';
import Header from '@editorjs/header';
import { MediaService } from '../../../../core/services/media.service';
import { BlogService } from '../../service/blog.service';
import ImageTool from '@editorjs/image';
import { ActivatedRoute, Router } from '@angular/router';
import { ErrorComponent } from "../../../../shared/components/error.component/error.component";

@Component({
  selector: 'app-create-blog',
  imports: [ErrorComponent],
  templateUrl: './create-blog.html',
  styleUrl: './create-blog.scss',
})
export class CreateBlog implements AfterViewInit {
  private editor: EditorJS | undefined;
  private outputData: OutputData | undefined;

  private mediaService = inject(MediaService);
  private blogService = inject(BlogService);
  private router = inject(Router)
  private activatedRoute = inject(ActivatedRoute)

  creationBlogError = signal<string | null>(null);
  buttonDisabled = signal(false);
  showBlogNotFoundError = signal("");
  blogPageType = signal("");

  blogId = 0

  @ViewChild('title') title: ElementRef<HTMLInputElement> | undefined

  ngAfterViewInit(): void {
    this.blogId = Number(this.activatedRoute.snapshot.paramMap.get('id'));

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
      onReady: () => this.getBlog()
    })
  }

  getBlog() {
    console.log("sfsdfsf")
    if (!this.blogId || isNaN(this.blogId)) {
      if (location.pathname.startsWith("/edit-blog")) this.showBlogNotFoundError.set("Whoops! blog not found");
      this.blogPageType.set("Create blog")
      return;
    };


    this.blogPageType.set("Edit blog")
    this.blogService.getBlogById(this.blogId).subscribe({
      next: res => {
        if (this.title) this.title.nativeElement.value = res.title
        this.editor!.render(res.content)
      },
      error: err => {
        if (!err.error) {
          this.showBlogNotFoundError.set("Ooops, something wrong!");
          return;
        }

        this.showBlogNotFoundError.set(err.error.detail)
      }
    })
  }

  async handleSubmit() {
    const titleIpt = this.title?.nativeElement;

    if (!this.editor) return;
    this.outputData = await this.editor.save()
    this.buttonDisabled.set(true);
    this.blogService.submitBlog(this.outputData, titleIpt?.value || "", this.blogId).subscribe({
      next: response => {
        this.router.navigate(['blogs', response.id])
      },
      error: err => {
        this.buttonDisabled.set(false)
        let errorMessage = "Ooops, something wrong."
        if (err.error.title) {
          errorMessage = err.error.title
        } else if (err.error.content) {
          errorMessage = err.error.content
        } else if (err.error.detail) {
          errorMessage = err.error.detail
        }

        this.creationBlogError.set(errorMessage);
      },
    })
  }

  private async uploadImage(file: File) {
    const res = await this.mediaService.uploadFile(file, "blogImages");
    return {
      success: 1,
      file: {
        url: res.url,
        public_id: res.public_id
      }
    }
  }
}
