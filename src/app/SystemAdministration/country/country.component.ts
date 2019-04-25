import { Component, OnInit } from '@angular/core';
import { GridApi, ColumnApi, GridOptions, } from 'ag-grid-community';

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

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.css']
})

export class CountryComponent implements OnInit {
  columnDefs1; rowData1;
  type: string = '';
  gridOptions = {} as GridOptions;
  public selectedCountryId: number;
  constructor(private allWeb: AllWeb) {
    this.gridOptions = {
      context: { componentParent: this }
    };
    this.rowSelection = 'single';
    this.editType = 'fullRow';
    this.columnDefs1 = [
      {
        headerName: 'Country', field: 'countryName', sortable: true, filter: true, width: 110,
        cellRendererSelector: function (params) {
          var locationDetails = {
            component: 'locationFramework',
            params: { value: 'country' }
          };
          if (params.data.stateName === '')
            return locationDetails;
          else

            // if (params.data.stateName.length > 0)
            //   return locationDetails;
            // else
            return null;

        }

      },
      {
        headerName: 'State', field: 'stateName', sortable: true, filter: true, editable: true, width: 120,
        cellStyle: function (params) {
          if (params.value === '') {
            return { outline: '1px solid red' };

          } else {
            return { outline: 'white' };
          }
        }

      },
      { headerName: 'Description', field: 'description', sortable: true, filter: true, width: 150, editable: true },

      { headerName: '', field: '', width: 512, }
    ];

    this.rowData1;

  }
  frameworkComponents = {
    locationFramework: LocationDropdownComponent
  };
  createKey: any;
  api;
  columnApi;


  countryToggleButton = false;
  StateToggleButton = false;
  cityToggleButton = false;
  postalToggleButton = false;

  stateApi: GridApi;
  stateColumnApi: ColumnApi;

  cityApi: GridApi;
  cityColumnApi: ColumnApi

  postalApi: GridApi;
  postalColomnApi: ColumnApi;

  universalResponse: UniversalResponse;
  countryDataResponse: GetCountryResponse;
  getStateResponse: GetStateResponse;
  getCityResponse: GetCityResponse
  getPostalResponse: GetPostalResponse;

  rowSelection: string;
  rowDeselection: string
  private editType;

  columnDefs = [
    {
      id: 0, headerName: 'Country Code', field: 'countryCode', sortable: true, filter: true, width: 120, editable: true,
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

      id: 1, headerName: 'Country Name', field: 'countryName', sortable: true,
      filter: true, width: 120, editable: true,
      cellStyle: function (params) {

        if (params.value === '') {
          return { outline: '1px solid red' };
        } else {
          return { outline: 'white' };
        }

      }
    },

    { headerName: '', field: '', width: 652, }
  ];

  rowData;



  columnDefs2 = [

    {
      headerName: 'Country', field: 'countryName', sortable: true, editable: true, filter: true, width: 110, //singleClickEdit: true,

      cellRendererFramework: LocationDropdownComponent,
      cellRendererParams: {
        value: 'country'
      }
    },
    {
      headerName: 'State', field: 'stateName', sortable: true, filter: true, editable: true, width: 120, //singleClickEdit: true,

      cellRendererFramework: LocationDropdownComponent,
      cellRendererParams: {
        value: 'state'
      }
    },
    {
      headerName: 'City', field: 'cityName', sortable: true, filter: true, editable: true, width: 120, singleClickEdit: true,


      cellStyle: function (params) {
        if (params.value === '') {

          return { outline: '1px solid red' };


        } else {
          return { outline: 'white' };
        }
      }

    },

    { headerName: 'Description', field: 'description', sortable: true, filter: true, width: 150, editable: true },


    { headerName: '', field: '', width: 392, }
  ];

  rowData2;

  columnDefs3 = [

    {
      headerName: 'Country', field: 'countryName', sortable: true, editable: true, filter: true, width: 120,
      cellRendererFramework: LocationDropdownComponent,
      cellRendererParams: {
        value: 'country'
      }
    },
    {
      headerName: 'State', field: 'stateName', sortable: true, filter: true, editable: true, width: 120,
      cellRendererFramework: LocationDropdownComponent,
      cellRendererParams: {
        value: 'state'
      }

    },
    {
      headerName: 'City', field: 'cityName', sortable: true, filter: true, editable: true, width: 120,
      cellRendererFramework: LocationDropdownComponent,
      cellRendererParams: {
        value: 'city'
      }

    },
    {
      headerName: 'Postal Code', field: 'postalCode', sortable: true, filter: true, editable: true, width: 120,
      cellStyle: function (params) {
        if (params.value === '') {
          return { outline: '1px solid red' };
        } else {
          return { outline: 'white' };
        }
      }

    },

    { headerName: 'Description', field: 'description', sortable: true, filter: true, width: 150, editable: true },
  ];

  rowData3;

  columnDefs4 = [
    { headerName: 'Department', field: 'department', sortable: true, filter: true, editable: true, width: 500 },
    { headerName: 'Designation', field: 'designation', sortable: true, filter: true, editable: true, width: 500 },
  ];

  rowData4 = [
    { department: 'IT', designation: 'Software Developer' },
    { department: 'Finance', designation: 'Software Developer' },
    { department: 'AX', designation: 'AX Technical' },
    { department: 'Medical', designation: 'Doctor' },
    { department: 'Accounts', designation: 'Accountant' }
  ];

  columnDefs5 = [
    { headerName: 'Language', field: 'language', sortable: true, filter: true, editable: true, width: 120 },
    { headerName: 'Language Code', field: 'languageCode', sortable: true, editable: true, filter: true, width: 120 },
  ];

  rowData5 = [
    { language: 'English', languageCode: '001' },
    { language: 'Hindi', languageCode: '002' },
    { language: 'Urdu', languageCode: '003' },
    { language: 'Arabic', languageCode: '004' },
    { language: 'French', languageCode: '005' }
  ];

  public show = false;
  public hide = true;
  public buttonName: any = 'Add New';
  colDef: string;
  countCountry = 0;
  countState = 0;
  countCity = 0;
  countPostal = 0;
  universalBody = new UniversalBody();
  getContext() {
    return {
      createKey: this.createKey
    };
  }
  ngOnInit() {
    this.getCountries();
    this.getStates();
    

    this.getCity();
    this.getPostal();

  }
  onStateSelectionChanged(event) {
    const selectedNodes = this.stateApi.getSelectedNodes();
    const selectedData = selectedNodes.map(node => node.data);
    var dataTest: Object;
    selectedData.map(node => dataTest = node as Object);
    console.log('dataTest: ');
  }
  getStates() {
    this.allWeb.getStates(this.universalBody)
      .subscribe(
        data => {
          this.getStateResponse = data;
          this.rowData1 = this.getStateResponse;
        }
      );
  }
  updateData(event, value) {
    if (value === 'country') {
      this.selectedCountryId = event;
      console.log('getted', event);
    }
  }
  getCity() {
    this.allWeb.getCity(this.universalBody)
      .subscribe(
        data => {
          this.getCityResponse = data;
          this.rowData2 = this.getCityResponse;

        }
      );
  }
  getPostal() {
    this.allWeb.getPostal(this.universalBody)
      .subscribe(
        data => {
          this.getPostalResponse = data;
          this.rowData3 = this.getPostalResponse;
        }
      );

  }

  onAddContry() {

    this.api.setFocusedCell(this.countCountry, 'countryCode');
    this.countCountry++;
    var res = this.api.updateRowData({
      add: [{ countryName: '', countryCode: '' }],
      addIndex: 0
    });
    this.countryToggleButton = true;
  }

  onAddState() {
    this.type = 'add';

    this.stateApi.setFocusedCell(this.countState, 'countryName');
    this.countState++;
    let res = this.stateApi.updateRowData({ add: [{ stateName: '', countryName: '', description: '' }], addIndex: 0 });

    res.add.forEach(function (rowNode) {

      console.log('Added Row Node', rowNode);
    });
    this.StateToggleButton = true;

  }

  onAddCity() {
    this.cityApi.setFocusedCell(this.countCity, 'countryName');
    this.countCity++;
    let res = this.cityApi.updateRowData({ add: [{ stateName: '', cityName: '', countryName: '', description: '' }], addIndex: 0 });
    res.add.forEach(function (rowNode) {
      console.log('Added Row Node', rowNode);
    });
    this.cityToggleButton = true;

  }
  onAddPostal() {
    this.postalApi.setFocusedCell(this.countPostal, 'countryName');
    this.countPostal++;

    let res = this.postalApi.updateRowData({ add: [{ cityName: '', stateName: '', countryName: '', postalCode: '', description: '' }], addIndex: 0 });
    res.add.forEach(function (rowNode) {
      console.log('Added Row Node', rowNode);
    });
    this.postalToggleButton = true;

  }

  onDeleteCountry() {
    //alert("delete");
    let i: number;
    const selectedNodes = this.api.getSelectedNodes();

    const deleteCountryBody = new DeleteCountryBody();
    const selectedData = selectedNodes.map(node => node.data);
    var dataTest: Object;
    selectedData.map(node => dataTest = node as Object);
    if (selectedData.length === 0) {
      alert("Please select a row");
    }

    let l = this.api.getDisplayedRowCount();

    for (i = 0; i < l; i++) {
      if (this.countryDataResponse[i].countryCode === dataTest['countryCode']) {

        deleteCountryBody.CountryID = this.countryDataResponse[i].countryID;
        this.allWeb.deleteCountry(deleteCountryBody)
          .subscribe(
            data => {
              this.universalResponse = data;

              if (this.universalResponse.STATUS === 'Success') {
                alert(this.universalResponse.MESSAGE);
                var res = this.api.updateRowData({ remove: selectedData });
              }
            }

          );

      }
    }


  }
  onDeleteState() {
    //alert("delete");
    let i: number;
    const selectedNodes = this.stateApi.getSelectedNodes();

    const delteStateBody = new DeleteStateBody();
    const selectedData = selectedNodes.map(node => node.data);
    var dataTest: Object;
    selectedData.map(node => dataTest = node as Object);
    if (selectedData.length === 0) {
      alert("Please select a row");
    }

    let l = this.stateApi.getDisplayedRowCount();

    for (i = 0; i < l; i++) {
      if (this.getStateResponse[i].stateName === dataTest['stateName']) {

        delteStateBody.StateID = this.getStateResponse[i].stateID;
        this.allWeb.deleteState(delteStateBody)
          .subscribe(
            data => {
              alert("delete");
              this.universalResponse = data;

              alert(this.universalResponse.MESSAGE);
              if (this.universalResponse.STATUS === 'Success') {
                var res = this.stateApi.updateRowData({ remove: selectedData });
              }
            }

          );

      }
    }

  }
  onDeleteCity() {
    //alert("delete");
    let i: number;
    const selectedNodes = this.cityApi.getSelectedNodes();

    const deleteCityBody = new DeleteCityBody();
    const selectedData = selectedNodes.map(node => node.data);
    var dataTest: Object;
    selectedData.map(node => dataTest = node as Object);
    if (selectedData.length === 0) {
      alert("Please select a row");
    }

    let l = this.cityApi.getDisplayedRowCount();

    for (i = 0; i < l; i++) {
      if (this.getCityResponse[i].cityName === dataTest['cityName']) {

        deleteCityBody.CityID = this.getCityResponse[i].cityID;
        this.allWeb.deleteCity(deleteCityBody)
          .subscribe(
            data => {
              alert("delete");
              this.universalResponse = data;

              alert(this.universalResponse.MESSAGE);
              if (this.universalResponse.STATUS === 'Success') {
                var res = this.cityApi.updateRowData({ remove: selectedData });
              }
            }

          );

      }
    }

  }
  onDeletePostal() {
    let i: number;
    const selectedNodes = this.postalApi.getSelectedNodes();

    const deletePostalBody = new DeletePostalBody();
    const selectedData = selectedNodes.map(node => node.data);
    var dataTest: Object;
    selectedData.map(node => dataTest = node as Object);
    if (selectedData.length === 0) {
      alert("Please select a row");
    }
    let l = this.postalApi.getDisplayedRowCount();


    for (i = 0; i < l; i++) {
      if (this.getPostalResponse[i].postalCode === dataTest['postalCode']) {

        deletePostalBody.pid = this.getPostalResponse[i].pID;
        this.allWeb.deletePostal(deletePostalBody)
          .subscribe(
            data => {
              alert("delete");
              this.universalResponse = data;
              alert(this.universalResponse.MESSAGE);
              if (this.universalResponse.STATUS === 'Success') {
                var res = this.postalApi.updateRowData({ remove: selectedData });
              }
            }

          );
      }
    }


  }

  onSaveCountry() {
    const countryBody = new CountryBody();
    const universalBody = new UniversalBody();
    const selectedNodes = this.api.getSelectedNodes();
    let countryArray: CountryBody[];
    const selectedData = selectedNodes.map(node => node.data);
    var dataTest: Object;
    selectedData.map(node => dataTest = node as Object);
    if (selectedData.length === 0) {
      alert("Please select a row");
    } else {
      countryBody.CountryCode = dataTest['countryCode'];
      countryBody.CountryName = dataTest['countryName'];
      countryArray.push(countryBody);
      console.log('countryArray:  ' + countryArray);
      if (dataTest['countryCode'] === '') {
        alert("Enter country code");
      } else if (dataTest['countryName'] === '') {
        alert("Enter country name");
      } else {
        this.allWeb.saveCountry(countryBody)
          .subscribe(
            data => {
              this.universalResponse = data;

              alert(this.universalResponse.MESSAGE);

              if (this.universalResponse.STATUS === 'Success') {

                this.getCountries();

              }
            }


          );

      }
    }

  }

  onSaveState() {

    const stateBody = new StateBody();
    const universalBody = new UniversalBody();
    const selectedNodes = this.stateApi.getSelectedNodes();

    const selectedData = selectedNodes.map(node => node.data);
    var dataTest: Object;
    selectedData.map(node => dataTest = node as Object);
    if (selectedData.length === 0) {
      alert("Please select a row");
    }
    stateBody.StateName = dataTest['stateName'];
    stateBody.Description = dataTest['description'];
    stateBody.CountryID = this.selectedCountryId;
    if (dataTest['stateName'] === '') {
      alert("Enter state name");
      this.StateToggleButton = true;
    }
    else {

      this.StateToggleButton = false;
      this.allWeb.saveState(stateBody)
        .subscribe(
          data => {
            this.universalResponse = data;

            alert(this.universalResponse.MESSAGE);

            if (this.universalResponse.STATUS === 'Success') {

              this.getStates();

            }
          }

        );
    }


  }
  onSaveCity() {
    const cityBody = new CityBody();
    const universalBody = new UniversalBody();

    const selectedNodes = this.cityApi.getSelectedNodes();

    const selectedData = selectedNodes.map(node => node.data);
    var dataTest: Object;
    selectedData.map(node => dataTest = node as Object);
    if (selectedData.length === 0) {
      alert("Please select a row");
    }
    cityBody.CityName = dataTest['cityName'];
    cityBody.Description = dataTest['description'];

    if (dataTest['cityName'] === '') {
      alert("Enter city name");

    }
    else {
      this.cityToggleButton = false;
      this.allWeb.saveCity(cityBody)
        .subscribe(
          data => {
            this.universalResponse = data;

            alert(this.universalResponse.MESSAGE);

            if (this.universalResponse.STATUS === 'Success') {

              this.getCity();
              // alert("City Details");
              // this.allWeb.getCity(universalBody)
              //   .subscribe(
              //     data => {
              //       this.getCityResponse = data;
              //       this.rowData2 = this.getCityResponse;

              //     }
              //   )
            }
          }

        );
    }

  }
  onGridReady(params) {
    this.api = params.api;
    this.columnApi = params.columnApi;
  }
  onStateGridReady(params) {
    this.stateApi = params.api;
    this.stateColumnApi = params.columnApi;
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

    const selectedRows = this.api.getSelectedRows();
    let selectedRowsString = '';
    selectedRows.forEach(function (selectedRow, index) {
      if (index !== 0) {
        selectedRowsString += ', ';
      }
      selectedRowsString += selectedRow.athlete;
    });
  }

  onSavePostal() {
    const postalBody = new PostalBody();
    const universalBody = new UniversalBody();
    const selectedNodes = this.postalApi.getSelectedNodes();

    const selectedData = selectedNodes.map(node => node.data);
    var dataTest: Object;
    selectedData.map(node => dataTest = node as Object);
    if (selectedData.length === 0) {
      alert("Please select a row");
    }
    postalBody.postalCode = dataTest['postalCode'];
    postalBody.Description = dataTest['description'];

    if (dataTest['postalCode'] === '') {
      alert("Enter postal code");

    }
    else {
      this.postalToggleButton = false;
      this.allWeb.savePostal(postalBody)
        .subscribe(
          data => {
            this.universalResponse = data;

            alert(this.universalResponse.MESSAGE);

            if (this.universalResponse.STATUS === 'Success') {

              this.getPostal();
              // alert("Postal Details");
              // this.allWeb.getPostal(universalBody)
              //   .subscribe(
              //     data => {
              //       this.getPostalResponse = data;
              //       this.rowData3 = this.getPostalResponse;
              //     }
              //   )
            }

          }

        );
    }

  }
  getCountries() {
    const universalBody = new UniversalBody();
    this.allWeb.getCountries(universalBody)
      .subscribe(
        data => {
          this.countryDataResponse = data;
          this.rowData = this.countryDataResponse;

        }
      )
  }

  onCellKeyDown(e) {

    const keyPressed = e.event.key;

    if (keyPressed === 'Enter') {
      //alert("Enter ");
      let i: number;
      const selectedNodes = this.api.getSelectedNodes();

      const updateCountryBody = new UpdateCountryBody();
      const selectedData = selectedNodes.map(node => node.data);
      var dataTest: Object;
      selectedData.map(node => dataTest = node as Object);
      if (selectedData.length === 0) {
        alert("Please select a row");
      }

      updateCountryBody.CountryCode = dataTest['countryCode'];
      updateCountryBody.CountryName = dataTest['countryName'];

      if (dataTest['countryCode'] === '') {
        alert("Enter country code");

      }
      else if (dataTest['countryName'] === '') {
        alert("Enter country name");

      }
      else {
        let l = this.api.getDisplayedRowCount();

        for (i = 0; i < l; i++) {
          if (this.countryDataResponse[i].countryCode === dataTest['countryCode']) {

            updateCountryBody.CountryID = this.countryDataResponse[i].countryID;
            this.allWeb.updateCountry(updateCountryBody)
              .subscribe(
                data => {
                  this.universalResponse = data;

                  alert(this.universalResponse.MESSAGE);
                  if (this.universalResponse.STATUS === 'Success') {
                    this.getCountries();
                  }
                }

              );

          }
        }

      }
    }

  }
  onCityCellKeyDown(e) {
    const keyPressed = e.event.key;
    if (keyPressed === 'Enter') {
      //alert("Enter ");
      let i: number;
      const selectedNodes = this.cityApi.getSelectedNodes();

      const updateCityBody = new UpdateCityBody();
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
        let l = this.cityApi.getDisplayedRowCount();

        for (i = 0; i < l; i++) {
          if (this.getCityResponse[i].cityName === dataTest['cityName']) {

            updateCityBody.CityID = this.getCityResponse[i].cityID;
            updateCityBody.StateID = this.getCityResponse[i].stateID;
            this.allWeb.updateCity(updateCityBody)
              .subscribe(
                data => {
                  this.universalResponse = data;

                  alert(this.universalResponse.MESSAGE);
                  if (this.universalResponse.STATUS === 'Success') {
                    this.getCity();
                  }
                }

              );
          }
        }
      }
    }
  }
  onStateCellKeyDown(e) {
    const keyPressed = e.event.key;
    if (keyPressed === 'Enter') {
      // alert("Enter ");
      let i: number;
      const selectedNodes = this.stateApi.getSelectedNodes();

      const updateStateBody = new UpdateStateBody();
      const selectedData = selectedNodes.map(node => node.data);
      var dataTest: Object;
      selectedData.map(node => dataTest = node as Object);
      updateStateBody.StateName = dataTest['stateName'];
      updateStateBody.Description = dataTest['description'];
      let l = this.stateApi.getDisplayedRowCount();
      if (dataTest['stateName'] === '') {
        alert("Enter state name");
        this.StateToggleButton = true;
      }
      else {
        for (i = 0; i < l; i++) {
          if (this.getStateResponse[i].stateName === dataTest['stateName']) {

            updateStateBody.StateID = this.getStateResponse[i].stateID;
            updateStateBody.CountryID = this.getStateResponse[i].countryID;
            this.allWeb.updateState(updateStateBody)
              .subscribe(
                data => {

                  this.universalResponse = data;

                  alert(this.universalResponse.MESSAGE);
                  if (this.universalResponse.STATUS === 'Success') {
                    this.getStates();
                  }
                }
              );

          }
        }
      }
    }
  }
  onPostalCellKeyDown(e) {
    const keyPressed = e.event.key;
    if (keyPressed === 'Enter') {
      //alert("Enter ");
      let i: number;
      const selectedNodes = this.postalApi.getSelectedNodes();

      const updatePostalBody = new UpdatePostalBody();
      const selectedData = selectedNodes.map(node => node.data);
      var dataTest: Object;
      selectedData.map(node => dataTest = node as Object);
      if (selectedData.length === 0) {
        alert("Please select a row");
      }
      updatePostalBody.postalCode = dataTest['postalCode'];
      updatePostalBody.Description = dataTest['description'];

      if (dataTest['postalCode'] === '') {
        alert("Enter postal code");

      }
      else {
        let l = this.postalApi.getDisplayedRowCount();


        for (i = 0; i < l; i++) {
          if (this.getPostalResponse[i].postalCode === dataTest['postalCode']) {

            updatePostalBody.pid = this.getPostalResponse[i].pID;
            updatePostalBody.CityID = this.getPostalResponse[i].cityID;
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
    }
  }
}


var countryMappings =
{
  1: "India",
  2: "France",
  3: "England",
  4: "Australia"
};



function extractValues(mappings) {
  return Object.keys(mappings);
}
function lookupValue(mappings, key) {
  return mappings[key];
}
function lookupKey(mappings, name) {
  for (var key in mappings) {
    if (mappings.hasOwnProperty(key)) {
      if (name === mappings[key]) {
        return key;
      }
    }
  }
}
var stateMappings = {
  up: "Uttar Pradesh",
  ap: "Arunachal Pradesh",
  wb: "West Bengal",
  jk: "Jammu & Kashmir",
  ke: "Kerala"
};

var cityMappings = {
  gzb: "Ghaziabad",
  no: "Noida",
  be: "Bengal",
  hy: "Hyderabad",
  se: "Secundrabad"
};


