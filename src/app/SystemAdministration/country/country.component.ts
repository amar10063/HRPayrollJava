import { Component, OnInit } from '@angular/core';
import { GridApi, ColumnApi, GridOptions, } from 'ag-grid-community';
// import 'ag-grid-enterprise';

import { AllWeb } from 'src/app/WebServices/AllWeb.service';
import { CountryBody } from '../../WebServices/WebServiceBody/CountryBody/CountryBody';
import { UniversalResponse } from '../../WebServices/WebServiceResponse/UniversalResponse';
import { CityBody } from '../../WebServices/WebServiceBody/CountryBody/CityBody';
import { StateBody } from '../../WebServices/WebServiceBody/CountryBody/StateBody';
import { GetCountryResponse } from '../../WebServices/WebServiceResponse/CountryResponse/GetCountryResponse';
import { UniversalBody } from '../../WebServices/WebServiceBody/UniversalBody';
import { PostalBody } from '../../WebServices/WebServiceBody/CountryBody/PostalBody';
import { DeleteCountryBody } from '../../WebServices/WebServiceBody/CountryBody/DeleteCountryBody';
import { GetStateResponse } from '../../WebServices/WebServiceResponse/CountryResponse/GetStateResponse';
import { GetCityResponse } from '../../WebServices/WebServiceResponse/CountryResponse/GetCityResponse';
import { GetPostalResponse } from '../../WebServices/WebServiceResponse/CountryResponse/GetPostalResponse';
import { DeleteStateBody } from '../../WebServices/WebServiceBody/CountryBody/DeleteStateBody';
import { DeleteCityBody } from '../../WebServices/WebServiceBody/CountryBody/DeleteCityBody';
import { DeletePostalBody } from '../../WebServices/WebServiceBody/CountryBody/DeletePostalBody';
import { LocationDropdownComponent } from 'src/app/location-dropdown/location-dropdown.component';
import { UpdateStateBody } from 'src/app/WebServices/WebServiceBody/CountryBody/UpadateStateBody';
import { UpdateCountryBody } from 'src/app/WebServices/WebServiceBody/CountryBody/UpdateCountryBody';
import { UpdateCityBody } from 'src/app/WebServices/WebServiceBody/CountryBody/UpdateCityBody';
import { UpdatePostalBody } from 'src/app/WebServices/WebServiceBody/CountryBody/UpdatePostalBody';
import { UniversalJsonBody } from 'src/app/WebServices/WebServiceBody/UniversalJsonBody';



@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.css']
})

export class CountryComponent implements OnInit {
  columnDefs; columnDefs1; columnDefs2; columnDefs3; columnDefs4; columnDefs5;
  rowData; rowData1; rowData2; rowData3; rowData4; rowData5;


  frameworkComponents = {
    locationFramework: LocationDropdownComponent
  };
  createKey: any;
  api;
  columnApi;
  StateToggleButton = false;
  cityToggleButton = false;
  postalToggleButton = false;

  countryCheckedStatus = false;
  countryFilter: boolean;
  stateCheckedStatus = false;
  stateFilter: boolean;
  cityCheckedStatus = false;
  cityFilter: boolean;
  postalCheckedStatus = false;
  postalFilter: boolean;
  addCountryToggleButton = false;
  saveCountryToggleButton = false;
  deleteCountryToggleButton = false;
  private defaultColDef;
  addStateToggleButton = false;
  saveStateToggleButton = false;
  deleteStateToggleButton = false;

  addCityToggleButton = false;
  saveCityToggleButton = false;
  deleteCityToggleButton = false;

  addPostalToggleButton = false;
  savePostalToggleButton = false;
  deletePostalToggleButton = false;

  selectedRowCountry: any[];
  nodeCountrySelect: string;
  saveUpdateCountry: string;

  selectedRowState: any[];
  nodeStateSelect: string;
  saveUpdateState: string;

  selectedRowCity: any[];
  nodeCitySelect: string;
  saveUpdateCity: string;

  selectedRowPostal: any[];
  nodePostalSelect: string;
  saveUpdatePostal: string;


  TotalCountry: any = 0;
  ShowLimitedCountry: any = 0;

  TotalState: any = 0;
  ShowLimitedState: any = 0;

  TotalCity: any = 0;
  ShowLimitedCity: any = 0;

  TotalPostal: any = 0;
  ShowLimitedPostal: any = 0;

  stateApi: GridApi;
  stateColumnApi: ColumnApi;
  cityApi: GridApi;
  cityColumnApi: ColumnApi
  postalApi: GridApi;
  postalColomnApi: ColumnApi;
  universalResponse: UniversalResponse;
  countryDataResponse: GetCountryResponse[];
  getStateResponse: GetStateResponse[];
  getCityResponse: GetCityResponse[];
  getPostalResponse: GetPostalResponse[];
  public show = false;
  public hide = true;
  public buttonName: any = 'Add New';
  colDef: string;
  countCountry = 0;
  countState = 0;
  countCity = 0;
  countPostal = 0;
  universalBody = new UniversalBody();

  rowSelection: string;
  rowDeselection: string
  private editType;
  countryArray: CountryBody[] = [];
  stateArray: StateBody[] = [];
  cityArray: CityBody[] = [];
  postalArray: PostalBody[] = [];

  type: '';
  gridOptions = {} as GridOptions;
  public selectedCountryId: number;
  private rowClassRules;
  isShowing = false;
  private overlayNoRowsTemplate;

  saveUpdateAddressPopup: string;
  btnSaveUpdateAddressPopup: string;

  constructor(private allWeb: AllWeb) {

    this.gridOptions = {
      context: { componentParent: this }
    };
    this.rowSelection = 'multiple';
    this.editType = 'fullRow';
    this.overlayNoRowsTemplate =
      "<span style=\"padding: 10px; border: 2px solid #444; background: lightgoldenrodyellow;\">This is a custom 'no rows' overlay</span>";

    this.columnDefs = [
      {
        id: 0, headerName: 'Country Code', field: 'countryCode', sortable: true, filter: true, editable: true, Width: 250, minWidth: 50, maxWidth: 500,
        cellStyle: function (params) {
          if (params.value === '') {
            //this.ToggleButton = true;
            return { outline: '1px solid red' };
          } else {
            return { outline: 'white' };
          }
        }

      },

      {

        id: 1, headerName: 'Country Name', field: 'countryName', sortable: true, Width: 150, minWidth: 50, maxWidth: 500,
        filter: true, editable: true,
        cellStyle: function (params) {

          if (params.value === '') {
            return { outline: '1px solid red' };
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
        headerName: 'Country', field: 'countryName', sortable: true, filter: true, Width: 150, minWidth: 50, maxWidth: 500,
        cellRendererSelector: function (params) {
          var locationDetails = {
            component: 'locationFramework',
            params: { value: 'country' }
          };
          if (params.data.hidden === 'hidden')
            return locationDetails;
          else
            return null;

        },

      },
      {
        headerName: 'State', field: 'stateName', sortable: true, filter: true, editable: false, Width: 150, minWidth: 50, maxWidth: 500,
        cellStyle: function (params) {
          if (params.value === '') {
            return { outline: '1px solid red' };

          } else {
            return { outline: 'white' };
          }
        }

      },
      { headerName: 'Description', field: 'description', sortable: true, filter: true, editable: false, Width: 150, minWidth: 50, maxWidth: 500, },


    ];
    this.defaultColDef = { resizable: true };
    this.rowData1;



    this.columnDefs2 = [

      {
        headerName: 'Country', field: 'countryName', sortable: true, editable: false, filter: true, Width: 150, minWidth: 50, maxWidth: 500,

        cellRendererSelector: function (params) {
          var locationDetails = {
            component: 'locationFramework',
            params: { value: 'country' }
          };
          if (params.data.hidden === 'hidden')
            return locationDetails;
          else
            return null;

        }
      },
      {
        headerName: 'State', field: 'stateName', sortable: true, filter: true, editable: false, Width: 150, minWidth: 50, maxWidth: 500,

        cellRendererSelector: function (params) {
          var locationDetails = {
            component: 'locationFramework',
            params: { value: 'state' }
          };
          if (params.data.hidden === 'hidden')
            return locationDetails;
          else
            return null;

        }
      },
      {
        headerName: 'City', field: 'cityName', sortable: true, filter: true, editable: false, singleClickEdit: true, Width: 250, minWidth: 50, maxWidth: 500,


        cellStyle: function (params) {
          if (params.value === '') {

            return { outline: '1px solid red' };


          } else {
            return { outline: 'white' };
          }
        }

      },

      { headerName: 'Description', field: 'description', sortable: true, filter: true, editable: false, Width: 150, minWidth: 50, maxWidth: 500, },



      { headerName: '', field: 'hidden', hide: true, }
    ];
    this.defaultColDef = { resizable: true };
    this.rowData2;

    this.columnDefs3 = [

      {
        headerName: 'Country', field: 'countryName', sortable: true, editable: false, filter: true, Width: 150, minWidth: 50, maxWidth: 500,
        cellRendererSelector: function (params) {
          var locationDetails = {
            component: 'locationFramework',
            params: { value: 'country' }
          };
          if (params.data.hidden === 'hidden')
            return locationDetails;
          else
            return null;

        }
      },
      {
        headerName: 'State', field: 'stateName', sortable: true, filter: true, editable: false, Width: 150, minWidth: 50, maxWidth: 500,
        cellRendererSelector: function (params) {
          var locationDetails = {
            component: 'locationFramework',
            params: { value: 'state' }
          };
          if (params.data.hidden === 'hidden')
            return locationDetails;
          else
            return null;

        }

      },
      {
        headerName: 'City', field: 'cityName', sortable: true, filter: true, editable: false, Width: 150, minWidth: 50, maxWidth: 500,
        cellRendererSelector: function (params) {
          var locationDetails = {
            component: 'locationFramework',
            params: { value: 'city' }
          };
          if (params.data.hidden === 'hidden')
            return locationDetails;
          else
            return null;

        }


      },
      {
        headerName: 'Postal Code', field: 'postalCode', sortable: true, filter: true, editable: false, Width: 150, minWidth: 50, maxWidth: 500,
        cellStyle: function (params) {
          if (params.value === '') {
            return { outline: '1px solid red' };
          } else {
            return { outline: 'white' };
          }
        }

      },

      { headerName: 'Description', field: 'description', sortable: true, filter: true, Width: 150, minWidth: 50, maxWidth: 500, editable: false },
      { headerName: '', field: 'hidden', hide: true },

    ];
    this.defaultColDef = { resizable: true };
    this.rowData3;




    this.columnDefs4 = [
      { headerName: 'Department', field: 'department', sortable: true, filter: true, editable: true, Width: 250, minWidth: 50, maxWidth: 500, },
      { headerName: 'Designation', field: 'designation', sortable: true, filter: true, editable: true, Width: 250, minWidth: 50, maxWidth: 500, },
    ];

    this.rowData4 = [
    ];

    this.columnDefs5 = [
      { headerName: 'Language', field: 'language', sortable: true, filter: true, editable: true, Width: 250, minWidth: 50, maxWidth: 500, },
      { headerName: 'Language Code', field: 'languageCode', sortable: true, editable: true, filter: true, Width: 250, minWidth: 50, maxWidth: 500, },
    ];

    this.rowData5 = [
      { language: 'English', languageCode: '001' },
      { language: 'Hindi', languageCode: '002' },
      { language: 'Urdu', languageCode: '003' },
      { language: 'Arabic', languageCode: '004' },
      { language: 'French', languageCode: '005' }
    ];

  }
  ngOnInit() {
    this.saveUpdateCountry = 'Save';
    this.addCountryToggleButton = false;
    this.saveCountryToggleButton = true;
    this.deleteCountryToggleButton = true;

    this.saveUpdateState = 'Save';
    this.addStateToggleButton = false;
    this.saveStateToggleButton = true;
    this.deleteStateToggleButton = true;

    this.saveUpdateCity = 'Save';
    this.addCityToggleButton = false;
    this.saveCityToggleButton = true;
    this.deleteCityToggleButton = true;

    this.saveUpdatePostal = 'Save';
    this.addPostalToggleButton = false;
    this.savePostalToggleButton = true;
    this.deletePostalToggleButton = true;

    this.getCountries();
    this.getStates();

    this.getCity();
    this.getPostal();

  }
  rowNodeIndex: any;
  newDataTest;

  rowEditingStarted(event) {
    this.stateApi.getColumnDef('stateName').editable = true;
    this.stateApi.getColumnDef('description').editable = true;
    const selectedNodes = this.stateApi.getSelectedNodes();
    const selectedData = selectedNodes.map(node => node.data);
    selectedData.map(node => this.newDataTest = node as Object);
    var res1 = this.stateApi.updateRowData({ remove: selectedData });
    let res = this.stateApi.updateRowData({ add: [{ stateName: this.newDataTest['stateName'], countryName: this.newDataTest['countryName'], description: this.newDataTest['description'], hidden: 'hidden' }], addIndex: event.rowIndex });
    this.rowNodeIndex = event.rowIndex;

    this.stateApi.startEditingCell({
      rowIndex: event.rowIndex,
      colKey: 'countryName'
    });
  }

  rowCityEditingStarted(event) {
    this.cityApi.getColumnDef('cityName').editable = true;
    this.cityApi.getColumnDef('description').editable = true;
    const selectedNodes = this.cityApi.getSelectedNodes();
    const selectedData = selectedNodes.map(node => node.data);
    var dataTest: Object;
    selectedData.map(node => dataTest = node as Object);
    console.log('datatest:  ' + JSON.stringify(dataTest));
    var res1 = this.cityApi.updateRowData({ remove: selectedData });

    let res = this.cityApi.updateRowData({ add: [{ stateName: dataTest['stateName'], cityName: dataTest['cityName'], countryName: dataTest['countryName'], description: dataTest['description'], hidden: 'hidden' }], addIndex: event.rowIndex });

    this.cityApi.startEditingCell({
      rowIndex: event.rowIndex,
      colKey: 'countryName'
    });
  }

  rowPostalEditingStarted(event) {
    this.postalApi.getColumnDef('postalCode').editable = true;
    this.postalApi.getColumnDef('description').editable = true;
    const selectedNodes = this.postalApi.getSelectedNodes();
    const selectedData = selectedNodes.map(node => node.data);
    var dataTest: Object;
    selectedData.map(node => dataTest = node as Object);
    console.log('datatest:  ' + JSON.stringify(dataTest));
    var res1 = this.postalApi.updateRowData({ remove: selectedData });

    let res = this.postalApi.updateRowData({ add: [{ cityName: dataTest['cityName'], stateName: dataTest['stateName'], countryName: dataTest['countryName'], postalCode: dataTest['postalCode'], description: dataTest['description'], hidden: 'hidden' }], addIndex: event.rowIndex });

    this.postalApi.startEditingCell({
      rowIndex: event.rowIndex,
      colKey: 'countryName'
    });
  }

  universalSaveAddress() {

    // const countrySelectedNodes = this.api.getSelectedNodes();
    const stateSelectedNodes = this.stateApi.getSelectedNodes();
    const citySelectedNodes = this.cityApi.getSelectedNodes();
    // const postalSelectedNodes = this.postalApi.getSelectedNodes();
    // if (countrySelectedNodes.length !== 0) {
    //   this.onDeleteCountry();
    // }
    if (stateSelectedNodes.length !== 0) {
      this.onSaveUpdateStateData();
    }
    else if (citySelectedNodes.length !== 0) {
      this.onSaveUpdateCity();
    }
    // else if (postalSelectedNodes.length !== 0) {
    //   this.onDeletePostal();
    // }
  }










  onStateGridReady(params) {
    this.stateApi = params.api;
    this.stateColumnApi = params.columnApi;
  }

  getStates() {
    const universalBody = new UniversalBody();
    universalBody.userID = '1';
    this.allWeb.getStates(universalBody)
      .subscribe(
        data => {
          this.getStateResponse = data;
          console.log(JSON.stringify(this.getStateResponse));


          if (this.getStateResponse.length === 0) {

            this.TotalState = this.getStateResponse.length;
            this.saveUpdateState = "Save";

            this.addStateToggleButton = false;
            this.saveStateToggleButton = true;
            this.deleteStateToggleButton = true;
          } else {

            if (this.getStateResponse.length >= 50) {
              this.ShowLimitedState = 50;
            } else {
              this.ShowLimitedState = this.getStateResponse.length;
            }

            this.TotalState = this.getStateResponse.length;
            // this.saveUpdateState = "Save";
            this.saveUpdateState = "Update";

            this.saveStateToggleButton = true;
            this.addStateToggleButton = false;
            this.deleteStateToggleButton = true;
            this.rowData1 = this.getStateResponse;
          }

        }
      );
  }

  onAddState() {
    this.saveStateToggleButton = false;
    this.nodeStateSelect = "Add";
    //  this.addStateToggleButton = true;
    this.saveUpdateState = 'Save';
    this.stateApi.setFocusedCell(this.countState, 'countryName');
    this.stateApi.getColumnDef('stateName').editable = true;
    this.stateApi.getColumnDef('description').editable = true;
    this.countState++;
    let res = this.stateApi.updateRowData({ add: [{ stateName: '', countryName: '', description: '', hidden: 'hidden' }], addIndex: 0 });
    const universalJsonBody = new UniversalJsonBody();
    const selectedNodes = this.stateApi.getSelectedNodes();
    const selectedData = selectedNodes.map(node => node.data);
    var dataTest: Object;
    selectedData.map(node => dataTest = node as Object);
    if (dataTest['stateName'] === '') {
      alert('Enter state name');
    }
    else {
      for (let selectedNode of selectedData) {
        const stateBody = new StateBody();
        stateBody.stateName = selectedNode['stateName'];
        stateBody.description = selectedNode['description'];
        stateBody.countryId = this.selectedCountryId + '';
        stateBody.userId="1";
        this.stateArray.push(stateBody);
      }
    }
  }

  onSaveUpdateStateData() {
    this.stateApi.tabToNextCell();
    if (this.nodeStateSelect === 'Add') {
      this.onSaveState();
    } else {
      this.onSaveUpdateState();
    }
  }

  onSaveState() {
    const universalJsonBody = new UniversalJsonBody();
    const selectedNodes = this.stateApi.getSelectedNodes();
    const selectedData = selectedNodes.map(node => node.data);
    var dataTest: Object;
    var output:string = "";
    selectedData.map(node => dataTest = node as Object);
    if (selectedData.length === 0) {
      alert('Please select a row');
    }
    else {
      if (dataTest['stateName'] === '') {
        alert('Enter state name');
      }
      else {
        for (let selectedNode of selectedData) {
          const stateBody = new StateBody();
          stateBody.stateName = selectedNode['stateName'];
          stateBody.description = selectedNode['description'];
          stateBody.countryId = this.selectedCountryId + '';
          stateBody.userId="1";
          this.stateArray.push(stateBody);
          var jsonData = JSON.stringify(this.stateArray);
          jsonData = jsonData.replace(/"/g, "'");
        }
        universalJsonBody.jsonData = jsonData;
        this.allWeb.saveState(universalJsonBody)
          .subscribe(
            data => {
              this.universalResponse = data;
              // alert(this.universalResponse.STATUS);
              // alert(this.universalResponse.OUTPUT);
              if (this.universalResponse.STATUS === 'Success') {
                if (this.universalResponse.OUTPUT != '') {
                  var names: string[] = this.universalResponse.OUTPUT.split(",");
                  for (var i = 0; i < names.length - 1; i++) {
                    output += names[i] + "\n";
                  }
                  alert(output);
                  this.getStates();
                } else {
                  alert(this.universalResponse.MESSAGE);
                  this.getStates();
                }
              }
              this.stateArray = [];
            }
          );
      }
    }
  }

  onDeleteState() {
    const universalJsonBody = new UniversalJsonBody();
    const selectedNodes = this.stateApi.getSelectedNodes();
    const selectedData = selectedNodes.map(node => node.data);
    var dataTest: Object;
    var output: string = "";
    const deleteStateBody = new DeleteStateBody();
    const deleteStateArray: DeleteStateBody[] = [];
    selectedData.map(node => dataTest = node as Object);
    if (selectedNodes.length === 0) {
      alert("Please Select any row.");
    } else {
      for (let selectedNode of selectedData) {
        const deleteStateBody = new DeleteStateBody();
        deleteStateBody.stateId = selectedNode['stateID'];
        if (deleteStateBody.stateId === undefined) {
          this.stateApi.updateRowData({ remove: selectedData });
        } else {
          deleteStateBody.userId = "1";
          deleteStateArray.push(deleteStateBody);
          var jsonData = JSON.stringify(deleteStateArray);
        }
      }
      jsonData = jsonData.replace(/"/g, "'");
      universalJsonBody.jsonData = jsonData;
      this.allWeb.deleteState(universalJsonBody)
        .subscribe(
          data => {
            this.universalResponse = data;
            if (this.universalResponse.STATUS === 'Success') {
              if (this.universalResponse.OUTPUT != '') {
                var names: string[] = this.universalResponse.OUTPUT.split(",");
                for (var i = 0; i < names.length - 1; i++) {
                  output += names[i] + "\n";
                }
                alert(output);
              } else {
                alert(this.universalResponse.MESSAGE);
                this.getStates();
                this.stateApi.removeItems(selectedNodes);
              }
            }
          }
        );
    }
    this.addStateToggleButton = false;
    this.saveStateToggleButton = true;
    this.deleteStateToggleButton = true;
  }

  // onUpdateStateMt() {
  //   const universalJsonBody = new UniversalJsonBody();
  //   const selectedNodes = this.stateApi.getSelectedNodes();
  //   const selectedData = selectedNodes.map(node => node.data);
  //   var dataTest: Object;
  //   var output:string = "";
  //   selectedData.map(node => dataTest = node as Object);
  //   if (selectedData.length === 0) {
  //     alert('Please select a row');
  //   }
  //   else {
  //     if (dataTest['stateName'] === '') {
  //       alert('Enter state name');
  //     }
  //     else {
  //       for (let selectedNode of selectedData) {
  //         const stateBody = new StateBody();
  //         stateBody.stateName = selectedNode['stateName'];
  //         stateBody.description = selectedNode['description'];
  //         stateBody.stateId = selectedNode['stateId'];
  //         stateBody.countryId = this.selectedCountryId + '';
  //         stateBody.userId="1";
  //         this.stateArray.push(stateBody);
  //         var jsonData = JSON.stringify(this.stateArray);
  //         jsonData = jsonData.replace(/"/g, "'");
  //       }
  //       universalJsonBody.jsonData = jsonData;
  //       this.allWeb.saveState(universalJsonBody)
  //         .subscribe(
  //           data => {
  //             this.universalResponse = data;
  //             // alert(this.universalResponse.STATUS);
  //             // alert(this.universalResponse.OUTPUT);
  //             if (this.universalResponse.STATUS === 'Success') {
  //               if (this.universalResponse.OUTPUT != '') {
  //                 var names: string[] = this.universalResponse.OUTPUT.split(",");
  //                 for (var i = 0; i < names.length - 1; i++) {
  //                   output += names[i] + "\n";
  //                 }
  //                 alert(output);
  //                 this.getStates();
  //               } else {
  //                 alert(this.universalResponse.MESSAGE);
  //                 this.getStates();
  //               }
  //             }
  //             this.stateArray = [];
  //           }
  //         );
  //     }
  //   }
  // }

  onSaveUpdateState() {
    this.stateApi.tabToNextCell();
    alert(this.saveUpdateState);
    if (this.saveUpdateState === "Save") {
      
      this.onSaveState();
    }
    else if (this.saveUpdateState === 'Edit') {
      this.stateApi.setFocusedCell(0, "stateName");
      this.stateApi.getColumnDef('stateName').editable = true;
      this.stateApi.getColumnDef('description').editable = true;
      const selectedNodes = this.stateApi.getSelectedNodes();
      const selectedData = selectedNodes.map(node => node.data);
      var dataTest: Object;
      selectedData.map(node => dataTest = node as Object);
      var res1 = this.stateApi.updateRowData({ remove: selectedData });
      let res = this.stateApi.updateRowData({ add: [{ stateName: dataTest['stateName'], countryName: dataTest['countryName'], description: 'description', hidden: 'hidden' }], addIndex: 0 });
      this.saveUpdateState = "Update";
      this.nodeStateSelect = "Update";
    } else if (this.saveUpdateState === "Update") {
      this.onUpdateState();
    }
    this.addStateToggleButton = false;
  }

  onUpdateState() {
      const updateStateBody = new UpdateStateBody();
      const selectedNodes = this.stateApi.getSelectedNodes();
      const selectedData = selectedNodes.map(node => node.data);
      var dataTest: Object;
      selectedData.map(node => dataTest = node as Object);
      if (selectedData.length === 0) {
        alert('Please select a row');
      }
      updateStateBody.StateName = dataTest['stateName'];
      updateStateBody.Description = dataTest['description'];
      if (dataTest['stateName'] === '') {
        alert('Enter state name');
        this.addStateToggleButton = true;
      }
      else {
        updateStateBody.CountryID = this.selectedCountryId + '';
        updateStateBody.StateID = dataTest['stateID'];
        this.allWeb.updateState(updateStateBody)
          .subscribe(
            data => {
              this.universalResponse = data;
              alert(this.universalResponse.MESSAGE);
              if (this.universalResponse.STATUS === 'Success') {
                this.getStates();
                this.addStateToggleButton = false;
              }
            }
          );
      }
  }
  
  onStateFilterChange() {

    if (this.stateCheckedStatus === false) {

      this.stateApi.selectAll();
      this.stateFilter = true;
      this.stateCheckedStatus = true;
      this.deleteStateToggleButton = false;
      this.addStateToggleButton = true;
    } else {
      this.stateApi.deselectAll();
      this.stateFilter = false;
      this.stateCheckedStatus = false;
      this.deleteStateToggleButton = true;
      this.addStateToggleButton = false;
    }

  }

  onStateSelectionChanged(event) {
    this.selectedRowState = this.stateApi.getSelectedRows();
    const selectedNodes = this.stateApi.getSelectedNodes();
    const selectedData = selectedNodes.map(node => node.data);
    var dataTest: Object;
    selectedData.map(node => dataTest = node as Object);
    this.stateApi.stopEditing();

    this.rowSelection = "multiple";
    if (this.selectedRowState.length === 1) {
      if (this.getStateResponse.length === 1) {
        this.deleteStateToggleButton = false;
        this.stateFilter = true;
        this.stateCheckedStatus = false;
        this.saveStateToggleButton = false;
      }
      else {
        this.deleteStateToggleButton = false;
        this.stateFilter = false;
        this.stateCheckedStatus = false;
        this.saveStateToggleButton = false;

      }
      // alert(this.nodeStateSelect);
      if (this.nodeStateSelect === 'Add') {
        this.saveUpdateState = 'Save';
       // this.nodeStateSelect = 'Edit';
        this.saveUpdateAddressPopup = 'Do you want to save?';
        this.btnSaveUpdateAddressPopup = 'SAVE';

      } else if (this.nodeStateSelect === undefined) {
        this.saveUpdateState = 'Update';
        this.saveStateToggleButton = false;
        this.saveUpdateAddressPopup = 'Do you want to update?';
        this.btnSaveUpdateAddressPopup = 'UPDATE';
      }
      else if (this.nodeStateSelect === 'Update') {
        this.saveStateToggleButton = false;
        this.saveUpdateState = 'Save';
        this.btnSaveUpdateAddressPopup = 'UPDATE';
        this.saveUpdateAddressPopup = 'Do you want to update?';
      }
    }
    else if (this.selectedRowState.length >= 1) {
      this.saveStateToggleButton = false;
      this.deleteStateToggleButton = false;
      this.addStateToggleButton = false;

    }
  }











  updateData(event, value) {
    if (value === 'country') {
      this.selectedCountryId = event;
      console.log('getted', event);
    }
  }

  getCity() {
    const universalBody = new UniversalBody();
    universalBody.userID = '1'; this.allWeb.getCity(universalBody)
      .subscribe(
        data => {
          this.getCityResponse = data;

          if (this.getCityResponse.length === 0) {

            this.TotalCity = this.getCityResponse.length;
            this.saveUpdateCity = "Save";

            this.addCityToggleButton = false;
            this.saveCityToggleButton = true;
            this.deleteCityToggleButton = true;
          } else {

            if (this.getCityResponse.length >= 50) {
              this.ShowLimitedCity = 50;
            } else {
              this.ShowLimitedCity = this.getCityResponse.length;
            }

            this.TotalCity = this.getCityResponse.length;
            this.saveUpdateCity = "Save";

            this.saveCityToggleButton = true;
            this.addCityToggleButton = false;
            this.deleteCityToggleButton = true;
            this.rowData2 = this.getCityResponse;
          }



        }
      );
  }

  getPostal() {
    const universalBody = new UniversalBody();
    universalBody.userID = '1';
    this.allWeb.getPostal(universalBody)
      .subscribe(
        data => {
          this.getPostalResponse = data;
          console.log('this.getPostalResponse:  ' + JSON.stringify(this.getPostalResponse));
          if (this.getPostalResponse.length === 0) {
            this.TotalPostal = this.getPostalResponse.length;
            this.saveUpdatePostal = 'Save';

            this.addPostalToggleButton = false;
            this.savePostalToggleButton = true;
            this.deletePostalToggleButton = true;
          } else {

            if (this.getPostalResponse.length >= 50) {
              this.ShowLimitedPostal = 50;
            } else {
              this.ShowLimitedPostal = this.getPostalResponse.length;
            }

            this.TotalPostal = this.getPostalResponse.length;
            this.saveUpdatePostal = 'Save';

            this.savePostalToggleButton = true;
            this.addPostalToggleButton = false;
            this.deletePostalToggleButton = true;
            this.rowData3 = this.getPostalResponse;
          }
        }
      );

  }

  onAddContry() {
    this.saveCountryToggleButton = false;
    this.nodeCountrySelect = 'Add';

    this.saveUpdateCountry = 'Save';

    this.api.setFocusedCell(this.countCountry, 'countryCode');
    this.countCountry++;
    var res = this.api.updateRowData({
      add: [{ countryName: '', countryCode: '' }],
      addIndex: 0
    });

    const selectedNodes = this.api.getSelectedNodes();
    const selectedData = selectedNodes.map(node => node.data);
    var dataTest: Object;
    selectedData.map(node => dataTest = node as Object);
    const countryBody = new CountryBody();

    if (dataTest['countryCode'] === '') {
      alert("Enter country code");
      this.api.tabToNextCell();
    } else if (dataTest['countryName'] === '') {
      alert("Enter country name");

    } else {
      this.addCountryToggleButton = false;

      for (let selectedNode of selectedData) {
        countryBody.countryName = selectedNode['countryName'];
        countryBody.countryCode = selectedNode['countryCode'];
        this.countryArray.push(countryBody);

        // var jsonData = JSON.stringify(this.countryArray);
        // jsonData = jsonData.replace(/"/g, "'");
      }

    }
    //   this.saveCountryToggleButton = false;
    //   this.nodeCountrySelect = 'Add';
    //  // this.addCountryToggleButton = true;
    //   this.saveUpdateCountry = 'Save';
  }

  onSaveCountry() {
    const countryBody = new CountryBody();
    const universalJsonBody = new UniversalJsonBody();

    const selectedNodes = this.api.getSelectedNodes();
    const selectedData = selectedNodes.map(node => node.data);
    var dataTest: Object;
    selectedData.map(node => dataTest = node as Object);

    if (selectedData.length === 0) {
      alert('Please select a row');

    } else {
      if (dataTest['countryCode'] === '') {
        alert("Enter country code");
      } else if (dataTest['countryName'] === '') {
        alert("Enter country name");
      } else {
        for (let selectedNode of selectedData) {
          countryBody.countryName = selectedNode['countryName'];
          countryBody.countryCode = selectedNode['countryCode'];
          this.countryArray.push(countryBody);

          var jsonData = JSON.stringify(this.countryArray);
          jsonData = jsonData.replace(/"/g, "'");

        }
        this.isShowing = true;
        universalJsonBody.jsonData = jsonData;
        this.allWeb.saveCountry(universalJsonBody)
          .subscribe(

            data => {
              this.isShowing = false;
              this.universalResponse = data;
              alert(this.universalResponse.MESSAGE);
              if (this.universalResponse.STATUS.trim() === 'Success') {
                this.getCountries();
              }
              this.countryArray = [];
            }
          );

      }


    }
  }

  onCountryFilterChange() {
    if (this.countryCheckedStatus === false) {
      this.api.selectAll();
      this.countryFilter = true;
      this.countryCheckedStatus = true;
      this.deleteCountryToggleButton = false;
      this.addCountryToggleButton = true;

    } else {
      this.api.deselectAll();
      this.countryFilter = false;
      this.countryCheckedStatus = false;
      this.deleteCountryToggleButton = true;
      this.addCountryToggleButton = false;

    }

  }

  onAddCity() {
    this.saveCityToggleButton = false;
    this.nodeCitySelect = "Add";
    // this.addCityToggleButton = true;
    this.saveUpdateCity = 'Save';

    this.cityApi.setFocusedCell(this.countCity, 'countryName');
    this.cityApi.getColumnDef('cityName').editable = true;
    this.cityApi.getColumnDef('description').editable = true;

    this.countCity++;
    let res = this.cityApi.updateRowData({ add: [{ stateName: 'vdfg', cityName: '', countryName: '', description: '', hidden: 'hidden' }], addIndex: 0 });
    const universalJsonBody = new UniversalJsonBody();
    const selectedNodes = this.cityApi.getSelectedNodes();
    const selectedData = selectedNodes.map(node => node.data);
    var dataTest: Object;
    selectedData.map(node => dataTest = node as Object);

    if (dataTest['cityName'] === '') {
      alert('Enter city name');
    }
    else {
      for (let selectedNode of selectedData) {
        const cityBody = new CityBody();
        cityBody.cityName = selectedNode['cityName'];
        cityBody.description = selectedNode['description'];
        cityBody.stateId = this.selectedStateId + '';
        this.cityArray.push(cityBody);
        var jsonData = JSON.stringify(this.cityArray);

      }


    }


  }

  onAddPostal() {
    this.postalApi.setFocusedCell(this.countPostal, 'countryName');
    this.postalApi.getColumnDef('postalCode').editable = true;
    this.postalApi.getColumnDef('description').editable = true;
    this.countPostal++;
    let res = this.postalApi.updateRowData({ add: [{ cityName: '', stateName: '', countryName: '', postalCode: '', description: '', hidden: 'hidden' }], addIndex: 0 });

    const postalBody = new PostalBody();
    const universalJsonBody = new UniversalJsonBody();

    const selectedNodes = this.postalApi.getSelectedNodes();

    const selectedData = selectedNodes.map(node => node.data);
    var dataTest: Object;
    selectedData.map(node => dataTest = node as Object);


    if (dataTest['postalCode'] === '') {
      alert("Enter postal code");
    } else if (this.selectedCountryId + '' === '') {
      alert('Select Country ')
    }
    else {
      for (let selectedNode of selectedData) {
        postalBody.postalCode = selectedNode['postalCode'];
        postalBody.description = selectedNode['description'];
        postalBody.cityID = this.selectedCityId + '';
        this.postalArray.push(postalBody);

      }
    }
    this.savePostalToggleButton = false;
    this.nodePostalSelect = "Add";
    this.addCountryToggleButton = true;
    this.saveUpdatePostal = 'Save';
  }

  universalDelete() {
    const countrySelectedNodes = this.api.getSelectedNodes();
    const stateSelectedNodes = this.stateApi.getSelectedNodes();
    const citySelectedNodes = this.cityApi.getSelectedNodes();
    const postalSelectedNodes = this.postalApi.getSelectedNodes();
    if (countrySelectedNodes.length !== 0) {
      this.onDeleteCountry();
    }
    else if (stateSelectedNodes.length !== 0) {
      this.onDeleteState();
    }
    else if (citySelectedNodes.length !== 0) {
      this.onDeleteCity();
    }
    else if (postalSelectedNodes.length !== 0) {
      this.onDeletePostal();
    }
  }

  onDeleteCountry() {

    const selectedNodes = this.api.getSelectedNodes();
    const deleteArray: DeleteCountryBody[] = [];
    const universalJsonBody = new UniversalJsonBody();

    const selectedData = selectedNodes.map(node => node.data);
    var dataTest: Object;
    selectedData.map(node => dataTest = node as Object);

    if (selectedData.length === 0) {
      alert("Please select a row");
    }
    else {

      for (let selectedNode of selectedData) {
        const deleteCountryBody = new DeleteCountryBody();
        deleteCountryBody.countryId = selectedNode['countryID'];

        deleteArray.push(deleteCountryBody);



      }

      var jsonData = JSON.stringify(deleteArray);
      jsonData = jsonData.replace(/"/g, "'");

      universalJsonBody.jsonData = jsonData;
      this.allWeb.deleteCountry(universalJsonBody)
        .subscribe(
          data => {
            this.universalResponse = data;
            alert(this.universalResponse.MESSAGE);
            if (this.universalResponse.STATUS === 'Success') {
              this.api.removeItems(selectedNodes);
              this.addCountryToggleButton = false;
              this.getCountries();

            }


          }
        );
    }
    this.addCountryToggleButton = false;
    this.saveCountryToggleButton = true;
    this.deleteCountryToggleButton = true;

  }

  onDeleteCity() {

    const selectedNodes = this.cityApi.getSelectedNodes();
    const deleteCityArray: DeleteCityBody[] = [];

    const universalJsonBody = new UniversalJsonBody();
    const selectedData = selectedNodes.map(node => node.data);
    var dataTest: Object;

    selectedData.map(node => dataTest = node as Object);
    if (selectedData.length === 0) {
      alert("Please select a row");
    }
    else {

      for (let selectedNode of selectedData) {
        const deleteCityBody = new DeleteCityBody();
        deleteCityBody.cityId = selectedNode['cityID'];

        deleteCityArray.push(deleteCityBody);

      }

      var jsonData1 = JSON.stringify(deleteCityArray);
      jsonData1 = jsonData1.replace(/"/g, "'");

      universalJsonBody.jsonData = jsonData1;
      this.allWeb.deleteCity(universalJsonBody)
        .subscribe(
          data => {
            this.universalResponse = data;
            alert(this.universalResponse.MESSAGE);
            if (this.universalResponse.STATUS === 'Success') {

              this.cityApi.removeItems(selectedNodes);

              this.getCity();
            }
          }
        );

    }
    this.addCityToggleButton = false;
    this.saveCityToggleButton = true;
    this.deleteCityToggleButton = true;

  }

  onDeletePostal() {
    const selectedNodes = this.postalApi.getSelectedNodes();
    const deletePostalArray: DeletePostalBody[] = [];
    const universalJsonBody = new UniversalJsonBody();
    const selectedData = selectedNodes.map(node => node.data);
    var dataTest: Object;

    selectedData.map(node => dataTest = node as Object);
    if (selectedData.length === 0) {
      alert("Please select a row");
    }
    else {
      for (let selectedNode of selectedData) {
        const deletePostalBody = new DeletePostalBody();
        deletePostalBody.postalId = selectedNode['pID'];

        deletePostalArray.push(deletePostalBody);

      }

      var jsonData = JSON.stringify(deletePostalArray);
      jsonData = jsonData.replace(/"/g, "'");

      universalJsonBody.jsonData = jsonData;

      this.allWeb.deletePostal(universalJsonBody)

        .subscribe(
          data => {
            this.universalResponse = data;
            alert(this.universalResponse.MESSAGE);
            if (this.universalResponse.STATUS === 'Success') {

              this.postalApi.removeItems(selectedNodes);

              this.getPostal();
            }

          }
        );
    }
    this.addPostalToggleButton = false;
    this.savePostalToggleButton = true;
    this.deletePostalToggleButton = true;



  }

  onUpdateCountry() {
    if (this.selectedRowCountry === undefined) {
      alert('Please enter input valid data then hit update')
    }
    else {
      const updateCountryBody = new UpdateCountryBody();

      const selectedNodes = this.api.getSelectedNodes();

      const selectedData = selectedNodes.map(node => node.data);
      var dataTest: Object;
      selectedData.map(node => dataTest = node as Object);
      if (selectedData.length === 0) {
        alert("Please select a row");
      } else {

        if (dataTest['countryCode'] === '') {
          alert("Enter country code");
        } else if (dataTest['countryName'] === '') {
          alert("Enter country name");
        } else {
          updateCountryBody.CountryID = dataTest['countryID'];
          updateCountryBody.CountryCode = dataTest['countryCode'];
          updateCountryBody.CountryName = dataTest['countryName'];

          this.allWeb.updateCountry(updateCountryBody)
            .subscribe(
              data => {
                this.universalResponse = data;
                alert(this.universalResponse.MESSAGE);
                if (this.universalResponse.STATUS === 'Success') {
                  this.getCountries();
                  this.addCountryToggleButton = false;
                }
              }
            );
        }
      }

    }
  }

  onCityFilterChange() {

    if (this.cityCheckedStatus === false) {

      this.cityApi.selectAll();
      this.cityFilter = true;
      this.cityCheckedStatus = true;
      this.deleteCityToggleButton = false;
      this.addCityToggleButton = true;
    } else {
      this.cityApi.deselectAll();
      this.cityFilter = false;
      this.cityCheckedStatus = false;
      this.deleteCityToggleButton = true;
      this.addCityToggleButton = false;
    }

  }

  onPostalFilterChange() {

    if (this.postalCheckedStatus === false) {

      this.postalApi.selectAll();
      this.postalFilter = true;
      this.postalCheckedStatus = true;
      this.deletePostalToggleButton = false;
      this.addPostalToggleButton = true;
    } else {
      this.postalApi.deselectAll();
      this.postalFilter = false;
      this.postalCheckedStatus = false;
      this.deletePostalToggleButton = true;
      this.addPostalToggleButton = false;
    }

  }

  onPostalSelectionChanged() {


    this.selectedRowPostal = this.postalApi.getSelectedRows();
    const selectedNodes = this.postalApi.getSelectedNodes();
    const selectedData = selectedNodes.map(node => node.data);
    var dataTest: Object;
    selectedData.map(node => dataTest = node as Object);
    this.postalApi.stopEditing();

    if (this.selectedRowPostal.length === 1) {
      if (this.getPostalResponse.length === 1) {
        this.deletePostalToggleButton = false;
        this.postalFilter = true;
        this.postalCheckedStatus = false;
      }
      else {
        this.deletePostalToggleButton = false;
        this.postalFilter = false;
        this.postalCheckedStatus = false;

      }
      if (this.nodePostalSelect === 'Add') {
        this.saveUpdatePostal = 'Save';
        this.nodePostalSelect = 'Edit';

      } else if (this.nodePostalSelect === undefined) {
        if (this.nodePostalSelect === 'Edit') {
          this.saveUpdatePostal = 'Update';
        } else { this.saveUpdatePostal = 'Edit'; }
        this.savePostalToggleButton = false;
      } else if (this.nodePostalSelect === 'Update') {
        this.savePostalToggleButton = false;
        this.saveUpdatePostal = 'Update';
      }
    }
    else if (this.selectedRowPostal.length >= 1) {
      this.savePostalToggleButton = true;

    }





    // this.selectedRowPostal = this.postalApi.getSelectedRows();
    // this.rowSelection = 'multiple';
    // if (this.selectedRowPostal.length === 1) {
    //   if (this.getPostalResponse.length === 1) {
    //     this.deletePostalToggleButton = false;
    //     this.postalFilter = true;
    //     this.postalCheckedStatus = false;
    //   }
    //   else {

    //     this.deletePostalToggleButton = false;
    //     this.postalFilter = false;
    //     this.postalCheckedStatus = false;
    //   }
    //   if (this.nodePostalSelect === 'Add') {
    //     this.saveUpdatePostal = 'Save';
    //     this.nodePostalSelect = 'Update';
    //   } else if (this.nodePostalSelect === undefined) {
    //     this.saveUpdatePostal = 'Update';

    //     this.savePostalToggleButton = false;
    //   }
    //   else if (this.nodePostalSelect === 'Update') {
    //     this.savePostalToggleButton = false;
    //     this.saveUpdatePostal = 'Update';

    //   }
    // }
    // else if (this.selectedRowPostal.length >= 1) {
    //   this.savePostalToggleButton = true;

    // }
  }

  // onPostalSelectionChanged() {

  //   this.selectedRowPostal = this.postalApi.getSelectedRows();
  //   const selectedNodes = this.postalApi.getSelectedNodes();
  //   const selectedData = selectedNodes.map(node => node.data);
  //   var dataTest: Object;
  //   selectedData.map(node => dataTest = node as Object);
  //   this.postalApi.stopEditing();

  //   if (this.selectedRowPostal.length === 1) {
  //     if (this.getPostalResponse.length === 1) {
  //       this.deletePostalToggleButton = false;
  //       this.postalFilter = true;
  //       this.postalCheckedStatus = false;
  //     }
  //     else {
  //       this.deletePostalToggleButton = false;
  //       this.postalFilter = false;
  //       this.postalCheckedStatus = false;

  //     }
  //     if (this.nodePostalSelect === 'Add') {
  //       this.saveUpdatePostal = 'Save';
  //       this.nodePostalSelect = 'Edit';

  //     } else if (this.nodePostalSelect === undefined) {
  //       if (this.nodePostalSelect === 'Edit') {
  //         this.saveUpdatePostal = 'Update';
  //       } else { this.saveUpdatePostal = 'Edit'; }
  //       this.savePostalToggleButton = false;
  //     } else if (this.nodePostalSelect === 'Update') {
  //       this.savePostalToggleButton = false;
  //       this.saveUpdatePostal = 'Update';
  //     }
  //   }
  //   else if (this.selectedRowPostal.length >= 1) {
  //     this.savePostalToggleButton = true;

  //   }

  // }


  // onPostalSelectionChanged() {
  //   this.selectedRowPostal = this.postalApi.getSelectedRows();
  //   this.rowSelection = 'multiple';
  //   if (this.selectedRowPostal.length === 1) {
  //     if (this.getPostalResponse.length === 1) {
  //       this.deletePostalToggleButton = false;
  //       this.postalFilter = true;
  //       this.postalCheckedStatus = false;
  //     }
  //     else {

  //       this.deletePostalToggleButton = false;
  //       this.postalFilter = false;
  //       this.postalCheckedStatus = false;
  //     }
  //     if (this.nodePostalSelect === 'Add') {
  //       this.saveUpdatePostal = 'Save';
  //       this.nodePostalSelect = 'Update';
  //     } else if (this.nodePostalSelect === undefined) {
  //       this.saveUpdatePostal = 'Update';

  //       this.savePostalToggleButton = false;
  //     }
  //     else if (this.nodePostalSelect === 'Update') {
  //       this.savePostalToggleButton = false;
  //       this.saveUpdatePostal = 'Update';

  //     }
  //   }
  //   else if (this.selectedRowPostal.length >= 1) {
  //     this.savePostalToggleButton = true;

  //   }
  // }

  public selectedStateId: number;
  public selectedCityId: number
  onSaveCity() {
    const universalJsonBody = new UniversalJsonBody();

    const selectedNodes = this.cityApi.getSelectedNodes();

    const selectedData = selectedNodes.map(node => node.data);
    var dataTest: Object;
    selectedData.map(node => dataTest = node as Object);
    if (selectedData.length === 0) {
      alert('Please select a row');
    }
    else {
      if (dataTest['cityName'] === '') {
        alert('Enter city name');
      }
      else {
        for (let selectedNode of selectedData) {
          const cityBody = new CityBody();
          cityBody.cityName = selectedNode['cityName'];
          cityBody.description = selectedNode['description'];
          cityBody.stateId = this.selectedStateId + '';
          this.cityArray.push(cityBody);
          var jsonData = JSON.stringify(this.cityArray);
          jsonData = jsonData.replace(/"/g, "'");
          console.log('jsondata:   ' + jsonData);
        }
        universalJsonBody.jsonData = jsonData;
        this.allWeb.saveCity(universalJsonBody)
          .subscribe(

            data => {
              this.universalResponse = data;

              alert(this.universalResponse.MESSAGE);

              if (this.universalResponse.STATUS.trim() === 'Success') {

                this.getCity();

              }
              this.cityArray = [];
            }
          );
      }
    }

  }

  onCitySelectionChanged() {
    this.selectedRowCity = this.cityApi.getSelectedRows();
    const selectedNodes = this.cityApi.getSelectedNodes();
    const selectedData = selectedNodes.map(node => node.data);
    var dataTest: Object;
    selectedData.map(node => dataTest = node as Object);
    this.cityApi.stopEditing();

    //this.selectedRowCity = this.cityApi.getSelectedRows();
    this.rowSelection = "multiple";
    if (this.selectedRowCity.length === 1) {
      if (this.getCityResponse.length === 1) {
        this.deleteCityToggleButton = false;
        this.cityFilter = true;
        this.cityCheckedStatus = false;
      }
      else {
        this.deleteCityToggleButton = false;
        this.cityFilter = false;
        this.cityCheckedStatus = false;

      }
      if (this.nodeCitySelect === 'Add') {
        this.saveUpdateCity = 'Save';
        this.nodeCitySelect = 'Edit';

      } else if (this.nodeCitySelect === undefined) {
        this.saveUpdateCity = 'Save';
        this.saveCityToggleButton = false;
      }
    }
    else if (this.selectedRowCity.length >= 1) {
      this.saveCityToggleButton = true;

    }





    // if (this.selectedRowCity.length === 1) {
    //   if (this.getCityResponse.length === 1) {
    //     this.deleteCityToggleButton = false;
    //     this.cityFilter = true;
    //     this.cityCheckedStatus = false;
    //   }
    //   else {
    //     this.deleteCityToggleButton = false;
    //     this.cityFilter = false;
    //     this.cityCheckedStatus = false;
    //   }
    //   if (this.nodeCitySelect === "Add") {
    //     this.saveUpdateCity = "Save";
    //     this.nodeCitySelect = "Update";
    //   } else if (this.nodeCitySelect === undefined) {
    //     this.saveUpdateCity = "Update";

    //     this.saveCityToggleButton = false;
    //   }
    //   else if (this.nodeCitySelect === 'Update') {
    //     this.saveCityToggleButton = false;
    //     this.saveUpdateCity = 'Update';

    //   }
    //   else if (this.selectedRowCity.length >= 1) {
    //     this.saveCityToggleButton = true;

    //   }
    // }
  }

  onSaveUpdateCity() {
    this.cityApi.tabToNextCell();
    if (this.saveUpdateCity === "Save") {
      this.onSaveCity();
    }
    else if (this.saveUpdateCity === "Update") {
      this.onUpdateCity();
    }
    this.addPostalToggleButton = false;
  }

  onUpdateCity() {
    const updateCityBody = new UpdateCityBody();

    const selectedNodes = this.cityApi.getSelectedNodes();

    const selectedData = selectedNodes.map(node => node.data);
    var dataTest: Object;
    selectedData.map(node => dataTest = node as Object);
    if (selectedData.length === 0) {
      alert("Please select a row");
    }
    updateCityBody.CityName = dataTest['cityName'];
    updateCityBody.Description = dataTest['description'];

    if (dataTest['cityName'] === '') {
      alert("Enter city name");

    }
    else {
      updateCityBody.StateID = this.selectedStateId
      updateCityBody.CityID = dataTest['cityID'];
      if (updateCityBody.CityID === undefined) {

        this.addCityToggleButton = false;
      }
      else {

        this.addCityToggleButton = false;

        this.allWeb.updateCity(updateCityBody)
          .subscribe(
            data => {
              this.universalResponse = data;

              alert(this.universalResponse.MESSAGE);

              if (this.universalResponse.STATUS === 'Success') {

                this.getCity();
                this.addCityToggleButton = false;

              }
            }

          );
      }
    }
  }

  onGridReady(params) {
    this.api = params.api;
    this.columnApi = params.columnApi;

  }

  onCityGridReady(params) {
    this.cityApi = params.api;
    this.cityColumnApi = params.columnApi;
  }

  onPostalGridReady(params) {
    this.postalApi = params.api;
    this.postalColomnApi = params.columnApi;
  }

  onSelectionChanged() {
    this.selectedRowCountry = this.api.getSelectedRows();
    this.rowSelection = 'multiple';
    if (this.selectedRowCountry.length === 1) {
      if (this.countryDataResponse.length === 1) {
        this.deleteCountryToggleButton = false;
        this.countryFilter = true;
        this.countryCheckedStatus = false;
      }
      else {
        this.deleteCountryToggleButton = false;
        this.countryFilter = false;
        this.countryCheckedStatus = false;
      }
      if (this.nodeCountrySelect === "Add") {
        this.saveUpdateCountry = "Save";
        this.nodeCountrySelect = "Update";
      } else if (this.nodeCountrySelect === undefined) {
        this.saveUpdateCountry = "Update";
        this.saveCountryToggleButton = false;
      }
      else if (this.nodeCountrySelect === 'Update') {
        this.saveCountryToggleButton = false;
        this.saveUpdateCountry = 'Update';
      }
    }
    else if (this.selectedRowCountry.length >= 1) {
      this.saveCountryToggleButton = true;

    }
  }

  onSavePostal() {

    const postalBody = new PostalBody();
    const universalJsonBody = new UniversalJsonBody();

    const selectedNodes = this.postalApi.getSelectedNodes();

    const selectedData = selectedNodes.map(node => node.data);
    var dataTest: Object;
    selectedData.map(node => dataTest = node as Object);
    if (selectedData.length === 0) {
      alert("Please select a row");
    }
    else {

      if (dataTest['postalCode'] === '') {
        alert("Enter postal code");

      } else if (this.selectedCountryId + '' === '') {
        alert('Select Country ')
      }
      else {
        for (let selectedNode of selectedData) {
          postalBody.postalCode = selectedNode['postalCode'];
          postalBody.description = selectedNode['description'];
          postalBody.cityID = this.selectedCityId + '';

          this.postalArray.push(postalBody);
          var jsonData = JSON.stringify(this.postalArray);
          jsonData = jsonData.replace(/"/g, "'");

        }

        universalJsonBody.jsonData = jsonData;
        this.allWeb.savePostal(universalJsonBody)
          .subscribe(

            data => {
              this.universalResponse = data;

              alert(this.universalResponse.MESSAGE);

              if (this.universalResponse.STATUS.trim() === 'Success') {

                this.getPostal();

              }
              this.postalArray = [];
            }
          );
      }
    }
  }

  onUpdatePostal() {
    const updatePostalBody = new UpdatePostalBody();

    const selectedNodes = this.postalApi.getSelectedNodes();

    const selectedData = selectedNodes.map(node => node.data);
    var dataTest: Object;
    selectedData.map(node => dataTest = node as Object);
    if (selectedData.length === 0) {
      alert("Please select a row");
    }
    updatePostalBody.CityID = this.selectedCityId + '';

    updatePostalBody.CityID = this.selectedCityId + '';
    updatePostalBody.postalCode = dataTest['postalCode'];
    updatePostalBody.Description = dataTest['description'];

    if (dataTest['postalCode'] === '') {
      alert("Enter postal code");

    }
    else {
      updatePostalBody.pid = dataTest['pID'];
      updatePostalBody.CityID = this.selectedCityId + '';
      if (updatePostalBody.pid === undefined) {
        this.addPostalToggleButton = false;
      }
      else {

        this.allWeb.updatePostal(updatePostalBody)
          .subscribe(
            data => {
              this.universalResponse = data;

              alert(this.universalResponse.MESSAGE);

              if (this.universalResponse.STATUS === 'Success') {

                this.getPostal();

              }

            }

          );
      }
    }

  }

  getCountries() {
    const universalBody = new UniversalBody();
    universalBody.userID = '1';
    this.isShowing = true;
    this.allWeb.getCountries(universalBody)
      .subscribe(
        data => {
          this.isShowing = false;

          this.countryDataResponse = data;

          if (this.countryDataResponse.length === 0) {

            this.TotalCountry = this.countryDataResponse.length;
            this.saveUpdateCountry = "Save";

            this.addCountryToggleButton = false;
            this.saveCountryToggleButton = true;
            this.deleteCountryToggleButton = true;
          } else {

            if (this.countryDataResponse.length >= 50) {
              this.ShowLimitedCountry = 50;
            } else {
              this.ShowLimitedCountry = this.countryDataResponse.length;
            }

            this.TotalCountry = this.countryDataResponse.length;
            this.saveUpdateCountry = "Save";

            this.saveCountryToggleButton = true;
            this.addCountryToggleButton = false;
            this.deleteCountryToggleButton = true;
            this.rowData = this.countryDataResponse;
          }
          //console.log(this.employeeeAddressResponse);
        }


      );
  }

  onSaveUpdateCountry() {
    this.api.tabToNextCell();
    if (this.saveUpdateCountry === 'Save') {
      this.onSaveCountry();
    }
    else {

      this.onUpdateCountry();
    }
    this.addCountryToggleButton = false;
  }

  onFirstDataRendered(params) {
    params.api.sizeColumnsToFit();
  }

  onSaveUpdatePostal() {
    this.postalApi.tabToNextCell();
    if (this.saveUpdatePostal === 'Save') {
      this.onSavePostal();
    }
    else if (this.saveUpdatePostal === "Update") {
      this.onUpdatePostal();
    }
    this.addPostalToggleButton = false;
  }

}




