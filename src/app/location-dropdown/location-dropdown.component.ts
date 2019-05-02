import { Component, OnInit } from '@angular/core';
import { GetLocationBody } from '../SystemAdministration/organization/GetLocationBody';
import { GetAllDepartmentBody } from '../HRPayroll/employee/EmployeeApiResponse/GetAllDepartmentBody';
import { AllWeb } from 'src/app/WebServices/AllWeb.service';
import { GetAllLocationResponse } from '../HRPayroll/employee/EmployeeApiResponse/GetAllLocationResponse';
import { INoRowsOverlayAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';

import { UniversalBody } from '../WebServices/WebServiceBody/UniversalBody';


@Component({
  selector: 'app-location-dropdown',
  templateUrl: './location-dropdown.component.html',
  styleUrls: ['./location-dropdown.component.css']
})
export class LocationDropdownComponent implements INoRowsOverlayAngularComp {
  params: any;
  selectedLevel: Object = {};



  locationResponse: GetAllLocationResponse[];
  selectedValue;
  action;
  context;

  normalStateClcik; normalCityClcik;
  normalCountryClcik;
  agInit(params: ICellRendererParams): void {
    this.params = params['value'];
    this.context = params.context;
    console.log(this.context);
    if (this.params === 'location') {
      this.getAllLocation();
    } else if (this.params === 'department') {
    } else if (this.params === 'country') {
      this.getAllCountry();
    } else if (this.params === 'state') {
    } else if (this.params === 'city') {
    }
  }
  constructor(private countryService: AllWeb) {
  }

  getAllLocation(): any {
    var locationBody = new UniversalBody();
    locationBody.userID = '1';
    // console.log("key locationBody", locationBody)
    this.countryService.getLocationDropDown(locationBody)
      .subscribe(
        data => {
          this.locationResponse = data;
          this.context.organizationParent.selectedLocationId = this.locationResponse[0].id;
          console.log(this.context.organizationParent.selectedLocationId);

        }

      );
  }
  getAllDepartment(selectedLocationId): any {
    var locationBody = new UniversalBody();
    locationBody.userID = '1';
    locationBody.locationID =selectedLocationId;
    this.countryService.getDepartmentDropDown(locationBody)
      .subscribe(
        data => {
          this.locationResponse = data;
          this.context.organizationParent.selectedDepartmentId = this.locationResponse[0].id;

        }

      );
  }

  onClick() {
    console.log('onSelectClick');
    if (this.params === 'country') {
    } else if (this.params === 'state') {
      this.getAllState(this.context.componentParent.selectedCountryId);
    } else if (this.params === 'city') {
      this.getAllCity(this.context.componentParent.selectedStateId);
    } else if (this.params === 'department') {
      this.getAllDepartment(this.context.organizationParent.selectedLocationId);
    }
  }
  getSelectedValue(event) {
    console.log('this.newObj   ' + event);
    if (this.params === 'country') {
      this.context.componentParent.selectedCountryId = event;
      this.context.componentParent.stateData = [];
      this.context.componentParent.cityData = [];
    } else if (this.params === 'state') {
      this.context.componentParent.selectedStateId = event;
      this.context.componentParent.cityData = [];
    } else if (this.params === 'city') {
      this.context.componentParent.selectedCityId = event;
    } else if (this.params === 'location') {
      this.context.organizationParent.selectedLocationId = event;
    } else if (this.params === 'department') {
      this.context.organizationParent.selectedDepartmentId = event;
    }

  }
  haveData;
  getAllCountry(): any {
    const universalBody = new UniversalBody();
    universalBody.userID = '1';
    this.countryService.countryDropdown(universalBody)
      .subscribe(
        data => {
          this.locationResponse = data;
          this.context.componentParent.selectedCountryId = this.locationResponse[0].id;
          console.log("key locationBody", this.context.componentParent.selectedCountryId);
        }
      );
  }
  getAllState(countryID): any {
    if (this.context.componentParent.stateData.length === 0) {
      var universalBody = new UniversalBody();
      universalBody.userID = '1';
      universalBody.countryID = countryID + '';
      this.countryService.stateDropdown(universalBody)
        .subscribe(
          data => {
            this.locationResponse = data;
            this.context.componentParent.stateData = data;
            this.context.componentParent.selectedStateId = this.locationResponse[0].id;
            this.haveData = 1;
          }
        );
    } else { }
  }


  getAllCity(stateID): any {
    if (this.context.componentParent.cityData.length === 0) {
      var universalBody = new UniversalBody();
      universalBody.userID = '1';
      universalBody.stateID = stateID + '';
      console.log('zxcasczx  :' + JSON.stringify(universalBody));
      this.countryService.cityDropdown(universalBody)
        .subscribe(
          data => {
            this.locationResponse = data;
            this.context.componentParent.cityData = data;
            this.context.componentParent.selectedCityId = this.locationResponse[0].id;

          }
        );
    } else { }
  }

}
