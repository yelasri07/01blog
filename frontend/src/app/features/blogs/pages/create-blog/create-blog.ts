import { AfterViewInit, Component, ElementRef, inject, OnInit, signal, ViewChild } from '@angular/core';
import EditorJS, { OutputData } from '@editorjs/editorjs';
import Header from '@editorjs/header';
import { MediaService } from '../../../../core/services/media.service';
import { BlogService } from '../../service/blog.service';
import ImageTool from '@editorjs/image';
import { ActivatedRoute, Router } from '@angular/router';
import { ErrorComponent } from "../../../../shared/components/error.component/error.component";
import { AuthStateService } from '../../../../core/services/auth.state.service';
import { mergeMap, of, throwError } from 'rxjs';
import { VideoTool } from '../../../../shared/tools/video-tool';

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
  private authStateService = inject(AuthStateService)

  creationBlogError = signal<string | null>(null);
  buttonDisabled = signal(false);
  showBlogNotFoundError = signal("");
  blogPageType = signal("");

  private readonly blogId: number;

  @ViewChild('title') title: ElementRef<HTMLInputElement> | undefined

  constructor() {
    this.blogId = Number(this.activatedRoute.snapshot.paramMap.get('id'));
  }

  ngAfterViewInit(): void {
    this.editor = new EditorJS({
      holder: 'editorjs',
      tools: {
        header: Header,
        video: {
          class: VideoTool,
          config: {
            uploader: (file: File) => {
              return this.uploadFile(file, "blogVideo")
            }
          }
        },
        image: {
          class: ImageTool,
          config: {
            captionPlaceholder: null,
            uploader: {
              uploadByFile: (file: File) => {
                return this.uploadFile(file, "blogImages");
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
    if (!this.blogId || isNaN(this.blogId)) {
      if (location.pathname.startsWith("/edit-blog")) this.showBlogNotFoundError.set("Whoops! blog not found");
      this.blogPageType.set("Create blog")
      return;
    };

    this.blogPageType.set("Edit blog")
    this.blogService.getBlogById(this.blogId).pipe(
      mergeMap((res) => {
        if (res.user_id !== this.authStateService.getCurrentUser()?.id) {
          return throwError(() => ({
            error: {
              detail: "You are not allowed to edit this blog"
            }
          }));
        }

        return of(res)
      })
    ).subscribe({
      next: res => {
        if (this.title) this.title.nativeElement.value = res.title
        if (this.editor) this.editor!.blocks.render(res.content)
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
    console.log(this.outputData)
    this.buttonDisabled.set(true);
    this.blogService.submitBlog(this.outputData, titleIpt?.value || "", this.blogId).subscribe({
      next: response => {
        this.router.navigate(['blogs', response.id])
      },
      error: err => {
        this.buttonDisabled.set(false)
        let errorMessage = "Ooops, something wrong."
        if (err.error.detail) {
          errorMessage = err.error.detail
        } else if (err.error.content) {
          errorMessage = err.error.content
        } else if (err.error.title) {
          errorMessage = err.error.title
        }

        this.creationBlogError.set(errorMessage);
      },
    })
  }

  private async uploadFile(file: File, folderName: string) {
    const res = await this.mediaService.uploadFile(file, folderName);
    return {
      success: 1,
      file: {
        url: res.url,
        public_id: res.public_id
      }
    }
  }
}
