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
import { SchoolDeleted } from 'src/app/WebServices/WebServiceBody/EducationBody/SchoolDeleted';
import { UniversalResponse } from 'src/app/WebServices/WebServiceResponse/UniversalResponse';
import { GraduationBody } from 'src/app/WebServices/WebServiceBody/EducationBody/GraduationBody';
import { GraduationDeleted } from 'src/app/WebServices/WebServiceBody/EducationBody/GraduationDeleted';
import { GetGraduationDetailsResponse } from '../Education/GetGraduationDetailsResponse';
import { GetPostGraduationDetailsResponse } from '../Education/GetPostGraduationDetailsResponse';
import { PostGradutationBody } from 'src/app/WebServices/WebServiceBody/EducationBody/PostGradutationBody';
import { PostGraduationDeleted } from 'src/app/WebServices/WebServiceBody/EducationBody/PostGraduationDeleted';
import { GetOtherEducationalResponse } from '../Education/GetOtherEducationalResponse';
import { OtherEducationBody } from 'src/app/WebServices/WebServiceBody/EducationBody/OtherEducationBody';
import { OtherEducationDeleted } from 'src/app/WebServices/WebServiceBody/EducationBody/OtherEducationDeleted';

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

  graduationApi: GridApi;
  graduationColumnApi: ColumnApi;

  postGraduationApi: GridApi;
  postGraduationColumnApi: ColumnApi;
  
  otherApi: GridApi;
  otherColumnApi: ColumnApi;

  rowSelection: string;

  submitted = false;
  designationResponse: GetAllLocationResponse[];
  selectedDesignationIndex;
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
    { headerName: 'Address', field: 'address', editable: true, width: 150 },
    { headerName: 'City', field: 'city', sortable: true, filter: true, editable: true, width: 100 },
    { headerName: 'State', field: 'state', sortable: true, filter: true, editable: true, width: 100 },
    { headerName: 'Country', field: 'country', sortable: true, filter: true, editable: true, width: 90 },
    { headerName: 'Postal Code', field: 'pin', sortable: true, filter: true, editable: true, width: 100 },
    { headerName: 'Contact No.', field: 'ContactNo', sortable: true, filter: true, editable: true, width: 100 },
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

    { headerName: 'Class', field: 'className', width: 120,editable: true, 
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
   },
    { headerName: 'Board', field: 'boardName', sortable: true, filter: true, width: 150,editable: true,
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
   },
    { headerName: 'School Name', field: 'schoolName', sortable: true, filter: true, width: 152, editable: true,
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
  //  template: '<input type="date"/>',
    { headerName: 'Start Date', field: 'startDate', sortable: true, filter: true, width: 120, editable: true,
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
  //  template: '<input type="date"/>',
    { headerName: 'End Date', field: 'endDate', sortable: true, filter: true, width: 120,editable: true,
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
   }, 
    
    { headerName: 'Percentage', field: 'percentage', sortable: true, filter: true, width: 150,editable: true,
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
   },
  ];

  rowData2 = [
      // { Class: '10', Board: 'CBSE', SchoolName: 'DPSG', StartDate: '10-03-2010', EndDate: '10-03-2011', percentage: '74 %' },
      // { Class: '12', Board: 'CBSE', SchoolName: 'DPSG', StartDate: '10-03-2012', EndDate: '10-03-2013', percentage: '72 %' },
    ];

  // rowData2 = [];


  columnDefs4 = [
    { headerName: 'Degree', field: 'degree', editable: true, width: 120 },
    { headerName: 'Specialization', field: 'specialization', sortable: true, filter: true, editable: true, width: 160 },

    { headerName: 'University', field: 'university', sortable: true, filter: true, editable: true, width: 160 },
    { headerName: 'Start Date', field: 'startdate', sortable: true, filter: true, editable: true, width: 125 },
    { headerName: 'End Date', field: 'enddate', sortable: true, filter: true, editable: true, width: 125 },
    { headerName: 'Percentage', field: 'percentage', sortable: true, filter: true, editable: true, width: 120 },
    { headerName: '', width: 130 }


  ];

  rowData4 = [
    // { Degree: 'BCA', specialization: 'BCA', university: 'CCSU', StartDate: '10-04-2013', EndDate: '10-04-2016', percentage: '78 %' }
  ];

  columnDefs5 = [
    { headerName: 'Degree', field: 'degree', editable: true, width: 120 },
    { headerName: 'Specialization', field: 'specialization', sortable: true, filter: true, editable: true, width: 160 },
    { headerName: 'University', field: 'university', sortable: true, filter: true, editable: true, width: 160 },
    { headerName: 'Start Date', field: 'startDate', sortable: true, filter: true, editable: true, width: 125 },
    { headerName: 'End Date', field: 'endDate', sortable: true, filter: true, editable: true, width: 125 },
    { headerName: 'Percentage', field: 'percentage', sortable: true, filter: true, editable: true, width: 120 },
    { headerName: '', width: 130 }
  ];

  rowData5 = [
    // { Degree: 'MCA', specialization: 'MCA', university: 'AKTU', StartDate: '10-04-2016', EndDate: '10-04-2018', percentage: '76 %' },

  ];

  columnDefs6 = [
    { headerName: 'Degree', field: 'degree',editable: true, width: 120 },
    { headerName: 'Specialization', field: 'specialization', sortable: true, filter: true, editable: true, width: 150 },
    { headerName: 'University', field: 'university', sortable: true, filter: true, editable: true, width: 160 },
    { headerName: 'Start Date', field: 'startDate', sortable: true, filter: true, editable: true, width: 150 },
    { headerName: 'End Date', field: 'endDate', sortable: true, filter: true, editable: true, width: 110 },
    { headerName: 'Percentage', field: 'percentage', sortable: true, filter: true, editable: true, width: 100 },
    { headerName: '', width: 145 }
  ];

  rowData6 = [
    // { Degree: 'P.hd', specialization: 'computer science', university: 'AKTU', StartDate: '10-04-2016', EndDate: '10-04-2018', percentage: '76 %' },

  ];

  columnDefs7 = [

    { headerName: 'Institute', field: 'Institute', editable: true, width: 120 },
    { headerName: 'Course', field: 'Course', sortable: true, filter: true, editable: true, width: 120 },
    { headerName: 'Start Date', field: 'StartDate', sortable: true, filter: true, editable: true, width: 120 },
    { headerName: 'End Date', field: 'EndDate', sortable: true, filter: true, editable: true, width: 120 },
    { headerName: '', width: 458 }

  ];

  rowData7 = [
    { Institute: 'Ducat', Course: 'Ruby', StartDate: '10-01-2018', EndDate: '10-06-2018' },

  ];


  columnDefs8 = [


    { headerName: 'Company Name', field: 'CompanyName', editable: true, width: 130 },
    { headerName: 'Designation', field: 'Designation', sortable: true, filter: true, editable: true, width: 130 },
    { headerName: 'Department', field: 'Department', sortable: true, filter: true, editable: true, width: 160 },
    { headerName: 'Joining Date', field: 'JoiningDate', sortable: true, filter: true, editable: true, width: 130 },
    { headerName: 'Exit Date', field: 'ExitDate', sortable: true, filter: true, editable: true, width: 130 },
    { headerName: 'Experience', field: 'Experience', sortable: true, filter: true, editable: true, width: 130 },
    { headerName: 'Location', field: 'Location', sortable: true, filter: true, editable: true, width: 130 },



  ];

  rowData8 = [
    { CompanyName: 'YoekiSoft Pvt Ltd', Designation: 'UI Developer', Department: 'Software Developer', JoiningDate: '01-05-2018', ExitDate: '01-09-2019', Experience: '1 year 4 months', Location: 'noida' },

  ];

  columnDefs9 = [


    { headerName: 'Certificate Name', field: 'CertificateName', editable: true, width: 272 },
    { headerName: 'Start Date', field: 'StartDate', sortable: true, filter: true, editable: true, width: 270 },
    { headerName: 'End Date', field: 'EndDate', sortable: true, filter: true, editable: true, width: 270 },





  ];

  rowData9 = [
    { CertificateName: 'CCNA', StartDate: '10-05-2018', EndDate: '10-10-2018' },

  ];

  columnDefs10 = [


    { headerName: 'Type of Account', field: 'TypeofAccount', editable: true, width: 180 },

    { headerName: 'Account Holder Name', field: 'AccountHolderName', sortable: true, filter: true, editable: true, width: 180 },
    { headerName: 'Account Number', field: 'AccountNumber', sortable: true, filter: true, editable: true, width: 160 },
    { headerName: 'IFSC', field: 'IFSC', sortable: true, filter: true, editable: true, width: 160 },
    { headerName: 'Branch Name', field: 'BranchName', sortable: true, filter: true, editable: true, width: 140 },
    { headerName: 'Primary', field: 'Primary', sortable: true, filter: true, editable: true, width: 120 },


  ];

  rowData10 = [
    { TypeofAccount: 'Salary Account', AccountHolderName: 'Abhishek vats', AccountNumber: '09876543210', IFSC: 'HDFC000003', BranchName: 'Ghaziabad', Primary: 'yes' },
    { TypeofAccount: 'PF Account', AccountHolderName: 'Abhishek vats', AccountNumber: '09876543210', IFSC: 'HDFC000003', BranchName: 'Ghaziabad', Primary: 'yes' },
    { TypeofAccount: 'Gratuity Account', AccountHolderName: 'Abhishek vats', AccountNumber: '09876543210', IFSC: 'HDFC000003', BranchName: 'Ghaziabad', Primary: 'yes' },

  ];

  columnDefs11 = [


    { headerName: 'Passport No', field: 'PassportNo', sortable: true, filter: true, editable: true, width: 230 },
    { headerName: 'Expiry Date', field: 'ExpiryDate', sortable: true, filter: true, editable: true, width: 200 },
    { headerName: 'Upload Document', field: 'UploadDocument', sortable: true, filter: true, editable: true, width: 200 },
    { headerName: 'Time Duration', field: 'TimetoExpire', sortable: true, filter: true, editable: true, width: 200 },

  ];

  rowData11 = [
    { PassportNo: 'PAS96ER0001', ExpiryDate: '28-02-1996', UploadDocument: '', TimetoExpire: '1 year 3 months' },

  ];

  columnDefs12 = [


    { headerName: 'Country', field: 'Country', sortable: true, filter: true, editable: true, width: 170 },
    { headerName: 'Number Of Visit', field: 'NumberOfVisit', sortable: true, filter: true, editable: true, width: 170 },
    { headerName: 'Expiry Date', field: 'ExpiryDate', sortable: true, filter: true, editable: true, width: 160 },
    { headerName: 'Upload Document', field: 'UploadDocument', sortable: true, filter: true, editable: true, width: 170 },
    { headerName: 'Time to Expire', field: 'TimetoExpire', sortable: true, filter: true, editable: true, width: 160 },

  ];

  rowData12 = [
    { Country: 'Canada', NumberOfVisit: 'Single Visit', ExpiryDate: '28-02-1996', UploadDocument: '', TimetoExpire: '1 year 3 months' },

  ];

  columnDefs13 = [
    { headerName: 'Documents', field: 'Documents', editable: true, width: 160 },
    { headerName: 'Curriculum Vitae', field: 'CurriculumVitae', sortable: true, filter: true, editable: true, width: 160 },
    { headerName: 'Expiry Date', field: 'ExpiryDate', sortable: true, filter: true, editable: true, width: 160 },
    { headerName: 'Upload Document', field: 'UploadDocument', sortable: true, filter: true, editable: true, width: 170 },
    { headerName: 'Time to Expire', field: 'TimetoExpire', sortable: true, filter: true, editable: true, width: 160 },

  ];

  rowData13 = [
    { Documents: 'Curriculum Vitae', CurriculumVitae: 'CV96ER0001', ExpiryDate: '28-02-1996', UploadDocument: '', TimetoExpire: '1 year 3 months' },

  ];

  columnDefs14 = [


    { headerName: 'Driving Licence Number', field: 'DrivingLicence', sortable: true, filter: true, editable: true, width: 220 },
    { headerName: 'Expiry Date', field: 'ExpiryDate', sortable: true, filter: true, editable: true, width: 200 },
    { headerName: 'Upload Document', field: 'UploadDocument', sortable: true, filter: true, editable: true, width: 210 },
    { headerName: 'Time Duration', field: 'TimetoExpire', sortable: true, filter: true, editable: true, width: 200 },

  ];

  rowData14 = [
    { DrivingLicence: 'DL96ER0001', ExpiryDate: '28-02-1996', UploadDocument: '', TimetoExpire: '1 year 3 months' },

  ];

  columnDefs15 = [


    { headerName: 'Medical Certificate', field: 'MedicalCertificate', sortable: true, filter: true, editable: true, width: 230 },
    { headerName: 'Expiry Date', field: 'ExpiryDate', sortable: true, filter: true, editable: true, width: 200 },
    { headerName: 'Upload Document', field: 'UploadDocument', sortable: true, filter: true, editable: true, width: 200 },
    { headerName: 'Time Duration', field: 'TimeDuration', sortable: true, filter: true, editable: true, width: 200 },

  ];

  rowData15 = [
    { MedicalCertificate: 'MED96ER0001', ExpiryDate: '28-02-1996', UploadDocument: '', TimeDuration: '1 year 3 months' },

  ];

  columnDefs16 = [

    { headerName: 'Class/Degree', field: 'ClassDegree', editable: true, width: 160 },
    { headerName: 'Board/University', field: 'BoardUniversity', sortable: true, filter: true, editable: true, width: 180 },
    { headerName: 'Start Date', field: 'StartDate', sortable: true, filter: true, editable: true, width: 160 },
    { headerName: 'End Date', field: 'EndDate', sortable: true, filter: true, editable: true, width: 170 },
    { headerName: 'Upload Document', field: 'UploadDocument', sortable: true, filter: true, editable: true, width: 160 },

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



  constructor(private formBuilder: FormBuilder, private allwebService: AllWeb) {
    this.rowSelection = 'single';
  }

  api: GridApi;
  columnApi: ColumnApi;
  getSchoolResonseData: GetSchoolDataResponse[];
  getGraduationDetailsResponse: GetGraduationDetailsResponse[];
  getPostGraduationDetailsResponse: GetPostGraduationDetailsResponse[];
  getOtherEducationalResponse: GetOtherEducationalResponse[];
  addNewRowSchool : boolean = false;
  addNewGraduationRow : boolean = false;
  addNewPostGraduationRow : boolean = false;
  addNewOther : boolean = false;

  ngOnInit() {
    this.basicDetailsForm = this.formBuilder.group({
      empCode: ['', [Validators.required]],
      firstName: ['', [Validators.required]],
      dateofBirth: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      designation: ['Select', [Validators.required]],
      department: ['Select', [Validators.required]],
      title: ['Mr', [Validators.required,]],
      location: ['Select', [Validators.required,]]
    });
    this.getLocation(1);
    this.onGetSchoolQualification();
    this.onGetGraduational() ;
    this.onGetPostGraduational();
    this.onGetOther();


  }
  onRadioClick(value) {
    console.log(value);
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
    this.allwebService.doGetLocation(locationBody)
      .subscribe(
        data => {
          this.locationResponse = data;
          if (this.locationResponse.length > 0) {
            this.selectedLocationIndex = this.locationResponse.length - 1;
            this.getAllDepartment(1, this.locationResponse[this.selectedLocationIndex].ID);
          } else { }

        }

      );
  }
  public getSelectedLocation(value): void {
    this.getAllDepartment(1, value.target.value);

  }
  public getSelectedDepartment(value): void {
    this.getAllDesignation('1', value.target.value);

  }
  getAllDepartment(UserID: number, LocationID: number) {
    // console.log(UserID, LocationID);
    var departmentBody = new GetAllDepartmentBody();
    departmentBody.userID = UserID;
    departmentBody.LocationID = LocationID;
    this.allwebService.getDepartment(departmentBody)
      .subscribe(
        data => {
          this.departmentResponse = data;
          this.selectedDepartmentIndex = this.departmentResponse.length - 1;
          this.getAllDesignation('1', this.departmentResponse[this.selectedDepartmentIndex].id);
        }

      );

  }

  getAllDesignation(UserID: string, DepartmentID: number) {
    var designationBody = new GetAllDesignationBody();
    designationBody.userID = UserID;
    designationBody.DepartmentID = DepartmentID + '';

    this.allwebService.getAllDesignation(designationBody)
      .subscribe(
        data => {
          this.designationResponse = data;
          this.selectedDesignationIndex = this.designationResponse.length - 1;
        }
      );

  }

  selectedDesignation(args) {
    this.selectedDesignationIndex = args.target.selectedIndex;
    // console.log(this.selectedDesignationIndex - 1);
    //  console.log(args.target.selectedIndex);
    //  console.log(args.target.options[args.target.selectedIndex].text);
  }
  onSave() {
    this.submitted = true;
    if (this.basicDetailsForm.invalid) {
      return;
    } else {
    }
    alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.basicDetailsForm.value));
  }

  onAddSchoolQualification() {
    this.addNewRowSchool = true;
    let res = this.api.updateRowData({ add: [{ class: 'High School' }] });
    res.add.forEach(function (rowNode) {
      console.log('Added Row Node', rowNode);
    });
  }

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
    this.allwebService.getHighSchoolData(getHighSchoolUserId)
      .subscribe(
        data => {
          this.getSchoolResonseData = data;
          this.rowData2 = this.getSchoolResonseData;
        }
      );
  }

  onSaveEducationalData() {
      alert('Do you want to save the data.');
      const selectedNodes = this.api.getSelectedNodes();
      if (selectedNodes.length === 0) {
        alert("Please Select any row.");
      } else {
          const highSchool = new HighSchoolBody();
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
            console.log("InElseCondit",dataTest['percentage']);
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
            alert("Enter percentage");
          } else {
  
            this.allwebService.saveHighSchool(highSchool)
              .subscribe(
                data => {
                  highSchoolResonse = data;
                  console.log("recived", highSchoolResonse.STATUS);
                  if (highSchoolResonse.STATUS === "Success") {
                    alert(highSchoolResonse.STATUS + " : " + highSchoolResonse.MESSAGE);
                    this.addNewRowSchool = false;
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
    const schooldeleted = new SchoolDeleted();
    var universalResonse: UniversalResponse;
    const selectedData = selectedNodes.map(node => node.data);
    selectedData.map(node => dataTest = node as Object);
    console.log("SDSDSD", selectedData);
    if (selectedNodes.length === 0) {
     alert("Please Select any row.");
    } else {
      schooldeleted.SchoolID = dataTest['schoolID'];
      if(schooldeleted.SchoolID === undefined){
        this.api.removeItems(selectedNodes);
        this.addNewRowSchool = false;
      }else{
        this.allwebService.deleteSchool(schooldeleted)
        .subscribe(
          data => {
            universalResonse = data;
            console.log("recived", universalResonse.STATUS);
            if (universalResonse.STATUS === "Success") {
              this.addNewRowSchool = false;
              alert(universalResonse.STATUS + " : " + universalResonse.MESSAGE);
              this.onGetSchoolQualification();
            } else {
              alert(universalResonse.STATUS + ' : ' + universalResonse.MESSAGE);
            }
          }
        );
      }
    }
  }

  // 
  onAddGraduationQualification() {
    this.addNewGraduationRow = true;
    // alert("ok");
    let res = this.graduationApi.updateRowData({ add: [{ Degree: '', specialization: '', university: '', StartDate: '', EndDate: '', percentage: ''}] });
    res.add.forEach(function (rowNode) {
      console.log('Added Row Nodes', rowNode);
    });
  }

  onGridGraduationReady(params) {
    this.graduationApi = params.api;
    this.graduationColumnApi = params.columnApi;
  }

  onGetGraduational() {
    var getSchoolModel = new GetSchoolModel();
    this.allwebService.getgraduational(getSchoolModel)
      .subscribe(
        data => {
          console.log("asdf","QWERT");
          this.getGraduationDetailsResponse = data;
          console.log("key",  this.getGraduationDetailsResponse);
          this.rowData4 = this.getGraduationDetailsResponse;
        }
      );
  }

  onSaveGraduationData() {
    alert('Do you want to save the data.');
    const selectedNodes = this.graduationApi.getSelectedNodes();
    if (selectedNodes.length === 0) {
      alert("Please Select any row.");
    } else {
        const graduationbody = new GraduationBody();
        const selectedData = selectedNodes.map(node => node.data);
        var universalResonse: UniversalResponse;
        var dataTest: Object;
        selectedData.map(node => dataTest = node as Object);
        graduationbody.degree = dataTest['degree'];
        graduationbody.specialization = dataTest['specialization'];
        graduationbody.university = dataTest['university'];
        graduationbody.startdate = dataTest['startdate'];
        graduationbody.enddate = dataTest['enddate'];
        graduationbody.percentage = dataTest['percentage'];
        if (dataTest['degree'] === '') {
          alert("Enter Degree Name");
        } else if (dataTest['specialization'] === '') {
          alert("Enter Specialization");
        } else if (dataTest['university'] === '') {
          alert("Enter University Name");
        } else if (dataTest['startdate'] === '') {
          alert("Enter Start Date");
        } else if (dataTest['enddate'] === '') {
          alert("Enter End Date");
        } else if (dataTest['percentage'] === '') {
          alert("Enter Percentage");
        } else {
          this.allwebService.saveGraduation(graduationbody)
            .subscribe(
              data => {
                universalResonse = data;
                console.log("recived", universalResonse.STATUS);
                if (universalResonse.STATUS === "Success") {
                  alert(universalResonse.STATUS + " : " + universalResonse.MESSAGE);
                  this.addNewGraduationRow = false;
                  // this.onGetSchoolQualification();
                } else {
                  alert(universalResonse.STATUS + ' : ' + universalResonse.MESSAGE);
                }
              }
            );
        }



    }
  
  }

  onDeleteGraduationData() {
    var selectedNodes = this.graduationApi.getSelectedNodes();
    var dataTest: Object;

    const graduationDeleted = new GraduationDeleted();
    var universalResonse: UniversalResponse;
    const selectedData = selectedNodes.map(node => node.data);
    selectedData.map(node => dataTest = node as Object);
    console.log("SDSDSD", selectedData);
    if (selectedNodes.length === 0) {
     alert("Please Select any row.");
    } else {
      graduationDeleted.GraduationID = dataTest['graduationId'];
      if(graduationDeleted.GraduationID === undefined){
        console.log("else if","elseif");
        this.graduationApi.removeItems(selectedNodes);
        this.addNewGraduationRow = false;
      }else{
        console.log("GraduationId",graduationDeleted.GraduationID);
        this.allwebService.deleteGraduational(graduationDeleted)
        .subscribe(
          data => {
            universalResonse = data;
            console.log("recived", universalResonse.STATUS);
            if (universalResonse.STATUS === "Success") {
              this.addNewGraduationRow = false;
              alert(universalResonse.STATUS + " : " + universalResonse.MESSAGE);
              this.onGetGraduational();
            } else {
              alert(universalResonse.STATUS + ' : ' + universalResonse.MESSAGE);
            }
          }
        );

      }
    }
  }

  //
  onAddPostGraduationQualification() {
    this.addNewPostGraduationRow = true;
    let res = this.postGraduationApi.updateRowData({ add: [{ Degree: '', Specialization: '', University: '', startDate: '', endDate: '', Percentage: ''}] });
    res.add.forEach(function (rowNode) {
      console.log('Added Row Nodes', rowNode);
    });
  }

  onGridPostGraduationReady(params) {
    this.postGraduationApi = params.api;
    this.postGraduationColumnApi = params.columnApi;
  }

  onGetPostGraduational() {
    var getSchoolModel = new GetSchoolModel();
    this.allwebService.getPostgraduational(getSchoolModel)
      .subscribe(
        data => {
          this.getPostGraduationDetailsResponse = data;
          console.log("key",  this.getPostGraduationDetailsResponse);
          this.rowData5 = this.getPostGraduationDetailsResponse;
        }
      );
  }

  onSavePostGraduationData() {
    alert('Do you want to save the data.');
    const selectedNodes = this.postGraduationApi.getSelectedNodes();
    if (selectedNodes.length === 0) {
      alert("Please Select any row.");
    } else {

        const postGraduationBody = new PostGradutationBody();
        const selectedData = selectedNodes.map(node => node.data);
        var universalResonse: UniversalResponse;
        var dataTest: Object;
        selectedData.map(node => dataTest = node as Object);
        postGraduationBody.degree = dataTest['degree'];
        postGraduationBody.specialization = dataTest['specialization'];
        postGraduationBody.university = dataTest['university'];
        postGraduationBody.startDate = dataTest['startDate'];
        postGraduationBody.endDate = dataTest['endDate'];
        postGraduationBody.percentage = dataTest['percentage'];
        if (dataTest['degree'] === '') {
          alert("Enter Degree Name");
        } else if (dataTest['specialization'] === '') {
          alert("Enter Specialization");
        } else if (dataTest['university'] === '') {
          alert("Enter University Name");
        } else if (dataTest['startDate'] === '') {
          alert("Enter Start Date");
        } else if (dataTest['endDate'] === '') {
          alert("Enter End Date");
        } else if (dataTest['percentage'] === '') {
          alert("Enter Percentage");
        } else {
          this.allwebService.savePostGraduation(postGraduationBody)
            .subscribe(
              data => {
                universalResonse = data;
                console.log("recived", universalResonse.STATUS);
                if (universalResonse.STATUS === "Success") {
                  alert(universalResonse.STATUS + " : " + universalResonse.MESSAGE);
                  this.addNewPostGraduationRow = false;
                  this.onGetPostGraduational();
                } else {
                  alert(universalResonse.STATUS + ' : ' + universalResonse.MESSAGE);
                }
              }
            );
        }
    }
  }

  onDeletePostGraduationData() {
    var selectedNodes = this.postGraduationApi.getSelectedNodes();
    var dataTest: Object;

    const postGraduationDeleted = new PostGraduationDeleted();
    var universalResonse: UniversalResponse;
    const selectedData = selectedNodes.map(node => node.data);
    selectedData.map(node => dataTest = node as Object);
    console.log("SDSDSD", selectedData);
    if (selectedNodes.length === 0) {
     alert("Please Select any row.");
    } else {
      postGraduationDeleted.postGraduationId = dataTest['postGraduationID'];
      if(postGraduationDeleted.postGraduationId === undefined){
        console.log("else if","elseif");
        // this.postGraduationApi.removeItems(selectedNodes);
        this.addNewPostGraduationRow = false;
      }else{
        console.log("GraduationId",postGraduationDeleted.postGraduationId);
        this.allwebService.deletePostGraduational(postGraduationDeleted)
        .subscribe(
          data => {
            universalResonse = data;
            console.log("recived", universalResonse.STATUS);
            if (universalResonse.STATUS === "Success") {
              this.addNewPostGraduationRow = false;
              this.postGraduationApi.removeItems(selectedNodes);
              alert(universalResonse.STATUS + " : " + universalResonse.MESSAGE);
              this.onGetGraduational();
            } else {
              alert(universalResonse.STATUS + ' : ' + universalResonse.MESSAGE);
            }
          }
        );
      }
    }
  }

  //
  onOtherQualification() {
    this.addNewOther = true;
    let res = this.otherApi.updateRowData({ add: [{ Degree: '', Specialization: '', University: '', startDate: '', endDate: '', Percentage: ''}] });
    res.add.forEach(function (rowNode) {
      console.log('Added Row Nodes', rowNode);
    });
  }

  onGridOtherReady(params) {
    this.otherApi = params.api;
    this.otherColumnApi = params.columnApi;
  }

  onGetOther() {
    var getSchoolModel = new GetSchoolModel();
    this.allwebService.getOtherEducation(getSchoolModel)
      .subscribe(
        data => {
          this.getOtherEducationalResponse = data;
          this.rowData6 = this.getOtherEducationalResponse;
        }
      );
  }

  onSaveOtherData() {
    alert('Do you want to save the data.');
    const selectedNodes = this.otherApi.getSelectedNodes();
    if (selectedNodes.length === 0) {
      alert("Please Select any row.");
    } else {
        const otherEducationBody = new OtherEducationBody();
        const selectedData = selectedNodes.map(node => node.data);
        var universalResonse: UniversalResponse;
        var dataTest: Object;
        selectedData.map(node => dataTest = node as Object);
        otherEducationBody.degree = dataTest['degree'];
        otherEducationBody.specialization = dataTest['specialization'];
        otherEducationBody.university = dataTest['university'];
        otherEducationBody.startDate = dataTest['startDate'];
        otherEducationBody.endDate = dataTest['endDate'];
        otherEducationBody.percentage = dataTest['percentage'];
        if (dataTest['degree'] === '') {
          alert("Enter Degree Name");
        } else if (dataTest['specialization'] === '') {
          alert("Enter Specialization");
        } else if (dataTest['university'] === '') {
          alert("Enter University Name");
        } else if (dataTest['startDate'] === '') {
          alert("Enter Start Date");
        } else if (dataTest['endDate'] === '') {
          alert("Enter End Date");
        } else if (dataTest['percentage'] === '') {
          alert("Enter Percentage");
        } else {
          this.allwebService.saveOtherEducation(otherEducationBody)
            .subscribe(
              data => {
                universalResonse = data;
                console.log("recived", universalResonse.STATUS);
                if (universalResonse.STATUS === "Success") {
                  alert(universalResonse.STATUS + " : " + universalResonse.MESSAGE);
                  this.addNewOther = false;
                  this.onGetPostGraduational();
                } else {
                  alert(universalResonse.STATUS + ' : ' + universalResonse.MESSAGE);
                }
              }
            );
        }


    }
  }

  onDeleteOtherData() {
    var selectedNodes = this.otherApi.getSelectedNodes();
    var dataTest: Object;

    const otherEducationDeleted = new OtherEducationDeleted();
    var universalResonse: UniversalResponse;
    const selectedData = selectedNodes.map(node => node.data);
    selectedData.map(node => dataTest = node as Object);
    console.log("SDSDSD", selectedData);
    if (selectedNodes.length === 0) {
     alert("Please Select any row.");
    } else {
      otherEducationDeleted.otherEduQualificationTableID = dataTest['otherEduQualificationTableID'];
      if(otherEducationDeleted.otherEduQualificationTableID === undefined){
        console.log("else if","elseif");
        // this.postGraduationApi.removeItems(selectedNodes);
        this.addNewOther = false;
      }else{
        console.log("GraduationId",otherEducationDeleted.otherEduQualificationTableID);
        this.allwebService.deleteOtherEducation(otherEducationDeleted)
        .subscribe(
          data => {
            universalResonse = data;
            console.log("recived", universalResonse.STATUS);
            if (universalResonse.STATUS === "Success") {
              this.addNewOther = false;
              this.postGraduationApi.removeItems(selectedNodes);
              alert(universalResonse.STATUS + " : " + universalResonse.MESSAGE);
              this.onGetGraduational();
            } else {
              alert(universalResonse.STATUS + ' : ' + universalResonse.MESSAGE);
            }
          }
        );
      }
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
