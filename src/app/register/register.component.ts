import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder, private api: ApiService, private route: Router) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],

      acceptTerms: [false, Validators.requiredTrue]
    });
  }
  get f() { return this.registerForm.controls; }
  register(data) {
    console.log(data, 'data')
    let parameter = {
      name: data.name,
      phone: data.phone,
      email: data.email,
      password: data.password
    }
    return new Promise((resolve, reject) => {
      this.api.register(parameter).subscribe((data: any) => {
        console.log(data, 'data')
        if (data.status === 201) {
          resolve(data)
        }
        else {
          reject(data)
        }
      })
    }).then((data) => {
      console.log(data, 'then')
      this.route.navigate(['/login'])
    }).catch((err) => {
      console.log(err, 'err')
    })
    this.submitted = true
  }
}
