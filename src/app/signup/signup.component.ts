import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {FormGroup, Validators, FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  public href: string = "";
  constructor(private router: Router, private formbuilder: FormBuilder) { }

  ngOnInit() {
    this.href = this.router.url;

    console.log(this.router.url);
  }

}
