import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-forgetpassword',
  templateUrl: './forgetpassword.component.html',
  styleUrls: ['./forgetpassword.component.css']
})
export class ForgetpasswordComponent implements OnInit {

  constructor(private formbuilder: FormBuilder) { }
  forgetpassword: FormGroup;
  submitted= false;

  ngOnInit() {
    this.forgetpassword = this.formbuilder.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }


  forget() {
    this.submitted=true;

    if (this.forgetpassword.invalid) {
      return;
    }
    alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.forgetpassword.value));
  }
  get f() {    
    return this.forgetpassword.controls; }
}
