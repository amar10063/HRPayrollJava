import { Component, OnInit } from '@angular/core';
import { GridApi, ColumnApi, CellComp, GridOptions } from 'ag-grid-community';

import { LocationBody } from '../../WebServices/WebServiceBody/OrganizationBody/LocationBody';
import { DepartmentBody } from '../../WebServices/WebServiceBody/OrganizationBody/DepartmentBody';
import { DesignationBody } from '../../WebServices/WebServiceBody/OrganizationBody/DesignationBody';
import { AllWeb } from "src/app/WebServices/AllWeb.service";
import { LocationResponse } from './LocationResponse';

import { from } from 'rxjs';
import { DesignationResponse } from './DesignationResponse';
import { GetLocationBody } from './GetLocationBody';
import { DeleteLocationBody } from '../../WebServices/WebServiceBody/OrganizationBody/DeleteLocationBody';
import { DeleteDepartmentBody } from '../../WebServices/WebServiceBody/OrganizationBody/DeleteDepartmentBody';
import { DeleteDesignationBody } from '../../WebServices/WebServiceBody/OrganizationBody/DeleteDesignationBody';
import { GetAllLocationResponse } from 'src/app/HRPayroll/employee/EmployeeApiResponse/GetAllLocationResponse';
import { LocationDropdownComponent } from 'src/app/location-dropdown/location-dropdown.component';
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

  //locationResponse: LocationResponse;
  universalResponse: UniversalResponse;
  //designationResponse: DesignationResponse;
  private frameworkComponents;

  rowSelection: string;
  columnDefs: any; columnDefs1: any;
  columnDefs2: any;
  rowData: any; rowData1: any;
  rowData2: any;
  getAllLocationResponse: GetAllLocationResponse[];
  gridOptions: GridOptions;
  getLocationResponse: GetAllLocationResponse[];

  constructor(private countryService: AllWeb) {
    //this.frameworkComponents = { genderCellRenderer: LocationDropdownComponent };

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
      {
        headerName: 'Location Name', field: 'name', sortable: true, filter: true, editable: true, width: 120,

      },
      {
        headerName: 'Department Name', field: 'DepartmentName', sortable: true, editable: true, filter: true, width: 120,

        cellStyle: function (params) {
          if (params.value === '') {
            // bordercolor: 'red'
            // alert("Please Enter Department Name");

            return { outline: '1px solid red' };

            //color: 'red', backgroundColor: 'green',
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
      { headerName: '', field: '', width: 330 }
    ];

    this.rowData1 = [
    ];

    this.columnDefs2 = [
      {
        headerName: 'Location Name', field: 'LocationName', sortable: true, filter: true, editable: true, width: 120,
        cellEditor: 'select',
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
    let res = this.api.updateRowData({ add: [{ class: "location" }] });
    res.add.forEach(function (rowNode) {
      console.log('Added Row Node', rowNode);
    });
  }
  onAddDepartment() {
    alert("add");
    let res = this.departmentApi.updateRowData({ add: [{ class: "department" }] });
    res.add.forEach(function (rowNode) {
      console.log('Added Row Node', rowNode);
    });
  }
  onAddDesignation() {
    alert("add");
    let res = this.designationApi.updateRowData({ add: [{ class: "designation" }] });
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

  // onDeleteLocation(id: number) {

  //   alert("Are you sure you want to delete this ?")
  //   let i: number;
  //   const deleteLocationBody = new DeleteLocationBody();
  //   // deleteLocationBody.locationID = locationID;
  //   const selectedNodes = this.api.getSelectedNodes();


  //   const selectedData = selectedNodes.map(node => node.data);
  //   console.log("key", selectedData);
  //   var dataTest: Object;
  //   selectedData.map(node => dataTest = node as Object);
  //   if (selectedData.length === 0) {
  //     alert("Please Select any row.");
  //     this.api.removeItems(selectedData);

  //   } for (i = 0; i < 20; i++) {
  //     if (this.getLocationResponse[i].code === dataTest['code']) {

  //       .subscribe(
  //         data => {
  //           this.universalResponse = data;
  //           console.log("key", LocationResponse);
  //           alert(this.universalResponse.MESSAGE);
  //         }

  //             alert(this.locationResponse.MESSAGE);
  //             if (this.locationResponse.STATUS === 'Success') {
  //               var res = this.api.updateRowData({ remove: selectedData });
  //             }
  //           }

  //         );

  //     }
  //   }
  //   //    this.api.removeItems(selectedNodes);
  //   //    this.countryService.doDeleteLocation(deleteLocationBody)

  //   //   .subscribe(
  //   //     data => {
  //   //       this.locationResponse = data;
  //   //       console.log("key",LocationResponse);
  //   //         alert(this.locationResponse.MESSAGE);
  //   //     }

  //   // );

  // }
  // // onDeleteLocation(locationID:number) {
  // //   alert("In Delete")
  // //   const deleteLocationBody = new DeleteLocationBody();
  // //   this.countryService.doDeleteLocation(deleteLocationBody).subscribe(
  // //     (data)=> {this.getLocation();
  // //       console.log("key",data);
  // //     },

  // //   );
  // // }

  // onDeleteDepartment() {
  //   alert("Are you sure you want to delete this ?")
  //   const deleteDepartmentBody = new DeleteDepartmentBody();
  //   const selectedNodes = this.departmentApi.getSelectedNodes();

  //   if (selectedNodes.length === 0) {

  //     alert("Please Select any row.");

  //   } else {
  //     this.departmentApi.removeItems(selectedNodes);
  //     this.countryService.deleteDepartment(deleteDepartmentBody)

  //       .subscribe(
  //         data => {
  //           this.universalResponse = data;
  //           console.log("key", UniversalResponse);
  //           alert(this.universalResponse.MESSAGE);
  //         }

  //       );
  //   }
  // }

  // onDeleteDesignation() {
  //   alert("Are you sure you want to delete this ?")
  //   const deleteDesignationBody = new DeleteDesignationBody();
  //   const selectedNodes = this.designationApi.getSelectedNodes();

  //   if (selectedNodes.length === 0) {

  //     alert("Please Select any row.");

  //   } else {
  //     this.designationApi.removeItems(selectedNodes);
  //     this.countryService.deleteDesignation(deleteDesignationBody)

  //       .subscribe(
  //         data => {
  //           this.universalResponse = data;
  //           console.log("key", UniversalResponse);
  //           alert(this.universalResponse.MESSAGE);
  //         }

  //       );
  //   }
  // }
  // getLocation() {
  //   var getLocationBody = new GetLocationBody();

  //   this.countryService.doGetLocation(getLocationBody)
  //     .subscribe(
  //       data => {
  //         this.getLocationResponse = data;
  //         console.log("key", data);
  //         this.rowData = this.getLocationResponse;
  //       }

  //     );
  // }
  // onCellKeyLocationDown(e) {
  //   const keyPressed = e.event.key;
  //   if (keyPressed === 'Enter') {
  //     // alert("Enter ");
  //     const locationBody = new LocationBody();
  //     const getLocationBody = new GetLocationBody();
  //     const selectedNodes = this.api.getSelectedNodes();

  //     const selectedData = selectedNodes.map(node => node.data);
  //     var dataTest: Object;
  //     selectedData.map(node => dataTest = node as Object);

  //     locationBody.LocationCode = dataTest['locationCode'];
  //     locationBody.LocationName = dataTest['locationName'];
  //     locationBody.LocationDescription = dataTest['locationDescription']

  //     if (dataTest['locationCode'] === '') {
  //       alert("Plesae Enter Location code");
  //     }
  //     else if (dataTest['locationName'] === '') {
  //       alert("Please Enter Location Name");
  //     }
  //     else if (dataTest['description'] === '') {
  //       alert("Please Enter Description");
  //     }
  //     else {
  //       this.countryService.saveLocation(locationBody)
  //         .subscribe(
  //           data => {
  //             this.universalResponse = data;

  //             alert(this.universalResponse.MESSAGE);

  //             if (this.universalResponse.STATUS === 'Success') {

  //               alert("Location Details");
  //               //  getLocationBody.userID = userID;

  //               this.countryService.doGetLocation(getLocationBody)
  //                 .subscribe(
  //                   data => {
  //                     this.getLocationResponse = data;
  //                     console.log("key", data);

  //                     this.rowData = this.getLocationResponse;

  //                   }
  //                 )
  //             }
  //           }
  //         );
  //     }
  //   }
  // }
  // onCellKeyDepartmentDown(e) {
  //   const keyPressed = e.event.key;
  //   if (keyPressed === 'Enter') {
  //     // alert("Enter ");
  //     const departmentBody = new DepartmentBody();
  //     const getLocationBody = new GetLocationBody();
  //     const selectedNodes = this.api.getSelectedNodes();

  //     const selectedData = selectedNodes.map(node => node.data);
  //     var dataTest: Object;
  //     selectedData.map(node => dataTest = node as Object);

  //     departmentBody.DepartmentCode = dataTest['DepartmentCode'];
  //     departmentBody.DepartmentName = dataTest['DepartmentName']
  //     departmentBody.Description = dataTest['Description']
  //     console.log("key", departmentBody)

  //     if (dataTest['LocationName'] === '') {
  //       alert("Plesae Enter Location Name");
  //     }


  //     else if (dataTest['DepartmentCode'] === '') {
  //       alert("Please Enter Department Code");
  //     }
  //     else if (dataTest['locationName'] === '') {
  //       alert("Please Enter Location Name");
  //     }
  //     else if (dataTest['description'] === '') {
  //       alert("Please Enter Description");
  //     }
  //     else {

  //       this.countryService.saveDepartment(departmentBody)

  //         .subscribe(
  //           data => {
  //             this.universalResponse = data;
  //             console.log("key", UniversalResponse);
  //             alert(this.universalResponse.MESSAGE);
  //           }

  //         );
  //     }

  
  }


 