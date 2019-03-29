import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-organization',
  templateUrl: './organization.component.html',
  styleUrls: ['./organization.component.css']
})
export class OrganizationComponent implements OnInit {
  columnDefs = [
    { headerName: 'Location Code', field: 'locationCode', sortable: true, filter: true, editable:true, width: 120 },
    { headerName: 'Location', field: 'location', sortable: true, filter: true, editable:true, width: 120 },
    { headerName: 'Description', field: 'description', sortable: true, filter: true, width: 130 },
    { headerName: '', field: '', width: 467 }
   ];

  rowData = [
    { locationCode: '001', location:'Noida', description:'Noida Location'},
    { locationCode: '002', location:'Gurgaon', description:'Gurgaon Location'},
    { locationCode: '003', location:'Faridabad', description:'Faridabad Location'},
    { locationCode: '004', location:'Delhi', description:'Delhi Location'},
    { locationCode: '005', location:'Ghaziabad', description:'Ghaziabad Location'}
  ];

  columnDefs1 = [
    { headerName: 'Location', field: 'location', sortable: true, filter: true, editable:true, width: 120 },
    { headerName: 'Department Code', field: 'departmentCode', sortable: true, editable:true, filter: true, width: 140 },
    { headerName: 'Department', field: 'department', sortable: true, editable:true, filter: true, width: 120 },
    { headerName: 'Description', field: 'description', sortable: true, filter: true, width: 130 },
    { headerName: '', field: '', width: 330 }
  ];

  rowData1 = [
    { location: 'Noida', departmentCode: '001', department: 'IT', description:'IT description' },
    { location: 'Gurgaon', departmentCode: '002', department: 'Accounts', description:'Accounts description' },
    { location: 'Faridabad', departmentCode: '003', department: 'Finance', description:'Finance description' },
    { location: 'Delhi', departmentCode: '004', department: 'AX', description:'AX description' },
    { location: 'Ghaziabad', departmentCode: '005', department: 'Management', description:'Management description' }
  ];

  columnDefs2 = [
    { headerName: 'Location', field: 'location', sortable: true, filter: true, editable:true, width: 120 },
    { headerName: 'Department', field: 'department', sortable: true, editable:true, filter: true, width: 120 },
    { headerName: 'Designation Code', field: 'designationCode', sortable: true, editable:true, filter: true, width: 140 },
    { headerName: 'Designation', field: 'designation', sortable: true, editable:true, filter: true, width: 140 },
    { headerName: 'Description', field: 'description', sortable: true, filter: true, width: 130 },
    { headerName: '', field: '', width: 180 }
  ];

  rowData2 = [
    { location: 'Noida', department: 'IT', designationCode: '001', designation:'Software Developer', description:'IT description' },
    { location: 'Gurgaon', department: 'Accounts', designationCode: '002', designation:'Accountant', description:'Accounts description' },
    { location: 'Faridabad', department: 'Finance', designationCode: '003', designation:'CA', description:'Finance description' },
    { location: 'Delhi', department: 'AX', designationCode: '004', designation:'Technical', description:'AX description' },
    { location: 'Ghaziabad', department: 'Management', designationCode: '005', designation:'Manager', description:'Management description' }
  
  ];

  
  constructor() { }

  public show: boolean = false;
  public hide: boolean = true;
  public buttonName: any = 'Add New';

  ngOnInit() {
  }

}