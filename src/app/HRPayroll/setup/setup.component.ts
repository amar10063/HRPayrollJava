import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-setup',
  templateUrl: './setup.component.html',
  styleUrls: ['./setup.component.css']
})
export class SetupComponent implements OnInit {
  
  columnDefs1 = [
    { headerName: "All", checkboxSelection: true, field: "all", width: 200 },
    { headerName: 'Sr No.', field: 'serial', width: 250 },
    { headerName: 'Department Code', field: 'departmentCode', sortable: true, filter: true, editable:true, width: 270 },
    { headerName: 'Department Name', field: 'department', sortable: true, filter: true, editable:true, width: 270 }
     ];

  rowData1 = [
    { all: " ", checkboxSelection: true, serial: '1', departmentCode:'001', department: 'IT' },
    { all: " ", checkboxSelection: true, serial: '2', departmentCode:'002', department: 'Finance' },
    { all: " ", checkboxSelection: true, serial: '3', departmentCode:'003', department: 'AX' },
    { all: " ", checkboxSelection: true, serial: '4', departmentCode:'004', department: 'Medical' },
    { all: " ", checkboxSelection: true, serial: '5', departmentCode:'005', department: 'Accounts' }
  ];

  columnDefs2 = [
    { headerName: "All", checkboxSelection: true, field: "all", width: 200 },
    { headerName: 'Sr No.', field: 'serial', width: 250 },    
    { headerName: 'Department', field: 'department', sortable: true, filter: true, editable:true, width: 270 },
    { headerName: 'Designation', field: 'designation', sortable: true, filter: true, editable:true, width: 270 }
     ];

  rowData2 = [
    { all: " ", checkboxSelection: true, serial: '1', department: 'IT', designation:'Software Developer' },
    { all: " ", checkboxSelection: true, serial: '2', department: 'Finance', designation:'Software Developer' },
    { all: " ", checkboxSelection: true, serial: '3', department: 'AX', designation:'AX Technical' },
    { all: " ", checkboxSelection: true, serial: '4', department: 'Medical', designation:'Doctor' },
    { all: " ", checkboxSelection: true, serial: '5', department: 'Accounts', designation:'Accountant' }
  ];
  columnDefs3 = [
    { headerName: "All", checkboxSelection: true, field: "all", width: 200 },
    { headerName: 'Sr No.', field: 'serial', width: 250 },    
    { headerName: 'Earnings', field: 'earnings', sortable: true, filter: true, editable:true, width: 330 }
    ];

  rowData3 = [
    { all: " ", checkboxSelection: true, serial: '1', earnings: ' ' },
    { all: " ", checkboxSelection: true, serial: '2', earnings: ' ' },
    { all: " ", checkboxSelection: true, serial: '3', earnings: ' ' },
    { all: " ", checkboxSelection: true, serial: '4', earnings: ' ' },
    { all: " ", checkboxSelection: true, serial: '5', earnings: ' ' }
  ];

  columnDefs4 = [
    { headerName: "All", checkboxSelection: true, field: "all", width: 200 },
    { headerName: 'Sr No.', field: 'serial', width: 250 },    
    { headerName: 'Deductions', field: 'deductions', sortable: true, filter: true, editable:true, width: 330 }
    ];

  rowData4 = [
    { all: " ", checkboxSelection: true, serial: '1', deductions: ' ' },
    { all: " ", checkboxSelection: true, serial: '2', deductions: ' ' },
    { all: " ", checkboxSelection: true, serial: '3', deductions: ' ' },
    { all: " ", checkboxSelection: true, serial: '4', deductions: ' ' },
    { all: " ", checkboxSelection: true, serial: '5', deductions: ' ' }
  ];
  columnDefs5 = [
    { headerName: "All", checkboxSelection: true, field: "all", width: 200 },
    { headerName: 'Sr No.', field: 'serial', width: 250 },    
    { headerName: 'Deductions', field: 'deductions', sortable: true, filter: true, editable:true, width: 330 }
    ];

  rowData5 = [
    { all: " ", checkboxSelection: true, serial: '1', deductions: ' ' },
    { all: " ", checkboxSelection: true, serial: '2', deductions: ' ' },
    { all: " ", checkboxSelection: true, serial: '3', deductions: ' ' },
    { all: " ", checkboxSelection: true, serial: '4', deductions: ' ' },
    { all: " ", checkboxSelection: true, serial: '5', deductions: ' ' }
  ];
  constructor() { }

  public show: boolean = false;
  public hide: boolean = true;
  public buttonName: any = 'Add New';

  ngOnInit() {
  }

}

