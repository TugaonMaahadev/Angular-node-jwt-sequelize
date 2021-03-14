import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../service/api.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted = false;
  constructor(private formBuilder: FormBuilder, private api: ApiService, private route: Router) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      userEmail: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],

      acceptTerms: [false, Validators.requiredTrue]
    });
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');

  }
  get f() { return this.loginForm.controls; }
  login(data) {
    var parameter = {
      email: data.userEmail,
      password: data.password
    }
    console.log(parameter, 'parameter')
    return new Promise((resolve, reject) => {
      this.api.login(parameter).subscribe((data: any) => {
        console.log(data.status, 'status')
        if (data.status === 404) {
          alert("User or password not matched")
        }
        if (data.status === 200) {
          resolve(data)
        }
        else {
          reject(data)
        }
      })
    }).then((data: any) => {
      localStorage.setItem('accessToken', data.accessToken)
      localStorage.setItem('refreshToken', data.refreshToken)
      this.route.navigate(['/dashboard'])

    }).catch((err) => {
      console.log('err', err)
    })
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
  }
}
