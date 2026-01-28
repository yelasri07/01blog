import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { API_URL } from '../constants/API_URL';
import { signatureData } from '../interfaces/signatureData.interface';

@Injectable({
  providedIn: 'root',
})
export class MediaService {
  private http = inject(HttpClient)

  getSignature() {
    const token = localStorage.getItem('token');
    return fetch(API_URL + "/media/signature", {
      method: "POST",
      headers: {
        'Authorization': 'Bearer ' + token
      }
    })
  }

  async uploadFile(file: File) {
    const sigRes = await this.getSignature();
    if (!sigRes.ok) {
      throw new Error("Signature error");
    };
    const signature: signatureData = await sigRes.json()

    const formData = new FormData();
    formData.append('file', file)
    formData.append('api_key', signature.apiKey);
    formData.append('timestamp', signature.timestamp.toString());
    formData.append('signature', signature.signature);
    formData.append('folder', 'blogImages');

    const fileRes = await fetch(`https://api.cloudinary.com/v1_1/${signature.cloudName}/image/upload`, {
      method: 'POST',
      body: formData
    });
    if (!fileRes.ok) {
      throw new Error("Uploading error");
    }
    const res = await fileRes.json();
    this.submitMedia(res.public_id).subscribe({
      error: err => {
        console.error(err);
      }
    })
    return res;
  }

  submitMedia(publicId: string) {
    return this.http.post(API_URL + "/media", {
      public_id: publicId
    })
  }
}
