import { Injectable } from '@angular/core';
import { API_URL } from '../constants/API_URL';
import { signatureData } from '../interfaces/signatureData.interface';

@Injectable({
  providedIn: 'root',
})
export class MediaService {
  getSignature(folderName: string) {
    const token = localStorage.getItem('token');
    return fetch(API_URL + "/media/signature", {
      method: "POST",
      body: JSON.stringify({
        folder: folderName
      }),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      }
    })
  }

  async uploadFile(file: File, folderName: string) {
    const sigRes = await this.getSignature(folderName);
    if (!sigRes.ok) {
      throw new Error("Signature error");
    };
    const signature: signatureData = await sigRes.json()
    const formData = new FormData();
    formData.append('file', file)
    formData.append('api_key', signature.apiKey);
    formData.append('timestamp', signature.timestamp.toString());
    formData.append('signature', signature.signature);
    formData.append('folder', folderName);

    const fileRes = await fetch(`https://api.cloudinary.com/v1_1/${signature.cloudName}/${folderName == 'blogImages' || folderName == 'profileImages' ? 'image' : 'video'}/upload`, {
      method: 'POST',
      body: formData,
    });
    if (!fileRes.ok) {
      const err = await fileRes.json()
      throw new Error(err.error.message);
    }
    const res = await fileRes.json();
    const mediaRes = await this.submitMedia(res.public_id, res.url);
    if (!mediaRes.ok) {
      throw new Error('Cannot upload this file')
    };
    return res;
  }

  async submitMedia(publicId: string, url: string) {
    const token = localStorage.getItem('token');
    return fetch(API_URL + "/media", {
      method: "POST",
      body: JSON.stringify({
        public_id: publicId,
        url: url
      }),
      headers: {
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json',
      }
    })
  }
}
