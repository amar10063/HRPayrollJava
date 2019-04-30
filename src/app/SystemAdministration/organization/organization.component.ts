import { Component, OnInit } from '@angular/core';
import { GridApi, ColumnApi, CellComp, GridOptions } from 'ag-grid-community';
import { AllWeb } from "src/app/WebServices/AllWeb.service";
import { LocationResponse } from './LocationResponse';
import { from } from 'rxjs';
import { GetLocationBody } from './GetLocationBody';
import { GetAllLocationResponse } from 'src/app/HRPayroll/employee/EmployeeApiResponse/GetAllLocationResponse';
import { LocationDropdownComponent } from 'src/app/location-dropdown/location-dropdown.component';
import { DeleteLocationBody } from 'src/app/WebServices/WebServiceBody/OrganizationBody/DeleteLocationBody';
import { DeleteDesignationBody } from 'src/app/WebServices/WebServiceBody/OrganizationBody/DeleteDesignationBody';
import { LocationBody } from 'src/app/WebServices/WebServiceBody/OrganizationBody/LocationBody';
import { DepartmentBody } from 'src/app/WebServices/WebServiceBody/OrganizationBody/DepartmentBody';
import { DesignationBody } from 'src/app/WebServices/WebServiceBody/OrganizationBody/DesignationBody';
import { DeleteDepartmentBody } from 'src/app/WebServices/WebServiceBody/OrganizationBody/DeleteDepartmentBody';
import { GetAllDepartmentBody } from 'src/app/HRPayroll/employee/EmployeeApiResponse/GetAllDepartmentBody';
import { UniversalBody } from 'src/app/WebServices/WebServiceBody/UniversalBody';
import { GetDesignationResponse } from 'src/app/WebServices/WebServiceResponse/OrganizationResponse/GetDesignationResponse';
import { GetDepartmentResponse } from './DepartmentResponse';
import { UniversalResponse } from 'src/app/WebServices/WebServiceResponse/UniversalResponse';
import { DesignationResponse } from 'src/app/WebServices/WebServiceResponse/OrganizationResponse/DesignationResponse';
import { UniversalJsonBody } from 'src/app/WebServices/WebServiceBody/UniversalJsonBody';

@Component({
  selector: 'app-organization',
  templateUrl: './organization.component.html',
  styleUrls: ['./organization.component.css']
})
export class OrganizationComponent implements OnInit {
  checkedStatus = false;
  locationApi: GridApi;
  columnApi: ColumnApi;

  departmentApi: GridApi;
  departmentColumnApi: ColumnApi;

  designationApi: GridApi;
  designationColumnApi: ColumnApi;
  private defaultColDef;
  locationResponse: LocationResponse;
  designationResponse: DesignationResponse;
  universalResponse: UniversalResponse;
  private frameworkComponents;
 
  rowSelection: string;
  columnDefs: any; columnDefs1: any;
  columnDefs2: any;
  rowData: any; rowData1: any;
  rowData2: any;
  getAllLocationResponse: GetAllLocationResponse[];
  getDepartmentResponse: GetDepartmentResponse[];
  getDesignationResponse: GetDesignationResponse[];
  gridOptions: GridOptions;
  addNewLocationRow: boolean = false;
  addNewDepartmentRow: boolean = false;
  addNewDesignationRow: boolean = false;
  editLocation: boolean = false;
  editDepartment: boolean = false;
  editDesignation: boolean = false;
  deleteNewLocation: boolean = false;
  deleteNewDepartment: boolean = false;
  deleteNewDesignation: boolean = false;

  arrDesignationSave: DesignationBody[] = [];
  arrDesignationDelete: DeleteDesignationBody[] = [];
  selectAllDesignationCheckBox: boolean = false;

  selectAllLocation: boolean = true;

  rowClassRules: { "sick-days-warning": (params: any) => boolean; "sick-days-breach": string; };


  constructor(private countryService: AllWeb) {
    //this.frameworkComponents = { genderCellRenderer: LocationDropdownComponent };
    //this.gridApi.sizeColumnsToFit();
    this.rowSelection = 'multiple';
    this.columnDefs = [
      {
        headerName: 'Hidden', field: 'hidden', hide: true, sortable: true, filter: true, editable: true, 


        cellStyle: function (params) {
          if (params.value === '') {
            return { outline: '1px solid red' };
          } else {
            return { outline: 'white' };
          }
        }

      },
      {
        headerName: 'Location Code', field: 'code', sortable: true, filter: true, editable: true, width:250, minWidth: 50,
        maxWidth: 300,
        cellStyle: function (params) {
          if (params.value === '') {
            return { outline: '1px solid red' };
          } else {
            return { outline: 'white' };
          }
        }
      },
      {
        headerName: 'Location Name', field: 'name', sortable: true, filter: true, editable: true, width:250, minWidth: 50,
        maxWidth: 300,


        cellStyle: function (params) {
          if (params.value === '') {
            return { outline: '1px solid red' };
          } else {
            return { outline: 'white' };
          }
        }

      },
      {
        headerName: 'Description', field: 'description', sortable: true, filter: true, editable: true, width:300, minWidth: 50,
        maxWidth: 500,


        cellStyle: function (params) {
          if (params.value === '') {
            // bordercolor: 'red'
            // alert("Please Enter Description");

            return { outline: '1px solid red' };

            //color: 'red', backgroundColor: 'green',
          } else {
            return { outline: 'white' };
          }
        }

      },

    
    ];
    this.defaultColDef = { resizable: true };
    this.rowData;
    this.columnDefs1 = [
      {
        headerName: 'Location Name', field: 'LocationName', sortable: true, filter: true, width:150, minWidth: 50,
        maxWidth: 300,
        cellRendererFramework: LocationDropdownComponent,
        cellRendererParams: {
          value: 'location'
        }
      },
      {
        headerName: 'Department Code', field: 'departmentCode', sortable: true, editable: true, width:250,  minWidth: 50,
        maxWidth: 300, filter: true, 

        cellStyle: function (params) {
          if (params.value === '') {
            return { outline: '1px solid red' };
          } else {
            return { outline: 'white' };
          }
        }

      },
      {
        headerName: 'Department Name', field: 'departmentName', sortable: true, width:150,  minWidth: 50,
        maxWidth: 300, editable: true, filter: true, 


        cellStyle: function (params) {
          if (params.value === '') {
            return { outline: '1px solid red' };
          } else {
            return { outline: 'white' };
          }
        }

      },
      {
        headerName: 'Description', field: 'description', sortable: true, width:250,  minWidth: 50,
        maxWidth: 300, editable: true, filter: true, 


        cellStyle: function (params) {
          if (params.value === '') {
            // bordercolor: 'red'
            // alert("Please Enter Description");

            return { outline: '1px solid red' };

            //color: 'red', backgroundColor: 'green',
          } else {
            return { outline: 'white' };
          }
        }

      },
      // { headerName: '', field: '',  }
    ];
    this.defaultColDef = { resizable: true };
  
    this.rowData1;


    this.columnDefs2 = [
      {
        headerName: 'Location Name', field: 'LocationName', sortable: true, filter: true, editable: true, width:150, minWidth: 50,
        maxWidth: 300,
        cellEditor: 'select',
        cellRendererFramework: LocationDropdownComponent,
        cellRendererParams: {
          value: 'location'
        }

      },

      {
        headerName: 'Department', field: 'DepartmentName', sortable: true, editable: true, filter: true, width:150, minWidth: 50,
        maxWidth: 300,

        cellEditor: "select",
        cellRendererFramework: LocationDropdownComponent,
        cellRendererParams: {
          value: 'department'
        }

      },
      {
        headerName: 'Designation Code', field: 'designationCode', sortable: true, editable: true, filter: true, width:150, minWidth: 50,
        maxWidth: 300,


        cellStyle: function (params) {
          if (params.value === '') {
            // bordercolor: 'red'
            alert("Please Enter Designation Code");

            return { outline: '1px solid red' };

            //color: 'red', backgroundColor: 'green',
          } else {
            return { outline: 'white' };
          }
        }

      },
      {
        headerName: 'Designation', field: 'designationName', sortable: true, editable: true, filter: true, width:150, minWidth: 50,
        maxWidth: 300,

        cellStyle: function (params) {
          if (params.value === '') {
            // bordercolor: 'red'
            alert("Please Enter Designation Name");

            return { outline: '1px solid red' };

            //color: 'red', backgroundColor: 'green',
          } else {
            return { outline: 'white' };
          }
        }

      },
      {
        headerName: 'Description', field: 'description', sortable: true, editable: true, filter: true,width:220, minWidth: 50,
        maxWidth: 300,


        cellStyle: function (params) {
          if (params.value === '') {
            // bordercolor: 'red'
            alert("Please Enter Description");

            return { outline: '1px solid red' };

            //color: 'red', backgroundColor: 'green',
          } else {
            return { outline: 'white' };
          }
        }

      },
     
    ];
    this.defaultColDef = { resizable: true };
    this.rowData2;

  }

  public show: boolean = false;
  public hide: boolean = true;
  public buttonName: any = 'Add New';
  public selectedRowsLocation: any[];
  public selectedRowsDepartment: any[];
  public selectedRowsDesignation: any[];
  arrLocationDelete: DeleteLocationBody[] = [];
  arrLocationSave: LocationBody[] = [];
  saveUpdateLocation: string;
  saveUpdateDepartment: string;
  saveUpdateDesignation: string = "Save";
  nodeSelectButWhere: string;

  totalData: number;
  startPositionDesignation: number;
  endPositionDesignation: number;


  ShowLimitedLocation: number = 0;
  ToalLocation: number = 0;
  ShowLocation: number = 0;

  count = 1;

  ngOnInit() {
    this.getLocation(1);
    this.getDepartment(1);
    this.getDesignation(1);
  }

  onGridLocationReady(params) {
    this.locationApi = params.api;
    this.columnApi = params.columnApi;
    params.locationApi.sizeColumnsToFit();
  }

  onAddLocation() {
    var res = this.locationApi.updateRowData({
      add: [{ hidden: '11', LocationCode: '', LocationName: '', LocationDescription: '' }],
      addIndex: 0,
    });

    this.rowClassRules = {
      "sick-days-warning": function (params) {
        console.log("1");
        var numSickDays = params.data.hidden;
        return numSickDays > 5 && numSickDays <= 7;
      },
      "sick-days-breach": "data.hidden > 8"
    };

    this.addNewLocationRow = false;
    this.editLocation = false;
    this.deleteNewLocation = false;
    this.nodeSelectButWhere = "Add";
  }

  getLocation(UserID: number) {
    var getLocationBody = new UniversalBody();
    getLocationBody.userID = UserID + '';
    this.countryService.doGetLocation(getLocationBody)
      .subscribe(
        data => {
          this.getAllLocationResponse = data;
          if (this.getAllLocationResponse.length === 0) {
            this.ToalLocation = this.getAllLocationResponse.length;
            this.saveUpdateLocation = "Save";
            this.editLocation = false;
            this.addNewLocationRow = false;
            this.deleteNewLocation = true;
            this.selectAllLocation = true;
          } else {
            if (this.getAllLocationResponse.length >= 50) {
              this.ShowLimitedLocation = 50;
              this.ShowLocation = 1;
            } else {
              this.ShowLimitedLocation = this.getAllLocationResponse.length;
              this.ShowLocation = 1;
            }
            this.ToalLocation = this.getAllLocationResponse.length;
            this.saveUpdateLocation = "Save";
            this.selectAllLocation = false;
            this.addNewLocationRow = false;
            this.editLocation = true;
            this.deleteNewLocation = true;

            this.rowData = this.getAllLocationResponse;
          }
        }
      );
  }


  onSaveUpdateLocationData() {
    if (this.saveUpdateLocation === "Save") {
      this.onSaveLocation("1");
    } else {
      this.onUpdateLocationData("1");
    }
  }

  onDeleteLocation() {
    const universalJsonBody = new UniversalJsonBody();
    const selectedNodes = this.locationApi.getSelectedNodes();
    const selectedData = selectedNodes.map(node => node.data);
    var dataTest: Object;
    var locationResponse: LocationResponse;
    const deleteLocationBody = new DeleteLocationBody();
    selectedData.map(node => dataTest = node as Object);
    if (selectedNodes.length === 0) {
      alert("Please Select any row.");
    } else {
      for (let selectedNode of selectedData) {
        const deleteLocationBody = new DeleteLocationBody();
        deleteLocationBody.locationId = selectedNode['id'];
        this.arrLocationDelete.push(deleteLocationBody);
        var jsonData = JSON.stringify(this.arrLocationDelete);
      }
      jsonData = jsonData.replace(/"/g, "'");
      deleteLocationBody.locationId = dataTest['id'];
      // deleteLocationBody.userId = dataTest['designationName']  
      if (dataTest['id'] === '') {
        alert("Plesae choose appropiate field");
      }
      else {
        universalJsonBody.jsonData = jsonData;
        this.countryService.doDeleteLocation(universalJsonBody)
          .subscribe(
            data => {
              locationResponse = data;
              //console.log("key", LocationResponse);
              alert(locationResponse.MESSAGE);
              if (locationResponse.STATUS === 'Success') {
                this.arrLocationDelete = [];
                this.getLocation(1);
              }
            }
          );
      }
    }
  }

  onSaveLocation(UserID: string) {
    this.arrLocationSave = [];
    const universalJsonBody = new UniversalJsonBody();
    var getLocationBody = new UniversalBody();
    getLocationBody.userID = UserID + '';
    const selectedNodes = this.locationApi.getSelectedNodes();
    const selectedData = selectedNodes.map(node => node.data);
    var dataTest: Object;
    const locationBody = new LocationBody();
    var locationResponse: LocationResponse;
    selectedData.map(node => dataTest = node as Object);
    if (selectedNodes.length === 0) {
      alert("Please Select any row.");
    } else {
      for (let selectedNode of selectedData) {
        const locationBody = new LocationBody();
        locationBody.userId = getLocationBody.userID;
        locationBody.locationCode = selectedNode['code'];
        locationBody.locationName = selectedNode['name'];
        locationBody.description = selectedNode['description'];
        this.arrLocationSave.push(locationBody);

        var jsonData = JSON.stringify(this.arrLocationSave);
      }
      jsonData = jsonData.replace(/"/g, "'");
      universalJsonBody.jsonData = jsonData;
      this.countryService.saveLocation(universalJsonBody)
        .subscribe(
          data => {
            locationResponse = data;
            alert(locationResponse.MESSAGE);
            if (locationResponse.STATUS === 'Success') {
              this.addNewLocationRow = false;
              this.arrLocationSave = [];
              this.getLocation(1);
            }
          }
        );
    }
  }

  onUpdateLocationData(UserID: string) {
    this.editLocation = false;
    this.arrLocationSave = [];
    const universalJsonBody = new UniversalJsonBody();
    var getLocationBody = new UniversalBody();
    getLocationBody.userID = UserID + '';
    const selectedNodes = this.locationApi.getSelectedNodes();
    const selectedData = selectedNodes.map(node => node.data);
    var dataTest: Object;
    const locationBody = new LocationBody();
    var locationResponse: LocationResponse;
    selectedData.map(node => dataTest = node as Object);
    if (selectedNodes.length === 0) {
      alert("Please Select any row.");
    } else {
      for (let selectedNode of selectedData) {
        const locationBody = new LocationBody();
        locationBody.userId = getLocationBody.userID;
        locationBody.locationId = selectedNode['id'];
        locationBody.locationCode = selectedNode['code'];
        locationBody.locationName = selectedNode['name'];
        locationBody.description = selectedNode['description'];
        this.arrLocationSave.push(locationBody);
        var jsonData = JSON.stringify(this.arrLocationSave);
      }
      jsonData = jsonData.replace(/"/g, "'");
      universalJsonBody.jsonData = jsonData;
      this.countryService.updateLocation(universalJsonBody)
        .subscribe(
          data => {
            locationResponse = data;
            alert(locationResponse.MESSAGE);
            if (locationResponse.STATUS === 'Success') {
              this.addNewLocationRow = false;
              this.arrLocationSave = [];
              this.getLocation(1);
            }
          }
        );
    }
  }

  onCheckedBoxLocationChange(eve: any) {
    if (this.checkedStatus === false) {
      this.locationApi.selectAll();
      this.checkedStatus = true;
      this.deleteNewLocation = false;
    } else {
      this.locationApi.deselectAll();
      this.checkedStatus = false;
      this.deleteNewLocation = true;
    }
  }

  // onLocationSelectionChanged() {
  //   this.selectedRowsLocation = this.locationApi.getSelectedRows();
  //   this.rowSelection = "multiple";
  //   if (this.selectedRowsLocation.length === 1) {
  //     this.deleteNewLocation = false;
  //     if (this.nodeSelectButWhere === "Add") {
  //       this.saveUpdateLocation = "Save";
  //       this.nodeSelectButWhere = "Update"
  //     } else if (this.nodeSelectButWhere === undefined) {
  //       this.saveUpdateLocation = "Update";
  //       this.editLocation = false;
  //       this.checkedStatus = false
  //     }
  //   }
  // }
















  onAddDepartment() {

    var res = this.departmentApi.updateRowData({
      add: [{ LocationName: '', DepartmentCode: '', DepartmentName: '', Description: '', }],
      addIndex: 0
    });
    this.addNewDepartmentRow = true;
  }

  onGridDepartmentReady(params) {
    this.departmentApi = params.api;
    this.departmentColumnApi = params.columnApi;
    this.gridOptions = params.gridOptions;
    params.api.sizeColumnsToFit();
  }

  onGridDesignationReady(params) {
    this.designationApi = params.api;
    this.designationColumnApi = params.columnApi;
    params.api.sizeColumnsToFit();
  }

  onSelectionChanged() {
    const selectedRows = this.locationApi.getSelectedRows();
    let selectedRowsString = '';
    selectedRows.forEach(function (selectedRow, index) {
      if (index !== 0) {
        selectedRowsString += ', ';
      }
      selectedRowsString += selectedRow.athlete;
    });
    document.querySelector('#selectedRows').innerHTML = selectedRowsString;
  }

  onSelectionDepartmentChanged() {
    const selectedRows = this.departmentApi.getSelectedRows();
    let selectedRowsString = '';
    selectedRows.forEach(function (selectedRow, index) {
      if (index !== 0) {
        selectedRowsString += ', ';
      }
      selectedRowsString += selectedRow.athlete;
    });
    document.querySelector('#selectedRows').innerHTML = selectedRowsString;
  }


  // onSelectionDesignationChanged() {
  //   (document.getElementById("selectAllDesignationCheckBox") as HTMLInputElement).checked = false;

  //   const selectedRows = this.designationApi.getSelectedRows();
  //   let selectedRowsString = '';
  //   selectedRows.forEach(function (selectedRow, index) {
  //     if (index !== 0) {
  //       selectedRowsString += ', ';
  //     }
  //     selectedRowsString += selectedRow.athlete;
  //   });
  //   document.querySelector('#selectedRows').innerHTML = selectedRowsString;
  // }

  onEmpFilterChange(event) {
    alert("Check");
  }


  onDeleteDepartment() {
    const selectedNodes = this.departmentApi.getSelectedNodes();
    var dataTest: Object;
    const deleteDepartment = new DeleteDepartmentBody();
    const selectedData = selectedNodes.map(node => node.data);
    selectedData.map(node => dataTest = node as Object);
    console.log("key", selectedNodes);
    if (selectedNodes.length === 0) {
      alert("Please Select any row.");
    } else {
      deleteDepartment.DepartmentID = dataTest['departmentID'];
      if (deleteDepartment.DepartmentID === undefined) {
        this.addNewDepartmentRow = false;
      } else {
        console.log("key dept. ID", deleteDepartment.DepartmentID);
        this.countryService.deleteDepartment(deleteDepartment)
          .subscribe(
            data => {
              this.locationResponse = data;
              this.departmentApi.removeItems(selectedNodes);
              console.log("key response", LocationResponse);
              alert(this.locationResponse.MESSAGE);
            }

          );
      }
    }
  }
  // onDeleteDesignation() {
  //   const selectedNodes = this.designationApi.getSelectedNodes();
  //   const universalJsonBody = new UniversalJsonBody();
  //   var dataTest: Object;
  //   // const deleteDesignationBody = new DeleteDesignationBody();
  //   const selectedData = selectedNodes.map(node => node.data);
  //   selectedData.map(node => dataTest = node as Object);
  //   console.log("key deleteBody", selectedNodes);

  //   if (selectedData.length === 0) {
  //     alert("Please Select any row.");
  //   } else {

  //     for (let selectedNode of selectedData) {
  //       const deleteDesignationBody = new DeleteDesignationBody();
  //       deleteDesignationBody.designationId = selectedNode['designationID'];
  //       this.arrDesignationDelete.push(deleteDesignationBody);
  //       var jsonData = JSON.stringify(this.arrDesignationDelete);

  //     }

  //     jsonData = jsonData.replace(/"/g, "'");


  //     universalJsonBody.jsonData = jsonData;
  //     console.log("key and values", universalJsonBody);
  //     this.countryService.deleteDesignation(universalJsonBody)
  //       .subscribe(
  //         data => {
  //           this.locationResponse = data;
  //           if (this.locationResponse.STATUS === "Success") {
  //             this.designationApi.removeItems(selectedNodes);
  //             console.log("key deleteresponse", LocationResponse);
  //             //alert(this.locationResponse.MESSAGE);
  //             this.getDesignation(1);
  //           }
  //           this.arrDesignationDelete = [];
  //         }

  //       );

  //   }
  // }

  getDepartment(UserID: number) {
    var getDepartmentBody = new UniversalBody();
    getDepartmentBody.userID = UserID + '';
    this.countryService.getDepartmentByUserId(getDepartmentBody)
      .subscribe(
        data => {
          this.getDepartmentResponse = data;
          console.log("AAAAA", this.getDepartmentResponse.length);
          if (this.getDepartmentResponse.length === 0) {

            this.saveUpdateDepartment = "Save";
            this.editDepartment = false;
            this.addNewDepartmentRow = false;
            this.deleteNewDepartment = true;
          } else {
            this.saveUpdateDepartment = "Save";
            this.editDepartment = true;
            this.addNewDepartmentRow = false;
            this.deleteNewDepartment = true;
            this.rowData1 = this.getDepartmentResponse;
          }
        }
      );
  }

  onSaveUpdateDepartmentData() {
    if (this.saveUpdateDepartment === "Save") {
      this.onSaveDepartment();
    } else {
      this.onUpdateDepartmentData();
    }
  }

  onSaveDepartment() {

    var getDepartmentBody = new UniversalBody();
    const departmentBody = new DepartmentBody();
    const selectedNodes = this.departmentApi.getSelectedNodes();
    console.log("key", selectedNodes);
    const selectedData = selectedNodes.map(node => node.data);
    var dataTest: Object;
    selectedData.map(node => dataTest = node as Object);
    departmentBody.DepartmentCode = dataTest['departmentCode'];
    departmentBody.DepartmentName = dataTest['departmentName']
    departmentBody.Description = dataTest['description']
    if (dataTest['departmentCode'] === '') {
      alert("Please Enter Department Code");
    }
    if (dataTest['departmentName'] === '') {
      alert("Plesae Enter Department Name");
    }
    else if (dataTest['description'] === '') {
      alert("Please Enter Description");
    }
    else {
      this.countryService.saveDepartment(departmentBody)
        .subscribe(
          data => {
            this.universalResponse = data;
            alert(this.universalResponse.MESSAGE);
            if (this.locationResponse.STATUS === 'Success') {
              this.addNewDepartmentRow = false;
              this.countryService.getDepartmentByUserId(getDepartmentBody)
                .subscribe(
                  data => {
                    this.getDepartmentResponse = data;
                    this.addNewDepartmentRow = false;
                    this.rowData1 = this.getDepartmentResponse;
                  }

                );
            }
          }
        );
    }
  }

  onUpdateDepartmentData() {

    this.editDepartment = false;

    if (this.selectedRowsDepartment === undefined) {
      alert("Please enter input valid data then hit save.")
    } else {
      alert('Do you want to save the data.');
      const selectedNodes = this.departmentApi.getSelectedNodes();
      if (selectedNodes.length === 0) {
        alert("Please Input Valid Data");
      } else {

        const updateDepartmentBody = new DepartmentBody();
        const selectedData = selectedNodes.map(node => node.data);
        var universalResonse: UniversalResponse;
        var dataTest: Object;
        selectedData.map(node => dataTest = node as Object);

        updateDepartmentBody.DepartmentCode = dataTest['departmentCode'];
        updateDepartmentBody.DepartmentName = dataTest['departmentName'];
        updateDepartmentBody.Description = dataTest['departmentName'];
        updateDepartmentBody.DepartmentID = dataTest['departmentID'];
        if (dataTest['departmentCode'] === '') {
          alert("Enter Department Code");
        } else if (dataTest['departmentName'] === '') {
          alert("Enter Department");
        } else if (dataTest['description'] === '') {
          alert("Enter Location Description");
        } else {
          this.countryService.updateDepartment(updateDepartmentBody)
            .subscribe(
              data => {

                universalResonse = data;
                console.log("recived", universalResonse.STATUS);
                if (universalResonse.STATUS === "Success") {
                  alert(universalResonse.STATUS + " : " + universalResonse.MESSAGE);
                  this.addNewDepartmentRow = false;
                  this.getDepartment(1);
                  this.nodeSelectButWhere = "Update"
                } else {
                  alert(universalResonse.STATUS + ' : ' + universalResonse.MESSAGE);
                }
              }
            );
        }
      }
    }
  }


  onLocationSelectionChanged() {
    this.selectedRowsLocation = this.locationApi.getSelectedRows();
    if (this.selectedRowsLocation.length === 1) {
      this.deleteNewLocation = false;
      console.log("NodeBut Where", this.nodeSelectButWhere);

      if (this.nodeSelectButWhere === "Add") {
        this.saveUpdateLocation = "Save";
        this.nodeSelectButWhere = "Update"
      } else if (this.nodeSelectButWhere === undefined) {
        this.saveUpdateLocation = "Update";
        this.editLocation = false;

      }

    }
  }
  onDepartmentSelectionChanged() {
    this.selectedRowsDepartment = this.departmentApi.getSelectedRows();
    if (this.selectedRowsDepartment.length === 1) {
      this.deleteNewDepartment = false;
      console.log("NodeBut Where", this.nodeSelectButWhere);

      if (this.nodeSelectButWhere === "Add") {
        this.saveUpdateDepartment = "Save";
        this.nodeSelectButWhere = "Update"
      } else if (this.nodeSelectButWhere === undefined) {
        this.saveUpdateDepartment = "Update";
        this.editDepartment = false;
      }

    }
  }

  onCheckedBoxChange(eve: any) {
    if (this.checkedStatus === false) {
      this.locationApi.selectAll();
      this.checkedStatus = true;
      this.deleteNewLocation = false;
    } else {
      this.locationApi.deselectAll();
      this.checkedStatus = false;
      this.deleteNewLocation = true;
    }
  }


  getDesignation(UserID: number) {

    this.editDesignation = false;
    this.addNewDesignationRow = true;
    this.deleteNewDesignation = true;

    var getDesignationBody = new UniversalBody();
    getDesignationBody.userID = UserID + '';
    this.countryService.getDesignationByUserId(getDesignationBody)
      .subscribe(
        data => {
          this.getDesignationResponse = data;
          console.log("AAAAA", this.getDesignationResponse.length);
          if (this.getDesignationResponse.length === 0) {

            this.saveUpdateDesignation = "Save";
            this.editDesignation = false;
            this.addNewDesignationRow = false;
            this.deleteNewDesignation = true;
          } else {
            if (this.getDesignationResponse.length <= 50) {
              this.startPositionDesignation = 1;
              this.endPositionDesignation = this.getDesignationResponse.length;
            } else {
              this.startPositionDesignation = 1;
              this.endPositionDesignation = 50;

            }
            this.totalData = this.getDesignationResponse.length;
            console.log("data length", this.getDesignationResponse.length);
            this.saveUpdateDesignation = "Save";
            this.editDesignation = true;
            this.addNewDesignationRow = false;
            this.deleteNewDesignation = true;
            this.rowData2 = this.getDesignationResponse;
          }
        }
      );
  }

  onAddDesignation() {
    this.nodeSelectButWhere = "Add";
    this.editDesignation = false;
    let res = this.designationApi.updateRowData({ add: [{ LocationName: '', DepartmentName: '', DesignationCode: '', DesignationName: '', Description: '' }], addIndex: 0 });
    res.add.forEach(function (rowNode) {
      console.log('Added Row Node', rowNode);
    });


    const universalJsonBody = new UniversalJsonBody();
    const selectedNodes = this.designationApi.getSelectedNodes();
    const selectedData = selectedNodes.map(node => node.data);
    var dataTest: Object;
    var locationResponse: LocationResponse;
    selectedData.map(node => dataTest = node as Object);



    for (let selectedNode of selectedData) {
      console.log("selected node length", selectedNode);
      const designationBody = new DesignationBody();
      designationBody.designationCode = selectedNode['designationCode'];
      designationBody.designationName = selectedNode['designationName'];
      designationBody.description = selectedNode['description'];
      this.arrDesignationSave.push(designationBody);
      console.log("array data", this.arrDesignationSave);
      //  var jsonData = JSON.stringify(this.arrDesignationSave);
    }



    if (dataTest['designationCode'] === '') {
      alert("Plesae Enter Designation Code");
    }
    else if (dataTest['designationName'] === '') {
      alert("Please Enter Designation");
    }
    else if (dataTest['description'] === '') {
      alert("Please Enter Description");
    }
    //this.addNewDesignationRow = true;
    this.editDesignation = false;

  }

  onSaveUpdateDesignationData() {
    if (this.saveUpdateDesignation === "Save") {
      this.onSaveDesignation();
    } else {
      this.onUpdateDesignationData();
    }
  }

  onSaveDesignation() {
    this.designationApi.tabToNextCell();
    var getDesignationBody = new UniversalBody();
    const universalJsonBody = new UniversalJsonBody();
    const selectedNodes = this.designationApi.getSelectedNodes();
    const selectedData = selectedNodes.map(node => node.data);
    var dataTest: Object;
    var locationResponse: LocationResponse;
    selectedData.map(node => dataTest = node as Object);

    if (selectedData.length === 0) {
      alert('Please select a row');
    } else {
      console.log("selected data length", selectedData);

      for (let selectedNode of selectedData) {
        console.log("selected node length", selectedNode);
        const designationBody = new DesignationBody();
        designationBody.designationCode = selectedNode['designationCode'];
        designationBody.designationName = selectedNode['designationName'];
        designationBody.description = selectedNode['description'];
        this.arrDesignationSave.push(designationBody);
        console.log("array data", this.arrDesignationSave);
        var jsonData = JSON.stringify(this.arrDesignationSave);
      }
      console.log("jsonData--------", jsonData);
      jsonData = jsonData.replace(/"/g, "'");
      console.log("jsonfreshData--------", jsonData);


      if (dataTest['designationCode'] === '') {
        alert("Plesae Enter Designation Code");
      }
      else if (dataTest['designationName'] === '') {
        alert("Please Enter Designation");
      }
      else if (dataTest['description'] === '') {
        alert("Please Enter Description");
      }
      else {
        universalJsonBody.jsonData = jsonData;
        this.countryService.saveDesignation(universalJsonBody)
          .subscribe(
            data => {
              locationResponse = data;
              //console.log("key", LocationResponse);
              alert(locationResponse.MESSAGE);
              if (locationResponse.STATUS === 'Success') {
                this.addNewDepartmentRow = false;
                this.nodeSelectButWhere = undefined;
                this.addNewDesignationRow = false;
              }
              this.arrDesignationSave = [];
              this.arrDesignationSave.length = 0;
              this.getDesignation(1);
            }

          );
      }
    }
  }

  onUpdateDesignationData() {

    this.editDesignation = false;

    if (this.selectedRowsDesignation === undefined) {
      alert("Please enter input valid data then hit save.")
    } else {
      const selectedNodes = this.designationApi.getSelectedNodes();
      if (selectedNodes.length === 0) {
        alert("Please Input Valid Data");
      } else {
        console.log("InUpdate", "Update");
        const updateDesignationBody = new DesignationBody();
        const selectedData = selectedNodes.map(node => node.data);
        var universalResonse: UniversalResponse;
        var dataTest: Object;
        selectedData.map(node => dataTest = node as Object);

        console.log("Key", selectedData);

        updateDesignationBody.designationCode = dataTest['designationCode'];
        updateDesignationBody.designationName = dataTest['designationName'];
        updateDesignationBody.description = dataTest['description'];
        //updateDesignationBody.DesignationID = dataTest['designationID'];
        if (dataTest['designationCode'] === '') {
          alert("Enter Location Code");
        } else if (dataTest['designationName'] === '') {
          alert("Enter Location");
        } else if (dataTest['description'] === '') {
          alert("Enter Location Description");
        } else {
          this.countryService.updateDesignation(updateDesignationBody)
            .subscribe(
              data => {

                universalResonse = data;
                console.log("recived", universalResonse.STATUS);
                if (universalResonse.STATUS === "Success") {
                  console.log("Key Universal Update", universalResonse);
                  alert(universalResonse.STATUS + " : " + universalResonse.MESSAGE);
                  this.addNewDesignationRow = false;
                  this.getDesignation(1);
                  this.nodeSelectButWhere = "Update"
                } else {
                  alert(universalResonse.STATUS + ' : ' + universalResonse.MESSAGE);
                }
              }
            );
        }
      }
    }
  }


  universalDeleteOrganizaion() {
    const LocationNode = this.locationApi.getSelectedNodes();
    const DepartmentNode = this.departmentApi.getSelectedNodes();
    const DesignationNode = this.designationApi.getSelectedNodes();

    if (LocationNode.length !== 0) {
      this.onDeleteLocation();
    }
    else if (DepartmentNode.length !== 0) {
      // this.onDeleteExperience();
    }
    else if (DesignationNode.length !== 0) {
      this.onDeleteDesignation();
    }
  }
  onDeleteDesignation() {
    const selectedNodes = this.designationApi.getSelectedNodes();
    const universalJsonBody = new UniversalJsonBody();
    var dataTest: Object;
    // const deleteDesignationBody = new DeleteDesignationBody();
    const selectedData = selectedNodes.map(node => node.data);
    selectedData.map(node => dataTest = node as Object);
    console.log("key deleteBody", selectedNodes);

    if (selectedData.length === 0) {
      alert("Please Select any row.");
    } else {

      for (let selectedNode of selectedData) {
        const deleteDesignationBody = new DeleteDesignationBody();
        deleteDesignationBody.designationId = selectedNode['designationID'];
        this.arrDesignationDelete.push(deleteDesignationBody);
        var jsonData = JSON.stringify(this.arrDesignationDelete);

      }

      jsonData = jsonData.replace(/"/g, "'");


      universalJsonBody.jsonData = jsonData;
      console.log("key and values", universalJsonBody);
      this.countryService.deleteDesignation(universalJsonBody)
        .subscribe(
          data => {
            this.locationResponse = data;
            if (this.locationResponse.STATUS === "Success") {
              this.designationApi.removeItems(selectedNodes);
              console.log("key deleteresponse", LocationResponse);
              //alert(this.locationResponse.MESSAGE);
              this.getDesignation(1);
            }
            this.arrDesignationDelete = [];
          }

        );

    }
  }
  onSelectionDesignationChanged() {
    const selectedRows = this.designationApi.getSelectedRows();
    let selectedRowsString = '';
    selectedRows.forEach(function (selectedRow, index) {
      if (index !== 0) {
        selectedRowsString += ', ';
      }
      selectedRowsString += selectedRow.athlete;
    });
    document.querySelector('#selectedRows').innerHTML = selectedRowsString;
  }
  onFirstDataRendered(params) {
    params.api.sizeColumnsToFit();
  }
  
  onDesignationSelectionChanged() {
    this.editDesignation = false;
    this.selectedRowsDesignation = this.designationApi.getSelectedRows();
    if (this.selectedRowsDesignation.length === 1) {
      this.deleteNewDesignation = false;
      this.selectAllDesignationCheckBox = false;
      console.log("NodeBut Where", this.nodeSelectButWhere);
      if (this.nodeSelectButWhere === "Add") {
        this.saveUpdateDesignation = "Save";
        this.nodeSelectButWhere = "Update"
      } else if (this.nodeSelectButWhere === undefined) {
        this.saveUpdateDesignation = "Update";
        this.editDesignation = false;
      }
      else if (this.nodeSelectButWhere === "Update") {
        this.editDesignation = false;
        this.saveUpdateDesignation = "Update";
      }
    }
  }
}