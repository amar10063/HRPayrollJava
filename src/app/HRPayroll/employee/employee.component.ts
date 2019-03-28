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
    { headerName: "All", checkboxSelection: true, field: "all", width: 60 },
    { headerName: 'Address', field: 'address', width: 150 },
    { headerName: 'City', field: 'city', sortable: true, filter: true, width: 100 },
    { headerName: 'State', field: 'state', sortable: true, filter: true, width: 100 },
    { headerName: 'Country', field: 'country', sortable: true, filter: true, width: 90 },
    { headerName: 'Pin Code', field: 'pin', sortable: true, filter: true, width: 100 },
    { headerName: 'Status', field: 'status', sortable: true, filter: true, width: 100 },
    { headerName: 'Contact No.', field: 'ContactNo', sortable: true, filter: true, width: 100 },
    { headerName: 'Email ID', field: 'EmailID', sortable: true, filter: true, width: 120 },
    { headerName: 'Emergency Contact Person', field: 'EmergencyContactPerson', sortable: true, filter: true, width: 120 },
    { headerName: 'Emergency Contact No', field: 'EmergencyContactNo', sortable: true, filter: true, width: 120 },
    

  ];

  rowData1 = [
    { all: " ", checkboxSelection: true, address: 'E210, Sector63', city: 'Noida', state: 'UP', country: 'India', pin: '201301', status: 'Permanent', ContactNo: '0987654321', EmailID: 'abcd@gmail.com', EmergencyContactPerson: 'Amar Singh', EmergencyContactNo: '8459267584' },
    { all: " ", checkboxSelection: true, address: 'H221, Sector63', city: 'Noida', state: 'UP', country: 'India', pin: '201301', status: 'Communication', ContactNo: '9876543210', EmailID: 'bcd@gmail.com', EmergencyContactPerson: 'Fateh Singh', EmergencyContactNo: '8459267584' },
    { all: " ", checkboxSelection: true, address: 'E210, Sector63', city: 'Noida', state: 'UP', country: 'India', pin: '201301', status: 'Current', ContactNo: '0987654321', EmailID: 'abc@gmail.com', EmergencyContactPerson: 'Himanshu', EmergencyContactNo: '8459267584' },
    { all: " ", checkboxSelection: true, address: 'H221, Sector63', city: 'Noida', state: 'UP', country: 'India', pin: '201301', status: 'Permanent', ContactNo: '0987654321', EmailID: 'abcd@gmail.com', EmergencyContactPerson: 'Amar Singh', EmergencyContactNo: '8459267584' },
    { all: " ", checkboxSelection: true, address: 'E210, Sector63', city: 'Noida', state: 'UP', country: 'India', pin: '201301', status: 'Communication', ContactNo: '0987654321', EmailID: 'abc@gmail.com', EmergencyContactPerson: 'Amar Singh', EmergencyContactNo: '8459267584' },
    { all: " ", checkboxSelection: true, address: 'H221, Sector63', city: 'Noida', state: 'UP', country: 'India', pin: '201301', status: 'Current', ContactNo: '8765432100', EmailID: 'abd@gmail.com9', EmergencyContactPerson: 'Amar Singh', EmergencyContactNo: '8459267584' },
    { all: " ", checkboxSelection: true, address: 'E210, Sector63', city: 'Noida', state: 'UP', country: 'India', pin: '201301', status: 'Communication', ContactNo: '0987654321', EmailID: 'acd@gmail.com', EmergencyContactPerson: 'Amar Singh', EmergencyContactNo: '8459267584' },
  ];


  columnDefs2 = [
    { headerName: "All", checkboxSelection: true, field: 'all', width: 60 },
    { headerName: 'Class', field: 'Class', width: 120 },
    { headerName: 'Board', field: 'Board', sortable: true, filter: true, width: 150 },
    { headerName: 'School Name', field: 'SchoolName', sortable: true, filter: true, width: 152 },
    { headerName: 'Start Date', field: 'StartDate', sortable: true, filter: true, width: 120 },
    { headerName: 'End Date', field: 'EndDate', sortable: true, filter: true, width: 120 },
    { headerName: 'Percentage', field: 'percentage', sortable: true, filter: true, width: 150 },
    
    

  ];

  rowData2 = [
    { all: " ", checkboxSelection: true, Class: '10', Board: 'CBSE', SchoolName: 'DPSG', StartDate: '10-03-2010', EndDate: '10-03-2011',  percentage: '74 %' },
    { all: " ", checkboxSelection: true, Class: '12', Board: 'CBSE', SchoolName: 'DPSG', StartDate: '10-03-2012', EndDate: '10-03-2013',  percentage: '72 %' },
  ];

  

  columnDefs4 = [
    { headerName: "All", checkboxSelection: true, field: 'all', width: 60 },
    { headerName: 'Degree', field: 'Degree', width: 120 },
    { headerName: 'Specialization', field: 'specialization', sortable: true, filter: true, width: 160 },
    { headerName: 'University', field: 'university', sortable: true, filter: true, width: 160 },
    { headerName: 'Start Date', field: 'StartDate', sortable: true, filter: true, width: 125 },
    { headerName: 'End Date', field: 'EndDate', sortable: true, filter: true, width: 125 },
    { headerName: 'Percentage', field: 'percentage', sortable: true, filter: true, width: 120 },
    
    

  ];

  rowData4 = [
    { all: " ", checkboxSelection: true, Degree: 'BCA', specialization: 'BCA', university: 'CCSU', StartDate: '10-04-2013', EndDate: '10-04-2016', percentage: '78 %' }
    
  ];

  columnDefs5 = [
    { headerName: "All", checkboxSelection: true, field: 'all', width: 60 },
    { headerName: 'Degree', field: 'Degree', width: 120 },
    { headerName: 'Specialization', field: 'specialization', sortable: true, filter: true, width: 160 },
    { headerName: 'University', field: 'university', sortable: true, filter: true, width: 160 },
    { headerName: 'Start Date', field: 'StartDate', sortable: true, filter: true, width: 125 },
    { headerName: 'End Date', field: 'EndDate', sortable: true, filter: true, width: 125 },
    { headerName: 'Percentage', field: 'percentage', sortable: true, filter: true, width: 120 },
    
    

  ];

  rowData5 = [
    { all: " ", checkboxSelection: true, Degree: 'MCA', specialization: 'MCA', university: 'AKTU', StartDate: '10-04-2016', EndDate: '10-04-2018', percentage: '76 %' },
    
  ];

  columnDefs6 = [
    { headerName: "All", checkboxSelection: true, field: 'all', width: 60 },
    { headerName: 'Degree', field: 'Degree', width: 120 },
    { headerName: 'Specialization', field: 'specialization', sortable: true, filter: true, width: 162 },
    { headerName: 'University', field: 'university', sortable: true, filter: true, width: 160 },
    { headerName: 'Start Date', field: 'StartDate', sortable: true, filter: true, width: 125 },
    { headerName: 'End Date', field: 'EndDate', sortable: true, filter: true, width: 125 },
    { headerName: 'Percentage', field: 'percentage', sortable: true, filter: true, width: 120 },
    
    

  ];

  rowData6 = [
    { all: " ", checkboxSelection: true, Degree: 'P.hd', specialization: 'computer science', university: 'AKTU', StartDate: '10-04-2016', EndDate: '10-04-2018', percentage: '76 %' },
    
  ];

  columnDefs7 = [
    { headerName: "All", checkboxSelection: true, field: 'all', width: 60 },
    { headerName: 'Institute', field: 'Institute', width: 210 },
    { headerName: 'Course', field: 'Course', sortable: true, filter: true, width: 215 },
    { headerName: 'Start Date', field: 'StartDate', sortable: true, filter: true, width: 185 },
    { headerName: 'End Date', field: 'EndDate', sortable: true, filter: true, width: 200 },
    
    
    

  ];

  rowData7 = [
    { all: " ", checkboxSelection: true, Institute: 'Ducat', Course: 'Ruby', StartDate: '10-01-2018', EndDate: '10-06-2018' },
    
  ];


  columnDefs8 = [
    { headerName: "All", checkboxSelection: true, field: 'all', width: 60 },
    { headerName: 'Company Name', field: 'CompanyName', width: 210 },
    { headerName: 'Designation', field: 'Designation', sortable: true, filter: true, width: 215 },
    { headerName: 'Department', field: 'Department', sortable: true, filter: true, width: 185 },
    { headerName: 'Joining Date', field: 'JoiningDate', sortable: true, filter: true, width: 200 },
    { headerName: 'Exit Date', field: 'ExitDate', sortable: true, filter: true, width: 200 },
    { headerName: 'Experience', field: 'Experience', sortable: true, filter: true, width: 200 },
    { headerName: 'Location', field: 'Location', sortable: true, filter: true, width: 200 },
    
    
    

  ];

  rowData8 = [
    { all: " ", checkboxSelection: true, CompanyName: 'YoekiSoft Pvt Ltd', Designation: 'UI Developer', Department: 'Software Developer', JoiningDate: '01-05-2018', ExitDate:'01-09-2019',Experience:'1 year 4 months', Location:'noida' },
    
  ];

  columnDefs9 = [
    { headerName: "All", checkboxSelection: true, field: 'all', width: 60 },
    { headerName: 'Certificate Name', field: 'CertificateName', width: 272 },
    { headerName: 'Start Date', field: 'StartDate', sortable: true, filter: true, width: 270 },
    { headerName: 'End Date', field: 'EndDate', sortable: true, filter: true, width: 270 },
   
    
    
    

  ];

  rowData9 = [
    { all: " ", checkboxSelection: true, CertificateName: 'CCNA', StartDate: '10-05-2018', EndDate: '10-10-2018'},
    
  ];

  columnDefs10 = [
    { headerName: "All", checkboxSelection: true, field: 'all', width: 60 },
    { headerName: 'Type of Account', field: 'TypeofAccount', width: 272 },
    { headerName: 'Account Holder Name', field: 'AccountHolderName', sortable: true, filter: true, width: 270 },
    { headerName: 'Account Number', field: 'AccountNumber', sortable: true, filter: true, width: 270 },
    { headerName: 'IFSC', field: 'IFSC', sortable: true, filter: true, width: 270 },
    { headerName: 'Branch Name', field: 'BranchName', sortable: true, filter: true, width: 270 },
    { headerName: 'Primary', field: 'Primary', sortable: true, filter: true, width: 270 },
   
    
    
    

  ];

  rowData10 = [
    { all: " ", checkboxSelection: true, TypeofAccount: 'Salary Account', AccountHolderName: 'Abhishek vats', AccountNumber: '09876543210', IFSC:'HDFC000003', BranchName:'Ghaziabad', Primary:'yes'},
    { all: " ", checkboxSelection: true, TypeofAccount: 'PF Account', AccountHolderName: 'Abhishek vats', AccountNumber: '09876543210', IFSC:'HDFC000003', BranchName:'Ghaziabad', Primary:'yes'},
    { all: " ", checkboxSelection: true, TypeofAccount: 'Gratuity Account', AccountHolderName: 'Abhishek vats', AccountNumber: '09876543210', IFSC:'HDFC000003', BranchName:'Ghaziabad', Primary:'yes'},
    
  ];

  columnDefs11 = [
    { headerName: "All", checkboxSelection: true, field: 'all', width: 60 },
    { headerName: 'Passport No', field: 'PassportNo', sortable: true, filter: true, width: 230 },
    { headerName: 'Expiry Date', field: 'ExpiryDate', sortable: true, filter: true, width: 200 },
    { headerName: 'Upload Document', field: 'UploadDocument', sortable: true, filter: true, width: 200 },
    { headerName: 'Time Duration', field: 'TimetoExpire', sortable: true, filter: true, width: 200 },
    
  ];

  rowData11 = [
    { all: " ", checkboxSelection: true,  PassportNo: 'PAS96ER0001', ExpiryDate: '28-02-1996', UploadDocument:'', TimetoExpire:'1 year 3 months'},
     
  ];

  columnDefs12 = [
    { headerName: "All", checkboxSelection: true, field: 'all', width: 60 },
    { headerName: 'Country', field: 'Country', sortable: true, filter: true, width: 170 },
    { headerName: 'Number Of Visit', field: 'NumberOfVisit', sortable: true, filter: true, width: 170 },
    { headerName: 'Expiry Date', field: 'ExpiryDate', sortable: true, filter: true, width: 160 },
    { headerName: 'Upload Document', field: 'UploadDocument', sortable: true, filter: true, width: 170 },
    { headerName: 'Time to Expire', field: 'TimetoExpire', sortable: true, filter: true, width: 160 },
    
  ];

  rowData12 = [
    { all: " ", checkboxSelection: true, Country: 'Canada',NumberOfVisit:'Single Visit' , ExpiryDate: '28-02-1996', UploadDocument:'', TimetoExpire:'1 year 3 months'},
     
  ];

  columnDefs13 = [
    { headerName: "All", checkboxSelection: true, field: 'all', width: 60 },
    { headerName: 'Documents', field: 'Documents', width: 160 },
    { headerName: 'Curriculum Vitae', field: 'CurriculumVitae', sortable: true, filter: true, width: 160 },
    { headerName: 'Expiry Date', field: 'ExpiryDate', sortable: true, filter: true, width: 160 },
    { headerName: 'Upload Document', field: 'UploadDocument', sortable: true, filter: true, width: 170 },
    { headerName: 'Time to Expire', field: 'TimetoExpire', sortable: true, filter: true, width: 160 },
    
  ];

  rowData13 = [
    { all: " ", checkboxSelection: true, Documents: 'Curriculum Vitae', CurriculumVitae: 'CV96ER0001', ExpiryDate: '28-02-1996', UploadDocument:'', TimetoExpire:'1 year 3 months'},
     
  ];

  columnDefs14 = [
    { headerName: "All", checkboxSelection: true, field: 'all', width: 60 },
    { headerName: 'Driving Licence Number', field: 'DrivingLicence', sortable: true, filter: true, width: 220 },
    { headerName: 'Expiry Date', field: 'ExpiryDate', sortable: true, filter: true, width: 200 },
    { headerName: 'Upload Document', field: 'UploadDocument', sortable: true, filter: true, width: 210 },
    { headerName: 'Time Duration', field: 'TimetoExpire', sortable: true, filter: true, width: 200 },
    
  ];

  rowData14 = [
    { all: " ", checkboxSelection: true, DrivingLicence: 'DL96ER0001', ExpiryDate: '28-02-1996', UploadDocument:'', TimetoExpire:'1 year 3 months'},
     
  ];

  columnDefs15 = [
    { headerName: "All", checkboxSelection: true, field: 'all', width: 60 },
    { headerName: 'Medical Certificate', field: 'MedicalCertificate', sortable: true, filter: true, width: 230 },
    { headerName: 'Expiry Date', field: 'ExpiryDate', sortable: true, filter: true, width: 200 },
    { headerName: 'Upload Document', field: 'UploadDocument', sortable: true, filter: true, width: 200 },
    { headerName: 'Time Duration', field: 'TimeDuration', sortable: true, filter: true, width: 200 },
    
  ];

  rowData15 = [
    { all: " ", checkboxSelection: true,  MedicalCertificate: 'MED96ER0001', ExpiryDate: '28-02-1996', UploadDocument:'', TimeDuration:'1 year 3 months'},
     
  ];

  columnDefs16 = [
    { headerName: "All", checkboxSelection: true, field: 'all', width: 60 },
    { headerName: 'Class/Degree', field: 'ClassDegree', width: 160 },
    { headerName: 'Board/University', field: 'BoardUniversity', sortable: true, filter: true, width: 180 },
    { headerName: 'Start Date', field: 'StartDate', sortable: true, filter: true, width: 160 },
    { headerName: 'End Date', field: 'EndDate', sortable: true, filter: true, width: 170 },
    { headerName: 'Upload Document', field: 'UploadDocument', sortable: true, filter: true, width: 160 },
    
  ];

  rowData16 = [
    { all: " ", checkboxSelection: true, ClassDegree: '10', BoardUniversity: 'CBSE', StartDate: '03-04-2009', EndDate:'03-04-2010', UploadDocument:''},
    { all: " ", checkboxSelection: true, ClassDegree: '12', BoardUniversity: 'CBSE', StartDate: '03-04-2012', EndDate:'03-04-2013', UploadDocument:''},
    { all: " ", checkboxSelection: true, ClassDegree: 'BCA', BoardUniversity: 'CCSU', StartDate: '03-04-2013', EndDate:'03-04-2016', UploadDocument:''},
    { all: " ", checkboxSelection: true, ClassDegree: 'MCA', BoardUniversity: 'AKTU', StartDate: '03-04-2016', EndDate:'03-04-2018', UploadDocument:''},
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
