import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from "@angular/common/http";
import { ApiService } from '../service/api.service';

declare var require: any;
var jwtDecode = require('jwt-decode');
import jwt_decode from "jwt-decode";
@Injectable({
  providedIn: 'root'
})
export class AccountService {
  userDetails;
  tokenExpDate;
  constructor(private httpClient: HttpClient, private route: Router, private api: ApiService) { }
  isUserLoggedIn() {
    var authToken = localStorage.getItem('accessToken');
    // Get Current Date Time
    const date = new Date(0);
    this.userDetails = jwt_decode(authToken);
    console.log(this.userDetails.exp)
    this.tokenExpDate = date.setUTCSeconds(this.userDetails.exp);
    if (authToken) {
      if (this.tokenExpDate.valueOf() < new Date().valueOf()) {
        console.log("NEW DATE " + new Date().valueOf());
        console.log("Token DATE " + this.tokenExpDate.valueOf());
        let refreshToken = {
          refreshToken: localStorage.getItem('refreshToken')
        }
        //refresh token ,i will generate new access token
        this.api.getRefreshToken(refreshToken).subscribe((data: any) => {
          console.log(data.accessToken, 'refresh token')
          localStorage.setItem('accessToken', data.accessToken)
        })
        return true
      }
      else {
        return true;
      }
    }
    else {
      alert('user not authenticated')
      this.route.navigateByUrl('/');
      return false;
    }
  }

}
