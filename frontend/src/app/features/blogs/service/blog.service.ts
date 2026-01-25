import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { API_URL } from '../../../core/constants/API_URL';
import { blogInterface } from '../interfaces/blog.interface';
import { OutputData } from '@editorjs/editorjs';
import { reactInterface } from '../interfaces/react.interface';
import { commentInterface } from '../interfaces/comment.interface';

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

  submitComment(blogId: number, commentForm: FormGroup) {
    return this.http.post<commentInterface>(API_URL + `/blogs/${blogId}/comments`, commentForm.value)
  }

  getBlogById(blogId: number) {
    return this.http.get<blogInterface>(API_URL + "/blogs/" + blogId);
  }

  getBlogs() {
    return this.http.get<blogInterface[]>(API_URL + "/blogs")
  }

  getComments(blogId: number) {
    return this.http.get<commentInterface[]>(API_URL + `/blogs/${blogId}/comments`)
  }
}
