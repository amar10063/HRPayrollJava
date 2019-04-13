import { Component, OnInit } from '@angular/core';
import { GridApi, ColumnApi, CellComp } from 'ag-grid-community';
import { AllWeb } from 'src/app/WebServices/AllWeb.service';
import { CountryBody } from '../../WebServices/WebServiceBody/CountryBody/CountryBody';
import { UniversalResponse } from '../../WebServices/WebServiceResponse/UniversalResponse';
import { CityBody } from '../../WebServices/WebServiceBody/CountryBody/CityBody';
import { StateBody } from '../../WebServices/WebServiceBody/CountryBody/StateBody';
import { CountryDataResponse } from '../../WebServices/WebServiceResponse/CountryResponse/GetCountryResponse';
import { UniversalBody } from '../../WebServices/WebServiceBody/UniversalBody';
import { PostalBody } from '../../WebServices/WebServiceBody/CountryBody/PostalBody';
import { DeleteCountryBody } from '../../WebServices/WebServiceBody/CountryBody/DeleteCountryBody';
import { GetStateResponse } from '../../WebServices/WebServiceResponse/CountryResponse/GetStateResponse';
import { GetCityResponse } from '../../WebServices/WebServiceResponse/CountryResponse/GetCityResponse';
import { GetPostalResponse } from '../../WebServices/WebServiceResponse/CountryResponse/GetPostalResponse';

import { DeleteStateBody } from '../../WebServices/WebServiceBody/CountryBody/DeleteStateBody';
import { DeleteCityBody } from '../../WebServices/WebServiceBody/CountryBody/DeleteCityBody';
import { DeletePostalBody } from '../../WebServices/WebServiceBody/CountryBody/DeletePostalBody';
@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.css']
})
export class CountryComponent implements OnInit {
  constructor(private allWeb: AllWeb) {
    this.rowSelection = 'single';

    //this.topOptions.api.push(this.topOptions);



  }
  api: GridApi;
  columnApi: ColumnApi;


  ToggleButton: false;

  stateApi: GridApi;
  stateColumnApi: ColumnApi;

  cityApi: GridApi;
  cityColumnApi: ColumnApi

  postalApi: GridApi;
  postalColomnApi: ColumnApi;

  universalResponse: UniversalResponse;
  countryDataResponse: CountryDataResponse;
  getStateResponse: GetStateResponse;
  getCityResponse: GetCityResponse
  getPostalResponse: GetPostalResponse;



  rowSelection: string;
  rowDeselection: string
  columnDefs = [
    {
      id: 0, headerName: 'Country Code', field: 'countryCode', sortable: true, filter: true, width: 120, editable: true,
      cellStyle: function (params) {
        if (params.value === '') {

          return { outline: '1px solid red' };
        } else {
          return { outline: 'white' };
        }
      }

    },

    {
      id: 1, headerName: 'Country Name', field: 'countryName', sortable: true, //cellEditor: "agTextCellEditor",

      filter: true, width: 130, editable: true,

      cellStyle: function (params) {

        if (params.value === '') {
          return { outline: '1px solid red' };
        } else {
          return { outline: 'white' };
        }

      }

    },
    { headerName: '', field: '', width: 590 }
  ];

  rowData;


  columnDefs1 = [
    {
      headerName: 'Country', field: 'countryName', sortable: true, editable: true, filter: true, width: 120, singleClickEdit: true,

      cellEditor: "select",

      cellEditorParams: { values: extractValues(countryMappings) },
      valueFormatter: function (params) {
        return lookupValue(countryMappings, params.value);
      },
      valueParser: function (params) {
        return lookupKey(countryMappings, params.newValue);
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
    { headerName: 'Description', field: 'description', sortable: true, filter: true, width: 130, editable: true },
    { headerName: '', field: '', width: 470 }
  ];

  rowData1;

  columnDefs2 = [

    {
      headerName: 'Country', field: 'countryName', sortable: true, editable: true, filter: true, width: 120, singleClickEdit: true,

      cellEditor: "select",
      cellEditorParams: { values: extractValues(countryMappings) },
      valueFormatter: function (params) {
        return lookupValue(countryMappings, params.value);
      },
      valueParser: function (params) {
        return lookupKey(countryMappings, params.newValue);
      }
    },
    {
      headerName: 'State', field: 'stateName', sortable: true, filter: true, editable: true, width: 120, singleClickEdit: true,

      cellEditor: "select",
      cellEditorParams: { values: extractValues(stateMappings) },
      valueFormatter: function (params) {
        return lookupValue(stateMappings, params.value);
      },
      valueParser: function (params) {
        return lookupKey(stateMappings, params.newValue);
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

    { headerName: 'Description', field: 'description', sortable: true, filter: true, width: 130, editable: true },

    { headerName: '', field: '', width: 350 }
  ];

  rowData2;

  columnDefs3 = [

    {
      headerName: 'Country', field: 'countryName', sortable: true, editable: true, filter: true, width: 120,
      singleClickEdit: true,

      cellEditor: "select",
      cellEditorParams: { values: extractValues(countryMappings) },
      valueFormatter: function (params) {
        return lookupValue(countryMappings, params.value);
      },
      valueParser: function (params) {
        return lookupKey(countryMappings, params.newValue);
      }
    },
    {
      headerName: 'State', field: 'stateName', sortable: true, filter: true, editable: true, width: 120,
      singleClickEdit: true,

      cellEditor: "select",
      cellEditorParams: { values: extractValues(stateMappings) },
      valueFormatter: function (params) {
        return lookupValue(stateMappings, params.value);
      },
      valueParser: function (params) {
        return lookupKey(stateMappings, params.newValue);
      }

    },
    {
      headerName: 'City', field: 'cityName', sortable: true, filter: true, editable: true, width: 120,
      singleClickEdit: true,

      cellEditor: "select",
      cellEditorParams: { values: extractValues(cityMappings) },
      valueFormatter: function (params) {
        return lookupValue(cityMappings, params.value);
      },
      valueParser: function (params) {
        return lookupKey(cityMappings, params.newValue);
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

    { headerName: 'Description', field: 'description', sortable: true, filter: true, width: 130, editable: true },

    { headerName: '', field: '', width: 230 }
  ];

  rowData3;

  columnDefs4 = [
    { headerName: 'Department', field: 'department', sortable: true, filter: true, editable: true, width: 120 },
    { headerName: 'Designation', field: 'designation', sortable: true, filter: true, editable: true, width: 120 },
    { headerName: '', field: '', width: 600 }
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
    { headerName: '', field: '', width: 600 }
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
 universalBody= new UniversalBody();
  ngOnInit() {

    this.allWeb.getCountries(this.universalBody)
      .subscribe(
        data => {
          this.countryDataResponse = data;
          this.rowData = this.countryDataResponse;

        });
        this.allWeb.getStates(this.universalBody)
                  .subscribe(
                    data => {
                      this.getStateResponse = data;
                      this.rowData1 = this.getStateResponse;
                    }
                  )
    this.allWeb.getCity(this.universalBody)
      .subscribe(
        data => {
          this.getCityResponse = data;
          this.rowData2 = this.getCityResponse;

        }
      );
      this.allWeb.getPostal(this.universalBody)
      .subscribe(
        data => {
          this.getPostalResponse = data;
          this.rowData3 = this.getPostalResponse;
        }
      );


  }

  onAddClick() {
    this.api.setFocusedCell(this.countCountry, "countryCode");
    //this.api.setFocusedCell(1, "country");
    this.countCountry++;
    let res = this.api.updateRowData({ add: [{ countryName: '', countryCode: '' }] });
    res.add.forEach(function (rowNode) {
      console.log('Added Row Node', rowNode);
    });
  }

  onAddState() {

    this.stateApi.setFocusedCell(this.countState, "countryName");
    this.countState++;
    let res = this.stateApi.updateRowData({ add: [{ stateName: '', countryName: 'Select', description: '' }] });
    res.add.forEach(function (rowNode) {
      console.log('Added Row Node', rowNode);
    });

  }

  onAddCity() {
    this.cityApi.setFocusedCell(this.countCity, "country");
    this.countCity++;
    let res = this.cityApi.updateRowData({ add: [{ stateName: '', cityName: '', countryName: '', description: '' }] });
    res.add.forEach(function (rowNode) {
      console.log('Added Row Node', rowNode);
    });

  }
  onAddPostal() {
    this.postalApi.setFocusedCell(this.countPostal, "country");
    this.countPostal++;
    let res = this.postalApi.updateRowData({ add: [{ cityName: '', stateName: '', countryName: '', postalCode: '', description: '' }] });
    res.add.forEach(function (rowNode) {
      console.log('Added Row Node', rowNode);
    });


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

              alert(this.universalResponse.MESSAGE);
              if (this.universalResponse.STATUS === 'Success') {
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
    document.querySelector('#selectedRows').innerHTML = selectedRowsString;
  }

  onCellKeyDown(e) {
    const keyPressed = e.event.key;
    if (keyPressed === 'Enter') {
      const countryBody = new CountryBody();
      const universalBody = new UniversalBody();
      const selectedNodes = this.api.getSelectedNodes();

      const selectedData = selectedNodes.map(node => node.data);
      var dataTest: Object;
      selectedData.map(node => dataTest = node as Object);
      countryBody.CountryCode = dataTest['countryCode'];
      countryBody.CountryName = dataTest['countryName'];

      if (dataTest['countryCode'] === '') {
        alert("Enter country code");

      }
      else if (dataTest['countryName'] === '') {
        alert("Enter country name");

      }

      else {
        this.allWeb.saveCountry(countryBody)
          .subscribe(
            data => {
              this.universalResponse = data;

              alert(this.universalResponse.MESSAGE);

              if (this.universalResponse.STATUS === 'Success') {

                this.allWeb.getCountries(universalBody)
                  .subscribe(
                    data => {
                      this.countryDataResponse = data;
                      this.rowData = this.countryDataResponse;

                    }
                  )
              }
            }


          );
      }


    }
  }

  onCityCellKeyDown(e) {
    const keyPressed = e.event.key;
    if (keyPressed === 'Enter') {
      //alert("Enter ");
      const cityBody = new CityBody();
      const universalBody = new UniversalBody();

      const selectedNodes = this.cityApi.getSelectedNodes();

      const selectedData = selectedNodes.map(node => node.data);
      var dataTest: Object;
      selectedData.map(node => dataTest = node as Object);
      cityBody.CityName = dataTest['cityName'];
      cityBody.Description = dataTest['description'];

      if (dataTest['cityName'] === '') {
        alert("Enter city name");

      }
      else {
        this.allWeb.saveCity(cityBody)
          .subscribe(
            data => {
              this.universalResponse = data;

              alert(this.universalResponse.MESSAGE);

              if (this.universalResponse.STATUS === 'Success') {

                alert("City Details");
                this.allWeb.getCity(universalBody)
                  .subscribe(
                    data => {
                      this.getCityResponse = data;
                      this.rowData2 = this.getCityResponse;

                    }
                  )
              }
            }

          );
      }
    }
  }

  onStateCellKeyDown(e) {
    const keyPressed = e.event.key;
    if (keyPressed === 'Enter') {
      // alert("Enter ");
      const stateBody = new StateBody();
      const universalBody = new UniversalBody();
      const selectedNodes = this.stateApi.getSelectedNodes();

      const selectedData = selectedNodes.map(node => node.data);
      var dataTest: Object;
      selectedData.map(node => dataTest = node as Object);
      stateBody.StateName = dataTest['stateName'];
      stateBody.Description = dataTest['description'];

      if (dataTest['stateName'] === '') {
        alert("Enter state name");
      }
      else {
        this.allWeb.saveState(stateBody)
          .subscribe(
            data => {
              this.universalResponse = data;

              alert(this.universalResponse.MESSAGE);

              if (this.universalResponse.STATUS === 'Success') {

                alert("State Details");

                this.allWeb.getStates(universalBody)
                  .subscribe(
                    data => {
                      this.getStateResponse = data;
                      this.rowData1 = this.getStateResponse;
                    }
                  )
              }
            }

          );
      }

    }
  }

  onPostalCellKeyDown(e) {
    const keyPressed = e.event.key;
    if (keyPressed === 'Enter') {
      //alert("Enter ");
      const postalBody = new PostalBody();
      const universalBody = new UniversalBody();
      const selectedNodes = this.postalApi.getSelectedNodes();

      const selectedData = selectedNodes.map(node => node.data);
      var dataTest: Object;
      selectedData.map(node => dataTest = node as Object);
      postalBody.postalCode = dataTest['postalCode'];
      postalBody.Description = dataTest['description'];

      if (dataTest['postalCode'] === '') {
        alert("Enter postal code");

      }
      else {
        this.allWeb.savePostal(postalBody)
          .subscribe(
            data => {
              this.universalResponse = data;

              alert(this.universalResponse.MESSAGE);

              if (this.universalResponse.STATUS === 'Success') {

                alert("Postal Details");
                this.allWeb.getPostal(universalBody)
                  .subscribe(
                    data => {
                      this.getPostalResponse = data;
                      this.rowData3 = this.getPostalResponse;
                    }
                  )
              }

            }

          );
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


