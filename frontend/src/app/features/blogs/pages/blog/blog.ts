import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogService } from '../../service/blog.service';
import { blogInterface } from '../../interfaces/blog.interface';
import { ErrorComponent } from "../../../../shared/components/error.component/error.component";
import { DateFormatPipe } from '../../../../shared/pipes/date-format-pipe';
import { MarkdownComponent } from "ngx-markdown";
import { MarkdownFormatPipe } from '../../../../shared/pipes/markdown-format-pipe';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-blog',
  imports: [ErrorComponent, DateFormatPipe, MarkdownComponent, MarkdownFormatPipe, AsyncPipe],
  templateUrl: './blog.html',
  styleUrl: './blog.scss',
})
export class Blog implements OnInit {
  private activatedRoute = inject(ActivatedRoute);
  private blogService = inject(BlogService);

  blog = signal<blogInterface | null>(null);
  blogError = signal<string | null>(null);

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
