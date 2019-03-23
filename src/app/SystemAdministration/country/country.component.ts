import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.css']
})
export class CountryComponent implements OnInit {
  columnDefs = [
    { headerName: "All", checkboxSelection: true, field: "all", width: 150 },
    { headerName: 'Sr No.', field: 'serial', width: 250 },
    { headerName: 'Country', field: 'country', sortable: true, filter: true, width: 413 }
  ];

  rowData = [
    { all: " ", checkboxSelection: true, serial: '1', country: 'India' },
    { all: " ", checkboxSelection: true, serial: '2', country: 'UAE' },
    { all: " ", checkboxSelection: true, serial: '3', country: 'USA' },
    { all: " ", checkboxSelection: true, serial: '4', country: 'Sri Lanka' },
    { all: " ", checkboxSelection: true, serial: '5', country: 'Nepal' },
    { all: " ", checkboxSelection: true, serial: '6', country: 'China' },
    { all: " ", checkboxSelection: true, serial: '7', country: 'England' }
  ];

  columnDefs1 = [
    { headerName: "All", checkboxSelection: true, field: "all", width: 150 },
    { headerName: 'Sr No.', field: 'serial', width: 250 },
    { headerName: 'State', field: 'state', sortable: true, filter: true, editable:true, width: 205 },
    { headerName: 'Country', field: 'country', sortable: true, editable:true, filter: true, width: 205 }
  ];

  rowData1 = [
    { all: " ", checkboxSelection: true, serial: '1', state: 'UP', country: 'India' },
    { all: " ", checkboxSelection: true, serial: '2', state: 'Punjab', country: 'India' },
    { all: " ", checkboxSelection: true, serial: '3', state: 'Haryana', country: 'India' },
    { all: " ", checkboxSelection: true, serial: '4', state: 'Sikkim', country: 'India' },
    { all: " ", checkboxSelection: true, serial: '5', state: 'Rajasthan', country: 'India' },
    { all: " ", checkboxSelection: true, serial: '6', state: 'Gujarat', country: 'India' },
    { all: " ", checkboxSelection: true, serial: '7', state: 'UP', country: 'India' }
  ];

  constructor() { }

  public show: boolean = false;
  public hide: boolean = true;
  public buttonName: any = 'Add New';

  ngOnInit() {
  }

}
