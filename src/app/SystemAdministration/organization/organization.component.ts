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

@Component({
  selector: 'app-organization',
  templateUrl: './organization.component.html',
  styleUrls: ['./organization.component.css']
})
export class OrganizationComponent implements OnInit {
  checkedStatus = false;
  api: GridApi;
  columnApi: ColumnApi;

  departmentApi: GridApi;
  departmentColumnApi: ColumnApi;

  designationApi: GridApi;
  designationColumnApi: ColumnApi;

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


  constructor(private countryService: AllWeb) {
    //this.frameworkComponents = { genderCellRenderer: LocationDropdownComponent };
    this.rowSelection = 'single';
    this.columnDefs = [
      {
        headerName: 'Location Code', field: 'code', sortable: true, filter: true, editable: true, width: 120,
        cellStyle: function (params) {
          if (params.value === '') {
            return { outline: '1px solid red' };
          } else {
            return { outline: 'white' };
          }
        }
      },
      {
        headerName: 'Location Name', field: 'name', sortable: true, filter: true, editable: true, width: 120,


        cellStyle: function (params) {
          if (params.value === '') {
            return { outline: '1px solid red' };
          } else {
            return { outline: 'white' };
          }
        }

      },
      {
        headerName: 'Description', field: 'description', sortable: true, filter: true, editable: true, width: 130,


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

      { headerName: '', field: '', width: 486, }
    ];
    this.rowData;
    this.columnDefs1 = [
      {
        headerName: 'Location Name', field: 'LocationName', sortable: true, filter: true, width: 120,
        cellRendererFramework: LocationDropdownComponent,
        cellRendererParams: {
          value: 'location'
        }
      },
      {
        headerName: 'Department Code', field: 'departmentCode', sortable: true, editable: true, filter: true, width: 140,

        cellStyle: function (params) {
          if (params.value === '') {
            return { outline: '1px solid red' };
          } else {
            return { outline: 'white' };
          }
        }

      },
      {
        headerName: 'Department Name', field: 'departmentName', sortable: true, editable: true, filter: true, width: 120,


        cellStyle: function (params) {
          if (params.value === '') {
            return { outline: '1px solid red' };
          } else {
            return { outline: 'white' };
          }
        }

      },
      {
        headerName: 'Description', field: 'description', sortable: true, editable: true, filter: true, width: 130,


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
      { headerName: '', field: '', width: 382, }
    ];

    this.rowData1;


    this.columnDefs2 = [
      {
        headerName: 'Location Name', field: 'LocationName', sortable: true, filter: true, editable: true, width: 120,
        cellEditor: 'select',
        cellRendererFramework: LocationDropdownComponent,
        cellRendererParams: {
          value: 'location'
        }

      },

      {
        headerName: 'Department', field: 'DepartmentName', sortable: true, editable: true, filter: true, width: 120,

        cellEditor: "select",
        cellRendererFramework: LocationDropdownComponent,
        cellRendererParams: {
          value: 'department'
        }

      },
      {
        headerName: 'Designation Code', field: 'designationCode', sortable: true, editable: true, filter: true, width: 140,


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
        headerName: 'Designation', field: 'designationName', sortable: true, editable: true, filter: true, width: 140,

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
        headerName: 'Description', field: 'description', sortable: true, editable: true, filter: true, width: 130,


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
      { headerName: '', field: '', width: 243, }
    ];

    this.rowData2;

  }

  public show: boolean = false;
  public hide: boolean = true;
  public buttonName: any = 'Add New';
  public selectedRowsLocation: any[];
  public selectedRowsDepartment: any[];
  public selectedRowsDesignation: any[];
  saveUpdateLocation: string;
  saveUpdateDepartment: string;
  saveUpdateDesignation: string;
  nodeSelectButWhere: string;


  count = 1;

  ngOnInit() {
    // this.getAllLocationResponse = this.getAllLocation();
    this.getLocation(1);
    this.getDepartment(1);
    this.getDesignation(1);
  }
  onAddLocation() {

    var res = this.api.updateRowData({
      add: [{ LocationCode: '', LocationName: '', LocationDescription: '' }],
      addIndex: 0
    });
    this.addNewLocationRow = true;
    this.nodeSelectButWhere = "Add";
  }
  onAddDepartment() {

    var res = this.departmentApi.updateRowData({
      add: [{ LocationName: '', DepartmentCode: '', DepartmentName: '', Description: '', }],
      addIndex: 0
    });
    this.addNewDepartmentRow = true;
  }

  onGridLocationReady(params) {
    this.api = params.api;
    this.columnApi = params.columnApi;
    params.api.sizeColumnsToFit();
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
  onEmpFilterChange(event) {
    alert("Check");
  }
  onDeleteLocation() {

    const selectedNodes = this.api.getSelectedNodes();
    var dataTest: Object;
    const deleteLocationBody = new DeleteLocationBody();
    const selectedData = selectedNodes.map(node => node.data);
    selectedData.map(node => dataTest = node as Object);
    if (selectedNodes.length === 0) {
      alert("Please Select any row.");
    } else {
      deleteLocationBody.LocationID = dataTest['id'];
      if (deleteLocationBody.LocationID === undefined) {
        this.addNewLocationRow = false;
      } else {
        console.log("key", deleteLocationBody.LocationID);
        this.countryService.doDeleteLocation(deleteLocationBody)
          .subscribe(
            data => {
              this.locationResponse = data;
              this.api.removeItems(selectedNodes);
              console.log("key", LocationResponse);
              alert(this.locationResponse.MESSAGE);
            }

          );
      }
    }
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

  onDeleteDesignation() {
    const selectedNodes = this.designationApi.getSelectedNodes();
    var dataTest: Object;
    const deleteDesignationBody = new DeleteDesignationBody();
    const selectedData = selectedNodes.map(node => node.data);
    selectedData.map(node => dataTest = node as Object);
    console.log("key deleteBody", selectedNodes);
    if (selectedData.length === 0) {
      alert("Please Select any row.");
    } else {
      deleteDesignationBody.DesignationID = dataTest['designationID'];
      if (deleteDesignationBody.DesignationID === undefined) {
        this.addNewDesignationRow = false;
      } else {
        console.log("key desig. ID", deleteDesignationBody.DesignationID);
        this.countryService.deleteDesignation(deleteDesignationBody)
          .subscribe(
            data => {
              this.locationResponse = data;
              this.designationApi.removeItems(selectedNodes);
              console.log("key deleteresponse", LocationResponse);
              alert(this.locationResponse.MESSAGE);
            }

          );
      }
    }
  }
  getLocation(UserID: number) {
    var getLocationBody = new UniversalBody();
    getLocationBody.userID = UserID + '';
    this.countryService.doGetLocation(getLocationBody)
      .subscribe(
        data => {
          this.getAllLocationResponse = data;
          console.log("AAAAA", this.getAllLocationResponse.length);
          if (this.getAllLocationResponse.length === 0) {

            this.saveUpdateLocation = "Save";
            this.editLocation = false;
            this.addNewLocationRow = false;
            this.deleteNewLocation = true;
          } else {
            this.saveUpdateLocation = "Save";
            this.editLocation = true;
            this.addNewLocationRow = false;
            this.deleteNewLocation = true;
            this.rowData = this.getAllLocationResponse;
          }
        }
      );

  }
  onSaveUpdateLocationData() {
    if (this.saveUpdateLocation === "Save") {
      this.onSaveLocation();
    } else {
      this.onUpdateLocationData();
    }
  }
  onSaveLocation() {

    const locationBody = new LocationBody();
    const getLocationBody = new UniversalBody();
    const selectedNodes = this.api.getSelectedNodes();

    const selectedData = selectedNodes.map(node => node.data);
    var dataTest: Object;
    selectedData.map(node => dataTest = node as Object);
    locationBody.LocationCode = dataTest['code'];
    locationBody.LocationName = dataTest['name'];
    locationBody.LocationDescription = dataTest['description']

    if (dataTest['code'] === '') {
      alert("Plesae Enter Location code");
    }
    else if (dataTest['name'] === '') {
      alert("Please Enter Location Name");
    }
    else if (dataTest['description'] === '') {
      alert("Please Enter Description");
    }
    else {
      this.countryService.saveLocation(locationBody)
        .subscribe(
          data => {
            this.locationResponse = data;

            alert(this.locationResponse.MESSAGE);

            if (this.locationResponse.STATUS === 'Success') {
              this.addNewLocationRow = false;


              this.countryService.doGetLocation(getLocationBody)
                .subscribe(
                  data => {
                    this.getAllLocationResponse = data;
                    this.addNewLocationRow = false;
                    this.rowData1 = this.getAllLocationResponse;
                  }
                )
            }
          }

        );
    }
  }
  onUpdateLocationData() {

    this.editLocation = false;

    if (this.selectedRowsLocation === undefined) {
      alert("Please enter input valid data then hit save.")
    } else {
      alert('Do you want to save the data.');
      const selectedNodes = this.api.getSelectedNodes();
      if (selectedNodes.length === 0) {
        alert("Please Input Valid Data");
      } else {
        //console.log("InUpdate","Update");
        const updateLocationBody = new LocationBody();
        const selectedData = selectedNodes.map(node => node.data);
        var universalResonse: UniversalResponse;
        var dataTest: Object;
        selectedData.map(node => dataTest = node as Object);

        //console.log("Key",selectedData);

        updateLocationBody.LocationCode = dataTest['code'];
        updateLocationBody.LocationName = dataTest['name'];
        updateLocationBody.LocationDescription = dataTest['description'];
        updateLocationBody.LocationID = dataTest['id'];
        if (dataTest['code'] === '') {
          alert("Enter Location Code");
        } else if (dataTest['name'] === '') {
          alert("Enter Location");
        } else if (dataTest['description'] === '') {
          alert("Enter Location Description");
        } else {
          this.countryService.updateLocation(updateLocationBody)
            .subscribe(
              data => {

                universalResonse = data;
                // console.log("recived", universalResonse.STATUS);
                if (universalResonse.STATUS === "Success") {
                  // console.log("Key Universal Update",universalResonse);
                  alert(universalResonse.STATUS + " : " + universalResonse.MESSAGE);
                  this.addNewLocationRow = false;
                  this.getLocation(1);
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

  getDesignation(UserID: number) {

    this.editDesignation = true;
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
    let res = this.designationApi.updateRowData({ add: [{ LocationName: '', DepartmentName: '', DesignationCode: '', DesignationName: '', Description: '' }], addIndex: 0 });
    res.add.forEach(function (rowNode) {
      console.log('Added Row Node', rowNode);
    });
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

  arrDesignation : DesignationBody[] = [];

  onSaveDesignation() {
    var getDesignationBody = new UniversalBody();
    const designationBody = new DesignationBody();
    const selectedNodes = this.designationApi.getSelectedNodes();
    const selectedData = selectedNodes.map(node => node.data);
    var dataTest: Object;
    selectedData.map(node => dataTest = node as Object);

    if (selectedData.length === 0) {
      alert('Please select a row');
    } else {
      console.log("selected data length", selectedData);
            
      for (let selectedNode of selectedData) {
        console.log("selected node length", selectedNode);
        designationBody.DesignationCode = selectedNode['designationCode'];
        designationBody.DesignationName = selectedNode['designationName'];
        designationBody.Description = selectedNode['description'];
        this.arrDesignation.push(designationBody);
        //var jsonData = JSON.stringify(this.countryArray);
        console.log("array data", this.arrDesignation);
  
      }
    

      designationBody.DesignationCode = dataTest['designationCode'];
      designationBody.DesignationName = dataTest['designationName'];
      designationBody.Description = dataTest['description'];
      
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

        this.countryService.saveDesignation(designationBody)

          .subscribe(
            data => {
              this.locationResponse = data;
              //console.log("key", LocationResponse);
              alert(this.locationResponse.MESSAGE);
              if (this.locationResponse.STATUS === 'Success') {
                this.addNewDepartmentRow = false;
                this.countryService.getDesignationByUserId(getDesignationBody)
                  .subscribe(
                    data => {
                      this.getDesignationResponse = data;
                      this.rowData2 = this.getDesignationResponse;
                    }
                  )
                  this.nodeSelectButWhere = undefined;
                  this.addNewDesignationRow = false;
              }
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
      alert('Do you want to save the data.');
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

        updateDesignationBody.DesignationCode = dataTest['designationCode'];
        updateDesignationBody.DesignationName = dataTest['designationName'];
        updateDesignationBody.Description = dataTest['description'];
        updateDesignationBody.DesignationID = dataTest['designationID'];
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
  onLocationSelectionChanged() {
    this.selectedRowsLocation = this.api.getSelectedRows();
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
  onDesignationSelectionChanged() {
    this.selectedRowsDesignation = this.designationApi.getSelectedRows();
    if (this.selectedRowsDesignation.length === 1) {
      this.deleteNewDesignation = false;
      console.log("NodeBut Where", this.nodeSelectButWhere);

      if (this.nodeSelectButWhere === "Add") {
        this.saveUpdateDesignation = "Save";
        this.nodeSelectButWhere = "Update"
      } else if (this.nodeSelectButWhere === undefined) {
        this.saveUpdateDesignation = "Update";
        this.editDesignation = false;

      }

    }
  }
  onCheckedBoxChange(eve: any) {
    if (this.checkedStatus === false) {
      this.api.selectAll();
      this.checkedStatus = true;
      this.deleteNewLocation = false;
    } else {
      this.api.deselectAll();
      this.checkedStatus = false;
      this.deleteNewLocation = true;
    }
  }
  onCheckedBoxChangeDepartment(eve: any) {
    if (this.checkedStatus === false) {
      this.departmentApi.selectAll();
      this.checkedStatus = true;
      this.deleteNewDepartment = false;
    } else {
      this.api.deselectAll();
      this.checkedStatus = false;
      this.deleteNewDepartment = true;
    }
  }
  onCheckedBoxChangeDesignation(eve: any) {
    if (this.checkedStatus === false) {
      this.designationApi.selectAll();
      this.checkedStatus = true;
      this.deleteNewDesignation = false;
    } else {
      this.api.deselectAll();
      this.checkedStatus = false;
      this.deleteNewDesignation = true;
    }



  }
}