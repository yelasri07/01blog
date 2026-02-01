import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { API_URL } from '../../../core/constants/API_URL';
import { User } from '../../../core/interfaces/user.interface';
import { blogInterface } from '../../blogs/interfaces/blog.interface';
import { reportInterface } from '../interfaces/report.interface';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private http = inject(HttpClient);

  getUsers() {
    return this.http.get<User[]>(API_URL + "/users");
  }

  getBlogs() {
    return this.http.get<blogInterface[]>(API_URL + "/blogs/dashboard")
  }

  getReports() {
    return this.http.get<reportInterface[]>(API_URL + "/reports")
  }

  submitBanUser(userId: number) {
    return this.http.patch(API_URL + `/users/${userId}/ban`, {})
  }

  submitDeleteUser(userId: number) {
    return this.http.delete(API_URL + `/users/${userId}`)
  }

  submitHideBlog(blogId: number) {
    return this.http.patch(API_URL + `/blogs/${blogId}/visibility`, {})
  }

  submitDeleteBlog(blogId: number) {
    return this.http.delete(API_URL + `/blogs/${blogId}`)
  }

}
