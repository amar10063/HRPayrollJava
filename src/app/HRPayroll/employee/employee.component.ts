import { GridApi, ColumnApi, GridOptions, CellComp } from 'ag-grid-community';
import { HighSchoolBody } from '../../WebServices/WebServiceBody/EducationBody/HighSchoolBody';
import { HighSchoolResponse } from '../../WebServices/WebServiceResponse/EducationResponse/HighSchoolResponse';
import { Component, OnInit, ɵConsole } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { from, identity } from 'rxjs';
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
import { GetProfessionalEducationResponse } from '../ProfessionalEducation/GetProfessionalEducationResponse';
import { ProfessionalBodySave } from 'src/app/WebServices/WebServiceBody/ProfessionalEducation/ProfessionalBodySave';
import { DeletedProfessionalEducation } from 'src/app/WebServices/WebServiceBody/ProfessionalEducation/deletedProfessionalEducation';
import { ProfessionalBodyUpdate } from 'src/app/WebServices/WebServiceBody/ProfessionalEducation/ProfessionalBodyUpdate';

import { EmployeeAddressBody } from 'src/app/WebServices/WebServiceBody/EmployeeAddressBody/EmployeeAddressBody';
import { UniversalBody } from 'src/app/WebServices/WebServiceBody/UniversalBody';
import { EmployeeAddressResponse } from 'src/app/WebServices/WebServiceResponse/EmployeeAddressResponse/EmployeeAddressResponse';
import { DeleteEmployeeAddressBody } from 'src/app/WebServices/WebServiceBody/EmployeeAddressBody/DeleteEmployeeAddressBody';
import { LocationDropdownComponent } from 'src/app/location-dropdown/location-dropdown.component';
import { EmployeeExperienceBody } from 'src/app/WebServices/WebServiceBody/EmployeeExperienceBody/EmployeeExperienceBody';
import { EmployeeExperienceResponse } from 'src/app/WebServices/WebServiceResponse/EmployeeExperienceRespone/EmployeeExperienceResponse';
import { DeleteEmployeeExperienceBody } from 'src/app/WebServices/WebServiceBody/EmployeeExperienceBody/DeleteEmployeeExperienceBody';
import { UpdateEmployeeExperienceBody } from 'src/app/WebServices/WebServiceBody/EmployeeExperienceBody/UpdateEmployeeExperienceBody';
import { UpdateEmployeeAddressBody } from 'src/app/WebServices/WebServiceBody/EmployeeAddressBody/UpdateEmployeeAddressBody';
import { SkillResponse } from 'src/app/WebServices/WebServiceResponse/SkillResponse/SkillResponse';
import { SkillBody } from 'src/app/WebServices/WebServiceBody/SkillsBody/SkillBody';
import { AchievementBody } from 'src/app/WebServices/WebServiceBody/AchievementBody/AchievementBody';
import { AchievementResponse } from 'src/app/WebServices/WebServiceResponse/AchievementResponse/AchievementResponse';
import { UpdateAchievementBody } from 'src/app/WebServices/WebServiceBody/AchievementBody/UpdateAchievementBody';
import { DeleteAchievementBody } from 'src/app/WebServices/WebServiceBody/AchievementBody/DeleteAchievementBody';


@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})

export class EmployeeComponent implements OnInit {
  gridOptions = {} as GridOptions;
  rowData; rowData1; rowData2;
  rowData3; rowData4; rowData5; rowData6;
  rowData7; rowData8; rowData9; rowData10;
  rowData11; rowData12; rowData13; rowData14;
  rowData15; rowData16;
  columnDefs; columnDefs1; columnDefs2; columnDefs3; columnDefs4; columnDefs5; columnDefs6; columnDefs7; columnDefs8; columnDefs9; columnDefs10; columnDefs11; columnDefs12; columnDefs13; columnDefs14; columnDefs15; columnDefs16;
  basicDetailsForm: FormGroup;
  titles = ['Mr', 'Miss', 'Mrs'];
  highSchoolResponse: HighSchoolResponse;
  addressApi: GridApi;
  addressColumnApi: ColumnApi;
  empExperienceApi: GridApi;
  empExperienceColumnApi: ColumnApi;


  saveUpdateAddress: string;
  selectedRowAddress: any[];
  nodeAddressSelectButWhere: string;

  saveUpdateExperience: string;
  selectedRowExperience: any[];
  nodeExpSelectButWhere: string;
  empExperienceCheckedStatus = false;
  empAddressCheckedStatus = false;
  addressFilter: boolean;

  empFilter: boolean;


  checkedStatus = false;

  ShowLimitedAddress: any = 0;
  TotalAddress: any = 0;

  ShowLimitedExperience: any = 0;
  TotalExperience: any = 0;

  graduationApi: GridApi;
  graduationColumnApi: ColumnApi;

  postGraduationApi: GridApi;
  postGraduationColumnApi: ColumnApi;

  otherApi: GridApi;
  otherColumnApi: ColumnApi;

  professionalQualificationApi: GridApi;
  professionalQualificationColumnApi: ColumnApi;

  achievementApi: GridApi;
  achievementColumnApi: ColumnApi;

  rowSelection: string;
  submitted = false;
  designationResponse: GetAllLocationResponse[];
  selectedDesignationIndex: number;
  universalResponse: UniversalResponse;
  employeeeAddressResponse: EmployeeAddressResponse[];
  employeeExperienceResponse: EmployeeExperienceResponse[];
  checkedStatusSchool: boolean;
  checkedStatusProfessional: boolean;

  activateClass(skill) {
    skill.active = !skill.active;

  }

  url;
  public selectedCountryId: number;
  public selectedStateId: number;
  public selectedCityId: number;

  constructor(private formBuilder: FormBuilder, private allwebService: AllWeb, ) {
    this.rowSelection = 'single';
    this.gridOptions = {
      context: { componentParent: this }
    };
    this.columnDefs = [
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
      { headerName: 'Reporting Heirarchy', field: 'Heirarchy', sortable: true, filter: true, width: 150, },
      { headerName: 'Send Message', field: 'SendMessage', sortable: true, filter: true, width: 110 }
    ];

    this.rowData = [];

    this.columnDefs1 = [


      {
        headerName: 'Status', field: 'address_Status', sortable: true, filter: true, editable: true, width: 100,
        cellStyle: function (params) {
          if (params.value === '') {

            return { outline: '1px solid red' };
          } else {
            return { outline: 'white' };
          }
        }

      },
      {
        headerName: 'Address', field: 'address', sortable: true, filter: true, editable: true, width: 150,

        cellStyle: function (params) {
          if (params.value === '') {

            return { outline: '1px solid red' };
          } else {
            return { outline: 'white' };
          }
        }
      },
      {
        headerName: 'Country', field: 'country', sortable: true, filter: true, width: 90,
        cellRendererSelector: function (params) {
          var locationDetails = {
            component: 'countryFramework',
            params: { value: 'country' }
          };
          if (params.data.address_Status === '')
            return locationDetails;
          else
            return null;

        }
      },
      {
        headerName: 'State', field: 'state', sortable: true, filter: true, width: 100,

        cellRendererSelector: function (params) {
          var locationDetails = {
            component: 'countryFramework',
            params: { value: 'state' }
          };
          if (params.data.address_Status === '')
            return locationDetails;
          else
            return null;

        }
      },
      {
        headerName: 'City', field: 'city', sortable: true, filter: true, width: 100,
        //editable:true,
        cellRendererSelector: function (params) {
          var locationDetails = {
            component: 'countryFramework',
            params: { value: 'city' }
          };
          if (params.data.address_Status === '')
            return locationDetails;
          else
            return null;

        }


      },
      {
        headerName: 'Postal Code', field: 'pin_code', sortable: true, filter: true, editable: true, width: 100,

        cellStyle: function (params) {
          if (params.value === '') {

            return { outline: '1px solid red' };
          } else {
            return { outline: 'white' };
          }
        }

      },
      {
        headerName: 'Contact No.', field: 'contact_No', sortable: true, filter: true, editable: true, width: 100,

        cellStyle: function (params) {
          if (params.value === '') {

            return { outline: '1px solid red' };
          } else {
            return { outline: 'white' };
          }
        }
      },
      {
        headerName: 'Email ID', field: 'email_ID', sortable: true, filter: true, editable: true, width: 120,

        cellStyle: function (params) {
          if (params.value === '') {

            return { outline: '1px solid red' };
          } else {
            return { outline: 'white' };
          }
        }
      },
      {
        headerName: 'Emergency Contact Person', field: 'emergency_contact_person', sortable: true, filter: true, editable: true, width: 120,
        cellStyle: function (params) {
          if (params.value === '') {

            return { outline: '1px solid red' };
          } else {
            return { outline: 'white' };
          }
        }
      },
      {
        headerName: 'Emergency Contact No', field: 'emergency_contact_number', sortable: true, filter: true, editable: true, width: 120,
        cellStyle: function (params) {
          if (params.value === '') {

            return { outline: '1px solid red' };
          } else {
            return { outline: 'white' };
          }
        }
      },

    ];

    this.rowData1;


    this.columnDefs2 = [

      {



        headerName: 'Class', field: 'className', width: 80, editable: true,

        cellStyle: function (params) {
          if (params.value === '') {
            return { outline: '1px solid red' };
          } else {
            return { outline: 'white' };
          };
        }



      },
      {
        headerName: 'Board', field: 'boardName', sortable: true, filter: true, width: 80, editable: true,
        cellStyle: function (params) {
          if (params.value === '') {
            return { outline: '1px solid red' };
          } else {
            return { outline: 'white' };
          };
        }

      },
      {
        headerName: 'School Name', field: 'schoolName', sortable: true, filter: true, width: 130, editable: true,
        cellStyle: function (params) {
          if (params.value === '') {
            return { outline: '1px solid red' };
          } else {
            return { outline: 'white' };
          }
        }

      },
      {
        headerName: 'Start Date', field: 'startDate', sortable: true, filter: true, width: 150, editable: true,
        cellStyle: function (params) {
          if (params.value === '') {
            return { outline: '1px solid red' };
          } else {
            return { outline: 'white' };
          }
        }

      },
      {
        headerName: 'End Date', field: 'endDate', sortable: true, filter: true, width: 150, editable: true,
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

      { headerName: '', width: 208, }
    ];

    this.rowData2 = [];
    this.columnDefs4 = [
      { headerName: 'Degree', field: 'degree', editable: true, width: 80 },
      { headerName: 'Specialization', field: 'specialization', sortable: true, filter: true, editable: true, width: 120 },

      { headerName: 'University', field: 'university', sortable: true, filter: true, editable: true, width: 120 },
      { headerName: 'Start Date', field: 'startdate', sortable: true, filter: true, editable: true, width: 150 },
      { headerName: 'End Date', field: 'enddate', sortable: true, filter: true, editable: true, width: 150 },

      { headerName: 'Percentage', field: 'percentage', sortable: true, filter: true, editable: true, width: 120 },



      { headerName: '', field: '', width: 155, }

    ];

    this.rowData4 = [
    ];

    this.columnDefs5 = [
      { headerName: 'Degree', field: 'degree', editable: true, width: 80 },
      { headerName: 'Specialization', field: 'specialization', sortable: true, filter: true, editable: true, width: 120 },
      { headerName: 'University', field: 'university', sortable: true, filter: true, editable: true, width: 120 },
      { headerName: 'Start Date', field: 'startDate', sortable: true, filter: true, editable: true, width: 150 },
      { headerName: 'End Date', field: 'endDate', sortable: true, filter: true, editable: true, width: 150 },

      { headerName: 'Percentage', field: 'percentage', sortable: true, filter: true, editable: true, width: 120 },

      { headerName: '', field: '', width: 152, }
    ];

    this.rowData5 = [

    ];

    this.columnDefs6 = [
      { headerName: 'Degree', field: 'degree', editable: true, width: 80 },
      { headerName: 'Specialization', field: 'specialization', sortable: true, filter: true, editable: true, width: 120 },
      { headerName: 'University', field: 'university', sortable: true, filter: true, editable: true, width: 120 },
      { headerName: 'Start Date', field: 'startDate', sortable: true, filter: true, editable: true, width: 150 },
      { headerName: 'End Date', field: 'endDate', sortable: true, filter: true, editable: true, width: 150 },
      { headerName: 'Percentage', field: 'percentage', sortable: true, filter: true, editable: true, width: 120 },

      { headerName: '', width: 152, }

    ];

    this.rowData6 = [

    ];

    this.columnDefs7 = [

      { headerName: 'Institute', field: 'institute', editable: true, width: 120 },
      { headerName: 'Course', field: 'course', sortable: true, filter: true, editable: true, width: 120 },
      { headerName: 'Start Date', field: 'startDate', sortable: true, filter: true, editable: true, width: 120 },
      { headerName: 'End Date', field: 'endDate', sortable: true, filter: true, editable: true, width: 120 },
      { headerName: '', field: '', width: 520, }

    ];


    this.rowData7 = [
      // { Institute: 'Ducat', Course: 'Ruby', StartDate: '10-01-2018', EndDate: '10-06-2018' },

    ];


    this.columnDefs8 = [

      {
        headerName: 'Company Name', field: 'companyName', editable: true, width: 120,
        cellStyle: function (params) {
          if (params.value === '') {


            return { outline: '1px solid red' };
          } else {
            return { outline: 'white' };
          }
        }
      },
      {
        headerName: 'Designation', field: 'designation', sortable: true, filter: true, editable: true, width: 120,
        cellStyle: function (params) {
          if (params.value === '') {

            return { outline: '1px solid red' };
          } else {
            return { outline: 'white' };
          }
        }
      },
      {
        headerName: 'Department', field: 'department', sortable: true, filter: true, editable: true, width: 120,
        cellStyle: function (params) {
          if (params.value === '') {

            return { outline: '1px solid red' };
          } else {
            return { outline: 'white' };
          }
        }
      },
      {
        headerName: 'Joining Date', field: 'joiningDate', sortable: true, filter: true, editable: true, width: 120,
        cellStyle: function (params) {
          if (params.value === '') {

            return { outline: '1px solid red' };
          } else {
            return { outline: 'white' };
          }
        }
      },
      {
        headerName: 'Exit Date', field: 'exitDate', sortable: true, filter: true, editable: true, width: 120,
        cellStyle: function (params) {
          if (params.value === '') {

            return { outline: '1px solid red' };
          } else {
            return { outline: 'white' };
          }
        }
      },
      {
        headerName: 'Experience', field: 'experience', sortable: true, filter: true, editable: true, width: 120,
        cellStyle: function (params) {
          if (params.value === '') {

            return { outline: '1px solid red' };
          } else {
            return { outline: 'white' };
          }
        }
      },
      {
        headerName: 'Location', field: 'location', sortable: true, filter: true, editable: true, width: 120,
        cellStyle: function (params) {
          if (params.value === '') {

            return { outline: '1px solid red' };
          } else {
            return { outline: 'white' };
          }
        }
      },
    ];

    this.rowData8;

    this.columnDefs9 = [


      { headerName: 'Certificate Name', field: 'certificateName', editable: true, width: 120 },
      { headerName: 'Start Date', field: 'startDate', sortable: true, filter: true, editable: true, width: 120 },
      { headerName: 'End Date', field: 'endDate', sortable: true, filter: true, editable: true, width: 120 },

      { headerName: '', field: '', width: 538, }
    ];

    this.rowData9 = [

    ];

    this.columnDefs10 = [


      { headerName: 'Type of Account', field: 'TypeofAccount', editable: true, width: 120 },

      { headerName: 'Account Holder Name', field: 'AccountHolderName', sortable: true, filter: true, editable: true, width: 120 },
      { headerName: 'Account Number', field: 'AccountNumber', sortable: true, filter: true, editable: true, width: 120 },
      { headerName: 'IFSC', field: 'IFSC', sortable: true, filter: true, editable: true, width: 100 },
      { headerName: 'Branch Name', field: 'BranchName', sortable: true, filter: true, editable: true, width: 120 },
      { headerName: 'Primary', field: 'Primary', sortable: true, filter: true, editable: true, width: 80 },


      { headerName: '', field: '', width: 235, }
    ];

    this.rowData10 = [

    ];

    this.columnDefs11 = [


      { headerName: 'Passport No', field: 'PassportNo', sortable: true, filter: true, editable: true, width: 110 },
      { headerName: 'Expiry Date', field: 'ExpiryDate', sortable: true, filter: true, editable: true, width: 110 },
      { headerName: 'Upload Document', field: 'UploadDocument', sortable: true, filter: true, editable: true, width: 150 },
      { headerName: 'Time Duration', field: 'TimetoExpire', sortable: true, filter: true, editable: true, width: 150 },

      { headerName: '', field: '', width: 378, }
    ];

    this.rowData11 = [

    ];

    this.columnDefs12 = [


      { headerName: 'Country', field: 'Country', sortable: true, filter: true, editable: true, width: 100 },
      { headerName: 'Number Of Visit', field: 'NumberOfVisit', sortable: true, filter: true, editable: true, width: 120 },
      { headerName: 'Expiry Date', field: 'ExpiryDate', sortable: true, filter: true, editable: true, width: 120 },

      { headerName: 'Upload Document', field: 'UploadDocument', sortable: true, filter: true, editable: true, width: 140 },
      { headerName: 'Time to Expire', field: 'TimetoExpire', sortable: true, filter: true, editable: true, width: 120 },
      { headerName: '', field: '', width: 298, }
    ];

    this.rowData12 = [

    ];

    this.columnDefs13 = [
      { headerName: 'Documents', field: 'Documents', editable: true, width: 200 },
      { headerName: 'Curriculum Vitae', field: 'CurriculumVitae', sortable: true, filter: true, editable: true, width: 200 },
      { headerName: 'Expiry Date', field: 'ExpiryDate', sortable: true, filter: true, editable: true, width: 200 },
      { headerName: 'Upload Document', field: 'UploadDocument', sortable: true, filter: true, editable: true, width: 200 },
      { headerName: 'Time to Expire', field: 'TimetoExpire', sortable: true, filter: true, editable: true, width: 200 },

    ];

    this.rowData13 = [

    ];

    this.columnDefs14 = [


      { headerName: 'Driving Licence Number', field: 'DrivingLicence', sortable: true, filter: true, editable: true, width: 150 },
      { headerName: 'Expiry Date', field: 'ExpiryDate', sortable: true, filter: true, editable: true, width: 120 },
      { headerName: 'Upload Document', field: 'UploadDocument', sortable: true, filter: true, editable: true, width: 150 },
      { headerName: 'Time Duration', field: 'TimetoExpire', sortable: true, filter: true, editable: true, width: 130 },

      { headerName: '', field: '', width: 348, }
    ];

    this.rowData14 = [

    ];

    this.columnDefs15 = [


      { headerName: 'Medical Certificate', field: 'MedicalCertificate', sortable: true, filter: true, editable: true, width: 150 },
      { headerName: 'Expiry Date', field: 'ExpiryDate', sortable: true, filter: true, editable: true, width: 120 },
      { headerName: 'Upload Document', field: 'UploadDocument', sortable: true, filter: true, editable: true, width: 150 },
      { headerName: 'Time Duration', field: 'TimeDuration', sortable: true, filter: true, editable: true, width: 130 },

      { headerName: '', field: '', width: 348, }
    ];

    this.rowData15 = [

    ];

    this.columnDefs16 = [

      { headerName: 'Class/Degree', field: 'ClassDegree', editable: true, width: 100 },
      { headerName: 'Board/University', field: 'BoardUniversity', sortable: true, filter: true, editable: true, width: 140 },
      { headerName: 'Start Date', field: 'StartDate', sortable: true, filter: true, editable: true, width: 130 },
      { headerName: 'End Date', field: 'EndDate', sortable: true, filter: true, editable: true, width: 130 },
      { headerName: 'Upload Document', field: 'UploadDocument', sortable: true, filter: true, editable: true, width: 150 },

      { headerName: '', field: '', width: 248, }
    ];

    this.rowData16 = [

    ];
  }
  locationResponse;
  selectedLocationIndex: number;
  selectedDepartmentIndex: number;
  public selectedRowsProfessional: any[];
  saveUpdateProfessional: string;
  ShowProfessionalQualification: number = 0
  ToalProfessionalQualification: number = 0
  ShowLimitedProfessionalQualification: number = 0
  nodeSelectButWhere: string;


  public show: boolean = false;
  public hide: boolean = true;
  public buttonName: any = 'Add New';
  departmentResponse: GetAllLocationResponse[];
  newDate: Date;
  maritalStatus = 'Married';
  employementType = 'Contract';
  universalStatus: UniversalResponse;




  frameworkComponents = {
    countryFramework: LocationDropdownComponent
  };
  age: number;
  Schoolapi;
  columnApi;
  getSchoolResonseData: GetSchoolDataResponse[];
  addAddressToggleButton = false;
  saveAddressToggleButton = false;
  deleteAddressToggleButton = false;

  addExperienceToggleButton = false;
  saveExperienceToggleButton = false;
  deleteExperienceToggleButton = false
  getGraduationDetailsResponse: GetGraduationDetailsResponse[];
  getPostGraduationDetailsResponse: GetPostGraduationDetailsResponse[];
  getOtherEducationalResponse: GetOtherEducationalResponse[];
  getProfessionalEducationResponse: GetProfessionalEducationResponse[];
  getachievementResponse: AchievementResponse[];
  addNewRowSchool: boolean = false;
  addNewGraduationRow: boolean = false;
  addNewPostGraduationRow: boolean = false;
  addNewOther: boolean = false;
  addNewProfessionalQualification: boolean = false;
  editProfessionalQualification: boolean = false;
  deleteNewProfessionalQualification: boolean = false;
  deleteSchoolQualification: boolean = false;
  today;



  skill: string;
  skillResponse: SkillResponse[];

  public selectedRowsAchievement: any[];
  deleteNewAchievement: boolean = false;
  saveUpdateAchievement: string;
  nodeAchievementSelectButWhere: string;
  updateAchievement: boolean = false;
  addAchievementToggleButton = false;
  saveAchievementToggleButton = false;
  deleteAchievementToggleButton = false;


  ngOnInit() {
    this.today = new Date().toJSON().split('T')[0];
    //this.today = new DatePipe('en-US').transform(this.today, 'dd/MM/yyyy');
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
    this.getLocation(1);
    this.onGetSchoolQualification();
    this.onGetGraduational();
    this.onGetPostGraduational();
    this.onGetOther();
    this.onGetProfessionalEducation();
    console.log('this.today ' + this.today);
    this.getEmployeeExperience();

    this.getEmployeeAddress();

    this.saveUpdateExperience = 'Save';
    this.saveUpdateAddress = 'Save';

    console.log('this.today ' + this.today);
    this.addAddressToggleButton = true;
    this.saveAddressToggleButton = true;
    this.deleteAddressToggleButton = true;

    this.saveExperienceToggleButton = true;
    this.addExperienceToggleButton = true;
    this.deleteExperienceToggleButton = true;

    this.addAchievementToggleButton = false;
    this.saveAchievementToggleButton = false;
    this.deleteAchievementToggleButton = false;

    this.getAchievements();
    this.getAllSkills();

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

  onEmpExperienceGridReady(params) {
    this.empExperienceApi = params.api;
    this.empExperienceColumnApi = params.columnApi;
  }

  onAddAddress() {

    let res = this.addressApi.updateRowData({ add: [{ address: '', city: '', state: '', country: '', pin_code: '', address_Status: '', contact_No: '', email_ID: '', emergency_contact_person: '', emergency_contact_number: '' }], addIndex: 0 });
    this.addAddressToggleButton = true;

    this.saveAddressToggleButton = false;
    this.nodeAddressSelectButWhere = "Add";
    this.saveUpdateAddress = 'Save';
  }

  onSaveUpdateAddress() {

    if (this.saveUpdateAddress === "Save") {
      this.onSaveAddress();
    }
    else {

      this.onUpdateAddress();
    }
  }

  onUpdateAddress() {
    if (this.selectedRowAddress === undefined) {
      alert("Please enter input valid data then hit Edit")
    } else {
      const updateEmployeeAddressBody = new UpdateEmployeeAddressBody();
      const selectedNodes = this.addressApi.getSelectedNodes();

      const selectedData = selectedNodes.map(node => node.data);
      var dataTest: Object;
      selectedData.map(node => dataTest = node as Object);

      if (selectedData.length === 0) {
        alert("Please select a row");
      }
      updateEmployeeAddressBody.address_Status = dataTest['address_Status'];
      updateEmployeeAddressBody.address = dataTest['address'];

      updateEmployeeAddressBody.city = dataTest['city'];

      updateEmployeeAddressBody.state = dataTest['state'];
      updateEmployeeAddressBody.country = dataTest['country'];
      updateEmployeeAddressBody.pin_code = dataTest['pin_code'];
      updateEmployeeAddressBody.contact_No = dataTest['contact_No'];
      updateEmployeeAddressBody.email_ID = dataTest['email_ID'];
      updateEmployeeAddressBody.emergency_contact_person = dataTest['emergency_contact_person'];
      updateEmployeeAddressBody.emergency_contact_number = dataTest['emergency_contact_number'];


      if (dataTest['address_Status'] === '') {
        alert("Enter status ");
      }
      else if (dataTest['address'] === '') {
        alert("Enter address ");
      }
      // else if (dataTest['city'] === '') {
      //   alert("Enter city ");
      // }
      // else if (dataTest['state'] === '') {
      //   alert("Enter state ");
      // }
      // else if (dataTest['country'] === '') {
      //   alert("Enter country ");
      // }
      else if (dataTest['pin_code'] === '') {
        alert("Enter pincode ");
      }
      else if (dataTest['contact_No'] === '') {
        alert("Enter contact number ");
      }
      else if (this.isEmail(dataTest['email_ID']) === false) {
        alert("Enter valid email");
      }
      else if (dataTest['email_ID'] === '') {
        alert("Enter email id ");
      }
      else if (dataTest['emergency_contact_person'] === '') {
        alert("Enter emergency contact person ");
      }
      else if (dataTest['emergency_contact_number'] === '') {
        alert("Enter emergency contact number ");
      }
      else {
        updateEmployeeAddressBody.a_ID = dataTest['id'];
        if (updateEmployeeAddressBody.a_ID === undefined) {
          this.addressApi.removeItems(selectedNodes);
          this.addAddressToggleButton = false;
        }
        else {
          this.allwebService.updateEmployeeAddress(updateEmployeeAddressBody)
            .subscribe(
              data => {
                this.universalResponse = data;
                alert(this.universalResponse.MESSAGE);
                if (this.universalResponse.STATUS === 'Success') {
                  this.getEmployeeAddress();
                }
              }
            );
        }
      }
    }
  }
  isEmail(search: string): boolean {
    var serchfind: boolean;

    const regexp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);

    serchfind = regexp.test(search);
    return serchfind
  }

  onSaveAddress() {
    if (this.selectedRowAddress === undefined) {
      alert('Please enter input valid data then hit save.')
    }
    else {
      const employeeAddressBody = new EmployeeAddressBody();
      const selectedNodes = this.addressApi.getSelectedNodes();

      const selectedData = selectedNodes.map(node => node.data);
      var dataTest: Object;
      selectedData.map(node => dataTest = node as Object);

      if (selectedData.length === 0) {
        alert('Please select a row');
      }

      employeeAddressBody.address_Status = dataTest['address_Status'];
      employeeAddressBody.address = dataTest['address'];

      employeeAddressBody.city = this.selectedCityId + '';

      employeeAddressBody.state = this.selectedStateId + '';
      employeeAddressBody.country = this.selectedCountryId + '';
      employeeAddressBody.pin_code = dataTest['pin_code'];
      employeeAddressBody.contact_No = dataTest['contact_No'];
      employeeAddressBody.email_ID = dataTest['email_ID'];
      employeeAddressBody.emergency_contact_person = dataTest['emergency_contact_person'];
      employeeAddressBody.emergency_contact_number = dataTest['emergency_contact_number'];
      let eValidate: boolean;
      eValidate = this.isEmail(dataTest['email_ID']);
      if (dataTest['address_Status'] === '') {
        alert("Enter status ");
      }
      else if (dataTest['address'] === '') {
        alert("Enter address ");
      }
      else if (dataTest['pin_code'] === '') {
        alert("Enter pincode ");
      }
      else if (dataTest['contact_No'] === '') {
        alert("Enter contact number ");
      }
      else if (dataTest['email_ID'] === '') {
        alert("Enter email id ");
      }
      else if (eValidate === false) {
        alert("Enter valid email");
      }
      else if (dataTest['emergency_contact_person'] === '') {
        alert("Enter emergency contact person ");
      }
      else if (dataTest['emergency_contact_number'] === '') {
        alert("Enter emergency contact number ");
      }
      else {
        this.allwebService.saveEmpolyeeAddress(employeeAddressBody)
          .subscribe(
            data => {
              this.universalResponse = data;

              alert(this.universalResponse.MESSAGE);

              if (this.universalResponse.STATUS === 'Success') {
                this.getEmployeeAddress();
              }
            }
          );
      }
    }
  }

  getEmployeeAddress() {
    const universalBody = new UniversalBody();
    this.allwebService.getEmpolyeeAddress(universalBody)
      .subscribe(
        data => {
          this.employeeeAddressResponse = data;
          if (this.employeeeAddressResponse.length === 0) {

            this.TotalAddress = this.employeeeAddressResponse.length;
            this.saveUpdateAddress = "Save";

            this.addAddressToggleButton = false;
            this.saveAddressToggleButton = true;
            this.deleteAddressToggleButton = true;
          } else {

            if (this.employeeeAddressResponse.length >= 50) {
              this.ShowLimitedAddress = 50;
            } else {
              this.ShowLimitedAddress = this.employeeeAddressResponse.length;
            }

            this.TotalAddress = this.employeeeAddressResponse.length;
            this.saveUpdateAddress = "Save";

            this.saveAddressToggleButton = true;
            this.addAddressToggleButton = false;
            this.deleteAddressToggleButton = true;
            this.rowData1 = this.employeeeAddressResponse;
          }
          //console.log(this.employeeeAddressResponse);
        }

      )
  }

  onDeleteAddress() {
    const selectedNodes = this.addressApi.getSelectedNodes();
    var dataTest: Object;
    const deleteEmployeeAddressBody = new DeleteEmployeeAddressBody();
    const selectedData = selectedNodes.map(node => node.data);
    selectedData.map(node => dataTest = node as Object);
    var l = selectedData.length;
    var i: number;
    let deleteid: string = "abc";

    var addressid: string;

    for (i = 0; i < l; i++) {

      let rowNode1 = this.addressApi.getDisplayedRowAtIndex(i);

      addressid = String(rowNode1.data.id);
      deleteid = deleteid + "," + addressid;
      //alert(deleteid);
    }
    var splitId = deleteid.split("T")[0].split("abc,");
    var empAddressId = splitId[1];

    alert(empAddressId);

    if (selectedNodes.length === 0) {
      alert("Please Select a row");
    } else {
      deleteEmployeeAddressBody.a_ID = dataTest['id'];
      if (deleteEmployeeAddressBody.a_ID === undefined) {

        this.addressApi.removeItems(selectedNodes);
        this.addAddressToggleButton = false;

      } else {


        // this.allwebService.deleteEmpolyeeAddress(deleteEmployeeAddressBody)
        //   .subscribe(
        //     data => {
        //       this.universalResponse = data;
        //       alert(this.universalResponse.MESSAGE);
        //       if (this.universalResponse.STATUS === 'Success') {
        //         this.addressApi.removeItems(selectedNodes);
        //         this.addAddressToggleButton = false;
        //         this.getEmployeeAddress();
        //       }
        //     }
        //   );
      }
      this.deleteAddressToggleButton = true;
      this.saveAddressToggleButton = true;
    }

  }

  onAddressSelectionChanged() {
    this.selectedRowAddress = this.addressApi.getSelectedRows();
    this.rowSelection = "multiple";
    if (this.selectedRowAddress.length === 1) {
      if (this.getEmployeeAddress.length === 1) {
        this.deleteAddressToggleButton = false;
        this.addressFilter = true;
        this.empAddressCheckedStatus = false;

      }
      else {
        this.deleteAddressToggleButton = false;
        this.addressFilter = false;
        this.empAddressCheckedStatus = false;
      }
      console.log("NodeBut Where", this.nodeAddressSelectButWhere);

      if (this.nodeAddressSelectButWhere === "Add") {
        this.saveUpdateAddress = "Save";
        this.nodeAddressSelectButWhere = "Edit";
      } else if (this.nodeAddressSelectButWhere === undefined) {
        this.saveUpdateAddress = "Update";


        this.saveAddressToggleButton = false;
      }
      else if (this.nodeAddressSelectButWhere === 'Update') {
        this.saveAddressToggleButton = false;
        this.saveUpdateAddress = 'Update';
      }
    }
    else if (this.selectedRowAddress.length >= 1) {
      this.saveAddressToggleButton = true;

    }
  }

  onAddressFilterChange() {


    if (this.empAddressCheckedStatus === false) {

      this.addressApi.selectAll();
      this.addressFilter = true;
      this.empAddressCheckedStatus = true;
      this.deleteAddressToggleButton = false;
      this.addAddressToggleButton = true;
    } else {
      this.addressApi.deselectAll();
      this.addressFilter = false;
      this.empAddressCheckedStatus = false;
      this.deleteAddressToggleButton = true;
      this.addAddressToggleButton = false;
    }

  }







  
  getLocation(UserID: number) {
    var locationBody = new UniversalBody();
    locationBody.userID = UserID + '';
    this.allwebService.doGetLocation(locationBody)
      .subscribe(
        data => {
          this.locationResponse = data;
          this.selectedLocationIndex = this.locationResponse.length - 1;
        }
      );
  }
  onAddEmpExperience() {

    let res = this.empExperienceApi.updateRowData({ add: [{ companyName: '', designation: '', department: '', joiningDate: '', exitDate: '', experience: '', location: '', }], addIndex: 0 });
    this.addExperienceToggleButton = true;
    this.saveExperienceToggleButton = false;
    this.nodeExpSelectButWhere = 'Add';
    this.saveUpdateExperience = 'Save';

  }
  onSaveUpdateEmpExperience() {

    if (this.saveUpdateExperience === "Save") {
      this.onSaveEmpExperience();
    } else {

      this.onUpdateEmpExperience();
    }

  }

  onUpdateEmpExperience() {


    this.saveExperienceToggleButton = false;
    if (this.selectedRowExperience === undefined) {
      alert("Please enter input valid data then hit Edit.")
    } else {

      const updateEmployeeExperienceBody = new UpdateEmployeeExperienceBody();
      const selectedNodes = this.empExperienceApi.getSelectedNodes();

      const selectedData = selectedNodes.map(node => node.data);
      var dataTest: Object;
      selectedData.map(node => dataTest = node as Object);

      if (selectedData.length === 0) {
        alert("Please select a row");
      }
      updateEmployeeExperienceBody.companyName = dataTest['companyName'];
      updateEmployeeExperienceBody.designation = dataTest['designation'];

      updateEmployeeExperienceBody.department = dataTest['department'];


      var startDteSplitted = dataTest['joiningDate'].split("T")[0].split("-");
      var startDated = startDteSplitted[2] + "/" + startDteSplitted[1] + "/" + startDteSplitted[0];
      var endDteSplitted = dataTest['exitDate'].split("T")[0].split("-");
      var endDated = endDteSplitted[2] + "/" + endDteSplitted[1] + "/" + endDteSplitted[0];

      updateEmployeeExperienceBody.experience = dataTest['experience'];
      updateEmployeeExperienceBody.location = dataTest['location'];
      updateEmployeeExperienceBody.joiningDate = startDated;
      updateEmployeeExperienceBody.exitDate = endDated;


      if (dataTest['companyName'] === '') {
        alert("Enter company name ");
      }
      else if (dataTest['designation'] === '') {
        alert("Enter designation ");
      }

      else if (dataTest['department'] === '') {
        alert("Enter department ");
      }
      else if (dataTest['joiningDate'] === '') {
        alert("Enter joiningDate ");
      }
      else if (dataTest['exitDate'] === '') {
        alert("Enter exitDate ");
      }
      else if (dataTest['experience'] === '') {
        alert("Enter experience");
      }
      else if (dataTest['location'] === '') {
        alert("Enter location ");
      }
      else {
        updateEmployeeExperienceBody.expId = dataTest['id'];

        if (updateEmployeeExperienceBody.expId === undefined) {
          alert("undefined");
          this.empExperienceApi.removeItems(selectedNodes);
        }
        else {
          //alert(JSON.stringify(updateEmployeeExperienceBody));

          this.allwebService.updateEmpExperience(updateEmployeeExperienceBody)
            .subscribe(
              data => {
                this.universalResponse = data;

                alert(this.universalResponse.MESSAGE);

                if (this.universalResponse.STATUS === 'Success') {

                  this.addExperienceToggleButton = false;
                  this.getEmployeeExperience();
                }
              }
            );
        }
      }
    }
  }

  onSaveEmpExperience() {
    if (this.selectedRowExperience === undefined) {
      alert("Please enter input valid data then hit save.")
    }
    else {
      const employeeExperienceBody = new EmployeeExperienceBody();
      const selectedNodes = this.empExperienceApi.getSelectedNodes();

      const selectedData = selectedNodes.map(node => node.data);
      var dataTest: Object;
      selectedData.map(node => dataTest = node as Object);

      if (selectedData.length === 0) {
        alert("Please select a row");
      }
      employeeExperienceBody.companyName = dataTest['companyName'];
      employeeExperienceBody.designation = dataTest['designation'];

      employeeExperienceBody.department = dataTest['department'];

      employeeExperienceBody.joiningDate = dataTest['joiningDate'];
      employeeExperienceBody.exitDate = dataTest['exitDate'];
      employeeExperienceBody.experience = dataTest['experience'];
      employeeExperienceBody.location = dataTest['location'];


      if (dataTest['companyName'] === '') {
        alert("Enter company name ");
      }
      else if (dataTest['designation'] === '') {
        alert("Enter designation ");
      }

      else if (dataTest['department'] === '') {
        alert("Enter department ");
      }
      else if (dataTest['joiningDate'] === '') {
        alert("Enter joiningDate ");
      }
      else if (dataTest['exitDate'] === '') {
        alert("Enter exitDate ");
      }
      else if (dataTest['experience'] === '') {
        alert("Enter experience");
      }
      else if (dataTest['location'] === '') {
        alert("Enter location ");
      }
      else {

        this.allwebService.saveEmpExperience(employeeExperienceBody)
          .subscribe(
            data => {
              this.universalResponse = data;

              alert(this.universalResponse.MESSAGE);

              if (this.universalResponse.STATUS === 'Success') {

                this.getEmployeeExperience();
              }
            }
          );
      }
    }
  }

  onDeleteExperience() {

    const selectedNodes = this.empExperienceApi.getSelectedNodes();
    var dataTest: Object;
    const deleteEmployeeExperiencebody = new DeleteEmployeeExperienceBody();
    const selectedData = selectedNodes.map(node => node.data);
    selectedData.map(node => dataTest = node as Object);

    // var l = selectedData.length;
    // var i: number;
    // let deleteid: string ="abc";

    // var empid: string ;

    // for (i = 0; i < l; i++) {

    //  let  rowNode1 = this.empExperienceApi.getDisplayedRowAtIndex(i);

    //   empid = String(rowNode1.data.id);
    //    deleteid = deleteid +"," + empid;
    //  //alert(deleteid);
    // }
    // var splitId = deleteid.split("T")[0].split("abc,");
    // var empExpId =  splitId[1];

    // alert(empExpId);

    if (selectedNodes.length === 0) {
      alert("Please Select a row");
    }
    else {
      deleteEmployeeExperiencebody.expId = dataTest['id'];

      if (deleteEmployeeExperiencebody.expId === undefined) {
        this.addExperienceToggleButton = false;
        this.empExperienceApi.removeItems(selectedNodes);
      }
      else {
        this.allwebService.deleteEmpExperience(deleteEmployeeExperiencebody)
          .subscribe(
            data => {
              this.universalResponse = data;
              alert(this.universalResponse.MESSAGE);
              if (this.universalResponse.STATUS === 'Success') {
                this.empExperienceApi.removeItems(selectedNodes);
                this.addExperienceToggleButton = false;
                this.getEmployeeExperience();

              }


            }
          );
      }
    }
    this.saveExperienceToggleButton = true;
    this.deleteExperienceToggleButton = true;

  }

  getEmployeeExperience() {

    const universalBody = new UniversalBody();
    this.allwebService.getEmpolyeeExperience(universalBody)
      .subscribe(
        data => {
          this.employeeExperienceResponse = data;

          if (this.employeeExperienceResponse.length === 0) {
            this.TotalExperience = this.employeeExperienceResponse.length;
            this.saveUpdateExperience = "Save";

            this.saveExperienceToggleButton = true;
            this.addExperienceToggleButton = false;
            this.deleteExperienceToggleButton = true;
          } else {

            if (this.employeeExperienceResponse.length >= 50) {
              this.ShowLimitedExperience = 50;
            } else {
              this.ShowLimitedExperience = this.employeeExperienceResponse.length;
            }

            this.TotalExperience = this.employeeExperienceResponse.length;
            this.saveUpdateExperience = "Save";

            this.saveExperienceToggleButton = true;
            this.addExperienceToggleButton = false;
            this.deleteExperienceToggleButton = true;
            this.rowData8 = this.employeeExperienceResponse;
          }
          //console.log(this.employeeeAddressResponse);
        }
      )
  }


  onEmpExperienceSelectionChanged() {
    this.selectedRowExperience = this.empExperienceApi.getSelectedRows();
    if (this.selectedRowExperience.length === 1) {
      if (this.employeeExperienceResponse.length === 1) {
        this.deleteExperienceToggleButton = false;
        this.empFilter = true;
        this.empExperienceCheckedStatus = false;
      }
      else {

        this.deleteExperienceToggleButton = false;
        console.log("NodeBut Where", this.nodeExpSelectButWhere);
        this.empFilter = false;
        this.empExperienceCheckedStatus = false;
      }

      if (this.nodeExpSelectButWhere === "Add") {
        this.saveUpdateExperience = "Save";
        this.nodeExpSelectButWhere = "Edit"
      }
      else if (this.nodeExpSelectButWhere === undefined) {
        this.saveUpdateExperience = "Update";


        this.saveExperienceToggleButton = false
      }
      else if (this.nodeExpSelectButWhere === 'Update') {
        this.saveExperienceToggleButton = false;
        this.saveUpdateExperience = 'Update';
      }
      else if (this.selectedRowExperience.length >= 1) {
        this.saveExperienceToggleButton = true;

      }
    }
  }

  onEmpFilterChange(event) {

    if (this.empExperienceCheckedStatus === false) {

      this.empExperienceApi.selectAll();
      this.empFilter = true;
      this.empExperienceCheckedStatus = true;
      this.deleteExperienceToggleButton = false;
      this.addExperienceToggleButton = true;
    } else {
      this.empExperienceApi.deselectAll();
      this.empFilter = false;
      this.empExperienceCheckedStatus = false;
      this.deleteExperienceToggleButton = true;
      this.addExperienceToggleButton = false;
    }
  }
  universalDelete() {
    const experienceSelectedNodes = this.empExperienceApi.getSelectedNodes();
    const addressSelectedNodes = this.addressApi.getSelectedNodes();
    const acheivementSelectedNode = this.achievementApi.getSelectedNodes();
    if (addressSelectedNodes.length !== 0) {
      this.onDeleteAddress();
    }
    else if (experienceSelectedNodes.length !== 0) {
      this.onDeleteExperience();
    }
    else if (acheivementSelectedNode.length !== 0) {
      this.onDeleteAchievement();
    }
  }

  onDepartmentClick() {
    this.getAllDepartment(1, this.locationResponse[this.selectedLocationIndex].id);

  }
  onDesignationClick() {
    this.getAllDesignation('1', this.departmentResponse[this.selectedDepartmentIndex].id);

  }

  updateCalcs(date: number) {
    var today = new Date();
    // this.today = new DatePipe('en-US').transform(this.today, 'dd/MM/yyyy');
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
  }
  public getSelectedDesignation(value): void {
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
    var parsedate = new DatePipe('en-US').transform(this.today, 'dd/MM/yyyy');

    basicDetailBody.Anniversary = '';
    basicDetailBody.E_Code = this.basicDetailsForm.controls.empCode.value;
    basicDetailBody.E_DOB = parsedate;
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
    this.Schoolapi = params.api;
    this.columnApi = params.columnApi;
    this.Schoolapi.sizeColumnsToFit();
  }

  onSelectionChanged() {
    const selectedRows = this.Schoolapi.getSelectedRows();
    let selectedRowsString = '';
    selectedRows.forEach(function (selectedRow, index) {
      if (index !== 0) {
        selectedRowsString += ', ';
      }
      selectedRowsString += selectedRow.athlete;
    });
    document.querySelector('#selectedRows').innerHTML = selectedRowsString;
  }

  // Education - School
  onAddSchoolQualification() {
    this.addNewRowSchool = true;
    let res = this.Schoolapi.updateRowData({ add: [{ class: 'High School' }] });
    res.add.forEach(function (rowNode) {
      console.log('Added Row Node', rowNode);
    });
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
    const selectedNodes = this.Schoolapi.getSelectedNodes();
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
    var selectedNodes = this.Schoolapi.getSelectedNodes();
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
        this.Schoolapi.removeItems(selectedNodes);
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

                if (this.checkedStatusSchool === true) {
                  this.checkedStatusSchool = false;
                }

              } else {
                // alert(universalResonse.STATUS + ' : ' + universalResonse.MESSAGE);
              }
            }
          );
      }
    }
  }

  onCheckedBoxSchoolChange(eve: any) {
    if (this.checkedStatusSchool === false) {
      console.log("checkedSchool", this.checkedStatusSchool);
      this.Schoolapi.selectAll();
      this.checkedStatusSchool = true;
      this.deleteSchoolQualification = false;
    } else if (this.checkedStatusSchool === true) {
      this.Schoolapi.deselectAll();
      this.checkedStatusSchool = false;
      this.deleteSchoolQualification = true;
    }

  }



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
          this.getGraduationDetailsResponse = data;
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

  // Educational - PostGraduation
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

  // Educational - Others
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

  // Professional Education
  onProfessionalQualification() {
    this.addNewProfessionalQualification = true;
    this.editProfessionalQualification = false;
    let res = this.professionalQualificationApi.updateRowData({ add: [{ institute: '', course: '', startDate: '', endDate: '' }], addIndex: 0 });

    res.add.forEach(function (rowNode) {
      console.log('Added Row Nodes', rowNode);
    });
    this.nodeSelectButWhere = "Add";
  }

  onGridProfessionalQualificationReady(params) {
    this.professionalQualificationApi = params.api;
    this.professionalQualificationColumnApi = params.columnApi;
  }

  onGetProfessionalEducation() {
    var getSchoolModel = new GetSchoolModel();
    this.allwebService.getProfessionalEducation(getSchoolModel)
      .subscribe(
        data => {

          this.getProfessionalEducationResponse = data;

          console.log("AAAAA", this.getProfessionalEducationResponse);
          if (this.getProfessionalEducationResponse.length === 0) {
            this.ToalProfessionalQualification = this.getProfessionalEducationResponse.length;
            this.saveUpdateProfessional = "Save";
            this.editProfessionalQualification = false;
            this.addNewProfessionalQualification = false;
            this.deleteNewProfessionalQualification = true;
          } else {

            if (this.getProfessionalEducationResponse.length >= 50) {
              this.ShowLimitedProfessionalQualification = 50;
              this.ShowProfessionalQualification = 1;
            } else {
              this.ShowProfessionalQualification = 1;
              this.ShowLimitedProfessionalQualification = this.getProfessionalEducationResponse.length;
            }

            this.ToalProfessionalQualification = this.getProfessionalEducationResponse.length;
            this.saveUpdateProfessional = "Save";

            this.editProfessionalQualification = true;
            this.addNewProfessionalQualification = false;
            this.deleteNewProfessionalQualification = true;
            this.rowData7 = this.getProfessionalEducationResponse;
          }


          // console.log("QWERTYUI",this.getProfessionalEducationResponse.length);

        }
      );
  }

  onSaveUpdateProfessionalEducationData() {
    if (this.saveUpdateProfessional === "Save") {
      this.onSaveProfessionalEducationData();
    } else {
      this.onUpdateProfessionalEducationData();
    }
  }

  onSaveProfessionalEducationData() {
    console.log("Logs", this.selectedRowsProfessional);
    if (this.selectedRowsProfessional === undefined) {
      alert("Please enter input valid data then hit save.")
    } else {
      alert('Do you want to save the data.');
      const selectedNodes = this.professionalQualificationApi.getSelectedNodes();
      if (selectedNodes.length === 0) {
        alert("Please Input Valid Data");
      } else {
        const professionalBodySave = new ProfessionalBodySave();
        const selectedData = selectedNodes.map(node => node.data);
        var universalResonse: UniversalResponse;
        var dataTest: Object;
        selectedData.map(node => dataTest = node as Object);
        professionalBodySave.institute = dataTest['institute'];
        professionalBodySave.course = dataTest['course'];
        professionalBodySave.startDate = dataTest['startDate'];
        professionalBodySave.endDate = dataTest['endDate'];
        if (dataTest['institute'] === '') {
          alert("Enter Institute Name");
        } else if (dataTest['course'] === '') {
          alert("Enter Course");
        } else if (dataTest['startDate'] === '') {
          alert("Enter Start Date");
        } else if (dataTest['endDate'] === '') {
          alert("Enter End Date");
        } else {
          this.allwebService.saveProfessionalEducation(professionalBodySave)
            .subscribe(
              data => {
                universalResonse = data;
                console.log("recived", universalResonse.STATUS);
                if (universalResonse.STATUS === "Success") {
                  alert(universalResonse.STATUS + " : " + universalResonse.MESSAGE);
                  this.addNewProfessionalQualification = false;
                  this.onGetProfessionalEducation();
                  this.nodeSelectButWhere = "Edit"
                } else {
                  alert(universalResonse.STATUS + ' : ' + universalResonse.MESSAGE);
                }
              }
            );
        }
      }
    }
  }

  onUpdateProfessionalEducationData() {
    this.editProfessionalQualification = false;
    if (this.selectedRowsProfessional === undefined) {
      alert("Please enter input valid data then hit save.")
    } else {
      alert('Do you want to save the data.');
      const selectedNodes = this.professionalQualificationApi.getSelectedNodes();
      if (selectedNodes.length === 0) {
        alert("Please Input Valid Data");
      } else {
        const professionalBodyUpdate = new ProfessionalBodyUpdate();
        const selectedData = selectedNodes.map(node => node.data);
        var universalResonse: UniversalResponse;
        var dataTest: Object;
        selectedData.map(node => dataTest = node as Object);

        var startDteSplitted = dataTest['startDate'].split("T")[0].split("-");
        var startDated = startDteSplitted[2] + "/" + startDteSplitted[1] + "/" + startDteSplitted[0];
        var endDteSplitted = dataTest['endDate'].split("T")[0].split("-");
        var endDated = endDteSplitted[2] + "/" + endDteSplitted[1] + "/" + endDteSplitted[0];

        professionalBodyUpdate.institute = dataTest['institute'];
        professionalBodyUpdate.course = dataTest['course'];
        professionalBodyUpdate.startDate = startDated;
        professionalBodyUpdate.endDate = endDated;

        professionalBodyUpdate.qId = dataTest['qId'];
        if (dataTest['institute'] === '') {
          alert("Enter Institute Name");
        } else if (dataTest['course'] === '') {
          alert("Enter Course");
        } else if (dataTest['startDate'] === '') {
          alert("Enter Start Date");
        } else if (dataTest['endDate'] === '') {
          alert("Enter End Date");
        } else {
          console.log("Key", professionalBodyUpdate);
          this.allwebService.updateProfessionalEducation(professionalBodyUpdate)
            .subscribe(
              data => {
                universalResonse = data;
                console.log("recived", universalResonse.STATUS);
                if (universalResonse.STATUS === "Success") {
                  alert(universalResonse.STATUS + " : " + universalResonse.MESSAGE);
                  this.addNewProfessionalQualification = false;
                  this.nodeSelectButWhere = "Edit"
                  this.onGetProfessionalEducation();
                } else {
                  alert(universalResonse.STATUS + ' : ' + universalResonse.MESSAGE);
                }
              }
            );
        }
      }
    }
  }

  onDeleteProfessionalEducation() {
    var selectedNodes = this.professionalQualificationApi.getSelectedNodes();
    var dataTest: Object;
    const deletedProfessionalEducation = new DeletedProfessionalEducation();
    var universalResonse: UniversalResponse;
    const selectedData = selectedNodes.map(node => node.data);
    selectedData.map(node => dataTest = node as Object);
    if (selectedNodes.length === 0) {
      alert("Please Select any row.");
    } else {
      deletedProfessionalEducation.qId = dataTest['qId'];
      if (deletedProfessionalEducation.qId === undefined) {
        alert("Please Select valid row.");
        this.professionalQualificationApi.removeItems(selectedNodes);
        this.addNewProfessionalQualification = false;
      } else {
        this.allwebService.deleteProfessionalEducation(deletedProfessionalEducation)
          .subscribe(
            data => {
              universalResonse = data;
              if (universalResonse.STATUS === "Success") {
                this.addNewProfessionalQualification = false;
                // alert(universalResonse.STATUS + " : " + universalResonse.MESSAGE);
                this.professionalQualificationApi.removeItems(selectedNodes);
                this.onGetProfessionalEducation();

                if (this.checkedStatusProfessional === true) {
                  this.checkedStatusProfessional = false;
                }

              } else {
                // alert(universalResonse.STATUS + ' : ' + universalResonse.MESSAGE);
              }
            }
          );
      }
    }
  }

  onProfessionalSelectionChanged() {
    this.selectedRowsProfessional = this.professionalQualificationApi.getSelectedRows();
    this.rowSelection = "multiple";
    if (this.selectedRowsProfessional.length === 1) {
      this.checkedStatusProfessional = false;
      this.deleteNewProfessionalQualification = false;
      console.log("selectedProfessional", this.nodeSelectButWhere);
      if (this.nodeSelectButWhere === "Add") {
        this.saveUpdateProfessional = "Save";
        this.nodeSelectButWhere = "Edit"
      } else if (this.nodeSelectButWhere === undefined) {
        this.saveUpdateProfessional = "Edit";
        this.editProfessionalQualification = false;
      } else if (this.nodeSelectButWhere === "Edit") {
        this.saveUpdateProfessional = "Edit";
        this.editProfessionalQualification = false;
      }

    }
  }

  onCheckedBoxProfessionalChange(eve: any) {
    if (this.checkedStatusProfessional === false) {
      this.professionalQualificationApi.selectAll();
      this.checkedStatusProfessional = true;
      this.deleteNewProfessionalQualification = false;
    } else if (this.checkedStatusProfessional === true) {
      this.professionalQualificationApi.deselectAll();
      this.checkedStatusProfessional = false;
      this.deleteNewProfessionalQualification = true;
    }
  }



  //Skills




  onSkillsSaveClick() {
    var skillBody = new SkillBody();
    skillBody.Skills = this.skill;
    skillBody.userID = "1";
    skillBody.UpdatedBy = "1";
    this.allwebService.saveSkills(skillBody)
      .subscribe(
        data => {
          this.universalResponse = data;
          alert(this.universalResponse.MESSAGE)
          if (this.universalResponse.STATUS === 'Success') {
            this.getAllSkills();
          }
        }
      );
  }

  getAllSkills() {
    const universalBody = new UniversalBody();
    this.allwebService.getSkills(universalBody)
      .subscribe(
        data => {
          this.skillResponse = data;
        }
      )
  }


  //Achievements/Certificates


  onAddAchievementsClick() {
    this.addAchievementToggleButton = true;
    this.updateAchievement = false;
    this.nodeAchievementSelectButWhere = "Add";
    let res = this.achievementApi.updateRowData({ add: [{ certificateName: '', startDate: '', endDate: '' }], addIndex: 0 });
  }


  onAchievementGridReady(params) {
    this.achievementApi = params.api;
    this.achievementColumnApi = params.columnApi;
  }

  onAchievementSelectionChanged() {
    this.selectedRowsAchievement = this.achievementApi.getSelectedRows();
    if (this.selectedRowsAchievement.length === 1) {
      this.deleteNewAchievement = false;
      if (this.nodeAchievementSelectButWhere === "Add") {
        this.saveUpdateAchievement = "Save";
        this.nodeAchievementSelectButWhere = "Edit"
      } else if (this.nodeAchievementSelectButWhere === undefined) {

        this.saveUpdateAchievement = "Update";
      }
    }
  }

  getAchievements() {
    var universalBody = new UniversalBody();

    this.allwebService.getAchievement(universalBody)
      .subscribe(
        data => {
          this.getachievementResponse = data;

          if (this.getachievementResponse.length === 0) {
            this.saveUpdateAchievement = "Save";
            this.updateAchievement = false;
            this.addAchievementToggleButton = false;
            this.deleteAchievementToggleButton = true;
            console.log("achivementededed", "this.getachievementResponse");
          } else {
            this.saveUpdateAchievement = "Save";
            this.updateAchievement = true;
            this.addAchievementToggleButton = false;
            this.deleteAchievementToggleButton = true;
            this.rowData9 = this.getachievementResponse;
            console.log("achivement", this.rowData9);
          }
        }
      );
  }

  onSaveUpdateAchievement() {
    if (this.saveUpdateAchievement === "Save") {
      this.onSaveAchievement();
    } else {
      this.onUpdateAchievement();
    }
  }

  onSaveAchievement() {

    const achievementBody = new AchievementBody();
    const selectedNodes = this.achievementApi.getSelectedNodes();

    const selectedData = selectedNodes.map(node => node.data);
    var dataTest: Object;
    if (this.selectedRowsAchievement === undefined) {
      alert("Please enter input valid data then hit save.")
    }

    selectedData.map(node => dataTest = node as Object);

    achievementBody.certificateName = dataTest['certificateName'];
    achievementBody.startDate = dataTest['startDate'];
    achievementBody.endDate = dataTest['endDate'];

    if (dataTest['certificateName'] === '') {
      alert("Enter CertificateName ");
    }
    else if (dataTest['startDate'] === '') {
      alert("Enter StartDate ");
    }

    else if (dataTest['endDate'] === '') {
      alert("Enter EndDate ");
    }

    else {
      this.allwebService.saveAchievement(achievementBody)
        .subscribe(
          data => {
            this.universalResponse = data;

            alert(this.universalResponse.MESSAGE);

            if (this.universalResponse.STATUS === 'Success') {
              this.getAchievements();
            }
          }
        );
    }


  }

  onUpdateAchievement() {
    this.updateAchievement = false;
    if (this.selectedRowsAchievement === undefined) {
      alert("Please enter input valid data then hit save.")
    } else {
      alert('Do you want to save the data.');
      const selectedNodes = this.achievementApi.getSelectedNodes();
      if (selectedNodes.length === 0) {
        alert("Please Input Valid Data");
      } else {
        const achievementBodyUpdate = new UpdateAchievementBody();
        const selectedData = selectedNodes.map(node => node.data);
        var universalResonse: UniversalResponse;
        var dataTest: Object;
        selectedData.map(node => dataTest = node as Object);

        var startDteSplitted = dataTest['startDate'].split("T")[0].split("-");
        var startDated = startDteSplitted[2] + "/" + startDteSplitted[1] + "/" + startDteSplitted[0];
        var endDteSplitted = dataTest['endDate'].split("T")[0].split("-");
        var endDated = endDteSplitted[2] + "/" + endDteSplitted[1] + "/" + endDteSplitted[0];

        achievementBodyUpdate.cId = dataTest['cid'];
        achievementBodyUpdate.certificateName = dataTest['certificateName'];
        achievementBodyUpdate.startDate = startDated;
        achievementBodyUpdate.endDate = endDated;


        if (dataTest['certificateName'] === '') {
          alert("Enter Certificate Name");
        } else if (dataTest['course'] === '') {
          alert("Enter Course");
        } else if (dataTest['startDate'] === '') {
          alert("Enter Start Date");
        } else if (dataTest['endDate'] === '') {
          alert("Enter End Date");
        } else {
          console.log("Key", achievementBodyUpdate);
          this.allwebService.updateAchievement(achievementBodyUpdate)
            .subscribe(
              data => {
                universalResonse = data;
                console.log("recived", universalResonse.STATUS);
                if (universalResonse.STATUS === "Success") {
                  alert(universalResonse.STATUS + " : " + universalResonse.MESSAGE);
                  this.addNewProfessionalQualification = false;
                  this.onGetProfessionalEducation();
                  this.nodeAchievementSelectButWhere = "Update"
                } else {
                  alert(universalResonse.STATUS + ' : ' + universalResonse.MESSAGE);
                }
              }
            );
        }
      }
    }
  }

  onDeleteAchievement() {

    var selectedNodes = this.achievementApi.getSelectedNodes();
    var dataTest: Object;
    const deletedAchievement = new DeleteAchievementBody();
    var universalResonse: UniversalResponse;
    const selectedData = selectedNodes.map(node => node.data);
    selectedData.map(node => dataTest = node as Object);
    if (selectedNodes.length === 0) {
      alert("Please Select any row.");
    } else {
      deletedAchievement.cId = dataTest['cid'];
      if (deletedAchievement.cId === undefined) {
        alert("Please Select valid row.");
        this.addAchievementToggleButton = false;
      } else {
        this.allwebService.deleteAchievement(deletedAchievement)
          .subscribe(
            data => {
              universalResonse = data;
              if (universalResonse.STATUS === "Success") {
                this.addAchievementToggleButton = false;
                this.achievementApi.removeItems(selectedNodes);
                this.getAchievements();

                if (this.checkedStatus === true) {
                  this.checkedStatus = false;
                }

              } else {
                // alert(universalResonse.STATUS + ' : ' + universalResonse.MESSAGE);
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


