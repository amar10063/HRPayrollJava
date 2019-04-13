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

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  basicDetailsForm: FormGroup;
  titles = ['Mr', 'Miss', 'Mrs'];

  addressApi: GridApi;
  addressColumnApi: ColumnApi;

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

    {
      headerName: 'Status', field: 'Address_Status', sortable: true, filter: true, editable: true, width: 100,

      cellStyle: function (params) {
        if (params.value === '') {

          return { outline: '1px solid red' };
        } else {
          return { outline: 'white' };
        }
      }

    },
    {
      headerName: 'Address', field: 'Address', editable: true, width: 150,
      cellStyle: function (params) {
        if (params.value === '') {
          return { outline: '1px solid red' };
        } else {
          return { outline: 'white' };
        }
      }
    },
    {
      headerName: 'City', field: 'city', sortable: true, filter: true, editable: true, width: 100,

      cellStyle: function (params) {
        if (params.value === '') {

          return { outline: '1px solid red' };
        } else {
          return { outline: 'white' };
        }
      }

    },
    {
      headerName: 'State', field: 'state', sortable: true, filter: true, editable: true, width: 100,

      cellStyle: function (params) {
        if (params.value === '') {

          return { outline: '1px solid red' };
        } else {
          return { outline: 'white' };
        }
      }

    },

    {
      headerName: 'Country', field: 'country', sortable: true, filter: true, editable: true, width: 90,

      cellStyle: function (params) {
        if (params.value === '') {

          return { outline: '1px solid red' };
        } else {
          return { outline: 'white' };
        }
      }
    },
    {
      headerName: 'Postal Code', field: 'pin', sortable: true, filter: true, editable: true, width: 100,

      cellStyle: function (params) {
        if (params.value === '') {

          return { outline: '1px solid red' };
        } else {
          return { outline: 'white' };
        }
      }

    },
    {
      headerName: 'Contact No.', field: 'ContactNo', sortable: true, filter: true, editable: true, width: 100,

      cellStyle: function (params) {
        if (params.value === '') {

          return { outline: '1px solid red' };
        } else {
          return { outline: 'white' };
        }
      }
    },
    {
      headerName: 'Email ID', field: 'EmailID', sortable: true, filter: true, editable: true, width: 120,
      cellStyle: function (params) {
        if (params.value === '') {

          return { outline: '1px solid red' };
        } else {
          return { outline: 'white' };
        }
      }
    },
    {
      headerName: 'Emergency Contact Person', field: 'EmergencyContactPerson', sortable: true, filter: true, editable: true, width: 120,
      cellStyle: function (params) {
        if (params.value === '') {

          return { outline: '1px solid red' };
        } else {
          return { outline: 'white' };
        }
      }
    },
    {
      headerName: 'Emergency Contact No', field: 'EmergencyContactNo', sortable: true, filter: true, editable: true, width: 120,
      cellStyle: function (params) {
        if (params.value === '') {

          return { outline: '1px solid red' };
        } else {
          return { outline: 'white' };
        }
      }
    },


  ];


  rowData1 = [];
  columnDefs2 = [
    {
      headerName: 'Class', field: 'Class', width: 120, editable: true,
      cellStyle: function (params) {
        if (params.value === '') {
          return { outline: '1px solid red' };
        } else {
          return { outline: 'white' };
        }
      }
    },
    {
      headerName: 'Board', field: 'Board', sortable: true, filter: true, width: 150, editable: true,
      cellStyle: function (params) {
        if (params.value === '') {
          return { outline: '1px solid red' };
        } else {
          return { outline: 'white' };
        }
      }
    },
    {
      headerName: 'School Name', field: 'SchoolName', sortable: true, filter: true, width: 152, editable: true,
      cellStyle: function (params) {
        if (params.value === '') {
          return { outline: '1px solid red' };
        } else {
          return { outline: 'white' };
        }
      }
    },

    {
      headerName: 'Start Date', field: 'StartDate', sortable: true, filter: true, width: 120, editable: true,
      cellStyle: function (params) {
        if (params.value === '') {
          return { outline: '1px solid red' };
        } else {
          return { outline: 'white' };
        }
      }
    },
    {
      headerName: 'End Date', field: 'EndDate', sortable: true, filter: true, width: 120, editable: true,
      cellStyle(params) {
        if (params.value === '') {
          return { outline: '1px solid red' };
        } else {
          return { outline: 'white' };
        }
      }
    },

    {
      headerName: 'Percentage', field: 'percentage', sortable: true, filter: true, width: 150, editable: true,
      cellStyle: function (params) {
        if (params.value === '') {
          return { outline: '1px solid red' };
        } else {
          return { outline: 'white' };
        }
      }
    },
  ];

  rowData2 = [];

  columnDefs4 = [
    { headerName: 'Degree', field: 'Degree', width: 120 },
    { headerName: 'Specialization', field: 'specialization', sortable: true, filter: true, width: 160 },

    { headerName: 'University', field: 'university', sortable: true, filter: true, editable: true, width: 160 },
    { headerName: 'Start Date', field: 'StartDate', sortable: true, filter: true, editable: true, width: 125 },
    { headerName: 'End Date', field: 'EndDate', sortable: true, filter: true, editable: true, width: 125 },
    { headerName: 'Percentage', field: 'percentage', sortable: true, filter: true, editable: true, width: 120 },
    { headerName: '', width: 130 }


  ];

  rowData4 = [
    { Degree: 'BCA', specialization: 'BCA', university: 'CCSU', StartDate: '10-04-2013', EndDate: '10-04-2016', percentage: '78 %' }

  ];

  columnDefs5 = [
    { headerName: 'Degree', field: 'Degree', editable: true, width: 120 },
    { headerName: 'Specialization', field: 'specialization', sortable: true, filter: true, editable: true, width: 160 },
    { headerName: 'University', field: 'university', sortable: true, filter: true, editable: true, width: 160 },
    { headerName: 'Start Date', field: 'StartDate', sortable: true, filter: true, editable: true, width: 125 },
    { headerName: 'End Date', field: 'EndDate', sortable: true, filter: true, editable: true, width: 125 },
    { headerName: 'Percentage', field: 'percentage', sortable: true, filter: true, editable: true, width: 120 },
    { headerName: '', width: 130 }
  ];

  rowData5 = [
    { Degree: 'MCA', specialization: 'MCA', university: 'AKTU', StartDate: '10-04-2016', EndDate: '10-04-2018', percentage: '76 %' },

  ];

  columnDefs6 = [
    { headerName: 'Degree', field: 'Degree', width: 120 },
    { headerName: 'Specialization', field: 'specialization', sortable: true, filter: true, editable: true, width: 150 },
    { headerName: 'University', field: 'university', sortable: true, filter: true, editable: true, width: 160 },
    { headerName: 'Start Date', field: 'StartDate', sortable: true, filter: true, editable: true, width: 150 },
    { headerName: 'End Date', field: 'EndDate', sortable: true, filter: true, editable: true, width: 110 },
    { headerName: 'Percentage', field: 'percentage', sortable: true, filter: true, editable: true, width: 100 },
    { headerName: '', width: 145 }
  ];

  rowData6 = [
    { Degree: 'P.hd', specialization: 'computer science', university: 'AKTU', StartDate: '10-04-2016', EndDate: '10-04-2018', percentage: '76 %' },

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



  constructor(private formBuilder: FormBuilder, private countryService: AllWeb) {
    this.rowSelection = 'single';
  }

  api: GridApi;
  columnApi: ColumnApi;
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
    // this.getAllDepartment('1', 2);
    // this.getAllDesignation('1', 1);

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
    this.countryService.doGetLocation(locationBody)
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
    this.countryService.getDepartment(departmentBody)
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

    this.countryService.getAllDesignation(designationBody)
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

  onAddQualification() {
    //this.api.setFocusedCell(this.count, 'Class');
    //this.api.setFocusedCell(1, 'school');
    // this.count++;
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
    var highSchoolResonse: HighSchoolResponse;

    this.countryService.getHighSchoolData()
      .subscribe(
        data => {
          highSchoolResonse = data;
          console.log('recived', highSchoolResonse.STATUS);
          if (highSchoolResonse.STATUS === '') {
            alert(highSchoolResonse.STATUS + ' : ' + highSchoolResonse.MESSAGE);
            this.onGetSchoolQualification();
          } else {
            alert(highSchoolResonse.STATUS + ' : ' + highSchoolResonse.MESSAGE);
          }
        }
      );
  }

  onDeleteQualification() {

    var selectedNodes = this.api.getSelectedNodes();
    if (selectedNodes.length === 0) {
      // alert('Please Select any row.');
    } else {
      this.api.removeItems(selectedNodes);
    }
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
      highSchool.ClassName = dataTest['Class'];
      highSchool.BoardName = dataTest['Board'];
      highSchool.SchoolName = dataTest['SchoolName'];
      highSchool.Percentage = dataTest['percentage'];
      highSchool.EndDate = dataTest['EndDate'];
      highSchool.StartDate = dataTest['StartDate'];
      if (dataTest['Class'] === '') {
        alert('Enter Class');
      } else if (dataTest['Board'] === '') {
        alert('Enter Board');
      } else if (dataTest['SchoolName'] === '') {
        alert('Enter School Name');
      } else if (dataTest['StartDate'] === '') {
        alert('Enter Start Date');
      } else if (dataTest['EndDate'] === '') {
        alert('Enter End Date');
      } else if (dataTest['percentage'] === '') {
        alert('Enter Percentage');
      } else {
        console.log('Sending Data', highSchool);
        this.countryService.saveHighSchool(highSchool)
          .subscribe(
            data => {
              highSchoolResonse = data;
              console.log('recived', highSchoolResonse.STATUS);
              if (highSchoolResonse.STATUS === '') {
                alert(highSchoolResonse.STATUS + ' : ' + highSchoolResonse.MESSAGE);
                this.onGetSchoolQualification();
              } else {
                alert(highSchoolResonse.STATUS + ' : ' + highSchoolResonse.MESSAGE);
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
