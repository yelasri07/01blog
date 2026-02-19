import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { API_URL } from '../constants/API_URL';
import { searchInterface } from '../interfaces/search.interface';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private http = inject(HttpClient);

  searchByUsersAndBlogs(value: string) {
    return this.http.get<searchInterface>(`${API_URL}/search?value=${value}`)
  }
}
