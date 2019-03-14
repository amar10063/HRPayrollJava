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
  submitted: false;

  ngOnInit() {
  submitted:true;
 
}


  forget() { alert(this.forgetpassword.controls);}
  get f( ){return; }
}
