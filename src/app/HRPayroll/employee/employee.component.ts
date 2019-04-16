import { GridApi, ColumnApi, CellComp } from 'ag-grid-community';
import { HighSchoolBody } from '../../WebServices/WebServiceBody/EducationBody/HighSchoolBody';
import { HighSchoolResponse } from '../../WebServices/WebServiceResponse/EducationResponse/HighSchoolResponse';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { from } from 'rxjs';
import { AllWeb } from 'src/app/WebServices/AllWeb.service';
import { GetAllDepartmentBody } from './EmployeeApiResponse/GetAllDepartmentBody';
import { GetAllDesignationBody } from './EmployeeApiResponse/GetAllDesignationBody';
import { GetAllLocationResponse } from './EmployeeApiResponse/GetAllLocationResponse';
import { GetLocationBody } from 'src/app/SystemAdministration/organization/GetLocationBody';
import { GetSchoolDataResponse } from '../Education/GetSchoolDataResponse';
import { GetSchoolModel } from '../Education/GetSchoolModel';
import { BasicDetailBody } from 'src/app/WebServices/WebServiceBody/EmployeeBasicDetail/BasicDetailBody';
import { DatePipe } from '@angular/common';
import { UniversalResponse } from 'src/app/WebServices/WebServiceResponse/UniversalResponse';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  basicDetailsForm: FormGroup;
  titles = ['Mr', 'Miss', 'Mrs'];
  highSchoolResponse: HighSchoolResponse;
  addressApi: GridApi;
  addressColumnApi: ColumnApi;
  rowSelection: string;
  submitted = false;
  designationResponse: GetAllLocationResponse[];
  selectedDesignationIndex: number;
  url ;

  columnDefs = [
    { headerName: 'Employee Image', field: 'EmpImage', template: '<img src="../assets/images/profile-img-2.png" />', width: 120 },
    { headerName: 'Employee Name', field: 'EmpName', sortable: true, filter: true, editable: true, width: 130 },
    { headerName: 'Designation', field: 'Designation', sortable: true, filter: true, editable: true, width: 110 },
    { headerName: 'Department', field: 'Department', sortable: true, filter: true, editable: true, width: 100 },
    { headerName: 'Active Employee', field: 'ActiveEmp', sortable: true, filter: true, editable: true, width: 120 },
    { headerName: 'On Leave', field: 'OnLeave', sortable: true, filter: true, editable: true, width: 90 },
    { headerName: 'Leave From', field: 'LeaveFrom', sortable: true, filter: true, editable: true, width: 100 },
    { headerName: 'Leave To', field: 'LeaveTo', sortable: true, filter: true, editable: true, width: 90 },
    { headerName: 'Contact No.', field: 'ContactNo', sortable: true, filter: true, editable: true, width: 120 },
    { headerName: 'Email ID', field: 'EmailID', sortable: true, filter: true, editable: true, width: 120 },
    { headerName: 'Date of Joining', field: 'JoiningDate', sortable: true, filter: true, editable: true, width: 120 },
    {
      headerName: 'Reporting Heirarchy', field: 'Heirarchy', sortable: true, filter: true, width: 150,
      // cellRenderer: function (params) {
      //   return '<a href='#' target='_blank' style='text-decoration:underline; color:#3e3e3e'>' + params.value + '</a>'
      // }
    },
    {
      headerName: 'Send Message', field: 'SendMessage', sortable: true, filter: true, width: 110
      //cellRenderer: function (params) {
      //   return '<a href='#' target='_blank' style='text-decoration:underline; color:#3e3e3e'>' + params.value + '</a>'
      // }
    }
  ];

  rowData = [];

  columnDefs1 = [


    { headerName: 'Status', field: 'status', sortable: true, filter: true, editable: true, width: 100 },
    { headerName: 'Address', field: 'address', editable: true, width: 120 },
    { headerName: 'City', field: 'city', sortable: true, filter: true, editable: true, width: 80 },
    { headerName: 'State', field: 'state', sortable: true, filter: true, editable: true, width: 80 },
    { headerName: 'Country', field: 'country', sortable: true, filter: true, editable: true, width: 80 },
    { headerName: 'Postal Code', field: 'pin', sortable: true, filter: true, editable: true, width: 90 },
    { headerName: 'Contact No.', field: 'ContactNo', sortable: true, filter: true, editable: true, width: 90 },
    { headerName: 'Email ID', field: 'EmailID', sortable: true, filter: true, editable: true, width: 120 },
    { headerName: 'Emergency Contact Person', field: 'EmergencyContactPerson', sortable: true, filter: true, editable: true, width: 120 },
    { headerName: 'Emergency Contact No', field: 'EmergencyContactNo', sortable: true, filter: true, editable: true, width: 120 },


  ];

  rowData1 = [
    { address: 'E210, Sector63', city: 'Noida', state: 'UP', country: 'India', pin: '201301', status: 'Permanent', ContactNo: '0987654321', EmailID: 'abcd@gmail.com', EmergencyContactPerson: 'Amar Singh', EmergencyContactNo: '8459267584' },
    { address: 'H221, Sector63', city: 'Noida', state: 'UP', country: 'India', pin: '201301', status: 'Communication', ContactNo: '9876543210', EmailID: 'bcd@gmail.com', EmergencyContactPerson: 'Fateh Singh', EmergencyContactNo: '8459267584' },
    { address: 'E210, Sector63', city: 'Noida', state: 'UP', country: 'India', pin: '201301', status: 'Current', ContactNo: '0987654321', EmailID: 'abc@gmail.com', EmergencyContactPerson: 'Himanshu', EmergencyContactNo: '8459267584' },
    { address: 'H221, Sector63', city: 'Noida', state: 'UP', country: 'India', pin: '201301', status: 'Permanent', ContactNo: '0987654321', EmailID: 'abcd@gmail.com', EmergencyContactPerson: 'Amar Singh', EmergencyContactNo: '8459267584' },
    { address: 'E210, Sector63', city: 'Noida', state: 'UP', country: 'India', pin: '201301', status: 'Communication', ContactNo: '0987654321', EmailID: 'abc@gmail.com', EmergencyContactPerson: 'Amar Singh', EmergencyContactNo: '8459267584' },
    { address: 'H221, Sector63', city: 'Noida', state: 'UP', country: 'India', pin: '201301', status: 'Current', ContactNo: '8765432100', EmailID: 'abd@gmail.com9', EmergencyContactPerson: 'Amar Singh', EmergencyContactNo: '8459267584' },
    { address: 'E210, Sector63', city: 'Noida', state: 'UP', country: 'India', pin: '201301', status: 'Communication', ContactNo: '0987654321', EmailID: 'acd@gmail.com', EmergencyContactPerson: 'Amar Singh', EmergencyContactNo: '8459267584' },
  ];

  columnDefs2 = [


    { headerName: 'Class', field: 'className', width: 100,editable: true,
    cellStyle: function (params) {
      if (params.value === '') {
        // bordercolor: 'red'
        // alert("Enter Class Name");

          return { outline: '1px solid red' };

          //color: 'red', backgroundColor: 'green',
        } else {
          return { outline: 'white' };
        }
      }

    }
   },
    { headerName: 'Board', field: 'boardName', sortable: true, filter: true, width: 100,editable: true,
    cellStyle: function (params) {
      if (params.value === '') {
        // bordercolor: 'red'
        // alert("Enter Board Name");

          return { outline: '1px solid red' };

          //color: 'red', backgroundColor: 'green',
        } else {
          return { outline: 'white' };
        }
      }

    }
   },
    { headerName: 'School Name', field: 'schoolName', sortable: true, filter: true, width: 150, editable: true,
    cellStyle: function (params) {
      if (params.value === '') {
        // bordercolor: 'red'
        // alert("Enter School Name");

          return { outline: '1px solid red' };

          //color: 'red', backgroundColor: 'green',
        } else {
          return { outline: 'white' };
        }
      }
    },

    {
      headerName: 'Start Date', field: 'startDate', sortable: true, filter: true, width: 120, editable: true,
      cellStyle: function (params) {
        if (params.value === '') {
          // bordercolor: 'red'
          // alert("Enter Start Date");

          return { outline: '1px solid red' };

          //color: 'red', backgroundColor: 'green',
        } else {
          return { outline: 'white' };
        }
      }
    },
    {
      headerName: 'End Date', field: 'endDate', sortable: true, filter: true, width: 120, editable: true,
      cellStyle: function (params) {
        if (params.value === '') {
          // bordercolor: 'red'
          // alert("Enter End Date");

          return { outline: '1px solid red' };

          //color: 'red', backgroundColor: 'green',
        } else {
          return { outline: 'white' };
        }
      }

    }
   }, 
    
    { headerName: 'Percentage', field: 'percentage', sortable: true, filter: true, width: 100,editable: true,
    cellStyle: function (params) {
      if (params.value === '') {
        // bordercolor: 'red'
        // alert("Enter Percentage");

    {
      headerName: 'Percentage', field: 'percentage', sortable: true, filter: true, width: 150, editable: true,
      cellStyle: function (params) {
        if (params.value === '') {
          // bordercolor: 'red'
          // alert("Enter Percentage");

          return { outline: '1px solid red' };


          //color: 'red', backgroundColor: 'green',
        } else {
          return { outline: 'white' };
        }
      }

    }
   },
   { headerName: '', field: '', width:310, }
  ];

  rowData2 = [
    // { Class: '10', Board: 'CBSE', SchoolName: 'DPSG', StartDate: '10-03-2010', EndDate: '10-03-2011', percentage: '74 %' },
    // { Class: '12', Board: 'CBSE', SchoolName: 'DPSG', StartDate: '10-03-2012', EndDate: '10-03-2013', percentage: '72 %' },
  ];

  // rowData2 = [];


  columnDefs4 = [
    { headerName: 'Degree', field: 'Degree', width: 100 },
    { headerName: 'Specialization', field: 'specialization', sortable: true, filter: true, width: 120 },
    { headerName: 'University', field: 'university', sortable: true, filter: true, editable: true, width: 120 },
    { headerName: 'Start Date', field: 'StartDate', sortable: true, filter: true, editable: true, width: 100 },
    { headerName: 'End Date', field: 'EndDate', sortable: true, filter: true, editable: true, width: 100 },
    { headerName: 'Percentage', field: 'percentage', sortable: true, filter: true, editable: true, width: 120 },
  
    { headerName: '', field: '', width:340, }

  ];

  rowData4 = [
    { Degree: 'BCA', specialization: 'BCA', university: 'CCSU', StartDate: '10-04-2013', EndDate: '10-04-2016', percentage: '78 %' }

  ];

  columnDefs5 = [
    { headerName: 'Degree', field: 'Degree', editable: true, width: 100 },
    { headerName: 'Specialization', field: 'specialization', sortable: true, filter: true, editable: true, width: 120 },
    { headerName: 'University', field: 'university', sortable: true, filter: true, editable: true, width: 120 },
    { headerName: 'Start Date', field: 'StartDate', sortable: true, filter: true, editable: true, width: 100 },
    { headerName: 'End Date', field: 'EndDate', sortable: true, filter: true, editable: true, width: 100 },
    { headerName: 'Percentage', field: 'percentage', sortable: true, filter: true, editable: true, width: 120 },
    { headerName: '', field: '', width:340, }
  ];

  rowData5 = [
    { Degree: 'MCA', specialization: 'MCA', university: 'AKTU', StartDate: '10-04-2016', EndDate: '10-04-2018', percentage: '76 %' },

  ];

  columnDefs6 = [
    { headerName: 'Degree', field: 'Degree', width: 100 },
    { headerName: 'Specialization', field: 'specialization', sortable: true, filter: true, editable: true, width: 120 },
    { headerName: 'University', field: 'university', sortable: true, filter: true, editable: true, width: 120 },
    { headerName: 'Start Date', field: 'StartDate', sortable: true, filter: true, editable: true, width: 100 },
    { headerName: 'End Date', field: 'EndDate', sortable: true, filter: true, editable: true, width: 100 },
    { headerName: 'Percentage', field: 'percentage', sortable: true, filter: true, editable: true, width: 120 },
    { headerName: '', field: '', width:340, }
  ];

  rowData6 = [
    { Degree: 'P.hd', specialization: 'computer science', university: 'AKTU', StartDate: '10-04-2016', EndDate: '10-04-2018', percentage: '76 %' },

  ];

  columnDefs7 = [

    { headerName: 'Institute', field: 'Institute', editable: true, width: 120 },
    { headerName: 'Course', field: 'Course', sortable: true, filter: true, editable: true, width: 120},
    { headerName: 'Start Date', field: 'StartDate', sortable: true, filter: true, editable: true, width: 120 },
    { headerName: 'End Date', field: 'EndDate', sortable: true, filter: true, editable: true, width: 120},
    { headerName: '', field: '', width:520, }

  ];

  rowData7 = [
    { Institute: 'Ducat', Course: 'Ruby', StartDate: '10-01-2018', EndDate: '10-06-2018' },

  ];


  columnDefs8 = [


    { headerName: 'Company Name', field: 'CompanyName', editable: true, width: 120 },
    { headerName: 'Designation', field: 'Designation', sortable: true, filter: true, editable: true, width: 120 },
    { headerName: 'Department', field: 'Department', sortable: true, filter: true, editable: true, width: 120 },
    { headerName: 'Joining Date', field: 'JoiningDate', sortable: true, filter: true, editable: true, width: 120 },
    { headerName: 'Exit Date', field: 'ExitDate', sortable: true, filter: true, editable: true, width: 120 },
    { headerName: 'Experience', field: 'Experience', sortable: true, filter: true, editable: true, width: 120 },
    { headerName: 'Location', field: 'Location', sortable: true, filter: true, editable: true, width: 120 },
    { headerName: '', field: '', width:160, }


  ];

  rowData8 = [
    { CompanyName: 'YoekiSoft Pvt Ltd', Designation: 'UI Developer', Department: 'Software Developer', JoiningDate: '01-05-2018', ExitDate: '01-09-2019', Experience: '1 year 4 months', Location: 'noida' },

  ];

  columnDefs9 = [


    { headerName: 'Certificate Name', field: 'CertificateName', editable: true, width: 120 },
    { headerName: 'Start Date', field: 'StartDate', sortable: true, filter: true, editable: true, width: 120 },
    { headerName: 'End Date', field: 'EndDate', sortable: true, filter: true, editable: true, width: 120 },
    { headerName: '', field: '', width:640, }





  ];

  rowData9 = [
    { CertificateName: 'CCNA', StartDate: '10-05-2018', EndDate: '10-10-2018' },

  ];

  columnDefs10 = [


    { headerName: 'Type of Account', field: 'TypeofAccount', editable: true, width: 120 },

    { headerName: 'Account Holder Name', field: 'AccountHolderName', sortable: true, filter: true, editable: true, width: 120 },
    { headerName: 'Account Number', field: 'AccountNumber', sortable: true, filter: true, editable: true, width: 120 },
    { headerName: 'IFSC', field: 'IFSC', sortable: true, filter: true, editable: true, width: 120 },
    { headerName: 'Branch Name', field: 'BranchName', sortable: true, filter: true, editable: true, width: 120 },
    { headerName: 'Primary', field: 'Primary', sortable: true, filter: true, editable: true, width: 120 },

    { headerName: '', field: '', width:280, }
  ];

  rowData10 = [
    { TypeofAccount: 'Salary Account', AccountHolderName: 'Abhishek vats', AccountNumber: '09876543210', IFSC: 'HDFC000003', BranchName: 'Ghaziabad', Primary: 'yes' },
    { TypeofAccount: 'PF Account', AccountHolderName: 'Abhishek vats', AccountNumber: '09876543210', IFSC: 'HDFC000003', BranchName: 'Ghaziabad', Primary: 'yes' },
    { TypeofAccount: 'Gratuity Account', AccountHolderName: 'Abhishek vats', AccountNumber: '09876543210', IFSC: 'HDFC000003', BranchName: 'Ghaziabad', Primary: 'yes' },

  ];

  columnDefs11 = [


    { headerName: 'Passport No', field: 'PassportNo', sortable: true, filter: true, editable: true, width: 110 },
    { headerName: 'Expiry Date', field: 'ExpiryDate', sortable: true, filter: true, editable: true, width: 110 },
    { headerName: 'Upload Document', field: 'UploadDocument', sortable: true, filter: true, editable: true, width: 150 },
    { headerName: 'Time Duration', field: 'TimetoExpire', sortable: true, filter: true, editable: true, width: 150 },
    { headerName: '', field: '', width:480, }
  ];

  rowData11 = [
    { PassportNo: 'PAS96ER0001', ExpiryDate: '28-02-1996', UploadDocument: '', TimetoExpire: '1 year 3 months' },

  ];

  columnDefs12 = [


    { headerName: 'Country', field: 'Country', sortable: true, filter: true, editable: true, width: 120 },
    { headerName: 'Number Of Visit', field: 'NumberOfVisit', sortable: true, filter: true, editable: true, width: 120 },
    { headerName: 'Expiry Date', field: 'ExpiryDate', sortable: true, filter: true, editable: true, width: 120 },
    { headerName: 'Upload Document', field: 'UploadDocument', sortable: true, filter: true, editable: true, width:150 },
    { headerName: 'Time to Expire', field: 'TimetoExpire', sortable: true, filter: true, editable: true, width: 120 },
    { headerName: '', field: '', width:370, }
  ];

  rowData12 = [
    { Country: 'Canada', NumberOfVisit: 'Single Visit', ExpiryDate: '28-02-1996', UploadDocument: '', TimetoExpire: '1 year 3 months' },

  ];

  columnDefs13 = [
    { headerName: 'Documents', field: 'Documents', editable: true, width: 200 },
    { headerName: 'Curriculum Vitae', field: 'CurriculumVitae', sortable: true, filter: true, editable: true, width: 200 },
    { headerName: 'Expiry Date', field: 'ExpiryDate', sortable: true, filter: true, editable: true, width: 200 },
    { headerName: 'Upload Document', field: 'UploadDocument', sortable: true, filter: true, editable: true, width: 200 },
    { headerName: 'Time to Expire', field: 'TimetoExpire', sortable: true, filter: true, editable: true, width: 200 },

  ];

  rowData13 = [
    { Documents: 'Curriculum Vitae', CurriculumVitae: 'CV96ER0001', ExpiryDate: '28-02-1996', UploadDocument: '', TimetoExpire: '1 year 3 months' },

  ];

  columnDefs14 = [


    { headerName: 'Driving Licence Number', field: 'DrivingLicence', sortable: true, filter: true, editable: true, width: 150 },
    { headerName: 'Expiry Date', field: 'ExpiryDate', sortable: true, filter: true, editable: true, width: 120 },
    { headerName: 'Upload Document', field: 'UploadDocument', sortable: true, filter: true, editable: true, width: 150 },
    { headerName: 'Time Duration', field: 'TimetoExpire', sortable: true, filter: true, editable: true, width: 130 },
    { headerName: '', field: '', width:450, }
  ];

  rowData14 = [
    { DrivingLicence: 'DL96ER0001', ExpiryDate: '28-02-1996', UploadDocument: '', TimetoExpire: '1 year 3 months' },

  ];

  columnDefs15 = [


    { headerName: 'Medical Certificate', field: 'MedicalCertificate', sortable: true, filter: true, editable: true, width: 150 },
    { headerName: 'Expiry Date', field: 'ExpiryDate', sortable: true, filter: true, editable: true, width: 120 },
    { headerName: 'Upload Document', field: 'UploadDocument', sortable: true, filter: true, editable: true, width: 150 },
    { headerName: 'Time Duration', field: 'TimeDuration', sortable: true, filter: true, editable: true, width: 130 },
    { headerName: '', field: '', width:450, }
  ];

  rowData15 = [
    { MedicalCertificate: 'MED96ER0001', ExpiryDate: '28-02-1996', UploadDocument: '', TimeDuration: '1 year 3 months' },

  ];

  columnDefs16 = [

    { headerName: 'Class/Degree', field: 'ClassDegree', editable: true, width: 120 },
    { headerName: 'Board/University', field: 'BoardUniversity', sortable: true, filter: true, editable: true, width: 140 },
    { headerName: 'Start Date', field: 'StartDate', sortable: true, filter: true, editable: true, width: 130 },
    { headerName: 'End Date', field: 'EndDate', sortable: true, filter: true, editable: true, width: 130 },
    { headerName: 'Upload Document', field: 'UploadDocument', sortable: true, filter: true, editable: true, width: 150 },
    { headerName: '', field: '', width:330, }
  ];

  rowData16 = [
    { ClassDegree: '10', BoardUniversity: 'CBSE', StartDate: '03-04-2009', EndDate: '03-04-2010', UploadDocument: '' },
    { ClassDegree: '12', BoardUniversity: 'CBSE', StartDate: '03-04-2012', EndDate: '03-04-2013', UploadDocument: '' },
    { ClassDegree: 'BCA', BoardUniversity: 'CCSU', StartDate: '03-04-2013', EndDate: '03-04-2016', UploadDocument: '' },
    { ClassDegree: 'MCA', BoardUniversity: 'AKTU', StartDate: '03-04-2016', EndDate: '03-04-2018', UploadDocument: '' },
  ];
  locationResponse;
  selectedLocationIndex: number;
  selectedDepartmentIndex: number;

  public show: boolean = false;
  public hide: boolean = true;
  public buttonName: any = 'Add New';
  departmentResponse: GetAllLocationResponse[];
  newDate: Date;
  maritalStatus = 'Married';
  employementType = 'Contract';
  selectedFile: ImageSnippet;
  universalStatus: UniversalResponse;



  constructor(private formBuilder: FormBuilder, private countryService: AllWeb) {
    this.rowSelection = 'single';
  }
  age: number;
  api: GridApi;
  columnApi: ColumnApi;
  getSchoolResonseData: GetSchoolDataResponse[];
  today;
  ngOnInit() {
    this.today = new Date().toJSON().split('T')[0];
    this.today = new DatePipe('en-US').transform(this.today, 'dd/MM/yyyy');
    this.basicDetailsForm = this.formBuilder.group({
      empCode: ['', [Validators.required]],
      firstName: ['', [Validators.required]],
      middleName: [''],
      dateofBirth: ['', [Validators.required, Validators.max(this.today)]],
      lastName: ['', [Validators.required]],
      designation: ['', [Validators.required]],
      department: ['', [Validators.required]],
      title: ['Mr', [Validators.required,]],
      location: ['', [Validators.required,]]
    });
    this.getLocation(1);
    this.onGetSchoolQualification();
    console.log('this.today ' + this.today);

  }
  onRadioClick(value) {
    this.employementType = value;
    console.log(value);
  }
  onMaritalStatusRadioClick(value) {
    this.maritalStatus = value; console.log(value);
  }
  onAddressGridReady(params) {
    this.addressApi = params.api;
    this.addressColumnApi = params.columnApi;
  }
  onAddAddress() {
    alert('add');
    let res = this.addressApi.updateRowData({ add: [{ address: '', city: '', state: '', country: '', pin: '', status: '', ContactNo: '', EmailID: '', EmergencyContactPerson: '', EmergencyContactNo: '' }] });
    res.add.forEach(function (rowNode) {
      console.log('Added Row Node', rowNode);
    });
  }
  getLocation(UserID: number) {
    var locationBody = new GetLocationBody();
    locationBody.userID = UserID;
    this.countryService.doGetLocation(locationBody)
      .subscribe(
        data => {
          this.locationResponse = data;
          this.selectedLocationIndex = this.locationResponse.length - 1;
        }

      );
  }
  onDepartmentClick() {
    this.getAllDepartment(1, this.locationResponse[this.selectedLocationIndex].id);

  }
  onDesignationClick() {
    this.getAllDesignation('1', this.departmentResponse[this.selectedDepartmentIndex].id);

  }

  updateCalcs(date: number) {
    var today = new Date();
    this.today = new DatePipe('en-US').transform(this.today, 'dd/MM/yyyy');
    console.log(this.today);

    this.newDate = new Date(date);
    var diff = Math.abs(this.newDate.getTime() - today.getTime());
    this.age = (diff / (1000 * 3600 * 24)) / 365.25;
    console.log('diff: ' + this.age);
  }
  public getSelectedLocation(value): void {
    this.getAllDepartment(1, value.target.value);
  }
  public getSelectedDepartment(value): void {
    console.log(value.target.value);
    //  console.log('value:' + value); this.getAllDesignation('1', value.target.value);
  }
  public getSelectedDesignation(value): void {
    // console.log(value.target.value);
    console.log('value:' + value);
  }
  getAllDepartment(UserID: number, LocationID: number) {
    // console.log(UserID, LocationID);
    var departmentBody = new GetAllDepartmentBody();
    departmentBody.userID = UserID;
    departmentBody.LocationID = LocationID;
    this.countryService.getDepartment(departmentBody)
      .subscribe(
        data => {
          this.departmentResponse = data;
          this.selectedDepartmentIndex = this.departmentResponse.length - 1;
        }

      );

  }

  getAllDesignation(UserID: string, DepartmentID: number) {
    var designationBody = new GetAllDesignationBody();
    designationBody.userID = UserID;
    designationBody.DepartmentID = DepartmentID + '';

    this.countryService.getAllDesignation(designationBody)
      .subscribe(
        data => {
          this.designationResponse = data;
          this.selectedDesignationIndex = this.designationResponse.length - 1;
        }
      );

  }

  onSaveClick() {
    this.submitted = true;
    var basicDetailBody = new BasicDetailBody();
    basicDetailBody.Anniversary = '';
    basicDetailBody.E_Code = this.basicDetailsForm.controls.empCode.value;
    basicDetailBody.E_DOB = this.today;
    basicDetailBody.E_Title = this.basicDetailsForm.controls.title.value;
    basicDetailBody.E_Location = this.locationResponse[this.selectedLocationIndex].id + '';
    basicDetailBody.E_Dept = this.locationResponse[this.selectedDepartmentIndex].id + '';
    basicDetailBody.E_Designaton = this.locationResponse[this.selectedDesignationIndex].id;
    basicDetailBody.E_EmployementType = this.employementType;
    basicDetailBody.E_FristName = this.basicDetailsForm.controls.firstName.value;
    if (this.basicDetailsForm.controls.title.value === 'Mr') {
      basicDetailBody.E_Gender = 'Male';
    } else {
      basicDetailBody.E_Gender = 'Female';
    }
    basicDetailBody.E_Image = this.url;
    basicDetailBody.E_LastName = this.basicDetailsForm.controls.lastName.value;
    basicDetailBody.E_MaritalStatus = this.maritalStatus;
    basicDetailBody.E_MiddleName = this.basicDetailsForm.controls.middleName.value;
    basicDetailBody.userID = 1;
    basicDetailBody.UpdatedBy = '1';
    console.log(JSON.stringify(basicDetailBody));
    this.countryService.saveEmployeeBasicDetail(basicDetailBody)
      .subscribe(
        data => {
          this.universalStatus = data;
          if (this.universalStatus.STATUS === 'Success') {
            alert(this.universalStatus.MESSAGE);
          } else {
            alert(this.universalStatus.MESSAGE);
          }
        }
      );

  }
  processFile(event) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]); // read file as data url
      reader.onload = (_event) => { // called once readAsDataURL is completed
        this.url = reader.result;
        console.log(this.url);
      };
    }
  }

  onAddQualification() {
    let res = this.api.updateRowData({ add: [{ class: 'High School' }], addIndex: 0 })
    // res.add.forEach(function (rowNode) {
    //   console.log('Added Row Node', rowNode);
    // });

    // this.api.setFocusedCell(this.countCountry, "countryCode");

    // this.countCountry++;
    // var res = this.api.updateRowData({
    //   add: [{ countryName: '', countryCode: '' }],
    //   addIndex: 0
    // })
  };

  onGridSchoolReady(params) {
    this.api = params.api;
    this.columnApi = params.columnApi;
  }
  onSelectionChanged() {
    const selectedRows = this.api.getSelectedRows();
    let selectedRowsString = '';
    selectedRows.forEach(function (selectedRow, index) {
      if (index !== 0) {
        selectedRowsString += ', ';
      }
      selectedRowsString += selectedRow.athlete;
    });
    document.querySelector('#selectedRows').innerHTML = selectedRowsString;
  }

  onGetSchoolQualification() {
    var getHighSchoolUserId = new GetSchoolModel();
    this.countryService.getHighSchoolData(getHighSchoolUserId)
      .subscribe(
        data => {
          this.getSchoolResonseData = data;
          console.log("key", this.getSchoolResonseData);
          this.rowData2 = this.getSchoolResonseData;
        }
      );
  }

  onPressEducationalEnter(e) {
    const keyPressed = e.event.key;
    if (keyPressed === 'Enter') {
      alert('Do you want to save the data.');
      const highSchool = new HighSchoolBody();
      const selectedNodes = this.api.getSelectedNodes();
      const selectedData = selectedNodes.map(node => node.data);
      var highSchoolResonse: HighSchoolResponse;
      var dataTest: Object;
      selectedData.map(node => dataTest = node as Object);
      highSchool.className = dataTest['className'];
      highSchool.boardName = dataTest['boardName'];
      highSchool.schoolName = dataTest['schoolName'];
      highSchool.percentage = dataTest['percentage'];
      highSchool.endDate = dataTest['endDate'];
      highSchool.startDate = dataTest['startDate'];
      if (dataTest['className'] === '') {
        alert("Enter Class");
      } else if (dataTest['boardName'] === '') {
        alert("Enter Board");
      } else if (dataTest['schoolName'] === '') {
        alert("Enter School Name");
      } else if (dataTest['startDate'] === '') {
        alert("Enter Start Date");
      } else if (dataTest['endDate'] === '') {
        alert("Enter End Date");
      } else if (dataTest['percentage'] === '') {
        alert("Enter Percentage");
      } else {
        console.log("Sending Data", highSchool);
        this.countryService.saveHighSchool(highSchool)
          .subscribe(
            data => {
              highSchoolResonse = data;
              console.log("recived", highSchoolResonse.STATUS);
              if (highSchoolResonse.STATUS === "Success") {
                alert(highSchoolResonse.STATUS + " : " + highSchoolResonse.MESSAGE);
                this.onGetSchoolQualification();
              } else {
                alert(highSchoolResonse.STATUS + ' : ' + highSchoolResonse.MESSAGE);
              }
            }
          );
      }
    }
  }


  onDeleteQualification() {

    var selectedNodes = this.api.getSelectedNodes();
    var dataTest: Object;


    const selectedData = selectedNodes.map(node => node.data);
    selectedData.map(node => dataTest = node as Object);
    console.log("SDSDSD", selectedData);



    if (selectedNodes.length === 0) {
      // alert("Please Select any row.");
    } else {
      this.api.removeItems(selectedNodes);
    }
  }


  showhide() {
    this.show = true;
    this.hide = false;
  }

  showhide2() {
    this.show = false;
    this.hide = true;
  }

  get f() { return this.basicDetailsForm.controls; }

}
class ImageSnippet {
  constructor(public src: string, public file: File) { }
}