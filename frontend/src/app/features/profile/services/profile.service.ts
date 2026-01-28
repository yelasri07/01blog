import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { API_URL } from '../../../core/constants/API_URL';
import { User } from '../../../core/interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private http = inject(HttpClient);

  getUserProfile(userId: number) {
    return this.http.get<User>(API_URL + `/users/${userId}`)
  }

  submitFollow(subscribedToId: number) {
    return this.http.post<User>(API_URL + `/users/${subscribedToId}/subscribe`, {});
  }

  submitProfileImage(url: string, publicId: string) {
    return this.http.patch<User>(API_URL + "/users/profileImage", {
      url: url,
      public_id: publicId
    });
  }

}
