import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import EditorJS from '@editorjs/editorjs';
import { BlogService } from '../../service/blog.service';
import { blogInterface } from '../../interfaces/blog.interface';
import { ErrorComponent } from "../../../../shared/components/error.component/error.component";
import { BlogHeaderComponent } from "../../../../shared/components/blog-header.component/blog-header.component";
import Header from '@editorjs/header';
import ImageTool from '@editorjs/image';

@Component({
  selector: 'app-blog',
  imports: [ErrorComponent, BlogHeaderComponent],
  templateUrl: './blog.html',
  styleUrl: './blog.scss',
})
export class Blog implements OnInit {
  private activatedRoute = inject(ActivatedRoute);
  private blogService = inject(BlogService);

  blog = signal<blogInterface | null>(null);
  blogError = signal<string | null>(null);

  private editor: EditorJS | undefined;
  private readonly blogId: number | null;
  constructor() {
    this.blogId = Number(this.activatedRoute.snapshot.paramMap.get('id'))
  }

  ngOnInit(): void {
    if (!this.blogId || isNaN(this.blogId)) {
      this.blogError.set("Whoops, blog not found");
      return;
    }

    this.blogService.getBlogById(this.blogId).subscribe({
      next: response => {
        this.blog.set(response)
        this.editor = new EditorJS({
          holder: "editorjs",
          tools: {
            header: Header,
            image: ImageTool,
          },
          data: response.content as any,
          readOnly: true,
        })
      },
      error: err => {
        if (!err.error) {
          this.blogError.set("Ooops, something wrong!");
          return;
        }

        this.blogError.set(err.error.detail)
      }
    })
  }
}
