import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  columnDefs = [
    { headerName: "All", checkboxSelection: true, field: "all", width: 60 },
    { headerName: 'Employee Image', field: 'EmpImage', template: "<img src='../assets/images/profile-img-2.png' />", width: 100 },
    { headerName: 'Employee Name', field: 'EmpName', sortable: true, filter: true, width: 100 },
    { headerName: 'Designation', field: 'Designation', sortable: true, filter: true, width: 100 },
    { headerName: 'Department', field: 'Department', sortable: true, filter: true, width: 120 },
    { headerName: 'Active Employee', field: 'ActiveEmp', sortable: true, filter: true, width: 150 },
    { headerName: 'On Leave', field: 'OnLeave', sortable: true, filter: true, width: 120 },
    { headerName: 'Leave From', field: 'LeaveFrom', sortable: true, filter: true, width: 120 },
    { headerName: 'Leave To', field: 'LeaveTo', sortable: true, filter: true, width: 120 },
    { headerName: 'Contact No.', field: 'ContactNo', sortable: true, filter: true, width: 120 },
    { headerName: 'Email ID', field: 'EmailID', sortable: true, filter: true, width: 120 },
    { headerName: 'Date of Joining', field: 'JoiningDate', sortable: true, filter: true, width: 120 },
    {
      headerName: 'Reporting Heirarchy', field: 'Heirarchy', sortable: true, filter: true, width: 120,
      cellRenderer: function (params) {
        return '<a href="#" target="_blank" style="text-decoration:underline; color:#3e3e3e">' + params.value + '</a>'
      }
    },
    {
      headerName: 'Send Message', field: 'SendMessage', sortable: true, filter: true, width: 100, cellRenderer: function (params) {
        return '<a href="#" target="_blank" style="text-decoration:underline; color:#3e3e3e">' + params.value + '</a>'
      }
    }

  ];

  rowData = [
    { all: " ", checkboxSelection: true, EmpImage: '', EmpName: 'Fateh Singh', Designation: 'Developer', Department: 'IT', ActiveEmp: 'Active', OnLeave: 'Yes', LeaveFrom: '05/03/2019', LeaveTo: '10/03/2019', ContactNo: '8459267584', EmailID: 'abc@gmail.com', JoiningDate: '12/04/2019', Heirarchy: 'Reporting Heirarchy', SendMessage: 'Send' },
    { all: " ", checkboxSelection: true, EmpImage: '', EmpName: 'Fateh Singh', Designation: 'Developer', Department: 'IT', ActiveEmp: 'Inactive', OnLeave: 'No', LeaveFrom: '05/03/2019', LeaveTo: '10/03/2019', ContactNo: '8459267584', EmailID: 'abc@gmail.com', JoiningDate: '12/04/2019', Heirarchy: 'Reporting Heirarchy', SendMessage: 'Send' },
    { all: " ", checkboxSelection: true, EmpImage: '', EmpName: 'Fateh Singh', Designation: 'Developer', Department: 'IT', ActiveEmp: 'Active', OnLeave: 'Yes', LeaveFrom: '05/03/2019', LeaveTo: '10/03/2019', ContactNo: '8459267584', EmailID: 'abc@gmail.com', JoiningDate: '12/04/2019', Heirarchy: 'Reporting Heirarchy', SendMessage: 'Send' },
    { all: " ", checkboxSelection: true, EmpImage: '', EmpName: 'Fateh Singh', Designation: 'Developer', Department: 'IT', ActiveEmp: 'Active', OnLeave: 'Yes', LeaveFrom: '05/03/2019', LeaveTo: '10/03/2019', ContactNo: '8459267584', EmailID: 'abc@gmail.com', JoiningDate: '12/04/2019', Heirarchy: 'Reporting Heirarchy', SendMessage: 'Send' },
    { all: " ", checkboxSelection: true, EmpImage: '', EmpName: 'Fateh Singh', Designation: 'Developer', Department: 'IT', ActiveEmp: 'Inactive', OnLeave: 'No', LeaveFrom: '05/03/2019', LeaveTo: '10/03/2019', ContactNo: '8459267584', EmailID: 'abc@gmail.com', JoiningDate: '12/04/2019', Heirarchy: 'Reporting Heirarchy', SendMessage: 'Send' },
    { all: " ", checkboxSelection: true, EmpImage: '', EmpName: 'Fateh Singh', Designation: 'Developer', Department: 'IT', ActiveEmp: 'Active', OnLeave: 'Yes', LeaveFrom: '05/03/2019', LeaveTo: '10/03/2019', ContactNo: '8459267584', EmailID: 'abc@gmail.com', JoiningDate: '12/04/2019', Heirarchy: 'Reporting Heirarchy', SendMessage: 'Send' },
    { all: " ", checkboxSelection: true, EmpImage: '', EmpName: 'Fateh Singh', Designation: 'Developer', Department: 'IT', ActiveEmp: 'Inactive', OnLeave: 'No', LeaveFrom: '05/03/2019', LeaveTo: '10/03/2019', ContactNo: '8459267584', EmailID: 'abc@gmail.com', JoiningDate: '12/04/2019', Heirarchy: 'Reporting Heirarchy', SendMessage: 'Send' },
  ];

  constructor() { }

  public show: boolean = false;
  public hide: boolean = true;
  public buttonName: any = 'Add New';

  ngOnInit() { }
  true

  showhide() {
    this.show = true;
    this.hide = false;
    //alert(this.hide);
  }
  showhide2() {
    this.show = false;
    this.hide = true;
   // alert(this.hide);
  }
}
