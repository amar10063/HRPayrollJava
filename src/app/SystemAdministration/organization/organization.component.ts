import { Component, OnInit } from '@angular/core';
import { GridApi, ColumnApi, CellComp, GridOptions } from 'ag-grid-community';
import { AllWeb } from "src/app/WebServices/AllWeb.service";
import { LocationResponse } from './LocationResponse';
import { DepartmentResponse } from './DepartmentResponse';
import { from } from 'rxjs';
import { DesignationResponse } from './DesignationResponse';
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
import { UniversalResponse } from 'src/app/WebServices/WebServiceResponse/UniversalResponse';


@Component({
  selector: 'app-organization',
  templateUrl: './organization.component.html',
  styleUrls: ['./organization.component.css']
})
export class OrganizationComponent implements OnInit {
  api: GridApi;
  columnApi: ColumnApi;

  departmentApi: GridApi;
  departmentColumnApi: ColumnApi;

  designationApi: GridApi;
  designationColumnApi: ColumnApi;

  locationResponse: LocationResponse;
  departmentResponse: DepartmentResponse;
  designationResponse: DesignationResponse;
  universalResponse: UniversalResponse;
  private frameworkComponents;

  rowSelection: string;
  columnDefs: any; columnDefs1: any;
  columnDefs2: any;
  rowData: any; rowData1: any;
  rowData2: any;
  getAllLocationResponse: GetAllLocationResponse[];
  gridOptions: GridOptions;

  constructor(private countryService: AllWeb) {
    //this.frameworkComponents = { genderCellRenderer: LocationDropdownComponent };
    this.rowSelection = 'single';
    this.columnDefs = [
      {
        headerName: 'Location Code', field: 'LocationCode', sortable: true, filter: true, editable: true, width: 120,
        cellStyle: function (params) {
          if (params.value === '') {
            return { outline: '1px solid red' };
          } else {
            return { outline: 'white' };
          }
        }
      },
      {
        headerName: 'Location Name', field: 'LocationName', sortable: true, filter: true, editable: true, width: 120,

        cellStyle: function (params) {
          if (params.value === '') {
            return { outline: '1px solid red' };
          } else {
            return { outline: 'white' };
          }
        }

      },
      {
        headerName: 'Description', field: 'LocationDescription', sortable: true, filter: true, editable: true, width: 130,

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

      { headerName: '', field: '', width: 467 }
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
        headerName: 'Department Code', field: 'DepartmentCode', sortable: true, editable: true, filter: true, width: 140,
        cellStyle: function (params) {
          if (params.value === '') {
            return { outline: '1px solid red' };
          } else {
            return { outline: 'white' };
          }
        }

      },
      {
        headerName: 'Department Name', field: 'DepartmentName', sortable: true, editable: true, filter: true, width: 120,
        cellStyle: function (params) {
          if (params.value === '') {
            return { outline: '1px solid red' };
          } else {
            return { outline: 'white' };
          }
        }

      },
      {
        headerName: 'Description', field: 'Description', sortable: true, editable: true, filter: true, width: 130,

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
      { headerName: '', field: '', width: 330 }
    ];

    this.rowData1 = [
    ];

    this.columnDefs2 = [
      {
        headerName: 'Location Name', field: 'LocationName', sortable: true, filter: true, editable: true, width: 120,
        cellEditor: 'select',
        cellRendererFramework: LocationDropdownComponent
        // cellEditorParams: { values: extractValues(locationMappings) },
        // valueFormatter: function (params) {
        //   return lookupValue(locationMappings, params.value);
        // },
        // valueParser: function (params) {
        //   return lookupKey(locationMappings, params.newValue);
        // },
      },

      {
        headerName: 'Department', field: 'DepartmentName', sortable: true, editable: true, filter: true, width: 120,

        cellEditor: "select",
        // cellEditorParams: { values: extractValues(departmentMappings) },
        // valueFormatter: function (params) {
        //   return lookupValue(departmentMappings, params.value);
        // },
        // valueParser: function (params) {
        //   return lookupKey(departmentMappings, params.newValue);
        // },
      },
      {
        headerName: 'Designation Code', field: 'DesignationCode', sortable: true, editable: true, filter: true, width: 140,

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
        headerName: 'Designation', field: 'DesignationName', sortable: true, editable: true, filter: true, width: 140,

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
        headerName: 'Description', field: 'Description', sortable: true, editable: true, filter: true, width: 130,

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
      { headerName: '', field: '', width: 180 }
    ];

    this.rowData2 = [
    ];
  }

  public show: boolean = false;
  public hide: boolean = true;
  public buttonName: any = 'Add New';


  count = 1;

  ngOnInit() {
    // this.getAllLocationResponse = this.getAllLocation();

  }
  onAddLocation() {
    alert("add");
    var res = this.api.updateRowData({
      add: [{ LocationCode: '', LocationName: '', LocationDescription: '' }],
      addIndex: 0
    });
  }
  onAddDepartment() {
    alert("add");
    var res = this.departmentApi.updateRowData({
      add: [{ LocationName: '', DepartmentCode: '', DepartmentName: '', Description: '', }],
      addIndex: 0
    });
  }
  onAddDesignation() {
    alert("add");
    let res = this.designationApi.updateRowData({ add: [{ class: "designation" }], addIndex: 0 });
    res.add.forEach(function (rowNode) {
      console.log('Added Row Node', rowNode);
    });
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

  onDeleteLocation() {

    alert("Are you sure you want to delete this ?")
    const deleteLocationBody = new DeleteLocationBody();
    const selectedNodes = this.api.getSelectedNodes();

    if (selectedNodes.length === 0) {

      alert("Please Select any row.");

    } else {
      this.api.removeItems(selectedNodes);
      this.countryService.doDeleteLocation(deleteLocationBody)

        .subscribe(
          data => {
            this.locationResponse = data;
            console.log("key", LocationResponse);
            alert(this.locationResponse.MESSAGE);
          }

        );
    }
  }

  onDeleteDepartment() {
    alert("Are you sure you want to delete this ?")
    const deleteDepartmentBody = new DeleteDepartmentBody();
    const selectedNodes = this.departmentApi.getSelectedNodes();

    if (selectedNodes.length === 0) {

      alert("Please Select any row.");

    } else {
      this.departmentApi.removeItems(selectedNodes);
      this.countryService.deleteDepartment(deleteDepartmentBody)

        .subscribe(
          data => {
            this.locationResponse = data;
            console.log("key", LocationResponse);
            alert(this.locationResponse.MESSAGE);
          }

        );
    }
  }

  onDeleteDesignation() {
    alert("Are you sure you want to delete this ?")
    const deleteDesignationBody = new DeleteDesignationBody();
    const selectedNodes = this.designationApi.getSelectedNodes();

    if (selectedNodes.length === 0) {

      alert("Please Select any row.");

    } else {
      this.designationApi.removeItems(selectedNodes);
      this.countryService.deleteDesignation(deleteDesignationBody)

        .subscribe(
          data => {
            this.locationResponse = data;
            console.log("key", LocationResponse);
            alert(this.locationResponse.MESSAGE);
          }

        );
    }
  }
  onLocationCellKeyDown(e) {
    const keyPressed = e.event.key;
    if (keyPressed === 'Enter') {
      const locationBody = new LocationBody();
      const getLocationBody = new GetLocationBody();
      const selectedNodes = this.api.getSelectedNodes();

      const selectedData = selectedNodes.map(node => node.data);
      var dataTest: Object;
      selectedData.map(node => dataTest = node as Object);
      locationBody.LocationCode = dataTest['LocationCode'];
      locationBody.LocationName = dataTest['LocationName'];
      locationBody.LocationDescription = dataTest['LocationDescription']

      if (dataTest['LocationCode'] === '') {
        alert("Plesae Enter Location code");
      }
      else if (dataTest['LocationName'] === '') {
        alert("Please Enter Location Name");
      }
      else if (dataTest['LocationDescription'] === '') {
        alert("Please Enter Description");
      }
      else {
        this.countryService.saveLocation(locationBody)
          .subscribe(
            data => {
              this.locationResponse = data;

              alert(this.locationResponse.MESSAGE);

              if (this.locationResponse.STATUS === 'Success') {

                alert("Location Details");

                this.countryService.doGetLocation(getLocationBody)
                  .subscribe(
                    data => {
                      this.getAllLocationResponse = data;
                      this.rowData = this.getAllLocationResponse;
                    }
                  )
              }
            }

          );
      }

    }
  }

  onDepartmentCellKeyDown(e) {
    const keyPressed = e.event.key;


    if (keyPressed === 'Enter') {
      alert("Enter ");
      const departmentBody = new DepartmentBody();
      const selectedNodes = this.departmentApi.getSelectedNodes();
      // console.log("key",selectedNodes);
      const selectedData = selectedNodes.map(node => node.data);
      var dataTest: Object;
      selectedData.map(node => dataTest = node as Object);

      departmentBody.DepartmentCode = dataTest['DepartmentCode'];
      departmentBody.DepartmentName = dataTest['DepartmentName']
      departmentBody.Description = dataTest['Description']
      console.log("key", departmentBody)

      // if (dataTest['LocationName'] === '') {
      //   alert("Plesae Enter Location Name");
      // }


      if (dataTest['DepartmentCode'] === '') {
        alert("Please Enter Department Code");
      }

      if (dataTest['DepartmentName'] === '') {
        alert("Plesae Enter Department Name");
      }
      else if (dataTest['Description'] === '') {
        alert("Please Enter Description");
      }
      else {

        this.countryService.saveDepartment(departmentBody)

          .subscribe(
            data => {
              this.universalResponse = data;
              console.log("key", UniversalResponse);
              alert(this.universalResponse.MESSAGE);
            }

          );
      }
    }
  }

  onDesignationCellKeyDown(e) {
    const keyPressed = e.event.key;
    if (keyPressed === 'Enter') {
      alert("Enter ");
      const designationBody = new DesignationBody();
      const selectedNodes = this.designationApi.getSelectedNodes();
      // console.log("key",selectedNodes);
      const selectedData = selectedNodes.map(node => node.data);
      var dataTest: Object;
      selectedData.map(node => dataTest = node as Object);
      designationBody.DesignationCode = dataTest['DesignationCode'];
      designationBody.DesignationName = dataTest['DesignationName']
      designationBody.Description = dataTest['Description']
      console.log("key", designationBody)
      if (dataTest['DesignationCode'] === '') {
        alert("Plesae Enter Designation Code");
      }
      else if (dataTest['Designation'] === '') {
        alert("Please Enter Designation");
      }
      else if (dataTest['Description'] === '') {
        alert("Please Enter Description");
      }
      else {

        this.countryService.saveDesignation(designationBody)

          .subscribe(
            data => {
              this.locationResponse = data;
              console.log("key", LocationResponse);
              alert(this.locationResponse.MESSAGE);
            }

          );
      }
    }
  }




}