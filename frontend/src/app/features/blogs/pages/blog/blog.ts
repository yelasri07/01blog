import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import EditorJS from '@editorjs/editorjs';
import { BlogService } from '../../service/blog.service';
import { blogInterface } from '../../interfaces/blog.interface';
import { ErrorComponent } from "../../../../shared/components/error.component/error.component";
import { BlogHeaderComponent } from "../../../../shared/components/blog-header.component/blog-header.component";
import { BlogFooterComponent } from "../../../../shared/components/blog-footer.component/blog-footer.component";

@Component({
  selector: 'app-blog',
  imports: [ErrorComponent, BlogHeaderComponent, BlogFooterComponent],
  templateUrl: './blog.html',
  styleUrl: './blog.scss',
})
export class Blog implements OnInit {
  private activatedRoute = inject(ActivatedRoute);
  private blogService = inject(BlogService);

  blog = signal<blogInterface | null>(null);
  blogError = signal<string | null>(null);

  private editor: EditorJS;
  private readonly blogId: number | null;
  constructor() {
    this.blogId = Number(this.activatedRoute.snapshot.paramMap.get('id'))
    this.editor = new EditorJS({
      holder: "editorjs"
    })
  }

  ngOnInit(): void {
    if (!this.blogId || isNaN(this.blogId)) {
      this.blogError.set("Whoops, blog not found");
      return;
    }

    this.blogService.getBlogById(this.blogId).subscribe({
      next: response => {
        this.blog.set(response)
        console.log(this.blog()?.content)
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
