import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { API_URL } from '../constants/API_URL';
import { signatureData } from '../interfaces/signatureData.interface';

@Injectable({
  providedIn: 'root',
})
export class CloudinaryService {
  private http = inject(HttpClient)

  getSignature() {
    return this.http.post<signatureData>(API_URL + "/cloudinary/signature", {})
  }

  uploadFile(file: File, data: signatureData) {
    const formData = new FormData();
    formData.append('file', file)
    formData.append('api_key', data.apiKey);
    formData.append('timestamp', data.timestamp.toString());
    formData.append('signature', data.signature);
    formData.append('folder', 'tempFiles');

    return fetch(`https://api.cloudinary.com/v1_1/${data.cloudName}/image/upload`, {
      method: 'POST',
      body: formData
    });
  }

  deleteTempFiles(publicIds: string[]) {
    return this.http.delete(API_URL + "/cloudinary", {
      body: {
        "publicIds": publicIds
      }
    })
  }
}
