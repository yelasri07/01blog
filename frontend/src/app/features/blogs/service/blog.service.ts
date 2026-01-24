import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { API_URL } from '../../../core/constants/API_URL';
import { blogInterface } from '../interfaces/blog.interface';
import { OutputData } from '@editorjs/editorjs';
import { reactInterface } from '../interfaces/react.interface';

@Injectable({
  providedIn: 'root',
})
export class BlogService {
  private http = inject(HttpClient)

  submitBlog(blog: OutputData, title: string) {
    return this.http.post<blogInterface>(API_URL + "/blogs", {
      title: title,
      content: blog
    })
  }

  submitReact(blogId: number) {
    return this.http.post<reactInterface>(API_URL + `/blogs/${blogId}/likes`, {})
  }

  getBlogById(blogId: number) {
    return this.http.get<blogInterface>(API_URL + "/blogs/" + blogId);
  }

  getBlogs() {
    return this.http.get<blogInterface[]>(API_URL + "/blogs")
  }
}
