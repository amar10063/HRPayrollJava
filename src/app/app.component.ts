import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  public href1: string = "";
  constructor(private router1: Router) { }
  ngOnInit() {
    this.href1 = this.router1.url;
    console.log(this.router1.url);
  }
}
