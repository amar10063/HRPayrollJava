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
  addCountryToggleButton = true;
  saveCountryToggleButton = true;
  deleteCountryToggleButton = true;
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
  saveUpdateAddressPopup: string;
  btnSaveUpdateAddressPopup: string;

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
  StartCountryNumber: any = 0;
  EndCountryNumber: any = 0;

  TotalState: any = 0;
  ShowLimitedState: any = 0;

  TotalCity: any = 0;
  ShowLimitedCity: any = 0;
  ShowCity: any = 0;
  selectAllCity = true;

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

  deleteArrayCountry: DeleteCountryBody[] = [];
  updateArrayCountry: UpdateCountryBody[] = [];
  selectAllCountryToggle = true;


  type: '';
  gridOptions = {} as GridOptions;
  public selectedCountryId: number;
  private rowClassRules;
  isShowing = false;
  private overlayNoRowsTemplate;
  stateData = []; cityData = [];

  constructor(private allWeb: AllWeb) {
    this.gridOptions = {
      context: { componentParent: this },
      enableBrowserTooltips: true
    };
    this.rowSelection = 'multiple';
    this.editType = 'fullRow';
    this.overlayNoRowsTemplate =
      "<span style=\"padding: 10px; border: 2px solid #444; background: lightgoldenrodyellow;\">This is a custom 'no rows' overlay</span>";

    this.columnDefs = [
      {
        id: 0, headerName: 'Country Code', tooltipField: 'countryCode', field: 'countryCode', sortable: true, filter: true, editable: true, Width: 250, minWidth: 50, maxWidth: 500,
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

        id: 1, headerName: 'Country Name', field: 'countryName', tooltipField: 'countryName', sortable: true, Width: 150, minWidth: 50, maxWidth: 500,
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
        headerName: 'Country', field: 'countryName', tooltipField: 'countryName', sortable: true, filter: true, Width: 150, minWidth: 50, maxWidth: 500,
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
        headerName: 'State', field: 'stateName', tooltipField: 'stateName', sortable: true, filter: true, editable: false, Width: 150, minWidth: 50, maxWidth: 500,
        cellStyle: function (params) {
          if (params.value === '') {
            return { outline: '1px solid red' };

          } else {
            return { outline: 'white' };
          }
        }

      },
      { headerName: '', field: 'hidden', hide: true },
      { headerName: '', field: 'stateID', hide: true }
      { headerName: 'Description', field: 'description', tooltipField: 'description', sortable: true, filter: true, editable: false, Width: 150, minWidth: 50, maxWidth: 500, },


    ];
    this.defaultColDef = { resizable: true };
    this.rowData1;



    this.columnDefs2 = [

      {
        headerName: 'Country', field: 'countryName', tooltipField: 'countryName', sortable: true, editable: false, filter: true, Width: 150, minWidth: 50, maxWidth: 500,

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
        headerName: 'State', field: 'stateName', tooltipField: 'stateName', sortable: true, filter: true, editable: false, Width: 150, minWidth: 50, maxWidth: 500,

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
        headerName: 'City', field: 'cityName', tooltipField: 'cityName', sortable: true, filter: true, editable: false, singleClickEdit: true, Width: 250, minWidth: 50, maxWidth: 500,


        cellStyle: function (params) {
          if (params.value === '') {

            return { outline: '1px solid red' };


          } else {
            return { outline: 'white' };
          }
        }

      },

      { headerName: 'Description', field: 'description', tooltipField: 'description', sortable: true, filter: true, editable: false, Width: 150, minWidth: 50, maxWidth: 500, },



      { headerName: '', field: 'hidden', hide: true, }
    ];
    this.defaultColDef = { resizable: true };
    this.rowData2;

    this.columnDefs3 = [

      {
        headerName: 'Country', field: 'countryName', tooltipField: 'countryName',  sortable: true, editable: false, filter: true, Width: 150, minWidth: 50, maxWidth: 500,
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
        headerName: 'State', field: 'stateName',  tooltipField: 'stateName', sortable: true, filter: true, editable: false, Width: 150, minWidth: 50, maxWidth: 500,
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
        headerName: 'City', field: 'cityName',  tooltipField: 'cityName', sortable: true, filter: true, editable: false, Width: 150, minWidth: 50, maxWidth: 500,
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
        headerName: 'Postal Code', field: 'postalCode', tooltipField: 'postalCode', sortable: true, filter: true, editable: false, Width: 150, minWidth: 50, maxWidth: 500,
        cellStyle: function (params) {
          if (params.value === '') {
            return { outline: '1px solid red' };
          } else {
            return { outline: 'white' };
          }
        }

      },

      { headerName: 'Description', field: 'description',  tooltipField: 'description', sortable: true, filter: true, Width: 150, minWidth: 50, maxWidth: 500, editable: false },
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
    this.addCountryToggleButton = true;
    this.saveCountryToggleButton = true;
    this.deleteCountryToggleButton = true;

    this.saveUpdateState = 'Save';
    this.addStateToggleButton = false;
    this.saveStateToggleButton = true;
    this.deleteStateToggleButton = true;

    this.saveUpdateCity = 'Save';
    this.addCityToggleButton = true;
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
    let res = this.stateApi.updateRowData({ add: [{ stateName: this.newDataTest['stateName'], countryName: this.newDataTest['countryName'], description: this.newDataTest['description'], hidden: 'hidden', stateID: this.newDataTest['stateID'] }], addIndex: event.rowIndex });
    this.rowNodeIndex = event.rowIndex;
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
    this.gridOptions = params.gridOptions;
    params.api.sizeColumnsToFit();
  }

  onStateCellValueChanged(params) {
    const cell = this.stateApi.getFocusedCell() + '';
    const selectedNodes = this.stateApi.getSelectedNodes();
    const selectedData = selectedNodes.map(node => node.data);
    var dataTest: Object;
    selectedData.map(node => dataTest = node as Object);
    this.stateArray.forEach(data => {
      if (dataTest['stateID'] === data['stateID']) {
        const stateBody = new StateBody();
        stateBody.userId = '1';
        stateBody.stateID = dataTest['stateID'];
        console.log("Cellsed", cell);
        if (cell.includes('countryName')) {
          stateBody.stateName = dataTest['stateName'];
          stateBody.description = dataTest['description'];
          stateBody.countryId = this.selectedCountryId + '';
          var newposition = (dataTest['stateID'].replace(/STATE/g, '')) - 1;
          this.stateArray.splice(newposition, 1, stateBody);
        } else if (cell.includes('stateName')) {
          stateBody.countryId = this.selectedCountryId + '';
          stateBody.description = dataTest['description'];
          stateBody.stateName = dataTest['stateName'];
          var newposition = (dataTest['stateID'].replace(/STATE/g, '')) - 1;
          this.stateArray.splice(newposition, 1, stateBody);
        } else if (cell.includes('description')) {
          stateBody.countryId = this.selectedCountryId + '';
          stateBody.stateName = dataTest['stateName'];
          stateBody.description = dataTest['description'];
          var newposition = (dataTest['stateID'].replace(/STATE/g, '')) - 1;
          this.stateArray.splice(newposition, 1, stateBody);
        }
        console.log(JSON.stringify(this.stateArray));
      }
    });
  }

  addStateCount = 0;
  onAddStatebyButton() {

    this.addStateCount++;

    // this.editDepartment = false;
    this.nodeStateSelect = 'Add';
    this.saveUpdateState = 'Save';

    var res = this.stateApi.updateRowData({
      add: [{ countryName: '', stateName: '', description: '', hidden: 'hidden', stateID: 'STATE' + this.addStateCount }],
      addIndex: 0
    });

    const stateBody = new StateBody();
    stateBody.stateID = 'STATE' + this.addStateCount;
    stateBody.stateName = '';
    stateBody.description = '';
    stateBody.countryId = '';
    stateBody.userId = '1';
    console.log(stateBody);
    this.stateArray.push(stateBody);
  }

  getStates() {
    const universalBody = new UniversalBody();
    universalBody.userID = '1';
    this.allWeb.getStates(universalBody)
      .subscribe(
        data => {
          this.getStateResponse = data;



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
    var output: string = "";
    selectedData.map(node => dataTest = node as Object);
    if (selectedData.length === 0) {
      alert('Please select a row');
    }
    else {
      var jsonData = JSON.stringify(this.stateArray);
      jsonData = jsonData.replace(/"/g, "'");
      universalJsonBody.jsonData = jsonData;
      this.allWeb.saveState(universalJsonBody)
        .subscribe(
          data => {
            this.stateArray = [];
            this.universalResponse = data;
            this.getStates();
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

          }
        );

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

 

  onSaveUpdateState() {
    this.stateApi.tabToNextCell();
    alert(this.saveUpdateState);
    if (this.saveUpdateState === "Save") {

      this.onSaveState();
    }
    else {
      this.onUpdateState();
    }
    this.addStateToggleButton = false;
  }

  onUpdateState() {
    const universalJsonBody = new UniversalJsonBody();
    const updateStateBody = new StateBody();
    const selectedNodes = this.stateApi.getSelectedNodes();
    const selectedData = selectedNodes.map(node => node.data);
    var dataTest: Object;
    selectedData.map(node => dataTest = node as Object);
    if (selectedData.length === 0) {
      alert('Please select a row');
    }

    if (dataTest['stateName'] === '') {
      alert('Enter state name');
      this.addStateToggleButton = true;
    }
    else {
      for (let selectedNode of selectedData) {
        updateStateBody.stateName = selectedNode['stateName'];
        updateStateBody.description = selectedNode['description'];
        updateStateBody.countryId = this.selectedCountryId + '';
        updateStateBody.stateID = selectedNode['stateID'];
        updateStateBody.userId="1";
        this.stateArray.push(updateStateBody);
      }
      var jsonData = JSON.stringify(this.stateArray);
      jsonData = jsonData.replace(/"/g, "'");
      universalJsonBody.jsonData=jsonData;
      this.allWeb.updateState(universalJsonBody)
        .subscribe(
          data => {
            this.getStates();
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
    universalBody.userID = '1';

    this.isShowing = true;
    this.allWeb.getCity(universalBody)
      .subscribe(
        data => {
          this.isShowing = false;
          this.getCityResponse = data;

          if (this.getCityResponse.length === 0) {

            //this.TotalCity = this.getCityResponse.length;
            this.saveUpdateCity = "Save";

            this.addCityToggleButton = false;
            this.saveCityToggleButton = true;
            this.deleteCityToggleButton = true;
            this.selectAllCity = true;
          } else {
            this.isShowing = false;

            if (this.getCityResponse.length >= 50) {
              this.ShowLimitedCity = 50;
              this.ShowCity = 1;
            } else {
              this.ShowLimitedCity = this.getCityResponse.length;
              this.ShowCity = 1;
            }

            this.TotalCity = this.getCityResponse.length;
            this.saveUpdateCity = "Save";
            this.selectAllCity = false;
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
          const countryBody = new CountryBody();
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

              if (this.universalResponse.OUTPUT === '') {
                this.getCountries();
                alert(this.universalResponse.MESSAGE);
              } else {
                alert(this.universalResponse.OUTPUT + " already exists!");
              }
            }
          );
        this.countryArray = [];
        this.universalResponse.OUTPUT = '';
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
      this.saveCountryToggleButton = false;
      this.saveUpdateCountry = 'Update';

    } else {
      this.api.deselectAll();
      this.countryFilter = false;
      this.countryCheckedStatus = false;
      this.deleteCountryToggleButton = true;
      this.saveCountryToggleButton = true;
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
    this.cityApi.tabToNextCell();
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
      }
    }
  }

  onAddPostal() {
    this.savePostalToggleButton = false;
    this.saveUpdatePostal = 'Save';
    this.nodePostalSelect = 'Add';

    this.postalApi.setFocusedCell(this.countPostal, 'countryName');
    this.postalApi.getColumnDef('postalCode').editable = true;
    this.postalApi.getColumnDef('description').editable = true;
    this.countPostal++;

    var res = this.postalApi.updateRowData({
      add: [{ cityName: '', stateName: '', countryName: '', postalCode: '', description: '', hidden: 'hidden' }],
      addIndex: 0
    });

    const postalBody = new PostalBody();

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
    var universalResponse: UniversalResponse;

    const selectedNodes = this.api.getSelectedNodes();
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
        if (deleteCountryBody.countryId === undefined) {
          this.api.updateRowData({ remove: selectedData })
        } else {
          deleteCountryBody.userId = '1';
          this.deleteArrayCountry.push(deleteCountryBody);
        }
      }

      var jsonData = JSON.stringify(this.deleteArrayCountry);
      jsonData = jsonData.replace(/"/g, "'");

      this.isShowing = true;
      universalJsonBody.jsonData = jsonData;
      console.log("universal json body : ", universalJsonBody);
      this.allWeb.deleteCountry(universalJsonBody)
        .subscribe(
          data => {
            this.isShowing = false;
            universalResponse = data;
            console.log("universal response : ", universalResponse);
            if (universalResponse.OUTPUT === '') {
              alert(universalResponse.MESSAGE);
              this.api.removeItems(selectedNodes);
              this.addCountryToggleButton = false;
              this.getCountries();
            }
            else {
              alert(universalResponse.OUTPUT);
            }
            this.deleteArrayCountry = [];
          }
        );
    }
    this.addCountryToggleButton = false;
    this.saveCountryToggleButton = true;
    this.deleteCountryToggleButton = true;

  }

  onDeleteCity() {

    const selectedNodes = this.cityApi.getSelectedNodes();
    var deleteCityArray: DeleteCityBody[] = [];
    // var universlResponse = new UniversalResponse();
    const universalJsonBody = new UniversalJsonBody();
    const selectedData = selectedNodes.map(node => node.data);
    var dataTest: Object;
    var output: string = "";
    var count = 0;

    selectedData.map(node => dataTest = node as Object);
    if (selectedData.length === 0) {
      alert("Please select a row");
    }
    else {

      for (let selectedNode of selectedData) {
        const deleteCityBody = new DeleteCityBody();
        deleteCityBody.cityId = selectedNode['cityID'];
        if (deleteCityBody.cityId === undefined) {
          this.cityApi.updateRowData({ remove: selectedData });
        } else {
          deleteCityBody.userId = '1';
          deleteCityArray.push(deleteCityBody);
          var jsonData = JSON.stringify(deleteCityArray);
        }

        //  // if(deleteCityBody.cityId === 'undefine')
        //   deleteCityArray.push(deleteCityBody);

      }

      var jsonData1 = JSON.stringify(deleteCityArray);
      jsonData1 = jsonData1.replace(/"/g, "'");

      universalJsonBody.jsonData = jsonData1;
      if (deleteCityArray.length === 0) {
        this.cityFilter = false;
      }
      else {
        this.allWeb.deleteCity(universalJsonBody)
          .subscribe(
            data => {
              // universlResponse = data;

              // if (universlResponse.STATUS.trim() === 'Success') {
              //   if(universlResponse.OUTPUT != '') {
              //     var names:string[] = universlResponse.OUTPUT.split(",");         
              //     for(var i = 0;i<names.length-1;i++) { 
              //       output += names[i]+"\n";
              //     }
              //      alert(output);   
              //   }else{
              //     alert(universlResponse.MESSAGE);
              //     this.getCity();
              //     this.cityApi.removeItems(selectedNodes);
              //   }
              // }

              this.universalResponse = data;
              if (this.universalResponse.STATUS === 'Success') {
                if (this.universalResponse.OUTPUT != '') {
                  var names: string[] = this.universalResponse.OUTPUT.split(",");
                  for (var i = 0; i < names.length - 1; i++) {
                    output += names[i] + "\n";
                    count++;
                  }
                  alert(output);
                } else if (deleteCityArray.length === count) {
                  alert(this.universalResponse.MESSAGE);
                  this.getCity();
                  this.cityApi.removeItems(selectedNodes);
                }
              }
              // alert(universlResponse.MESSAGE);
              // if (universlResponse.STATUS === 'Success') {

              //   this.cityApi.removeItems(selectedNodes);
              //   deleteCityArray = [];
              //   this.getCity();
              //   this.cityFilter = false;
              // }
            }
          );
      }
    }

    // this.cityApi.removeItems(selectedNodes);
    // this.addCityToggleButton = false;
    // this.saveCityToggleButton = true;
    // this.deleteCityToggleButton = true;

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
    var universalResponse: UniversalResponse;

    if (this.selectedRowCountry === undefined) {
      alert('Please enter input valid data then hit update')
    }
    else {
      const universalJsonBody = new UniversalJsonBody();

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

          for (let selectedNode of selectedData) {
            const updateCountryBody = new UpdateCountryBody();
            updateCountryBody.countryId = selectedNode['countryID'];
            console.log("country ID", selectedNode['countryID']);
            updateCountryBody.countryCode = selectedNode['countryCode'];
            updateCountryBody.countryName = selectedNode['countryName'];
            this.updateArrayCountry.push(updateCountryBody);
            var jsonData = JSON.stringify(this.updateArrayCountry);
          }
          jsonData = jsonData.replace(/"/g, "'");

          universalJsonBody.jsonData = jsonData;
          console.log("in update json", universalJsonBody);
          this.isShowing = true;
          this.allWeb.updateCountry(universalJsonBody)
            .subscribe(
              data => {
                this.isShowing = false;
                this.universalResponse = data;
                if (this.universalResponse.OUTPUT === '') {
                  alert(this.universalResponse.MESSAGE);
                  this.getCountries();
                  this.addCountryToggleButton = false;
                }
                else {
                  alert(this.universalResponse.OUTPUT + " already exists");
                }
              }
            );
          this.updateArrayCountry = [];
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
    this.rowSelection = 'multiple';
    // const selectedNodes = this.postalApi.getSelectedNodes();
    // const selectedData = selectedNodes.map(node => node.data);
    // var dataTest: Object;
    // selectedData.map(node => dataTest = node as Object);
    // this.postalApi.stopEditing();

    if (this.selectedRowPostal.length === 1) {
      if (this.getPostalResponse.length === 1) {
        this.deletePostalToggleButton = false;
        this.postalFilter = true;
        this.postalCheckedStatus = false;
        this.addPostalToggleButton = false;
      }
      else {
        this.deletePostalToggleButton = false;
        this.postalFilter = false;
        this.postalCheckedStatus = false;
        this.addPostalToggleButton = false;

      }
      if (this.nodePostalSelect === 'Add') {
        this.saveUpdatePostal = 'Save';
        this.nodePostalSelect = 'Update';
        this.btnSaveUpdateAddressPopup = 'SAVE';
        this.saveUpdateAddressPopup = 'Do you want to save?';
      }
      else if (this.nodePostalSelect === undefined) {
        this.saveUpdatePostal = 'Update';
        this.savePostalToggleButton = false;
        this.btnSaveUpdateAddressPopup = 'UPDATE';
        this.saveUpdateAddressPopup = 'Do you want to update?';
      }
      else if (this.nodePostalSelect === 'Update') {
        this.savePostalToggleButton = false;
        this.saveUpdatePostal = 'Update';
        this.btnSaveUpdateAddressPopup = 'UPDATE';
        this.saveUpdateAddressPopup = 'Do you want to update?';
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
  public selectedCityId: number;

  onSaveCity() {
    const universalJsonBody = new UniversalJsonBody();

    const selectedNodes = this.cityApi.getSelectedNodes();
    var output: string = '';

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
        this.isShowing = true;
        this.allWeb.saveCity(universalJsonBody)
          .subscribe(

            data => {
              this.isShowing = false;
              this.universalResponse = data;

              if (this.universalResponse.STATUS.trim() === 'Success') {
                if (this.universalResponse.OUTPUT != '') {
                  var names: string[] = this.universalResponse.OUTPUT.split(",");
                  for (var i = 0; i < names.length - 1; i++) {
                    output += names[i] + "\n";
                  }
                  alert(output);
                } else {
                  alert(this.universalResponse.MESSAGE);
                  this.getCity();

                }
              }



              // if (this.universalResponse.STATUS.trim() === 'Success') {
              //   if (this.cityArray.length >= 1) {
              //     if (this.universalResponse.OUTPUT === '') {
              //       alert(this.universalResponse.MESSAGE);
              //       this.getCity();
              //     }
              //     else {
              //       alert(this.universalResponse.MESSAGE + ' ' + this.universalResponse.OUTPUT + ' ' + 'already existed ');
              //     }
              //   }
              //   else {
              //     if (this.universalResponse.OUTPUT === '') {
              //       alert(this.universalResponse.MESSAGE);
              //       this.getCity();
              //     }
              //     else {
              //       alert(this.universalResponse.MESSAGE + ' ' + this.universalResponse.OUTPUT + ' ' + 'already existed');
              //     }
              //   }


              //}


            }
          );
      }
    }
    this.cityArray = [];
    //  alert(this.cityArray.length);
    this.nodeCitySelect = 'Update'
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
        this.saveCityToggleButton = false;
      }
      else {
        this.deleteCityToggleButton = false;
        this.cityFilter = false;
        this.cityCheckedStatus = false;
        this.saveCityToggleButton = false;
      }
      if (this.nodeCitySelect === 'Add') {
        this.saveUpdateCity = 'Save';
        // this.nodeCitySelect = 'Edit';
        this.saveUpdateAddressPopup = 'Do you want to save?';
        this.btnSaveUpdateAddressPopup = 'SAVE';

      } else if (this.nodeCitySelect === undefined) {
        this.saveUpdateCity = 'Save';
        this.saveCityToggleButton = false;
        this.saveUpdateAddressPopup = 'Do you want to update?';
        this.btnSaveUpdateAddressPopup = 'UPDATE';
      }
      else if (this.nodeCitySelect === 'Update') {
        this.saveCityToggleButton = false;
        this.saveUpdateCity = 'Save';
        this.btnSaveUpdateAddressPopup = 'UPDATE';
        this.saveUpdateAddressPopup = 'Do you want to update?';
      }
    }
    else if (this.selectedRowCity.length >= 1) {
      this.saveCityToggleButton = false;
      this.deleteCityToggleButton = false;
      this.addCityToggleButton = false;
    }
  }

  onSaveUpdateCity() {
    this.cityApi.tabToNextCell();
    if (this.nodeCitySelect === "Add") {
      this.onSaveCity();
    }
    else {

      this.onUpdateCity();
    }
    // this.addPostalToggleButton = false;
  }

  onUpdateCity() {
    this.cityArray = [];
    const universalJsonBody = new UniversalJsonBody();

    const selectedNodes = this.cityApi.getSelectedNodes();

    const selectedData = selectedNodes.map(node => node.data);
    var dataTest: Object;
    var output: string = '';
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
          // updateCityBody.StateID = this.selectedStateId
          cityBody.cityId = selectedNode['cityID'];
          // cityBody.cityId = selectedNode['cityID'];
          this.cityArray.push(cityBody);
          var jsonData = JSON.stringify(this.cityArray);
          jsonData = jsonData.replace(/"/g, "'");
          console.log('jsondata:   ' + jsonData);
        }
        universalJsonBody.jsonData = jsonData;
        this.isShowing = true;
        this.allWeb.updateCity(universalJsonBody)
          .subscribe(

            data => {
              this.isShowing = false;
              this.universalResponse = data;

              if (this.universalResponse.STATUS.trim() === 'Success') {
                if (this.universalResponse.OUTPUT != '') {
                  var names: string[] = this.universalResponse.OUTPUT.split(",");
                  for (var i = 0; i < names.length - 1; i++) {
                    output += names[i] + "\n";
                  }
                  alert(output);
                } else {
                  alert(this.universalResponse.MESSAGE);
                  this.getCity();

                }
              }

              // if (this.universalResponse.STATUS.trim() === 'Success') {
              //   if (this.cityArray.length >= 1) {
              //     if (this.universalResponse.OUTPUT === '') {
              //       alert(this.universalResponse.MESSAGE);
              //       this.getCity();
              //     }
              //     else {
              //       alert(this.universalResponse.MESSAGE + ' ' + this.universalResponse.OUTPUT + ' ' + 'already existed ');
              //     }
              //   }
              //   else {
              //     if (this.universalResponse.OUTPUT === '') {
              //       alert(this.universalResponse.MESSAGE);
              //       this.getCity();
              //     }
              //     else {
              //       alert(this.universalResponse.MESSAGE + ' ' + this.universalResponse.OUTPUT + ' ' + 'already existed');
              //     }
              //   }


              // }


            }
          );
      }
    }
    this.cityArray = [];
    // alert(this.cityArray.length);
    this.nodeCitySelect = 'Update'

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
        this.addCountryToggleButton = false;
      }

      else {
        this.deleteCountryToggleButton = false;
        this.countryFilter = false;
        this.countryCheckedStatus = false;
        this.addCountryToggleButton = false;
      }
      if (this.cityApi.getDisplayedRowCount() >= 1) {
        this.countryFilter = false;
      }
      if (this.nodeCountrySelect === "Add") {
        this.saveUpdateCountry = "Save";
        this.nodeCountrySelect = "Update";
        this.btnSaveUpdateAddressPopup = 'SAVE';
        this.saveUpdateAddressPopup = 'Do you want to save?';
      } else if (this.nodeCountrySelect === undefined) {
        this.saveUpdateCountry = "Update";
        this.saveCountryToggleButton = false;
        this.btnSaveUpdateAddressPopup = 'UPDATE';
        this.saveUpdateAddressPopup = 'Do you want to update?';
      }
      else if (this.nodeCountrySelect === 'Update') {
        this.saveCountryToggleButton = false;
        this.saveUpdateCountry = 'Update';
        this.btnSaveUpdateAddressPopup = 'UPDATE';
        this.saveUpdateAddressPopup = 'Do you want to update?';
      }
    }
    else if (this.selectedRowCountry.length >= 1) {
      this.saveCountryToggleButton = false;

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
    this.saveCountryToggleButton = true;
    this.addCountryToggleButton = true;
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
          }
          else {

            this.selectAllCountryToggle = false;

            this.StartCountryNumber = 1;
            this.EndCountryNumber = this.countryDataResponse.length;
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




