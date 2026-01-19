import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { API_URL } from '../../../core/constants/API_URL';

@Injectable({
  providedIn: 'root',
})
export class BlogService {
  private http = inject(HttpClient)

  submitBlog(blogForm: FormGroup) {
    return this.http.post(API_URL + "/blogs", blogForm.value)
  }
}
