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
import { BasicDetailBody } from 'src/app/WebServices/WebServiceBody/EmployeeBasicDetail/BasicDetailBody';
import { DatePipe } from '@angular/common';


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
  selectedDesignationIndex: number;
  url;

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
  components = {
    loadingRenderer: function (params) {
      if (params.value !== undefined) {
        return params.value;
      } else {
        return '<img src="../images/loading.gif">';
      }
    }
  };
  columnDefs1 = [


    { headerName: 'Status', field: 'status', sortable: true, filter: true, editable: true, width: 100 },
    { headerName: 'Address', field: 'address',sortable: true, filter: true, editable: true, width: 120 },
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
  ];

  columnDefs2 = [

    {
      headerName: 'Class', field: 'className', width: 120, editable: true, sortable: true, filter: true,
      cellStyle: function (params) {
        if (params.value === '') {
          return { outline: '1px solid red' };
        } else {
          return { outline: 'white' };
        };
      }


    },
    {
      headerName: 'Board', field: 'boardName', sortable: true, filter: true, width: 100, editable: true,
      cellStyle: function (params) {
        if (params.value === '') {
          return { outline: '1px solid red' };
        } else {
          return { outline: 'white' };
        };
      }
    },
    {
      headerName: 'School Name', field: 'schoolName', sortable: true, filter: true, width: 150, editable: true,
      cellStyle: function (params) {
        if (params.value === '') {
          return { outline: '1px solid red' };
        } else {
          return { outline: 'white' };
        }
      }

    },
    {
      headerName: 'Start Date', field: 'startDate', sortable: true, filter: true, width: 120, editable: true,
      cellStyle: function (params) {
        if (params.value === '') {
          return { outline: '1px solid red' };
        } else {
          return { outline: 'white' };
        }
      }

    },
    {
      headerName: 'End Date', field: 'endDate', sortable: true, filter: true, width: 120, editable: true,
      cellStyle: function (params) {
        if (params.value === '') {
          return { outline: '1px solid red' };
        } else {
          return { outline: 'white' };
        }
      }
    },

    {
      headerName: 'Percentage', field: 'percentage', sortable: true, filter: true, width: 100, editable: true,
      cellStyle: function (params) {
        if (params.value === '') {
          return { outline: '1px solid red' };
        } else {
          return { outline: 'white' };
        }
      }
    },
  ];

  rowData2: GetSchoolDataResponse[];



  columnDefs4 = [
    { headerName: 'Degree', field: 'degree', editable: true, width: 120 },
    { headerName: 'Specialization', field: 'specialization', sortable: true, filter: true, editable: true, width: 160 },

    { headerName: 'University', field: 'university', sortable: true, filter: true, editable: true, width: 160 },
    { headerName: 'Start Date', field: 'startdate', sortable: true, filter: true, editable: true, width: 125 },
    { headerName: 'End Date', field: 'enddate', sortable: true, filter: true, editable: true, width: 125 },

    { headerName: 'Percentage', field: 'percentage', sortable: true, filter: true, editable: true, width: 120 },

    { headerName: '', field: '', width: 340, }

  ];

  rowData4 = [
  ];

  columnDefs5 = [
    { headerName: 'Degree', field: 'degree', editable: true, width: 120 },
    { headerName: 'Specialization', field: 'specialization', sortable: true, filter: true, editable: true, width: 160 },
    { headerName: 'University', field: 'university', sortable: true, filter: true, editable: true, width: 160 },
    { headerName: 'Start Date', field: 'startDate', sortable: true, filter: true, editable: true, width: 125 },
    { headerName: 'End Date', field: 'endDate', sortable: true, filter: true, editable: true, width: 125 },

    { headerName: 'Percentage', field: 'percentage', sortable: true, filter: true, editable: true, width: 120 },
    { headerName: '', field: '', width: 340, }
  ];

  rowData5 = [
   
  ];

  columnDefs6 = [
    { headerName: 'Degree', field: 'degree', editable: true, width: 120 },
    { headerName: 'Specialization', field: 'specialization', sortable: true, filter: true, editable: true, width: 150 },
    { headerName: 'University', field: 'university', sortable: true, filter: true, editable: true, width: 160 },
    { headerName: 'Start Date', field: 'startDate', sortable: true, filter: true, editable: true, width: 150 },
    { headerName: 'End Date', field: 'endDate', sortable: true, filter: true, editable: true, width: 110 },
    { headerName: 'Percentage', field: 'percentage', sortable: true, filter: true, editable: true, width: 100 },
    { headerName: '', width: 145 }

  ];

  rowData6 = [

  ];

  columnDefs7 = [

    { headerName: 'Institute', field: 'Institute', editable: true, width: 120 },
    { headerName: 'Course', field: 'Course', sortable: true, filter: true, editable: true, width: 120 },
    { headerName: 'Start Date', field: 'StartDate', sortable: true, filter: true, editable: true, width: 120 },
    { headerName: 'End Date', field: 'EndDate', sortable: true, filter: true, editable: true, width: 120 },
    { headerName: '', field: '', width: 520, }

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
    { headerName: '', field: '', width: 160, }


  ];

  rowData8 = [
 
  ];

  columnDefs9 = [


    { headerName: 'Certificate Name', field: 'CertificateName', editable: true, width: 120 },
    { headerName: 'Start Date', field: 'StartDate', sortable: true, filter: true, editable: true, width: 120 },
    { headerName: 'End Date', field: 'EndDate', sortable: true, filter: true, editable: true, width: 120 },
    { headerName: '', field: '', width: 640, }





  ];

  rowData9 = [

  ];

  columnDefs10 = [


    { headerName: 'Type of Account', field: 'TypeofAccount', editable: true, width: 120 },

    { headerName: 'Account Holder Name', field: 'AccountHolderName', sortable: true, filter: true, editable: true, width: 120 },
    { headerName: 'Account Number', field: 'AccountNumber', sortable: true, filter: true, editable: true, width: 120 },
    { headerName: 'IFSC', field: 'IFSC', sortable: true, filter: true, editable: true, width: 120 },
    { headerName: 'Branch Name', field: 'BranchName', sortable: true, filter: true, editable: true, width: 120 },
    { headerName: 'Primary', field: 'Primary', sortable: true, filter: true, editable: true, width: 120 },

    { headerName: '', field: '', width: 280, }
  ];

  rowData10 = [
  
  ];

  columnDefs11 = [


    { headerName: 'Passport No', field: 'PassportNo', sortable: true, filter: true, editable: true, width: 110 },
    { headerName: 'Expiry Date', field: 'ExpiryDate', sortable: true, filter: true, editable: true, width: 110 },
    { headerName: 'Upload Document', field: 'UploadDocument', sortable: true, filter: true, editable: true, width: 150 },
    { headerName: 'Time Duration', field: 'TimetoExpire', sortable: true, filter: true, editable: true, width: 150 },
    { headerName: '', field: '', width: 480, }
  ];

  rowData11 = [
    
  ];

  columnDefs12 = [


    { headerName: 'Country', field: 'Country', sortable: true, filter: true, editable: true, width: 120 },
    { headerName: 'Number Of Visit', field: 'NumberOfVisit', sortable: true, filter: true, editable: true, width: 120 },
    { headerName: 'Expiry Date', field: 'ExpiryDate', sortable: true, filter: true, editable: true, width: 120 },
    { headerName: 'Upload Document', field: 'UploadDocument', sortable: true, filter: true, editable: true, width: 150 },
    { headerName: 'Time to Expire', field: 'TimetoExpire', sortable: true, filter: true, editable: true, width: 120 },
    { headerName: '', field: '', width: 370, }
  ];

  rowData12 = [
 
  ];

  columnDefs13 = [
    { headerName: 'Documents', field: 'Documents', editable: true, width: 200 },
    { headerName: 'Curriculum Vitae', field: 'CurriculumVitae', sortable: true, filter: true, editable: true, width: 200 },
    { headerName: 'Expiry Date', field: 'ExpiryDate', sortable: true, filter: true, editable: true, width: 200 },
    { headerName: 'Upload Document', field: 'UploadDocument', sortable: true, filter: true, editable: true, width: 200 },
    { headerName: 'Time to Expire', field: 'TimetoExpire', sortable: true, filter: true, editable: true, width: 200 },

  ];

  rowData13 = [
 
  ];

  columnDefs14 = [


    { headerName: 'Driving Licence Number', field: 'DrivingLicence', sortable: true, filter: true, editable: true, width: 150 },
    { headerName: 'Expiry Date', field: 'ExpiryDate', sortable: true, filter: true, editable: true, width: 120 },
    { headerName: 'Upload Document', field: 'UploadDocument', sortable: true, filter: true, editable: true, width: 150 },
    { headerName: 'Time Duration', field: 'TimetoExpire', sortable: true, filter: true, editable: true, width: 130 },
    { headerName: '', field: '', width: 450, }
  ];

  rowData14 = [
  
  ];

  columnDefs15 = [


    { headerName: 'Medical Certificate', field: 'MedicalCertificate', sortable: true, filter: true, editable: true, width: 150 },
    { headerName: 'Expiry Date', field: 'ExpiryDate', sortable: true, filter: true, editable: true, width: 120 },
    { headerName: 'Upload Document', field: 'UploadDocument', sortable: true, filter: true, editable: true, width: 150 },
    { headerName: 'Time Duration', field: 'TimeDuration', sortable: true, filter: true, editable: true, width: 130 },
    { headerName: '', field: '', width: 450, }
  ];

  rowData15 = [
   
  ];

  columnDefs16 = [

    { headerName: 'Class/Degree', field: 'ClassDegree', editable: true, width: 120 },
    { headerName: 'Board/University', field: 'BoardUniversity', sortable: true, filter: true, editable: true, width: 140 },
    { headerName: 'Start Date', field: 'StartDate', sortable: true, filter: true, editable: true, width: 130 },
    { headerName: 'End Date', field: 'EndDate', sortable: true, filter: true, editable: true, width: 130 },
    { headerName: 'Upload Document', field: 'UploadDocument', sortable: true, filter: true, editable: true, width: 150 },
    { headerName: '', field: '', width: 330, }
  ];

  rowData16 = [
  
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



  constructor(private formBuilder: FormBuilder, private allwebService: AllWeb, ) {
    this.rowSelection = 'single';
  }
  age: number;
  api;
  columnApi;
  getSchoolResonseData: GetSchoolDataResponse[];
  getGraduationDetailsResponse: GetGraduationDetailsResponse[];
  getPostGraduationDetailsResponse: GetPostGraduationDetailsResponse[];
  getOtherEducationalResponse: GetOtherEducationalResponse[];
  addNewRowSchool: boolean = false;
  addNewGraduationRow: boolean = false;
  addNewPostGraduationRow: boolean = false;
  addNewOther: boolean = false;


  today;
  ngOnInit() {
    this.today = new Date().toJSON().split('T')[0];
    this.today = new DatePipe('en-US').transform(this.today, 'dd/MM/yyyy');
    this.basicDetailsForm = this.formBuilder.group({
      empCode: ['', [Validators.required, Validators.pattern('[0-9]{0-10}')]],
      firstName: ['', [Validators.required]],
      middleName: [''],
      dateofBirth: ['', [Validators.required, Validators.max(this.today)]],
      lastName: ['', [Validators.required]],
      designation: ['', [Validators.required]],
      department: ['', [Validators.required]],
      title: ['Mr', [Validators.required,]],
      location: ['', [Validators.required,]]
    });
    // this.getLocation(1);
    // this.onGetSchoolQualification();
    // this.onGetGraduational();
    // this.onGetPostGraduational();
    // this.onGetOther();
    // console.log('this.today ' + this.today);

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
    this.allwebService.doGetLocation(locationBody)
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
    this.allwebService.getDepartment(departmentBody)
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

    this.allwebService.getAllDesignation(designationBody)
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
    basicDetailBody.E_Image = this.url;
    basicDetailBody.E_LastName = this.basicDetailsForm.controls.lastName.value;
    basicDetailBody.E_MaritalStatus = this.maritalStatus;
    basicDetailBody.E_MiddleName = this.basicDetailsForm.controls.middleName.value;
    basicDetailBody.userID = 1;
    basicDetailBody.UpdatedBy = '1';
    if (this.basicDetailsForm.controls.title.value === 'Mr') {
      basicDetailBody.E_Gender = 'Male';
    } else {
      basicDetailBody.E_Gender = 'Female';
    }
    console.log(JSON.stringify(basicDetailBody));
    this.allwebService.saveEmployeeBasicDetail(basicDetailBody)
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
    alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.basicDetailsForm.value));
  }

  onAddSchoolQualification() {
    this.addNewRowSchool = true;
    let res = this.api.updateRowData({ add: [{ class: 'High School' }] });
    res.add.forEach(function (rowNode) {
      console.log('Added Row Node', rowNode);
    });
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

  onGridSchoolReady(params) {
    this.api = params.api;
    this.columnApi = params.columnApi;
    this.api.sizeColumnsToFit();


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
      console.log("InElseCondit", dataTest['percentage']);
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
      if (schooldeleted.SchoolID === undefined) {
        this.api.removeItems(selectedNodes);
        this.addNewRowSchool = false;
      } else {
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
    let res = this.graduationApi.updateRowData({ add: [{ Degree: '', specialization: '', university: '', StartDate: '', EndDate: '', percentage: '' }] });
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
          console.log("asdf", "QWERT");
          this.getGraduationDetailsResponse = data;
          console.log("key", this.getGraduationDetailsResponse);
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
      if (graduationDeleted.GraduationID === undefined) {
        console.log("else if", "elseif");
        this.graduationApi.removeItems(selectedNodes);
        this.addNewGraduationRow = false;
      } else {
        console.log("GraduationId", graduationDeleted.GraduationID);
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
    let res = this.postGraduationApi.updateRowData({ add: [{ Degree: '', Specialization: '', University: '', startDate: '', endDate: '', Percentage: '' }] });
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
          console.log("key", this.getPostGraduationDetailsResponse);
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
      if (postGraduationDeleted.postGraduationId === undefined) {
        console.log("else if", "elseif");
        // this.postGraduationApi.removeItems(selectedNodes);
        this.addNewPostGraduationRow = false;
      } else {
        console.log("GraduationId", postGraduationDeleted.postGraduationId);
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
    let res = this.otherApi.updateRowData({ add: [{ Degree: '', Specialization: '', University: '', startDate: '', endDate: '', Percentage: '' }] });
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
      if (otherEducationDeleted.otherEduQualificationTableID === undefined) {
        console.log("else if", "elseif");
        // this.postGraduationApi.removeItems(selectedNodes);
        this.addNewOther = false;
      } else {
        console.log("GraduationId", otherEducationDeleted.otherEduQualificationTableID);
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
class ImageSnippet {
  constructor(public src: string, public file: File) { }
}
