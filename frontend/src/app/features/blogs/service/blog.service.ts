import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { API_URL } from '../../../core/constants/API_URL';
import { blogInterface } from '../interfaces/blog.interface';
import { OutputData } from '@editorjs/editorjs';

@Injectable({
  providedIn: 'root',
})
export class BlogService {
  private http = inject(HttpClient)

  submitBlog(blog: OutputData) {
    return this.http.post<blogInterface>(API_URL + "/blogs", {
      title: "Youssef",
      content: blog
    })
  }

  getBlogById(blogId: number) {
    return this.http.get<blogInterface>(API_URL + "/blogs/" + blogId);
  }

  getBlogs() {
    return this.http.get<blogInterface[]>(API_URL + "/blogs")
  }
}
