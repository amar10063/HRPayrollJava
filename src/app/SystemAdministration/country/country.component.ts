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
    { headerName: 'Country', field: 'country', sortable: true, filter: true, width: 210 },
    { headerName: 'Country Code', field: 'countryCode', sortable: true, filter: true, width: 202 }
  ];

  rowData = [
    { all: " ", checkboxSelection: true, serial: '1', country: 'India', countryCode:'001' },
    { all: " ", checkboxSelection: true, serial: '2', country: 'UAE', countryCode:'002' },
    { all: " ", checkboxSelection: true, serial: '3', country: 'USA', countryCode:'003' },
    { all: " ", checkboxSelection: true, serial: '4', country: 'Sri Lanka', countryCode:'004' },
    { all: " ", checkboxSelection: true, serial: '5', country: 'Nepal', countryCode:'005' },
    { all: " ", checkboxSelection: true, serial: '6', country: 'China', countryCode:'006' },
    { all: " ", checkboxSelection: true, serial: '7', country: 'England', countryCode:'007' }
  ];

  columnDefs1 = [
    { headerName: "All", checkboxSelection: true, field: "all", width: 150 },
    { headerName: 'Sr No.', field: 'serial', width: 150 },
    { headerName: 'State', field: 'state', sortable: true, filter: true, editable:true, width: 255 },
    { headerName: 'Country', field: 'country', sortable: true, editable:true, filter: true, width: 255 }
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

  columnDefs2 = [
    { headerName: "All", checkboxSelection: true, field: "all", width: 100 },
    { headerName: 'Sr No.', field: 'serial', width: 150 },    
    { headerName: 'City', field: 'city', sortable: true, filter: true, editable:true, width: 182 },
    { headerName: 'State', field: 'state', sortable: true, filter: true, editable:true, width: 182 },
    { headerName: 'Country', field: 'country', sortable: true, editable:true, filter: true, width: 200 }
  ];

  rowData2 = [
    { all: " ", checkboxSelection: true, city: 'Noida', serial: '1', state: 'UP', country: 'India' },
    { all: " ", checkboxSelection: true, city: 'Chandigarh', serial: '2', state: 'Punjab', country: 'India' },
    { all: " ", checkboxSelection: true, city: 'Gurugram', serial: '3', state: 'Haryana', country: 'India' },
    { all: " ", checkboxSelection: true, city: 'Gangtok', serial: '4', state: 'Sikkim', country: 'India' },
    { all: " ", checkboxSelection: true, city: 'Jaipur', serial: '5', state: 'Rajasthan', country: 'India' },
    { all: " ", checkboxSelection: true, city: 'Vadodara', serial: '6', state: 'Gujarat', country: 'India' },
    { all: " ", checkboxSelection: true, city: 'Noida', serial: '7', state: 'UP', country: 'India' }
  ];

  columnDefs3 = [
    { headerName: "All", checkboxSelection: true, field: "all", width: 150 },
    { headerName: 'Sr No.', field: 'serial', width: 262 },    
    { headerName: 'Department', field: 'department', sortable: true, filter: true, editable:true, width: 400 }
     ];

  rowData3 = [
    { all: " ", checkboxSelection: true, serial: '1', department: 'IT' },
    { all: " ", checkboxSelection: true, serial: '2', department: 'Finance' },
    { all: " ", checkboxSelection: true, serial: '3', department: 'AX' },
    { all: " ", checkboxSelection: true, serial: '4', department: 'Medical' },
    { all: " ", checkboxSelection: true, serial: '5', department: 'Accounts' }
  ];

  columnDefs4 = [
    { headerName: "All", checkboxSelection: true, field: "all", width: 100 },
    { headerName: 'Sr No.', field: 'serial', width: 200 },    
    { headerName: 'Department', field: 'department', sortable: true, filter: true, editable:true, width: 255 },
    { headerName: 'Designation', field: 'designation', sortable: true, filter: true, editable:true, width: 260 }
     ];

  rowData4 = [
    { all: " ", checkboxSelection: true, serial: '1', department: 'IT', designation:'Software Developer' },
    { all: " ", checkboxSelection: true, serial: '2', department: 'Finance', designation:'Software Developer' },
    { all: " ", checkboxSelection: true, serial: '3', department: 'AX', designation:'AX Technical' },
    { all: " ", checkboxSelection: true, serial: '4', department: 'Medical', designation:'Doctor' },
    { all: " ", checkboxSelection: true, serial: '5', department: 'Accounts', designation:'Accountant' }
  ];

  columnDefs5 = [
    { headerName: "All", checkboxSelection: true, field: "all", width: 150 },
    { headerName: 'Sr No.', field: 'serial', width: 150 },
    { headerName: 'Language', field: 'language', sortable: true, filter: true, editable:true, width: 255 },
    { headerName: 'Language Code', field: 'languageCode', sortable: true, editable:true, filter: true, width: 255 }
  ];

  rowData5 = [
    { all: " ", checkboxSelection: true, serial: '1', language: 'English', languageCode: '001' },
    { all: " ", checkboxSelection: true, serial: '2', language: 'Hindi', languageCode: '002' },
    { all: " ", checkboxSelection: true, serial: '3', language: 'Urdu', languageCode: '003' },
    { all: " ", checkboxSelection: true, serial: '4', language: 'Arabic', languageCode: '004' },
    { all: " ", checkboxSelection: true, serial: '5', language: 'French', languageCode: '005' }
  ];
  constructor() { }

  public show: boolean = false;
  public hide: boolean = true;
  public buttonName: any = 'Add New';

  ngOnInit() {
  }

}
