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
  columnDefs1;
  rowData1;

  type: string = '';
  gridOptions = {} as GridOptions;
  public selectedCountryId: number;
  private rowClassRules;
 
  constructor(private allWeb: AllWeb) {
    this.rowClassRules = {
      "sick-days-warning": function(params) {
        var numSickDays = params.data.countryName;
        return numSickDays > 5 && numSickDays <= 7;
      },
      "sick-days-breach": "data.sickDays > 8"
    };
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



  StateToggleButton = false;
  cityToggleButton = false;
  postalToggleButton = false;

  countryCheckedStatus = false;
  countryFilter: boolean;

  stateCheckedStatus = false;
  stateFilter: boolean;

  cityCheckedStatus = false;
  cityFilter: boolean;

  addCountryToggleButton = false;
  saveCountryToggleButton = false;
  deleteCountryToggleButton = false;

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

    this.getCountries();
    this.getStates();


    this.getCity();
    this.getPostal();

  }

  onStateSelectionChanged(event) {
    this.selectedRowState = this.stateApi.getSelectedRows();
    this.rowSelection = "multiple";
    if (this.selectedRowState.length === 1) {
      this.deleteStateToggleButton = false;
      this.stateFilter = false;
      this.stateCheckedStatus = false;

      if (this.nodeStateSelect === "Add") {
        this.saveUpdateState = "Save";
        this.nodeStateSelect = "Edit";
      } else if (this.nodeStateSelect === undefined) {
        this.saveUpdateState = "Update";

        this.saveStateToggleButton = false;
      }
      else if (this.nodeStateSelect === 'Update') {
        this.saveStateToggleButton = false;
        this.saveUpdateState = 'Update';

      }
    }
  }

  getStates() {
    this.allWeb.getStates(this.universalBody)
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
            this.saveUpdateState = "Save";

            this.saveStateToggleButton = true;
            this.addStateToggleButton = false;
            this.deleteStateToggleButton = true;
            this.rowData1 = this.getStateResponse;
          }

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
          if (this.getCityResponse.length === 0) {

            this.TotalCity = this.getCityResponse.length;
            this.saveUpdateCity = "Save";

            this.addCityToggleButton = false;
            this.saveCityToggleButton = true;
            this.deleteStateToggleButton = true;
          } else {

            if (this.getStateResponse.length >= 50) {
              this.ShowLimitedState = 50;
            } else {
              this.ShowLimitedState = this.getStateResponse.length;
            }

            this.TotalState = this.getStateResponse.length;
            this.saveUpdateState = "Save";

            this.saveStateToggleButton = true;
            this.addStateToggleButton = false;
            this.deleteStateToggleButton = true;
            this.rowData1 = this.getStateResponse;
          }



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


    this.saveCountryToggleButton = false;
    this.nodeCountrySelect = "Add";
    this.addCountryToggleButton = true;
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
    }

  }

  onAddState() {
    this.type = 'add';
    this.stateApi.setFocusedCell(this.countState, 'countryName');
    this.countState++;
    let res = this.stateApi.updateRowData({ add: [{ stateName: '', countryName: '', description: '' }], addIndex: 0 });

    res.add.forEach(function (rowNode) {

      console.log('Added Row Node', rowNode);
    });
    this.saveStateToggleButton = false;
    this.nodeStateSelect = "Add";
    this.addStateToggleButton = true;

  }

  onAddCity() {
    this.cityApi.setFocusedCell(this.countCity, 'countryName');
    this.countCity++;
    let res = this.cityApi.updateRowData({ add: [{ stateName: '', cityName: '', countryName: '', description: '' }], addIndex: 0 });
    res.add.forEach(function (rowNode) {
      console.log('Added Row Node', rowNode);
    });

    this.saveCityToggleButton = false;
    this.nodeCitySelect = "Add";
    this.addCityToggleButton = true;
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

    const deleteCountryBody = new DeleteCountryBody();
    const selectedData = selectedNodes.map(node => node.data);
    var dataTest: Object;
    selectedData.map(node => dataTest = node as Object);
    if (selectedData.length === 0) {
      alert("Please select a row");
    }
    else {
      deleteCountryBody.CountryID = dataTest['countryID'];

      if (deleteCountryBody.CountryID === undefined) {
        this.addCountryToggleButton = false;
        this.api.removeItems(selectedNodes);
      }
      else {
        this.allWeb.deleteCountry(deleteCountryBody)
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
    }
    this.saveCountryToggleButton = true;
    this.deleteCountryToggleButton = true;


  }
  onDeleteState() {

    const selectedNodes = this.stateApi.getSelectedNodes();

    const deleteStateBody = new DeleteStateBody();
    const selectedData = selectedNodes.map(node => node.data);
    var dataTest: Object;
    selectedData.map(node => dataTest = node as Object);
    if (selectedData.length === 0) {
      alert("Please select a row");
    }
    else {
      deleteStateBody.StateID = dataTest['countryID'];

      if (deleteStateBody.StateID === undefined) {
        //this.addCountryToggleButton = false;
        this.stateApi.removeItems(selectedNodes);
      }
      else {
        this.allWeb.deleteState(deleteStateBody)
          .subscribe(
            data => {
              this.universalResponse = data;
              alert(this.universalResponse.MESSAGE);
              if (this.universalResponse.STATUS === 'Success') {
                this.stateApi.removeItems(selectedNodes);
                //this.addCountryToggleButton = false;
                this.getStates();

              }


            }
          );
      }
    }
    //this.saveCountryToggleButton = true;
    // this.deleteCountryToggleButton = true;

  }

  onDeleteCity() {

    const selectedNodes = this.cityApi.getSelectedNodes();

    const deleteCityBody = new DeleteCityBody();
    const selectedData = selectedNodes.map(node => node.data);
    var dataTest: Object;
    selectedData.map(node => dataTest = node as Object);
    if (selectedData.length === 0) {
      alert("Please select a row");
    }
    else {
      deleteCityBody.CityID = dataTest['cityID'];


      if (deleteCityBody.CityID === undefined) {
        //this.addCountryToggleButton = false;
        this.cityApi.removeItems(selectedNodes);
      }
      else {
        this.allWeb.deleteCity(deleteCityBody)
          .subscribe(
            data => {
              this.universalResponse = data;
              alert(this.universalResponse.MESSAGE);
              if (this.universalResponse.STATUS === 'Success') {
                this.cityApi.removeItems(selectedNodes);
                //this.addCountryToggleButton = false;
                this.getCity();

              }


            }
          );
      }
    }
    //this.saveCountryToggleButton = true;
    // this.deleteCountryToggleButton = true;

  }
  onDeletePostal() {
    const selectedNodes = this.postalApi.getSelectedNodes();

    const deletePostalBody = new DeletePostalBody();
    const selectedData = selectedNodes.map(node => node.data);
    var dataTest: Object;
    selectedData.map(node => dataTest = node as Object);
    if (selectedData.length === 0) {
      alert("Please select a row");
    }
    else {
      deletePostalBody.pid = dataTest['pID'];


      if (deletePostalBody.pid === undefined) {
        //this.addCountryToggleButton = false;
        this.cityApi.removeItems(selectedNodes);
      }
      else {
        this.allWeb.deletePostal(deletePostalBody)
          .subscribe(
            data => {
              this.universalResponse = data;
              alert(this.universalResponse.MESSAGE);
              if (this.universalResponse.STATUS === 'Success') {
                this.cityApi.removeItems(selectedNodes);
                //this.addCountryToggleButton = false;
                this.getPostal();

              }


            }
          );
      }
    }
    //this.saveCountryToggleButton = true;
    // this.deleteCountryToggleButton = true;



  }
  countryArray: CountryBody[] = [];

  onSaveCountry() {

    const countryBody = new CountryBody();
    const universalBody = new UniversalBody();
    const selectedNodes = this.api.getSelectedNodes();
    const selectedData = selectedNodes.map(node => node.data);
    var dataTest: Object;
    selectedData.map(node => dataTest = node as Object);

    if (selectedData.length === 0) {
      alert('Please select a row');
    } else {
      for (let selectedNode of selectedData) {
        countryBody.CountryCode = selectedNode['countryCode'];
        countryBody.CountryName = selectedNode['countryName'];
        this.countryArray.push(countryBody);
        //var jsonData = JSON.stringify(this.countryArray);
      }
      console.log('countryArray:  ' + JSON.stringify(this.countryArray));
      if (dataTest['countryCode'] === '') {
        alert("Enter country code");
      } else if (dataTest['countryName'] === '') {
        alert("Enter country name");
      } else {
        countryBody.CountryCode = dataTest['countryCode'];
        countryBody.CountryName = dataTest['countryName'];
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
        updateCountryBody.CountryCode = dataTest['countryCode'];
        updateCountryBody.CountryName = dataTest['countryName'];


        if (dataTest['countryCode'] === '') {
          alert("Enter country code");
        } else if (dataTest['countryName'] === '') {
          alert("Enter country name");
        } else {
          updateCountryBody.CountryID = dataTest['countryID'];
          if (updateCountryBody.CountryID === undefined) {

            this.api.removeItems(selectedNodes);
            this.addCountryToggleButton = false;
          }
          else {
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
  }





  onSaveState() {
    if (this.selectedRowState === undefined) {
      alert('Please enter input valid data then hit save.')
    }
    else {
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
      stateBody.CountryID = this.selectedCountryId + '';
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
  }


  onUpdateState() {
    if (this.selectedRowState === undefined) {
      alert('Please enter input valid data then hit save.')
    }
    else {
      const updateStateBody = new UpdateStateBody();

      const selectedNodes = this.stateApi.getSelectedNodes();

      const selectedData = selectedNodes.map(node => node.data);
      var dataTest: Object;
      selectedData.map(node => dataTest = node as Object);
      if (selectedData.length === 0) {
        alert("Please select a row");
      }
      updateStateBody.StateName = dataTest['stateName'];
      updateStateBody.Description = dataTest['description'];


      if (dataTest['stateName'] === '') {
        alert("Enter state name");
        this.StateToggleButton = true;
      }
      else {
        updateStateBody.CountryID = dataTest['countryID'];
        updateStateBody.StateID = dataTest['stateID'];
        if (updateStateBody.CountryID === undefined) {

          this.stateApi.removeItems(selectedNodes);
          this.addStateToggleButton = false;
        }
        else {

          this.StateToggleButton = false;
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
              this.addCityToggleButton = false;

            }
          }

        );
    }

  }
  onCitySelectionChanged() {
    this.selectedRowCity = this.cityApi.getSelectedRows();
    this.rowSelection = "multiple";
    if (this.selectedRowCity.length === 1) {
      this.deleteCityToggleButton = false;
      this.cityFilter = false;
      this.cityCheckedStatus = false;

      if (this.nodeCitySelect === "Add") {
        this.saveUpdateCity = "Save";
        this.nodeCitySelect = "Edit";
      } else if (this.nodeCitySelect === undefined) {
        this.saveUpdateCity = "Update";

        this.saveCityToggleButton = false;
      }
      else if (this.nodeCitySelect === 'Update') {
        this.saveCityToggleButton = false;
        this.saveUpdateCity = 'Update';

      }
    }
  }
  onSaveUpdateCity() {
    if (this.saveUpdateCity === "Save") {
      this.onSaveCity();
    }
    else {
      this.onUpdateCity();
    }

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
      updateCityBody.StateID = dataTest['countryID'];
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

    this.selectedRowCountry = this.api.getSelectedRows();
    this.rowSelection = "multiple";
    if (this.selectedRowCountry.length === 1) {
      this.deleteCountryToggleButton = false;
      this.countryFilter = false;
      this.countryCheckedStatus = false;



      if (this.nodeCountrySelect === "Add") {
        this.saveUpdateCountry = "Save";
        this.nodeCountrySelect = "Edit";
      } else if (this.nodeCountrySelect === undefined) {
        this.saveUpdateCountry = "Update";

        this.saveCountryToggleButton = false;
      }
      else if (this.nodeCountrySelect === 'Update') {
        this.saveCountryToggleButton = false;
        this.saveUpdateCountry = 'Update';

      }
    }
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
    if (this.saveUpdateCountry === "Save") {
      this.onSaveCountry();
    }
    else {

      this.onUpdateCountry();
    }
  }

  onSaveUpdateState() {
    if (this.saveUpdateState === "Save") {
      this.onSaveState();
    }
    else {
      this.onUpdateState();
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



