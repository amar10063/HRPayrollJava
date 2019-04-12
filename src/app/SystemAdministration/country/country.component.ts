import { Component, OnInit } from '@angular/core';
import { GridApi, ColumnApi, CellComp } from 'ag-grid-community';
import { CountryService } from 'src/app/WebServices/AllWeb.service';
import { CountryBody } from './CountryDetails/CountryBody';
import { CountryResponse } from './CountryDetails/CountryResponse';
import { CityBody } from './CityDetails/CityBody';
import { CityResponse } from './CityDetails/CityResponse';
import { StateBody } from './StateDetails/StateBody';
import { StateResponse } from './StateDetails/StateResponse';
import { CountryDataResponse } from './CountryDetails/CountryDataResponse';
import { GetAllCountryBody } from './CountryDetails/GetAllCountryBody';
import { PostalBody } from './PostalDetails/PostalBody';
import { PostalResponse } from './PostalDetails/PostalResponse';
import { DeleteCountryBody } from './CountryDetails/DeleteCountryBody';
import { GetStateBody } from './StateDetails/GetStateBody';
import { GetStateResponse } from './StateDetails/GetStateResponse';
import { GetCityResponse } from './CityDetails/GetCityResponse';
import { GetCityBody } from './CityDetails/GetCityBody';
import { GetPostalResponse } from './PostalDetails/GetPostalResponse';
import { GetPostalBody } from './PostalDetails/GetPostalBody';
import { DeleteStateBody } from './StateDetails/DeleteStateBody';
import { DeleteCityBody } from './CityDetails/DeleteCityBody';
import { DeletePostalBody } from './PostalDetails/DeletePostalBody';
@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.css']
})
export class CountryComponent implements OnInit {
  constructor(private countryService: CountryService) {
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

  countryResponse: CountryResponse;
  cityResponse: CityResponse;
  stateResponse: StateResponse;
  countryDataResponse: CountryDataResponse;
  postalResponse: PostalResponse;
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
  //= [
  // { state: 'UP', country: 'India', description: 'State Name' },
  // { state: 'Punjab', country: 'India', description: 'State Name' },
  // { state: 'Haryana', country: 'India', description: 'State Name' },
  // { state: 'Sikkim', country: 'India', description: 'State Name' },
  // { state: 'Rajasthan', country: 'India', description: 'State Name' }
  //];

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
  //= [
  // { city: 'Noida', state: 'UP', country: 'India', description: 'City Name' },
  // { city: 'Chandigarh', state: 'Punjab', country: 'India', description: 'City Name' },
  // { city: 'Gurugram', state: 'Haryana', country: 'India', description: 'City Name' },
  // { city: 'Gangtok', state: 'Sikkim', country: 'India', description: 'City Name' },
  // { city: 'Jaipur', state: 'Rajasthan', country: 'India', description: 'City Name' }
  //];
  
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
  //= [
  // { city: 'Noida', state: 'UP', country: 'India', postal: '201301', description: 'Postal Code No' },
  // { city: 'Chandigarh', state: 'Punjab', country: 'India', postal: '201301', description: 'Postal Code No' },
  // { city: 'Gurugram', state: 'Haryana', country: 'India', postal: '201301', description: 'Postal Code No' },
  // { city: 'Gangtok', state: 'Sikkim', country: 'India', postal: '201301', description: 'Postal Code No' },
  // { city: 'Jaipur', state: 'Rajasthan', country: 'India', postal: '201301', description: 'Postal Code No' }

  // ];

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

  ngOnInit() {
    
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

    let l =this.api.getDisplayedRowCount();

    for (i = 0; i < l; i++) {
      if (this.countryDataResponse[i].countryCode === dataTest['countryCode']) {

        deleteCountryBody.CountryID = this.countryDataResponse[i].countryID;
        this.countryService.deleteCountry(deleteCountryBody)
          .subscribe(
            data => {
              this.countryResponse = data;

              alert(this.countryResponse.MESSAGE);
              if (this.countryResponse.STATUS === 'Success') {
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
    //let l = this.rowData.length;
    let l =this.stateApi.getDisplayedRowCount();

    for (i = 0; i < l; i++) {
      if (this.getStateResponse[i].stateName === dataTest['stateName']) {

        delteStateBody.StateID = this.getStateResponse[i].stateID;
        this.countryService.deleteState(delteStateBody)
          .subscribe(
            data => {
              alert("delete");
              this.stateResponse = data;

              alert(this.stateResponse.MESSAGE);
              if (this.stateResponse.STATUS === 'Success') {
                var res = this.stateApi.updateRowData({ remove: selectedData });
              }
            }

          );

      }
    }
    // var selectedData = this.stateApi.getSelectedRows();
    // var res = this.stateApi.updateRowData({ remove: selectedData });

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
    //let l = this.rowData.length;
     let l =this.cityApi.getDisplayedRowCount();

    for (i = 0; i < l; i++) {
      if (this.getCityResponse[i].cityName === dataTest['cityName']) {

        deleteCityBody.CityID = this.getCityResponse[i].cityID;
        this.countryService.deleteCity(deleteCityBody)
          .subscribe(
            data => {
              alert("delete");
              this.cityResponse = data;

              alert(this.cityResponse.MESSAGE);
              if (this.cityResponse.STATUS === 'Success') {
                var res = this.cityApi.updateRowData({ remove: selectedData });
              }
            }

          );

      }
    }
    // var selectedData = this.cityApi.getSelectedRows();
    // var res = this.cityApi.updateRowData({ remove: selectedData });
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
    let l =this.postalApi.getDisplayedRowCount();


    for (i = 0; i < l; i++) {
      if (this.getPostalResponse[i].postalCode === dataTest['postalCode']) {

        deletePostalBody.pid = this.getPostalResponse[i].pID;
        this.countryService.deletePostal(deletePostalBody)
          .subscribe(
            data => {
              alert("delete");
              this.postalResponse = data;

              alert(this.postalResponse.MESSAGE);
              if (this.postalResponse.STATUS === 'Success') {
                var res = this.postalApi.updateRowData({ remove: selectedData });
              }
            }

          );

      }
    }
    // var selectedData = this.postalApi.getSelectedRows();
    // var res = this.postalApi.updateRowData({ remove: selectedData });

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
    //this.colDef = this.api.getFocusedCell().column.getColId();



    if (keyPressed === 'Enter') {
      //alert("Enter ");
      const countryBody = new CountryBody();
      const getAllCountryBody = new GetAllCountryBody();
      const selectedNodes = this.api.getSelectedNodes();

      const selectedData = selectedNodes.map(node => node.data);
      var dataTest: Object;
      selectedData.map(node => dataTest = node as Object);
      countryBody.CountryCode = dataTest['countryCode'];
      countryBody.CountryName = dataTest['countryName'];

      if (dataTest['countryCode'] === '') {
        alert("Enter country code");

        //this.ToggleButton = true;
      }
      else if (dataTest['countryName'] === '') {
        alert("Enter country name");
        // this.ToggleButton = true;
      }

      else {
        this.countryService.saveCountry(countryBody)
          .subscribe(
            data => {
              this.countryResponse = data;

              alert(this.countryResponse.MESSAGE);

              if (this.countryResponse.STATUS === 'Success') {

                this.countryService.getCountries(getAllCountryBody)
                  .subscribe(
                    data => {
                      this.countryDataResponse = data;
                      this.rowData = this.countryDataResponse;
                      // alert("Countryyyyyyyyyyyy");
                      //this.api.setRowData(data);
                      //alert(JSON.stringify(data));
                      //let res = this.api.updateRowData({ add: [{  countryCode: JSON.stringify(this.countryDataResponse.countryCode), country: JSON.stringify(this.countryDataResponse.countryName) }] });
                    }
                  )
              }
            }


          );
      }

      // if (this.api.getColumnDef('country') === '') {
      //   alert('Add Country Name');
      // } else if (this.api.getValue('countryCode', this.api.getDisplayedRowAtIndex(1)) === '') {
      //   alert('Add Country Code');
      // } else {
      //   alert('call service ');
      // }


      //const selectedNodes = this.api.getSelectedNodes();
      // const selectedData = selectedNodes.map(node => node.data);
      // const selectedDataStringPresentation = selectedData.map(node => node.country + ' ' + node.countryCode).join(', ');
      // console.log('Selected nodes: ${selectedDataStringPresentation}');

    }
  }

  onCityCellKeyDown(e) {
    const keyPressed = e.event.key;
    if (keyPressed === 'Enter') {
      //alert("Enter ");
      const cityBody = new CityBody();
      const getCityBody = new GetCityBody();

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
        this.countryService.saveCity(cityBody)
          .subscribe(
            data => {
              this.cityResponse = data;

              alert(this.cityResponse.MESSAGE);

              if (this.cityResponse.STATUS === 'Success') {

                alert("City Details");
                this.countryService.getCity(getCityBody)
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
      const getStateBody = new GetStateBody();
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
        this.countryService.saveState(stateBody)
          .subscribe(
            data => {
              this.stateResponse = data;

              alert(this.stateResponse.MESSAGE);

              if (this.stateResponse.STATUS === 'Success') {

                alert("State Details");

                this.countryService.getStates(getStateBody)
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
      const getPostalBody = new GetPostalBody();
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
        this.countryService.savePostal(postalBody)
          .subscribe(
            data => {
              this.postalResponse = data;

              alert(this.postalResponse.MESSAGE);

              if (this.postalResponse.STATUS === 'Success') {

                alert("Postal Details");

                this.countryService.getPostal(getPostalBody)
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

//var Country =

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

//var country = this.Countries();



 //var country = 
// function Countries(){
//   const getAllCountryBody = new GetAllCountryBody();
//    this.countryDataResponse= this.countryService.getCountries(getAllCountryBody)
//     .map(
//       x => ({ 'value': x.countryName, 'label': x.countryID }),
//      //countryMappings =this.x
//     );
//   let name1 = this.countryDataResponse.countryID;
//   let name = this.countryDataResponse.countryName;
//     //return countryMappings;
//     countryMappings = {name1: name};
//     //return this.countryDataResponse.countryName;

//   }
// var country =
// function Country()
// {
//   const getAllCountryBody = new GetAllCountryBody();
//   this.countryService.getCountries(getAllCountryBody)
//                   .map(
//                     data => {
//                       this.countryDataResponse = data;
//                     }
//                   )
//       return             ({'value': this.countryDataResponse.countryName, 'label':this.countryDataResponse.countryID}) 
// }
