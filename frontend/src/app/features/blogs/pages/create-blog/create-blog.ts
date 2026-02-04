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
        video: VideoTool,
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
      data: {
        time: 1552744582955,
        blocks: [
          {
            type: "video",
            data: {
              url: "https://cdn.pixabay.com/photo/2017/09/01/21/53/blue-2705642_1280.jpg"
            }
          },
          {
            type: "video",
            data: {
              url: "aaaaaaaaaaaaaa"
            }
          },
          {
            type: "image",
            data: {
              url: "cccccccccc"
            }
          }
        ],
        version: "2.11.10"
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
    // this.buttonDisabled.set(true);
    // this.blogService.submitBlog(this.outputData, titleIpt?.value || "", this.blogId).subscribe({
    //   next: response => {
    //     this.router.navigate(['blogs', response.id])
    //   },
    //   error: err => {
    //     this.buttonDisabled.set(false)
    //     let errorMessage = "Ooops, something wrong."
    //     if (err.error.detail) {
    //       errorMessage = err.error.detail
    //     } else if (err.error.content) {
    //       errorMessage = err.error.content
    //     } else if (err.error.title) {
    //       errorMessage = err.error.title
    //     }

    //     this.creationBlogError.set(errorMessage);
    //   },
    // })
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

class VideoTool {
  static get toolbox() {
    return {
      title: 'Video',
      icon: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-camera-video" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M0 5a2 2 0 0 1 2-2h7.5a2 2 0 0 1 1.983 1.738l3.11-1.382A1 1 0 0 1 16 4.269v7.462a1 1 0 0 1-1.406.913l-3.111-1.382A2 2 0 0 1 9.5 13H2a2 2 0 0 1-2-2zm11.5 5.175 3.5 1.556V4.269l-3.5 1.556zM2 4a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h7.5a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1z"/>
            </svg>`
    };
  }

  private data: any;
  private wrapper!: HTMLElement
  constructor({ data }: any) {
    this.data = data
  }

  render() {
    this.wrapper = document.createElement('div')
    this.wrapper.classList.add("video-tool")

    if (this.data.url) {
      this.renderVideo()
    } else {
      this.renderUpload()
    }
    return this.wrapper
  }

  private renderVideo() {
    const video = document.createElement('video')
    video.src = this.data.url;
    video.controls = true;
    this.wrapper.appendChild(video)
  }

  private renderUpload() {
    const input = document.createElement('input');
    const label = document.createElement('label')
    input.id = 'upload-video'
    input.type = 'file';
    label.setAttribute('for', 'upload-video')
    label.textContent += 'Select an video'
    label.classList.add('upload-video')
    input.style.display = 'none';

    input.onchange = async () => {
      if (!input.files?.length) return;
      const file = input.files[0];

      // const response = await this.uploadVideo(file);
      this.data.url = "kkkkkkkkkkkkkkkkkkkk";

      this.wrapper.innerHTML = '';
      this.renderVideo();
    };

    this.wrapper.appendChild(label)
    this.wrapper.appendChild(input);

    // input.click()
  }

  private uploadVideo(file: File) {
    
  }

  save(blockContent: any) {
    console.log(blockContent)
  }
}