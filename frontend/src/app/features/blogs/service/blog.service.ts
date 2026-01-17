import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { API_URL } from '../../../core/constants/API_URL';

@Injectable({
  providedIn: 'root',
})
export class BlogService {
  private http = inject(HttpClient)
}
