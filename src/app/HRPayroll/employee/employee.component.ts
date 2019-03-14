import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  columnDefs = [
    { headerName: "All", checkboxSelection: true, field: "all", width: 80 },
    { headerName: 'Employee Image', field: 'EmpImage', sortable: true, filter: true, width: 150 },
    { headerName: 'Employee Name', field: 'EmpName', sortable: true, filter: true, width: 150 },
    { headerName: 'Designation', field: 'Designation', sortable: true, filter: true, width: 100 },
    { headerName: 'Department', field: 'Department', sortable: true, filter: true, width: 120 },
    { headerName: 'Active Employee', field: 'ActiveEmp', sortable: true, filter: true, width: 150 },
    { headerName: 'On Leave', field: 'OnLeave', sortable: true, filter: true, width: 120 },
    { headerName: 'Leave From', field: 'LeaveFrom', sortable: true, filter: true, width: 120 },
    { headerName: 'Leave To', field: 'LeaveTo', sortable: true, filter: true, width: 120 },
    { headerName: 'Contact No.', field: 'ContactNo', sortable: true, filter: true, width: 120 },
    { headerName: 'Email ID', field: 'EmailID', sortable: true, filter: true, width: 120 },
    { headerName: 'Date of Joining', field: 'JoiningDate', sortable: true, filter: true, width: 120 },
    { headerName: 'Reporting Heirarchy', field: 'Heirarchy', sortable: true, filter: true, width: 120 },
    { headerName: 'Send Message', field: 'SendMessage', sortable: true, filter: true, width: 120 }

  ];

  rowData = [
    { all: " ", checkboxSelection: true, EmpImage: 'Amar Singh', EmpName: 'Fateh Singh', Designation: 'Developer', Department: 'IT', OnLeave: 'Rahul', LeaveFrom: '05/03/2019', LeaveTo: '10/03/2019', ContactNo: '8459267584', EmailID: 'abc@gmail.com', JoiningDate:'12/04/2019', Heirarchy: 'ggg', SendMessage: 'gggg'},
    { all: " ", checkboxSelection: true, EmpImage: 'Amar Singh', EmpName: 'Fateh Singh', Designation: 'Developer', Department: 'IT', OnLeave: 'Rahul', LeaveFrom: '05/03/2019', LeaveTo: '10/03/2019', ContactNo: '8459267584', EmailID: 'abc@gmail.com', JoiningDate:'12/04/2019', Heirarchy: 'gh', SendMessage: 'hh'},
    { all: " ", checkboxSelection: true, EmpImage: 'Amar Singh', EmpName: 'Fateh Singh', Designation: 'Developer', Department: 'IT', OnLeave: 'Rahul', LeaveFrom: '05/03/2019', LeaveTo: '10/03/2019', ContactNo: '8459267584', EmailID: 'abc@gmail.com', JoiningDate:'12/04/2019', Heirarchy: '5t', SendMessage: 'yy'},
    { all: " ", checkboxSelection: true, EmpImage: 'Amar Singh', EmpName: 'Fateh Singh', Designation: 'Developer', Department: 'IT', OnLeave: 'Rahul', LeaveFrom: '05/03/2019', LeaveTo: '10/03/2019', ContactNo: '8459267584', EmailID: 'abc@gmail.com', JoiningDate:'12/04/2019', Heirarchy: 'yy', SendMessage: 'yy'},
    { all: " ", checkboxSelection: true, EmpImage: 'Amar Singh', EmpName: 'Fateh Singh', Designation: 'Developer', Department: 'IT', OnLeave: 'Rahul', LeaveFrom: '05/03/2019', LeaveTo: '10/03/2019', ContactNo: '8459267584', EmailID: 'abc@gmail.com', JoiningDate:'12/04/2019', Heirarchy: 'yy', SendMessage: '55'},
  ];

  constructor() { }
  ngOnInit() {
  }

}
