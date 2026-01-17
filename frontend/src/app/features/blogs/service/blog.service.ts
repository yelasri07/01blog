import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { API_URL } from '../../../core/constants/API_URL';
import { FileInterface } from '../interfaces/file.interface';

@Injectable({
  providedIn: 'root',
})
export class BlogService {
  private http = inject(HttpClient)

  submitFiles(files: Map<string, FileInterface>) {
    const formData = new FormData();
    files.forEach(file => {
      formData.append("files", file.file);
    })

    return this.http.post(API_URL + "/cloudinary/upload", formData)
  }
}
