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
  checkedLocationStatus = false;
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
  checkBoxDesignation = true;
  deleteNewLocation: boolean = false;


  departmentfilter: boolean;
  departmentCheckedStatus = false;
  deleteNewDepartment: boolean = false;
  deleteNewDesignation: boolean = false;


  ShowDepartment: any = 0;
  ShowLimitedDepartment: any = 0;
  ToalDepartment: any = 0;

  arrDesignationSave: DesignationBody[] = [];
  arrDesignationDelete: DeleteDesignationBody[] = [];
  arrDesignationUpdate: DesignationBody[] = [];
  arrDepartmentSave: DepartmentBody[] = [];
  arrDepartmentDelete: DeleteDepartmentBody[] = [];


  saveUpdateDepartmentPopup: string;
  btnSaveUpdateDepartmentPopup: string;

  selectAllDesignationCheckBox = false;

  selectAllLocation = true;
  selectAllDepartment = true;
  nodeDepartmentSelect: string;
  checkedStatus = false;
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
        headerName: 'Location Code', field: 'code', sortable: true, filter: true, editable: true, width: 250, minWidth: 50,
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
        headerName: 'Location Name', field: 'name', sortable: true, filter: true, editable: true, width: 250, minWidth: 50,
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
        headerName: 'Description', field: 'description', sortable: true, filter: true, editable: true, width: 300, minWidth: 50,
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
        headerName: 'Location Name', field: 'LocationName', sortable: true, filter: true, width: 150, minWidth: 50,
        maxWidth: 300,
        cellRendererFramework: LocationDropdownComponent,
        cellRendererParams: {
          value: 'location'
        }
      },
      {
        headerName: 'Department Code', field: 'departmentCode', sortable: true, editable: true, width: 250, minWidth: 50,
        maxWidth: 300, filter: 'agNumberColumnFilter',

        cellStyle: function (params) {
          if (params.value === '') {
            return { outline: '1px solid red' };
          } else {
            return { outline: 'white' };
          }
        }

      },
      {
        headerName: 'Department Name', field: 'departmentName', sortable: true, width: 150, minWidth: 50,
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
        headerName: 'Description', field: 'description', sortable: true, width: 250, minWidth: 50,
        maxWidth: 300, editable: true, filter: true,


        // cellStyle: function (params) {
        //   if (params.value === '') {
        //     // bordercolor: 'red'
        //     // alert("Please Enter Description");

        //     return { outline: '1px solid red' };

        //     //color: 'red', backgroundColor: 'green',
        //   } else {
        //     return { outline: 'white' };
        //   }
        // }

      },
      // { headerName: '', field: '',  }
    ];
    this.defaultColDef = { resizable: true };

    this.rowData1;


    this.columnDefs2 = [
      {
        headerName: 'Location Name', field: 'LocationName', sortable: true, filter: true, editable: true, width: 150, minWidth: 50,
        maxWidth: 300,
        cellEditor: 'select',
        cellRendererFramework: LocationDropdownComponent,
        cellRendererParams: {
          value: 'location'
        }

      },

      {
        headerName: 'Department', field: 'DepartmentName', sortable: true, editable: true, filter: true, width: 150, minWidth: 50,
        maxWidth: 300,

        cellEditor: "select",
        cellRendererFramework: LocationDropdownComponent,
        cellRendererParams: {
          value: 'department'
        }

      },
      {
        headerName: 'Designation Code', field: 'designationCode', sortable: true, editable: true, filter: true, width: 150, minWidth: 50,
        maxWidth: 300,


        cellStyle: function (params) {
          if (params.value === '') {
            // bordercolor: 'red'
            //alert("Please Enter Designation Code");

            return { outline: '1px solid red' };

            //color: 'red', backgroundColor: 'green',
          } else {
            return { outline: 'white' };
          }
        }

      },
      {
        headerName: 'Designation', field: 'designationName', sortable: true, editable: true, filter: true, width: 150, minWidth: 50,
        maxWidth: 300,

        cellStyle: function (params) {
          if (params.value === '') {
            // bordercolor: 'red'
            //alert("Please Enter Designation Name");

            return { outline: '1px solid red' };

            //color: 'red', backgroundColor: 'green',
          } else {
            return { outline: 'white' };
          }
        }

      },
      {
        headerName: 'Description', field: 'description', sortable: true, editable: true, filter: true, width: 220, minWidth: 50,
        maxWidth: 300,


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
  // saveUpdateLocation: string;
  saveUpdateDepartment: string;
  saveUpdateDesignation: string = "Save";
  nodeSelectButWhere: string = "Update";

  totalData: number = 0;
  endPositionDesignation: number = 0;
  startPositionDesignation: number = 0;

  ShowLimitedLocation: number = 0;
  ToalLocation: number = 0;
  ShowLocation: number = 0;

  count = 1;

  ngOnInit() {
    this.getLocation(1);
    this.getDepartment('1');
    this.getDesignation(1);
    this.saveUpdateDepartment = 'Save';
    this.addNewDepartmentRow = true;
    this.editDepartment = true;
    this.deleteNewDepartment = true;

  }

  onGridLocationReady(params) {
    this.locationApi = params.api;
    this.columnApi = params.columnApi;
    this.locationApi.sizeColumnsToFit();
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
    this.nodeSelectButWhere = "Save";
  }

  getLocation(UserID: number) {
    console.log("Get Locations","Locationsss");
    var getLocationBody = new UniversalBody();
    getLocationBody.userID = UserID + '';
    this.countryService.doGetLocation(getLocationBody)
      .subscribe(
        data => {
          this.getAllLocationResponse = data;
          if (this.getAllLocationResponse.length === 0) {
            this.ToalLocation = this.getAllLocationResponse.length;
            // this.saveUpdateLocation = "Save";
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
            // this.saveUpdateLocation = "Save";
            this.selectAllLocation = false;
            this.addNewLocationRow = false;
            this.editLocation = true;
            this.deleteNewLocation = true;

            this.rowData = this.getAllLocationResponse;
          }
        }
      );
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
        if(deleteLocationBody.locationId===undefined){
          this.locationApi.updateRowData({ remove: selectedData });
        }else{
          deleteLocationBody.userId=1;
          this.arrLocationDelete.push(deleteLocationBody);
          var jsonData = JSON.stringify(this.arrLocationDelete);
        }
      }
      jsonData = jsonData.replace(/"/g, "'");
      // deleteLocationBody.locationId = dataTest['id'];
      // deleteLocationBody.userId = dataTest['designationName']  
      // if (dataTest['id'] === '') {
      //   alert("Plesae choose appropiate field");
      //   this.checkedLocationStatus = false;
      // }
      // else {
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
                this.checkedLocationStatus = false;
              }
            }
          );
      // }
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
            if (locationResponse.STATUS === "Success") {
              // alert("in Success Methods")
              if(locationResponse.OUTPUT != '') {
                alert(locationResponse.OUTPUT+" exists.");
              }else{
                alert(locationResponse.MESSAGE);
                this.getLocation(1);
                this.locationApi.deselectAll();
              }

              this.addNewLocationRow = false;
              this.arrLocationSave = [];
              this.nodeSelectButWhere = "Update";

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

              this.nodeSelectButWhere = "Update";
            }
          }
        );
    }
  }

  onSaveUpdateLocationData() {
    if (this.nodeSelectButWhere === "Save") {
      this.onSaveLocation("1");
    } else if (this.nodeSelectButWhere === "Update") {
      this.onUpdateLocationData("1");
    }
  }

  onLocationSelectionChanged() {
    this.selectedRowsLocation = this.locationApi.getSelectedRows();
    this.rowSelection = "multiple";
    if (this.selectedRowsLocation.length >= 1) {
      this.deleteNewLocation = false;
      this.editLocation = false;
      // alert(this.nodeSelectButWhere);
      if (this.nodeSelectButWhere === "Save") {
        this.nodeSelectButWhere = "Save"
      } else {
      
        this.nodeSelectButWhere = "Update"
        this.editLocation = false;

        // alert(this.checkedLocationStatus);
        // if (this.checkedLocationStatus === true) {
        //   alert("sadfgdsdfg");
        //   this.checkedLocationStatus = true;
        // }

      }
    }
  }

  onCheckedBoxLocationChange(eve: any) {
    if (this.checkedLocationStatus === false) {
      this.locationApi.selectAll();
      this.checkedLocationStatus = true;
      this.deleteNewLocation = false;
    } else {
      this.locationApi.deselectAll();
      this.checkedLocationStatus = false;
      this.deleteNewLocation = true;
      this.editLocation = true;
      
    }
  }
















  onAddDepartment() {
    this.editDepartment = false;
    this.nodeDepartmentSelect = 'Add';
    this.saveUpdateDepartment = 'Save';

    var res = this.departmentApi.updateRowData({
      add: [{ LocationName: '', departmentCode: '', departmentName: '', description: '', }],
      addIndex: 0
    });
    //this.addNewDepartmentRow = true;
    this.departmentApi.tabToNextCell();
    const selectedNodes = this.departmentApi.getSelectedNodes();
   
    const selectedData = selectedNodes.map(node => node.data);
    var dataTest: Object;
    selectedData.map(node => dataTest = node as Object);

    if (dataTest['departmentCode'] === '') {

      alert("Please Enter Department Code");
    }
    else if (dataTest['departmentName'] === '') {
      alert("Plesae Enter Department Name");

    }
    // else if (dataTest['description'] === '') {
    //   alert("Please Enter Description");
    // }
    else {

      for (let selectedNode of selectedData) {

        const departmentBody = new DepartmentBody();
        departmentBody.departmentCode = selectedNode['departmentCode'];
        departmentBody.departmentName = selectedNode['departmentName']
        departmentBody.description = selectedNode['description'];
        departmentBody.userId = '1';
        this.arrDepartmentSave.push(departmentBody);

        var jsonData = JSON.stringify(this.arrDepartmentSave);
        jsonData = jsonData.replace(/"/g, "'");

      }
    }
  }


  onCheckedBoxChangeDepartment() {
    if (this.departmentCheckedStatus === false) {


      this.departmentApi.selectAll();
      this.departmentfilter = true;
      this.departmentCheckedStatus = true;
      this.deleteNewDepartment = false;
      this.addNewDepartmentRow = true;

    } else {
      this.departmentApi.deselectAll();
      this.departmentfilter = false;
      this.departmentCheckedStatus = false;
      this.deleteNewDepartment = true;
      this.addNewDepartmentRow = false;

    }

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



  onEmpFilterChange(event) {
    alert("Check");
  }


  onDeleteDepartment() {
    const selectedNodes = this.departmentApi.getSelectedNodes();
    var dataTest: Object;
    const universalJsonBody = new UniversalJsonBody();
    var universlResponse = new UniversalResponse();
    const selectedData = selectedNodes.map(node => node.data);
    selectedData.map(node => dataTest = node as Object);
    console.log("key", selectedNodes);
    if (selectedNodes.length === 0) {
      alert("Please Select any row.");
    } else {


      for (let selectedNode of selectedData) {
        const deleteDepartmentBody = new DeleteDepartmentBody();
        deleteDepartmentBody.departmentId = selectedNode['departmentID'];
        this.arrDepartmentDelete.push(deleteDepartmentBody);
        var jsonData = JSON.stringify(this.arrDepartmentDelete);
      }
      jsonData = jsonData.replace(/"/g, "'");

      universalJsonBody.jsonData = jsonData;
      this.countryService.deleteDepartment(universalJsonBody)
        .subscribe(
          data => {
            universlResponse = data;

            if (universlResponse.STATUS.trim() === 'Success') {
              this.departmentApi.removeItems(selectedNodes);
              this.arrDepartmentDelete = [];
              this.getDepartment('1');
            }
          }
        );
    }
    this.departmentApi.removeItems(selectedNodes);

  }


  getDepartment(UserID: string) {
    var getDepartmentBody = new UniversalBody();
    getDepartmentBody.userID = UserID + '';
    this.countryService.getDepartmentByUserId(getDepartmentBody)
      .subscribe(
        data => {
          this.getDepartmentResponse = data;
          // console.log("AAAAA", this.getDepartmentResponse.length);
          if (this.getDepartmentResponse.length === 0) {

            this.saveUpdateDepartment = "Save";
            this.editDepartment = false;
            this.addNewDepartmentRow = false;
            this.deleteNewDepartment = true;
            this.selectAllDepartment = true;
          } else {
            if (this.getDepartmentResponse.length >= 50) {
              this.ShowLimitedDepartment = 50;
              this.ShowDepartment = 1;
            } else {
              this.ShowLimitedDepartment = this.getDepartmentResponse.length;
              this.ShowDepartment = 1;
            }
            this.ToalDepartment = this.getDepartmentResponse.length;
            this.saveUpdateDepartment = "Save";
            this.selectAllDepartment = false;
            this.addNewDepartmentRow = false;
            this.editDepartment = true;
            this.deleteNewDepartment = true;

            this.rowData1 = this.getDepartmentResponse;
          }
        }
      );
  }

  onSaveUpdateDepartmentData() {
    this.departmentApi.tabToNextCell();
    if (this.nodeDepartmentSelect === 'Add') {
      this.onSaveDepartment('1');
    } else {
      this.onUpdateDepartmentData('1');
    }
  }

  onSaveDepartment(userID: string) {

    const universalJsonBody = new UniversalJsonBody();

    var getDepartmentBody = new UniversalBody();

    const selectedNodes = this.departmentApi.getSelectedNodes();
    console.log("key", selectedNodes);
    const selectedData = selectedNodes.map(node => node.data);
    var dataTest: Object;
    selectedData.map(node => dataTest = node as Object);
    if (dataTest['departmentCode'] === '') {
      alert("Enter Department Code");
    } else if (dataTest['departmentName'] === '') {
      alert("Enter Department");
    }
    // else if (dataTest['description'] === '') {
    //   alert("Enter Location Description");
    // }
    else {
      for (let selectedNode of selectedData) {

        const departmentBody = new DepartmentBody();
        departmentBody.userId = userID;
        departmentBody.departmentCode = selectedNode['departmentCode'];
        departmentBody.departmentName = selectedNode['departmentName']
        departmentBody.description = selectedNode['description'];
        this.arrDepartmentSave.push(departmentBody);

        var jsonData = JSON.stringify(this.arrDepartmentSave);
        jsonData = jsonData.replace(/"/g, "'");

      }
      console.log('jsonData:   ' + jsonData);

      universalJsonBody.jsonData = jsonData;

      this.countryService.saveDepartment(universalJsonBody)
        .subscribe(
          data => {
            this.universalResponse = data;

            if (this.universalResponse.STATUS.trim() === 'Success') {
              if (this.arrDepartmentSave.length >= 1) {
                if (this.universalResponse.OUTPUT === '') {
                  alert(this.universalResponse.MESSAGE);
                  this.getDepartment('1');
                }
                else {
                  alert(this.universalResponse.MESSAGE + ' ' + this.universalResponse.OUTPUT + ' ' + 'already existed ');
                }
              }
              else {
                if (this.universalResponse.OUTPUT === '') {
                  alert(this.universalResponse.MESSAGE);
                  this.getDepartment('1');
                }
                else {
                  alert(this.universalResponse.OUTPUT + ' ' + 'already existed');
                }
              }
              // this.getDepartment('1');

            }

          }
        );
    }
    this.arrDepartmentSave = [];
    this.nodeDepartmentSelect = 'Update';
  }

  onUpdateDepartmentData(userID: string) {

    this.editDepartment = false;

    if (this.selectedRowsDepartment === undefined) {
      alert("Please enter input valid data then hit save.")
    } else {

      const selectedNodes = this.departmentApi.getSelectedNodes();
      if (selectedNodes.length === 0) {
        alert("Please Input Valid Data");
      } else {

        const universalJsonBody = new UniversalJsonBody();
        const selectedData = selectedNodes.map(node => node.data);
        var universalResonse: UniversalResponse;
        var dataTest: Object;
        selectedData.map(node => dataTest = node as Object);
        if (dataTest['departmentCode'] === '') {
          alert("Enter Department Code");
        } else if (dataTest['departmentName'] === '') {
          alert("Enter Department");
        } //else if (dataTest['description'] === '') {
        //   alert("Enter Location Description");
        // }
        else {
          for (let selectedNode of selectedData) {
            const updateDepartmentBody = new DepartmentBody();

            updateDepartmentBody.userId = userID;
            updateDepartmentBody.departmentCode = selectedNode['departmentCode'];
            //  updateDepartmentBody.departmentName =selectedNode
            updateDepartmentBody.departmentName = selectedNode['departmentName'];
            updateDepartmentBody.description = selectedNode['description'];
            updateDepartmentBody.departmentId = selectedNode['departmentID'];

            this.arrDepartmentSave.push(updateDepartmentBody);

            var jsonData = JSON.stringify(this.arrDepartmentSave);
            jsonData = jsonData.replace(/"/g, "'");

          }

          universalJsonBody.jsonData = jsonData;

          this.countryService.updateDepartment(universalJsonBody)
            .subscribe(
              data => {
                //alert(universalJsonBody.jsonData);
                universalResonse = data;
                console.log("recived", universalResonse.STATUS);
                if (universalResonse.STATUS.trim() === "Success") {

                  if (this.arrDepartmentSave.length >= 1) {
                    if (universalResonse.OUTPUT === '') {
                      alert(universalResonse.MESSAGE);  
                      this.getDepartment('1');
                    }

                    else {
                      alert(universalResonse.MESSAGE + ' ' + universalResonse.OUTPUT + ' ' + 'already existed ');

                    }

                  }
                  else {
                    if (universalResonse.OUTPUT === '') {
                      alert(universalResonse.MESSAGE);
                      this.getDepartment('1');
                    }

                    else {
                      alert(universalResonse.OUTPUT + ' ' + 'already existed');

                    }
                  }
                  

                }

              }
            );
        }
      }
    }
    this.arrDepartmentSave = [];
    this.nodeDepartmentSelect = 'Update';
  }

  onDepartmentSelectionChanged() {
    this.selectedRowsDepartment = this.departmentApi.getSelectedRows();
    this.rowSelection = 'multiple';
    if (this.selectedRowsDepartment.length === 1) {
      if (this.getDepartmentResponse.length === 1) {
        this.deleteNewDepartment = false;
        this.departmentfilter = true;
        this.departmentCheckedStatus = false;
        this.editDepartment = false;
      }
      else {
        this.departmentCheckedStatus = false;
        this.departmentfilter = false;
        this.departmentCheckedStatus = false;
        this.deleteNewDepartment = false;
        this.editDepartment = false;
      }
      if (this.nodeDepartmentSelect === "Add") {
        this.saveUpdateDepartment = "Save";
        this.saveUpdateDepartmentPopup = 'Do you want to save?';
        this.btnSaveUpdateDepartmentPopup = 'SAVE';
        //this.nodeDepartmentSelect = "Update";
      } else if (this.nodeDepartmentSelect === undefined) {
        this.saveUpdateDepartment = "Save";
        this.saveUpdateDepartmentPopup = 'Do you want to update?';
        this.btnSaveUpdateDepartmentPopup = 'UPDATE';
        this.editDepartment = false;
      }
      else if (this.nodeDepartmentSelect === 'Update') {
        this.editDepartment = false;
        this.saveUpdateDepartment = 'Save';
        this.btnSaveUpdateDepartmentPopup = 'UPDATE';
        this.saveUpdateDepartmentPopup = 'Do you want to update?';
      }
    }
    else if (this.selectedRowsDepartment.length >= 1) {
      this.editDepartment = false;
      this.deleteNewDepartment = false;
      this.addNewDepartmentRow = false;

    }
    else if (this.selectedRowsDepartment.length === 0) {
      this.deleteNewDepartment = true;
      // this.departmentfilter =false;
    }
  }




  getDesignation(UserID: number) {
    console.log("in get designation", "running");
    this.checkBoxDesignation = true;
    this.editDesignation = true;
    this.addNewDesignationRow = true;
    this.deleteNewDesignation = true;

    var getDesignationBody = new UniversalBody();
    getDesignationBody.userID = UserID + '';
    this.countryService.getDesignationByUserId(getDesignationBody)
      .subscribe(
        data => {
          this.getDesignationResponse = data;
          console.log(JSON.stringify(this.getDesignationResponse));
          if (this.getDesignationResponse.length === 0) {

            this.saveUpdateDesignation = "Save";
            this.checkBoxDesignation = true;
            this.editDesignation = true;
            this.addNewDesignationRow = false;
            this.deleteNewDesignation = true;
          } else {
            this.startPositionDesignation = 1;
            this.endPositionDesignation = this.getDesignationResponse.length;
            this.totalData = this.getDesignationResponse.length;

            this.saveUpdateDesignation = "Save";
            this.editDesignation = true;
            this.checkBoxDesignation = false;
            this.addNewDesignationRow = false;
            this.deleteNewDesignation = true;
            this.rowData2 = this.getDesignationResponse;
          }
        }
      );
  }

  onAddDesignation() {
    this.nodeSelectButWhere = "Add";
    this.checkBoxDesignation = false;
    this.editDesignation = false;
    let res = this.designationApi.updateRowData({ add: [{ LocationName: '', departmentName: '', designationCode: '', designationName: '', description: '' }], addIndex: 0 });
    res.add.forEach(function (rowNode) {
      console.log('Added Row Node', rowNode);
    });

    const selectedNodes = this.designationApi.getSelectedNodes();
    const selectedData = selectedNodes.map(node => node.data);
    var dataTest: Object;
    selectedData.map(node => dataTest = node as Object);

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
      for (let selectedNode of selectedData) {
        const designationBody = new DesignationBody();
        designationBody.designationCode = selectedNode['designationCode'];
        designationBody.designationName = selectedNode['designationName'];
        designationBody.description = selectedNode['description'];
        this.arrDesignationSave.push(designationBody);
        //  var jsonData = JSON.stringify(this.arrDesignationSave);
      }
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
    const universalJsonBody = new UniversalJsonBody();
    const selectedNodes = this.designationApi.getSelectedNodes();
    const selectedData = selectedNodes.map(node => node.data);
    var dataTest: Object;
    selectedData.map(node => dataTest = node as Object);

    if (selectedData.length === 0) {
      alert('Please select a row');
    } else {
      var universalResponse: UniversalResponse;
    

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

        for (let selectedNode of selectedData) {
          const designationBody = new DesignationBody();
          designationBody.designationCode = selectedNode['designationCode'];
          designationBody.designationName = selectedNode['designationName'];
          designationBody.description = selectedNode['description'];
         // designationBody.designationId = selectedNode['designationId'];
          this.arrDesignationSave.push(designationBody);
          var jsonData = JSON.stringify(this.arrDesignationSave);
        }
        jsonData = jsonData.replace(/"/g, "'");
        console.log(jsonData);
        universalJsonBody.jsonData = jsonData;
        this.countryService.saveDesignation(universalJsonBody)
          .subscribe(
            data => {
              
              universalResponse = data;
              console.log("checking response",universalResponse);
              
              if (universalResponse.OUTPUT === '') {
                alert(universalResponse.STATUS+" Data Saved Successfully!");
                this.addNewDepartmentRow = false;
                this.nodeSelectButWhere = undefined;
                this.addNewDesignationRow = false;
                this.getDesignation(1);
                this.arrDesignationSave = [];
              }
              else{
                alert(universalResponse.OUTPUT+" already existed");
                this.arrDesignationSave = [];
              }
            }
          );
        }
        console.log( "Response", universalResponse);
        universalResponse.OUTPUT = "";
        console.log( "Response", universalResponse);  
    }
  }

  onUpdateDesignationData() {
    this.designationApi.tabToNextCell();

    this.editDesignation = false;
    var universalResponse: UniversalResponse;

    if (this.selectedRowsDesignation === undefined) {
      alert("Please enter input valid data then hit save.")
    } else {
      const universalJsonBody = new UniversalJsonBody();
      const selectedNodes = this.designationApi.getSelectedNodes();
      if (selectedNodes.length === 0) {
        alert("Please Input Valid Data");
      } else {
        console.log("InUpdate", "Update");
        const selectedData = selectedNodes.map(node => node.data);
        var dataTest: Object;
        selectedData.map(node => dataTest = node as Object);

        console.log("Key", selectedData);

        //updateDesignationBody.DesignationID = dataTest['designationID'];
        if (dataTest['designationCode'] === '') {
          alert("Enter Location Code");
        } else if (dataTest['designationName'] === '') {
          alert("Enter Location");
        } else if (dataTest['description'] === '') {
          alert("Enter Location Description");
        } else {

          for (let selectedNode of selectedData) {
            const updateDesignationBody = new DesignationBody();
            updateDesignationBody.designationCode = selectedNode['designationCode'];
            updateDesignationBody.designationName = selectedNode['designationName'];
            updateDesignationBody.description = selectedNode['description'];
            updateDesignationBody.designationId = selectedNode['designationId'];
            this.arrDesignationUpdate.push(updateDesignationBody);
            var jsonData = JSON.stringify(this.arrDesignationUpdate);
          }
          jsonData = jsonData.replace(/"/g, "'");
          console.log("Update designation details", jsonData);

          universalJsonBody.jsonData = jsonData;

          this.countryService.updateDesignation(universalJsonBody)
            .subscribe(
              data => {
                universalResponse = data;
                if (universalResponse.OUTPUT === '') {
                  alert(universalResponse.STATUS+" Data Saved Successfully!");
                  console.log("Key Universal Update", universalResponse);
                  this.addNewDesignationRow = false;
                  this.nodeSelectButWhere = "Update"
                  this.getDesignation(1);
                  this.arrDesignationUpdate = [];
                }
                else{
                  alert(universalResponse.OUTPUT+" already existed");  
                  this.arrDesignationUpdate = [];
                }
              }
            );
        }
        universalResponse.OUTPUT = "";
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
      this.onDeleteDepartment();
    }
    else if (DesignationNode.length !== 0) {
      this.onDeleteDesignation();
    }
  }

  universalSaveUpdateOrganizaion() {
    const LocationNode = this.locationApi.getSelectedNodes();
    const DepartmentNode = this.departmentApi.getSelectedNodes();
    const DesignationNode = this.designationApi.getSelectedNodes();

    // if (LocationNode.length !== 0) {
    //   this.onDeleteLocation();
    // }
    if (DepartmentNode.length !== 0) {
      this.onSaveUpdateDepartmentData();
    }
    // else if (DesignationNode.length !== 0) {
    //   this.onDeleteDesignation();
    // }
  }
  onDeleteDesignation() {
    const selectedNodes = this.designationApi.getSelectedNodes();
    const universalJsonBody = new UniversalJsonBody();
    var universalResponse: UniversalResponse;
    var dataTest: Object;
    // const deleteDesignationBody = new DeleteDesignationBody();
    const selectedData = selectedNodes.map(node => node.data);
    selectedData.map(node => dataTest = node as Object);

    if (selectedData.length === 0) {
      alert("Please Select any row.");
    } else {


      for (let selectedNode of selectedData) {
        const deleteLocationBody = new DeleteLocationBody();
        deleteLocationBody.locationId = selectedNode['id'];
        if(deleteLocationBody.locationId===undefined){
          this.locationApi.updateRowData({ remove: selectedData });
        }else{
          deleteLocationBody.userId=1;
          this.arrLocationDelete.push(deleteLocationBody);
          var jsonData = JSON.stringify(this.arrLocationDelete);
        }
      }


      for (let selectedNode of selectedData) {
        const deleteDesignationBody = new DeleteDesignationBody();
        deleteDesignationBody.designationId = selectedNode['designationId'];
        if(deleteDesignationBody.designationId === undefined){
          this.designationApi.updateRowData({remove : selectedData})
        } else{
          deleteDesignationBody.userId = '1';
          console.log("Delete designation Id", deleteDesignationBody.designationId);
          this.arrDesignationDelete.push(deleteDesignationBody);
          var jsonData = JSON.stringify(this.arrDesignationDelete);
        }

      }

      jsonData = jsonData.replace(/"/g, "'");

      universalJsonBody.jsonData = jsonData;
      this.countryService.deleteDesignation(universalJsonBody)
        .subscribe(
          data => {
            universalResponse = data;
            alert(universalResponse.MESSAGE+" "+universalResponse.STATUS);
            if (universalResponse.STATUS === "Success") {
              console.log("Delete Status : ", universalResponse.STATUS)
              this.designationApi.removeItems(selectedNodes);
              this.getDesignation(1);
            }
            this.arrDesignationDelete = [];
          }

        );
      }
  }

  // onSelectionDesignationChanged() {
  //   console.log("checking function","in onSelectionDesignationChanged function");
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


  onDesignationSelectionChanged() {
    this.selectedRowsDesignation = this.designationApi.getSelectedRows();
    if (this.selectedRowsDesignation.length === 1) {
      this.deleteNewDesignation = false;
      this.checkedStatus = false;
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


  onCheckedBoxChangeDesignation(eve: any) {
    if (this.checkedStatus === false) {
      this.designationApi.selectAll();
      this.checkedStatus = true;
      this.deleteNewDesignation = false;
      this.editDesignation = false;
    } else {
      this.designationApi.deselectAll();
      this.checkedStatus = false;
      this.deleteNewDesignation = true;
      this.editDesignation = true;
    }
  }
}