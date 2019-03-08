import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private formBuilder: FormBuilder) { }
  loginForm: FormGroup;

  ngOnInit() {

  }
  onSubmit() {
    this.loginForm = this.createFormGroup();


  }

  createFormGroup() {
    return this.formBuilder.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    });
  }

  get f() {
    return this.loginForm.controls;
  }
}
