import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  configurl = "http://localhost:4200";
  constructor(private http: HttpClient) { }

  login(data) {
    return this.http.post(this.configurl + '/api/login', data);
  }
  register(data) {
    return this.http.post(this.configurl + '/api/register', data);
  }
  getRefreshToken(refreshToken) {
    return this.http.post(this.configurl + '/api/refreshToken', refreshToken)
  }
  getUserWithImages() {
    return this.http.get(this.configurl + '/api/getUserWithImages')
  }
  deleteUserImages(userId) {
    return this.http.post(this.configurl + '/api/deleteUserImages', userId)
  }
}
