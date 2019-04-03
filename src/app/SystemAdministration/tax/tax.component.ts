import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tax',
  templateUrl: './tax.component.html',
  styleUrls: ['./tax.component.css']
})
export class TaxComponent implements OnInit {

  constructor() { }
  public show: boolean = false;
  public hide: boolean = true;
  public buttonName: any = 'Add New';
  
  ngOnInit() {
  }

}
