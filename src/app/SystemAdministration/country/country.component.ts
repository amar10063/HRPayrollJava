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
  cityArray: CityBody[] = [];

  type: string = '';
  gridOptions = {} as GridOptions;
  public selectedCountryId: number;
  private rowClassRules;

  constructor(private allWeb: AllWeb) {
    this.gridOptions = {
      context: { componentParent: this }
    };
    this.rowSelection = 'single';
    this.editType = 'fullRow';
    this.columnDefs = [
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

      { headerName: '', field: 'hidden', width: 652, }
    ];

    this.rowData;
    this.columnDefs1 = [
      {
        headerName: 'Country', field: 'countryName', sortable: true, filter: true, width: 210,
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
        headerName: 'State', field: 'stateName', sortable: true, filter: true, editable: false, width: 220,
        cellStyle: function (params) {
          if (params.value === '') {
            return { outline: '1px solid red' };

          } else {
            return { outline: 'white' };
          }
        }

      },
      { headerName: 'Description', field: 'description', sortable: true, filter: true, width: 250, editable: false },

      { headerName: '', field: 'hidden', hide: true }
    ];
    this.rowData1;



    this.columnDefs2 = [

      {
        headerName: 'Country', field: 'countryName', sortable: true, editable: false, filter: true, width: 110, //

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
        headerName: 'State', field: 'stateName', sortable: true, filter: true, editable: false, width: 120, //singleClickEdit: true,

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
        headerName: 'City', field: 'cityName', sortable: true, filter: true, editable: false, width: 120, singleClickEdit: true,


        cellStyle: function (params) {
          if (params.value === '') {

            return { outline: '1px solid red' };


          } else {
            return { outline: 'white' };
          }
        }

      },

      { headerName: 'Description', field: 'description', sortable: true, filter: true, width: 150, editable: false },


      { headerName: '', field: 'hidden', hide: true, }
    ];

    this.rowData2;

    this.columnDefs3 = [

      {
        headerName: 'Country', field: 'countryName', sortable: true, editable: false, filter: true, width: 120,
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
        headerName: 'State', field: 'stateName', sortable: true, filter: true, editable: false, width: 120,
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
        headerName: 'City', field: 'cityName', sortable: true, filter: true, editable: false, width: 120,
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
        headerName: 'Postal Code', field: 'postalCode', sortable: true, filter: true, editable: false, width: 120,
        cellStyle: function (params) {
          if (params.value === '') {
            return { outline: '1px solid red' };
          } else {
            return { outline: 'white' };
          }
        }

      },

      { headerName: 'Description', field: 'description', sortable: true, filter: true, width: 150, editable: false },
      { headerName: '', field: 'hidden', hide: true },

    ];

    this.rowData3;




    this.columnDefs4 = [
      { headerName: 'Department', field: 'department', sortable: true, filter: true, editable: true, width: 500 },
      { headerName: 'Designation', field: 'designation', sortable: true, filter: true, editable: true, width: 500 },
    ];

    this.rowData4 = [
    ];

    this.columnDefs5 = [
      { headerName: 'Language', field: 'language', sortable: true, filter: true, editable: true, width: 120 },
      { headerName: 'Language Code', field: 'languageCode', sortable: true, editable: true, filter: true, width: 120 },
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

  } rowNodeIndex: number;


  onStateSelectionChanged(event) {
    this.selectedRowState = this.stateApi.getSelectedRows();
    const selectedNodes = this.stateApi.getSelectedNodes();
    const selectedData = selectedNodes.map(node => node.data);
    var dataTest: Object;
    selectedData.map(node => dataTest = node as Object);
    this.stateApi.stopEditing();

    if (this.selectedRowState.length === 1) {
      if (this.getStateResponse.length === 1) {
        this.deleteStateToggleButton = false;
        this.stateFilter = true;
        this.stateCheckedStatus = false;
      }
      else {
      this.deleteStateToggleButton = false;
      this.stateFilter = false;
      this.stateCheckedStatus = false;

      }
      if (this.nodeStateSelect === 'Add') {
        this.saveUpdateState = 'Save';
        this.nodeStateSelect = 'Edit';

      } else if (this.nodeStateSelect === undefined) {
        if (this.nodeStateSelect === 'Edit') {
          this.saveUpdateState = 'Update';
        } else { this.saveUpdateState = 'Edit'; }
        this.saveStateToggleButton = false;
      } else if (this.nodeStateSelect === 'Update') {
        this.saveStateToggleButton = false;
        this.saveUpdateState = 'Update';
      }
    }
    else if (this.selectedRowState.length >= 1) {
      this.saveStateToggleButton = true;

    }
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

    this.api.setFocusedCell(this.countCountry, 'countryCode');
    this.countCountry++;
    var res = this.api.updateRowData({
      add: [{ countryName: '', countryCode: '' }],
      addIndex: 0
    });
    this.saveCountryToggleButton = false;
    this.nodeCountrySelect = 'Add';
    this.addCountryToggleButton = true;
    this.saveUpdateCountry = 'Save';
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

  onAddState() {
    this.type = 'add';
    this.stateApi.setFocusedCell(this.countState, 'countryName');
    this.countState++;
    let res = this.stateApi.updateRowData({ add: [{ stateName: '', countryName: '', description: '', hidden: 'hidden' }], addIndex: 0 });

    res.add.forEach(function (rowNode) {

      console.log('Added Row Node', rowNode);
    });
    this.saveStateToggleButton = false;
    this.nodeStateSelect = "Add";
    this.addStateToggleButton = true;
    this.saveUpdateState = 'Save';

  }

  onAddCity() {
    this.cityApi.setFocusedCell(this.countCity, 'countryName');
    this.cityApi.getColumnDef('cityName').editable = true;
    this.cityApi.getColumnDef('description').editable = true;

    this.countCity++;
    let res = this.cityApi.updateRowData({ add: [{ stateName: 'vdfg', cityName: '', countryName: '', description: '', hidden: 'hidden' }], addIndex: 0 });
    res.add.forEach(function (rowNode) {
      console.log('Added Row Node', rowNode);
    });

    this.saveCityToggleButton = false;
    this.nodeCitySelect = "Add";
    this.addCityToggleButton = true;
    this.saveUpdateCity = 'Save';
  }
  onAddPostal() {
    this.postalApi.setFocusedCell(this.countPostal, 'countryName');
    this.countPostal++;
    let res = this.postalApi.updateRowData({ add: [{ cityName: '', stateName: '', countryName: '', postalCode: '', description: '', hidden: 'hidden' }], addIndex: 0 });
    res.add.forEach(function (rowNode) {
      console.log('Added Row Node', rowNode);
    });
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
        this.addStateToggleButton = false;
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
                this.addStateToggleButton = false;
                this.getStates();

              }
            }
          );
      }
    }
    this.saveStateToggleButton = true;
    this.deleteStateToggleButton = true;

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
        this.addCityToggleButton = false;
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
                this.addCityToggleButton = false;
                this.getCity();

              }


            }
          );
      }
    }
    this.saveCityToggleButton = true;
    this.deleteCityToggleButton = true;

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
        this.addPostalToggleButton = false;
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
                this.addPostalToggleButton = false;
                this.getPostal();

              }


            }
          );
      }
    }
    this.savePostalToggleButton = true;
    this.deletePostalToggleButton = true;



  }
  

  onSaveCountry() {
    const countryBody = new CountryBody();

    const selectedNodes = this.api.getSelectedNodes();
    const selectedData = selectedNodes.map(node => node.data);
    var dataTest: Object;
    selectedData.map(node => dataTest = node as Object);

    if (selectedData.length === 0) {
      alert('Please select a row');

    } else {
      for (let selectedNode of selectedData) {
        countryBody.countryName = selectedNode['countryName'];
        countryBody.countryCode = selectedNode['countryCode'];
        this.countryArray.push(countryBody);

        var jsonData = JSON.stringify(this.countryArray);
        jsonData = jsonData.replace(/"/g, "'");

      }
      console.log('json DAta  ' + jsonData);
      if (dataTest['countryCode'] === '') {
        alert("Enter country code");
      } else if (dataTest['countryName'] === '') {
        alert("Enter country name");
      } else {
        
        
        
          universalJsonBody.jsonData = jsonData;
          this.allWeb.saveCountry(universalJsonBody)
            .subscribe(

              data => {
                this.universalResponse = data;

                alert(this.universalResponse.MESSAGE);

                if (this.universalResponse.STATUS.trim() === 'Success') {

                  this.getCountries();

                }
                this.countryArray =[];
              }
            );
        
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
      const universalBody = new UniversalBody(); universalBody.userID = '1';

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
        this.addStateToggleButton = true;

      }
      else {


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
        this.addStateToggleButton = true;
      }
      else {
        updateStateBody.CountryID = dataTest['countryID'];
        updateStateBody.StateID = dataTest['stateID'];
        if (updateStateBody.CountryID === undefined) {

          this.stateApi.removeItems(selectedNodes);
          this.addStateToggleButton = false;
        }
        else {


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
      this.addStateToggleButton = false;
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
        this.saveUpdatePostal = 'Update';

        this.savePostalToggleButton = false;
      }
      else if (this.nodePostalSelect === 'Update') {
        this.savePostalToggleButton = false;
        this.saveUpdatePostal = 'Update';

      }
    }
    else if (this.selectedRowPostal.length >= 1) {
      this.savePostalToggleButton = true;

    }
  }


  onSaveCity() {
    const cityBody = new CityBody();
    const universalBody = new UniversalBody();
    universalBody.userID = '1';


    const selectedNodes = this.cityApi.getSelectedNodes();

    const selectedData = selectedNodes.map(node => node.data);
    var dataTest: Object;
    selectedData.map(node => dataTest = node as Object);
    if (selectedData.length === 0) {
      alert("Please select a row");
    }
   else{
    for (let selectedNode of selectedData) {
      cityBody.cityName = selectedNode['cityName'];
      cityBody.description = selectedNode['description'];
      this.cityArray.push(cityBody);
      var jsonData = JSON.stringify(this.cityArray);
      jsonData = jsonData.replace(/"/g, "'");

    }
   

    if (dataTest['cityName'] === '') {
      alert("Enter city name");

    }
    else {

      universalJsonBody.jsonData = jsonData;
      this.allWeb.saveCity(universalJsonBody)
        .subscribe(

          data => {
            this.universalResponse = data;

            alert(this.universalResponse.MESSAGE);

            if (this.universalResponse.STATUS.trim() === 'Success') {

              this.getCity();

            }
            this.cityArray =[];
          }
        );
    }
   }

  }
  onCitySelectionChanged() {
    this.selectedRowCity = this.cityApi.getSelectedRows();
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
      else if (this.selectedRowCity.length >= 1) {
        this.saveCityToggleButton = true;

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
    else if (this.selectedRowCountry.length >= 1) {
      this.saveCountryToggleButton = true;

    }
  }

  onSavePostal() {
    const postalBody = new PostalBody();
    const universalBody = new UniversalBody();
    universalBody.userID = '1';


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

  onUpdatePostal() {
    const updatePostalBody = new UpdatePostalBody();

    const selectedNodes = this.postalApi.getSelectedNodes();

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
      updatePostalBody.pid = dataTest['pID'];
      updatePostalBody.CityID = dataTest['cityID'];
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
    if (this.saveUpdateState === 'Save') {
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

  }

  onSaveUpdatePostal() {
    if (this.saveUpdatePostal === 'Save') {
      this.onSavePostal();
    }
    else {
      this.onUpdatePostal();
    }
  }



}



