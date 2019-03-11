import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  public href: string = "";
  constructor(private router: Router) { }

  ngOnInit() {
    this.href = this.router.url;

    console.log(this.router.url);
  }

}
