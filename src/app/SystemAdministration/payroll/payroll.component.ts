import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-payroll',
  templateUrl: './payroll.component.html',
  styleUrls: ['./payroll.component.css']
})
export class PayrollComponent implements OnInit {
  
  
  constructor() { }

  public show: boolean = false;
  public hide: boolean = true;
  public buttonName: any = 'Add New';

  ngOnInit() {
  }

}
