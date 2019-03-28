import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.css']
})
export class CountryComponent implements OnInit {
  columnDefs = [
    { headerName: 'Country Code', field: 'countryCode', sortable: true, filter: true, width: 120 },
    { headerName: 'Country Name', field: 'country', sortable: true, filter: true, width: 130 },
    { headerName: '', field: '', width: 590 }
  ];

  rowData = [
    { country: 'India', countryCode:'001' },
    { country: 'UAE', countryCode:'002' },
    { country: 'USA', countryCode:'003' },
    { country: 'Sri Lanka', countryCode:'004' },
    { country: 'Nepal', countryCode:'005' }
  ];

  columnDefs1 = [
    { headerName: 'Country', field: 'country', sortable: true, editable:true, filter: true, width: 120 },
    { headerName: 'State', field: 'state', sortable: true, filter: true, editable:true, width: 120 },
    { headerName: '', field: '', width: 600 }
  ];

  rowData1 = [
    { state: 'UP', country: 'India' },
    { state: 'Punjab', country: 'India' },
    { state: 'Haryana', country: 'India' },
    { state: 'Sikkim', country: 'India' },
    { state: 'Rajasthan', country: 'India' }
  ];

  columnDefs2 = [
    { headerName: 'Country', field: 'country', sortable: true, editable:true, filter: true, width: 120 },   
    { headerName: 'State', field: 'state', sortable: true, filter: true, editable:true, width: 120 },
    { headerName: 'City', field: 'city', sortable: true, filter: true, editable:true, width: 120 },
    { headerName: '', field: '', width: 480 }
  ];

  rowData2 = [
    { city: 'Noida', state: 'UP', country: 'India' },
    { city: 'Chandigarh', state: 'Punjab', country: 'India' },
    { city: 'Gurugram', state: 'Haryana', country: 'India' },
    { city: 'Gangtok', state: 'Sikkim', country: 'India' },
    { city: 'Jaipur', state: 'Rajasthan', country: 'India' }
  ];

  columnDefs3 = [
    { headerName: 'Department Code', field: 'departmentCode', sortable: true, filter: true, editable:true, width: 120 },
    { headerName: 'Department Name', field: 'department', sortable: true, filter: true, editable:true, width: 120 },
    { headerName: '', field: '', width: 600 }
  ];

  rowData3 = [
    { departmentCode:'001', department: 'IT' },
    { departmentCode:'002', department: 'Finance' },
    { departmentCode:'003', department: 'AX' },
    { departmentCode:'004', department: 'Medical' },
    { departmentCode:'005', department: 'Accounts' }
  ];

  columnDefs4 = [
    { headerName: 'Department', field: 'department', sortable: true, filter: true, editable:true, width: 120 },
    { headerName: 'Designation', field: 'designation', sortable: true, filter: true, editable:true, width: 120 },
    { headerName: '', field: '', width: 600 }
   ];

  rowData4 = [
    { department: 'IT', designation:'Software Developer' },
    { department: 'Finance', designation:'Software Developer' },
    { department: 'AX', designation:'AX Technical' },
    { department: 'Medical', designation:'Doctor' },
    { department: 'Accounts', designation:'Accountant' }
  ];

  columnDefs5 = [
    { headerName: 'Language', field: 'language', sortable: true, filter: true, editable:true, width: 120 },
    { headerName: 'Language Code', field: 'languageCode', sortable: true, editable:true, filter: true, width: 120 },
    { headerName: '', field: '', width: 600 }
   ];

  rowData5 = [
    { language: 'English', languageCode: '001' },
    { language: 'Hindi', languageCode: '002' },
    { language: 'Urdu', languageCode: '003' },
    { language: 'Arabic', languageCode: '004' },
    { language: 'French', languageCode: '005' }
  ];
  constructor() { }

  public show: boolean = false;
  public hide: boolean = true;
  public buttonName: any = 'Add New';

  ngOnInit() {
  }

}
