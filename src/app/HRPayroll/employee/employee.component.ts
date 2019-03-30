import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  columnDefs = [
    { headerName: 'Employee Image', field: 'EmpImage', template: "<img src='../assets/images/profile-img-2.png' />", width: 120 },
    { headerName: 'Employee Name', field: 'EmpName', sortable: true, filter: true, width: 130 },
    { headerName: 'Designation', field: 'Designation', sortable: true, filter: true, width: 110 },
    { headerName: 'Department', field: 'Department', sortable: true, filter: true, width: 100 },
    { headerName: 'Active Employee', field: 'ActiveEmp', sortable: true, filter: true, width: 120 },
    { headerName: 'On Leave', field: 'OnLeave', sortable: true, filter: true, width: 90 },
    { headerName: 'Leave From', field: 'LeaveFrom', sortable: true, filter: true, width: 100 },
    { headerName: 'Leave To', field: 'LeaveTo', sortable: true, filter: true, width: 90 },
    { headerName: 'Contact No.', field: 'ContactNo', sortable: true, filter: true, width: 120 },
    { headerName: 'Email ID', field: 'EmailID', sortable: true, filter: true, width: 120 },
    { headerName: 'Date of Joining', field: 'JoiningDate', sortable: true, filter: true, width: 120 },
    {
      headerName: 'Reporting Heirarchy', field: 'Heirarchy', sortable: true, filter: true, width: 170,
      cellRenderer: function (params) {
        return '<a href="#" target="_blank" style="text-decoration:underline; color:#3e3e3e">' + params.value + '</a>'
      }
    },
    {
      headerName: 'Send Message', field: 'SendMessage', sortable: true, filter: true, width: 140, cellRenderer: function (params) {
        return '<a href="#" target="_blank" style="text-decoration:underline; color:#3e3e3e">' + params.value + '</a>'
      }
    }
  ];

  rowData = [
    {  EmpImage: '', EmpName: 'Fateh Singh', Designation: 'Developer', Department: 'IT', ActiveEmp: 'Active', OnLeave: 'Yes', LeaveFrom: '05/03/2019', LeaveTo: '10/03/2019', ContactNo: '8459267584', EmailID: 'abc@gmail.com', JoiningDate: '12/04/2019', Heirarchy: 'Reporting Heirarchy', SendMessage: 'Send' },
    { EmpImage: '', EmpName: 'Fateh Singh', Designation: 'Developer', Department: 'IT', ActiveEmp: 'Inactive', OnLeave: 'No', LeaveFrom: '05/03/2019', LeaveTo: '10/03/2019', ContactNo: '8459267584', EmailID: 'abc@gmail.com', JoiningDate: '12/04/2019', Heirarchy: 'Reporting Heirarchy', SendMessage: 'Send' },
    { EmpImage: '', EmpName: 'Fateh Singh', Designation: 'Developer', Department: 'IT', ActiveEmp: 'Active', OnLeave: 'Yes', LeaveFrom: '05/03/2019', LeaveTo: '10/03/2019', ContactNo: '8459267584', EmailID: 'abc@gmail.com', JoiningDate: '12/04/2019', Heirarchy: 'Reporting Heirarchy', SendMessage: 'Send' },
    { EmpImage: '', EmpName: 'Fateh Singh', Designation: 'Developer', Department: 'IT', ActiveEmp: 'Active', OnLeave: 'Yes', LeaveFrom: '05/03/2019', LeaveTo: '10/03/2019', ContactNo: '8459267584', EmailID: 'abc@gmail.com', JoiningDate: '12/04/2019', Heirarchy: 'Reporting Heirarchy', SendMessage: 'Send' },
    { EmpImage: '', EmpName: 'Fateh Singh', Designation: 'Developer', Department: 'IT', ActiveEmp: 'Inactive', OnLeave: 'No', LeaveFrom: '05/03/2019', LeaveTo: '10/03/2019', ContactNo: '8459267584', EmailID: 'abc@gmail.com', JoiningDate: '12/04/2019', Heirarchy: 'Reporting Heirarchy', SendMessage: 'Send' },
    { EmpImage: '', EmpName: 'Fateh Singh', Designation: 'Developer', Department: 'IT', ActiveEmp: 'Active', OnLeave: 'Yes', LeaveFrom: '05/03/2019', LeaveTo: '10/03/2019', ContactNo: '8459267584', EmailID: 'abc@gmail.com', JoiningDate: '12/04/2019', Heirarchy: 'Reporting Heirarchy', SendMessage: 'Send' },
    { EmpImage: '', EmpName: 'Fateh Singh', Designation: 'Developer', Department: 'IT', ActiveEmp: 'Inactive', OnLeave: 'No', LeaveFrom: '05/03/2019', LeaveTo: '10/03/2019', ContactNo: '8459267584', EmailID: 'abc@gmail.com', JoiningDate: '12/04/2019', Heirarchy: 'Reporting Heirarchy', SendMessage: 'Send' },
  ];


  columnDefs1 = [
    { headerName: 'Status', field: 'status', editable: true, sortable: true, filter: true, width: 100 },
    { headerName: 'Address', field: 'address', editable: true, sortable: true, filter: true, width: 150 },
    { headerName: 'Country', field: 'country', editable: true, sortable: true, filter: true, width: 90 },
    { headerName: 'State', field: 'state', editable: true, sortable: true, filter: true, width: 100 },
    { headerName: 'City', field: 'city', editable: true, sortable: true, filter: true, width: 100 },
    { headerName: 'Postal Code', field: 'pin', editable: true, sortable: true, filter: true, width: 100 },
    { headerName: 'Contact No.', field: 'ContactNo', editable: true, sortable: true, filter: true, width: 100 },
    { headerName: 'Email ID', field: 'EmailID', editable: true, sortable: true, filter: true, width: 120 },
    { headerName: 'Status', field: 'status', editable: true, sortable: true, filter: true, width: 100 },
    { headerName: 'Emergency Contact Person', editable: true, field: 'EmergencyContactPerson', sortable: true, filter: true, width: 120 },
    { headerName: 'Emergency Contact No', editable: true, field: 'EmergencyContactNo', sortable: true, filter: true, width: 120 },
    

  ];

  rowData1 = [
    {  address: 'E210, Sector63', city: 'Noida', state: 'UP', country: 'India', pin: '201301', status: 'Permanent', ContactNo: '0987654321', EmailID: 'abcd@gmail.com', EmergencyContactPerson: 'Amar Singh', EmergencyContactNo: '8459267584' },
    {  address: 'H221, Sector63', city: 'Noida', state: 'UP', country: 'India', pin: '201301', status: 'Communication', ContactNo: '9876543210', EmailID: 'bcd@gmail.com', EmergencyContactPerson: 'Fateh Singh', EmergencyContactNo: '8459267584' },
    {  address: 'E210, Sector63', city: 'Noida', state: 'UP', country: 'India', pin: '201301', status: 'Current', ContactNo: '0987654321', EmailID: 'abc@gmail.com', EmergencyContactPerson: 'Himanshu', EmergencyContactNo: '8459267584' },
    {  address: 'H221, Sector63', city: 'Noida', state: 'UP', country: 'India', pin: '201301', status: 'Permanent', ContactNo: '0987654321', EmailID: 'abcd@gmail.com', EmergencyContactPerson: 'Amar Singh', EmergencyContactNo: '8459267584' },
    {  address: 'E210, Sector63', city: 'Noida', state: 'UP', country: 'India', pin: '201301', status: 'Communication', ContactNo: '0987654321', EmailID: 'abc@gmail.com', EmergencyContactPerson: 'Amar Singh', EmergencyContactNo: '8459267584' },
    {  address: 'H221, Sector63', city: 'Noida', state: 'UP', country: 'India', pin: '201301', status: 'Current', ContactNo: '8765432100', EmailID: 'abd@gmail.com9', EmergencyContactPerson: 'Amar Singh', EmergencyContactNo: '8459267584' },
    {  address: 'E210, Sector63', city: 'Noida', state: 'UP', country: 'India', pin: '201301', status: 'Communication', ContactNo: '0987654321', EmailID: 'acd@gmail.com', EmergencyContactPerson: 'Amar Singh', EmergencyContactNo: '8459267584' },
  ];


  columnDefs2 = [
    
    { headerName: 'Class', field: 'Class', filter: true, sortable: true, editable: true,  width: 70 },
    { headerName: 'Board', field: 'Board', editable: true, sortable: true, filter: true, width: 70 },
    { headerName: 'School Name', field: 'SchoolName', editable: true, sortable: true, filter: true, width: 120 },
    { headerName: 'Start Date', field: 'StartDate', editable: true, sortable: true, filter: true, width: 100 },
    { headerName: 'End Date', field: 'EndDate', editable: true, sortable: true, filter: true, width: 100 },
    { headerName: 'Percentage', field: 'percentage', sortable: true, editable: true, filter: true, width: 110 },
    { headerName: ' ', field: ' ', editable: true, width: 330 }
    
    

  ];

  rowData2 = [
    {  Class: '10', Board: 'CBSE', SchoolName: 'DPSG', StartDate: '10-03-2010', EndDate: '10-03-2011',  percentage: '74 %' },
    {  Class: '12', Board: 'CBSE', SchoolName: 'DPSG', StartDate: '10-03-2012', EndDate: '10-03-2013',  percentage: '72 %' },
  ];

  

  columnDefs4 = [
    
    { headerName: 'Degree', field: 'Degree', sortable: true, editable: true, filter: true, width: 90 },
    { headerName: 'Specialization', field: 'specialization', editable: true, sortable: true, filter: true, width: 120 },
    { headerName: 'University', field: 'university', editable: true, sortable: true, filter: true, width: 110 },
    { headerName: 'Start Date', field: 'StartDate', editable: true, sortable: true, filter: true, width: 100 },
    { headerName: 'End Date', field: 'EndDate', editable: true, sortable: true, filter: true, width: 100 },
    { headerName: 'Percentage', field: 'percentage', editable: true, sortable: true, filter: true, width: 120 },
    { headerName: '', field: '', editable: true, width: 260 }
    

  ];

  rowData4 = [
    {  Degree: 'BCA', specialization: 'BCA', university: 'CCSU', StartDate: '10-04-2013', EndDate: '10-04-2016', percentage: '78 %' }
    
  ];

  columnDefs5 = [
    
    { headerName: 'Degree', field: 'Degree', editable: true, sortable: true, filter: true, width: 100 },
    { headerName: 'Specialization', field: 'specialization', editable: true, sortable: true, filter: true, width: 120 },
    { headerName: 'University', field: 'university', editable: true, sortable: true, filter: true, width: 110 },
    { headerName: 'Start Date', field: 'StartDate', editable: true, sortable: true, filter: true, width: 100 },
    { headerName: 'End Date', field: 'EndDate', editable: true, sortable: true, filter: true, width: 100 },
    { headerName: 'Percentage', field: 'percentage', editable: true, sortable: true, filter: true, width: 120 },
    { headerName: '', field: '', editable: true, sortable: true, filter: true, width: 250 },
    

  ];

  rowData5 = [
    {  Degree: 'MCA', specialization: 'MCA', university: 'AKTU', StartDate: '10-04-2016', EndDate: '10-04-2018', percentage: '76 %' },
    
  ];

  columnDefs6 = [
   
    { headerName: 'Degree', field: 'Degree', editable: true, sortable: true, filter: true, width: 100 },
    { headerName: 'Specialization', field: 'specialization', editable: true, sortable: true, filter: true, width: 120 },
    { headerName: 'University', field: 'university', editable: true, sortable: true, filter: true, width: 110 },
    { headerName: 'Start Date', field: 'StartDate', editable: true, sortable: true, filter: true, width: 100 },
    { headerName: 'End Date', field: 'EndDate', editable: true, sortable: true, filter: true, width: 100 },
    { headerName: 'Percentage', field: 'percentage', editable: true, sortable: true, filter: true, width: 120 },
    { headerName: '', field: '', width: 250 },
    

  ];

  rowData6 = [
    {  Degree: 'P.hd', specialization: 'computer science', university: 'AKTU', StartDate: '10-04-2016', EndDate: '10-04-2018', percentage: '76 %' },
    
  ];

  columnDefs7 = [
    
    { headerName: 'Institute', field: 'Institute', editable: true, sortable: true, filter: true, width: 100 },
    { headerName: 'Course', field: 'Course', editable: true, sortable: true, filter: true, width: 100 },
    { headerName: 'Start Date', field: 'StartDate',  editable: true, sortable: true, filter: true, width: 100 },
    { headerName: 'End Date', field: 'EndDate', editable: true, sortable: true, filter: true, width: 100 },
    { headerName: '', field: '',  width: 500 },
    
    

  ];

  rowData7 = [
    {  Institute: 'Ducat', Course: 'Ruby', StartDate: '10-01-2018', EndDate: '10-06-2018' },
    
  ];


  columnDefs8 = [
    
    { headerName: 'Company Name', field: 'CompanyName', editable: true, sortable: true, filter: true, width: 120 },
    { headerName: 'Designation', field: 'Designation', editable: true, sortable: true, filter: true, width: 120 },
    { headerName: 'Department', field: 'Department', editable: true, sortable: true, filter: true, width: 120 },
    { headerName: 'Joining Date', field: 'JoiningDate', editable: true, sortable: true, filter: true, width: 120 },
    { headerName: 'Exit Date', field: 'ExitDate', editable: true, sortable: true, filter: true, width: 100 },
    { headerName: 'Experience', field: 'Experience', editable: true, sortable: true, filter: true, width: 120 },
    { headerName: 'Location', field: 'Location', editable: true, sortable: true, filter: true, width: 120 },
    { headerName: '', field: '', width: 80 },
    
    

  ];

  rowData8 = [
    {  CompanyName: 'YoekiSoft Pvt Ltd', Designation: 'UI Developer', Department: 'Software Developer', JoiningDate: '01-05-2018', ExitDate:'01-09-2019',Experience:'1 year 4 months', Location:'noida' },
    
  ];

  columnDefs9 = [
   
    { headerName: 'Certificate Name', field: 'CertificateName', editable: true, sortable: true, filter: true, width: 120 },
    { headerName: 'Start Date', field: 'StartDate', editable: true, sortable: true, filter: true, width: 100 },
    { headerName: 'End Date', field: 'EndDate', editable: true, sortable: true, filter: true, width: 100 },
    { headerName: 'End Date', field: 'EndDate', editable: true, sortable: true, filter: true, width: 100 },
    { headerName: '', field: '',  width: 480 },
    
    

  ];

  rowData9 = [
    {  CertificateName: 'CCNA', StartDate: '10-05-2018', EndDate: '10-10-2018'},
    
  ];

  columnDefs10 = [
   
    { headerName: 'Type of Account', field: 'TypeofAccount', editable: true, sortable: true, filter: true, width: 140 },
    { headerName: 'Account Holder Name', field: 'AccountHolderName', editable: true, sortable: true, filter: true, width: 150},
    { headerName: 'Account Number', field: 'AccountNumber', editable: true, sortable: true, filter: true, width: 120 },
    { headerName: 'IFSC', field: 'IFSC', sortable: true, editable: true, filter: true, width: 100 },
    { headerName: 'Branch Name', field: 'BranchName', editable: true, sortable: true, filter: true, width: 120 },
    { headerName: 'Primary', field: 'Primary', editable: true, sortable: true, filter: true, width: 100 },
    { headerName: '', field: '', width: 170 }
   
    
    
    

  ];

  rowData10 = [
    { TypeofAccount: 'Salary Account', AccountHolderName: 'Abhishek vats', AccountNumber: '09876543210', IFSC:'HDFC000003', BranchName:'Ghaziabad', Primary:'yes'},
    { TypeofAccount: 'PF Account', AccountHolderName: 'Abhishek vats', AccountNumber: '09876543210', IFSC:'HDFC000003', BranchName:'Ghaziabad', Primary:'yes'},
    { TypeofAccount: 'Gratuity Account', AccountHolderName: 'Abhishek vats', AccountNumber: '09876543210', IFSC:'HDFC000003', BranchName:'Ghaziabad', Primary:'yes'},
    
  ];

  columnDefs11 = [
   
    { headerName: 'Passport No', field: 'PassportNo', editable: true, sortable: true, filter: true, width: 120 },
    { headerName: 'Expiry Date', field: 'ExpiryDate', editable: true, sortable: true, filter: true, width: 120 },
    { headerName: 'Upload Document', field: 'UploadDocument', editable: true, sortable: true, filter: true, width: 140 },
    { headerName: 'Time Duration', field: 'TimetoExpire',editable: true, sortable: true, filter: true, width: 120 },
    { headerName: '', field: '', width: 400 },
    
  ];

  rowData11 = [
    { PassportNo: 'PAS96ER0001', ExpiryDate: '28-02-1996', UploadDocument:'', TimetoExpire:'1 year 3 months'},
     
  ];

  columnDefs12 = [
   
    { headerName: 'Country', field: 'Country', editable: true, sortable: true, filter: true, width: 110 },
    { headerName: 'Number Of Visit', field: 'NumberOfVisit', editable: true, sortable: true, filter: true, width: 120 },
    { headerName: 'Expiry Date', field: 'ExpiryDate', editable: true, sortable: true, filter: true, width: 120 },
    { headerName: 'Upload Document', field: 'UploadDocument', editable: true, sortable: true, filter: true, width: 130 },
    { headerName: 'Time to Expire', field: 'TimetoExpire', editable: true, sortable: true, filter: true, width: 130 },
    { headerName: '', field: '', width: 290 },
    
  ];

  rowData12 = [
    { Country: 'Canada',NumberOfVisit:'Single Visit' , ExpiryDate: '28-02-1996', UploadDocument:'', TimetoExpire:'1 year 3 months'},
     
  ];

  columnDefs13 = [
  
    { headerName: 'Documents', field: 'Documents', editable: true, sortable: true, filter: true, width: 160 },
    { headerName: 'Curriculum Vitae', field: 'CurriculumVitae', editable: true, sortable: true, filter: true, width: 160 },
    { headerName: 'Expiry Date', field: 'ExpiryDate', editable: true, sortable: true, filter: true, width: 160 },
    { headerName: 'Upload Document', field: 'UploadDocument', editable: true, sortable: true, filter: true, width: 170 },
    { headerName: 'Time to Expire', field: 'TimetoExpire', editable: true, sortable: true, filter: true, width: 160 },
    
  ];

  rowData13 = [
    { Documents: 'Curriculum Vitae', CurriculumVitae: 'CV96ER0001', ExpiryDate: '28-02-1996', UploadDocument:'', TimetoExpire:'1 year 3 months'},
     
  ];

  columnDefs14 = [
  
    { headerName: 'Driving Licence Number', field: 'DrivingLicence', editable: true, sortable: true, filter: true, width: 150 },
    { headerName: 'Expiry Date', field: 'ExpiryDate', editable: true, sortable: true, filter: true, width: 110 },
    { headerName: 'Upload Document', field: 'UploadDocument', editable: true, sortable: true, filter: true, width: 140 },
    { headerName: 'Time Duration', field: 'TimetoExpire', editable: true, sortable: true, filter: true, width: 120 },
    { headerName: '', field: '', width: 380 },
    
  ];

  rowData14 = [
    { DrivingLicence: 'DL96ER0001', ExpiryDate: '28-02-1996', UploadDocument:'', TimetoExpire:'1 year 3 months'},
     
  ];

  columnDefs15 = [
    
    { headerName: 'Medical Certificate', field: 'MedicalCertificate', editable: true, sortable: true, filter: true, width: 130 },
    { headerName: 'Expiry Date', field: 'ExpiryDate', editable: true, sortable: true, filter: true, width: 110 },
    { headerName: 'Upload Document', field: 'UploadDocument', editable: true, sortable: true, filter: true, width: 140 },
    { headerName: 'Time Duration', field: 'TimeDuration', editable: true, sortable: true, filter: true, width: 110 },
    { headerName: '', field: '', width: 410 },
  ];

  rowData15 = [
    {  MedicalCertificate: 'MED96ER0001', ExpiryDate: '28-02-1996', UploadDocument:'', TimeDuration:'1 year 3 months'},
     
  ];

  columnDefs16 = [
  
    { headerName: 'Class/Degree', field: 'ClassDegree', editable: true, sortable: true, filter: true, width: 120 },
    { headerName: 'Board/University', field: 'BoardUniversity', editable: true, sortable: true, filter: true, width: 140 },
    { headerName: 'Start Date', field: 'StartDate', editable: true, sortable: true, filter: true, width: 120 },
    { headerName: 'End Date', field: 'EndDate', editable: true, sortable: true, filter: true, width: 120 },
    { headerName: 'Upload Document', field: 'UploadDocument', editable: true, sortable: true, filter: true, width: 140 },
    { headerName: '', field: '', width: 260 },
  ];

  rowData16 = [
    { ClassDegree: '10', BoardUniversity: 'CBSE', StartDate: '03-04-2009', EndDate:'03-04-2010', UploadDocument:''},
    { ClassDegree: '12', BoardUniversity: 'CBSE', StartDate: '03-04-2012', EndDate:'03-04-2013', UploadDocument:''},
    { ClassDegree: 'BCA', BoardUniversity: 'CCSU', StartDate: '03-04-2013', EndDate:'03-04-2016', UploadDocument:''},
    { ClassDegree: 'MCA', BoardUniversity: 'AKTU', StartDate: '03-04-2016', EndDate:'03-04-2018', UploadDocument:''},
  ];




  constructor() { }

  public show: boolean = false;
  public hide: boolean = true;
  public buttonName: any = 'Add New';


  ngOnInit() { }


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
