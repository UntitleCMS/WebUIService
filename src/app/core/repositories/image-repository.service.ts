import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { ImageResponse } from '../models/image';

@Injectable({
  providedIn: 'root',
})
export class ImageRepositoryService {
  private readonly imageEndpoint = '/api/img/v1/img';
  private readonly avatarEndpoint = '/api/img/v1/avatar';

  constructor(private http: HttpClient) {}

  uploadImage(formData: FormData) {
    return this.http.post<ImageResponse>(this.imageEndpoint, formData);
  }

  getImage(formData: FormData) {
    return this.uploadImage(formData).pipe(map((response) => response.img));
  }

  updateAvatar(formData: FormData) {
    return this.http.post(this.avatarEndpoint, formData);
  }
}
