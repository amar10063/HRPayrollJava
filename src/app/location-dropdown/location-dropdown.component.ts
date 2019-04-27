import { Component, OnInit } from '@angular/core';
import { GetLocationBody } from '../SystemAdministration/organization/GetLocationBody';
import { GetAllDepartmentBody } from '../HRPayroll/employee/EmployeeApiResponse/GetAllDepartmentBody'
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
  selectedClick = false;
  normalClcik = false;
  agInit(params: ICellRendererParams): void {
    this.params = params['value'];
    console.log('this.params: ' + this.params);
    this.context = params.context;

    if (this.params === 'location') {
      this.getAllLocation();
    } else if (this.params === 'department') {
      this.getAllDepartment();
    } else if (this.params === 'country') {
      this.getAllCountry();
    } else if (this.params === 'state') {
      //this.getAllState(this.context.componentParent.selectedCountryId);
    } else if (this.params === 'city') {
      // this.getAllCity();
    }
  }
  constructor(private countryService: AllWeb) {
  }

  getAllLocation(): any {
    var locationBody = new UniversalBody();
    locationBody.userID = '1';
    // console.log("key locationBody", locationBody)
    this.countryService.doGetLocation(locationBody)
      .subscribe(
        data => {
          this.locationResponse = data;
          var getAllLocationResponse = new GetAllLocationResponse();
          getAllLocationResponse.commonName = 'Select';
          this.locationResponse[0] = getAllLocationResponse;

        }

      );
  }
  getAllDepartment(): any {
    var departmentBody = new GetAllDepartmentBody();
    departmentBody.userID = 1;
    //console.log("key locationBody", departmentBody)
    this.countryService.getDepartment(departmentBody)
      .subscribe(
        data => {
          this.locationResponse = data;
          var getAllLocationResponse = new GetAllLocationResponse();
          getAllLocationResponse.commonName = 'Select';
          this.locationResponse.push(getAllLocationResponse);

        }

      );
  }

  onClick() {
    this.normalClcik = true;
    this.selectedClick = false;
    if (this.selectedClick = true) {
      if (this.params === 'country') {
        // this.context.componentParent.selectedCountryId = event.target.value;
        // console.log(event.target.value);
      } else if (this.params === 'state') {
        this.getAllState(this.context.componentParent.selectedCountryId);
        //  this.context.componentParent.selectedStateId = event.target.value;
      } else if (this.params === 'city') {
        this.getAllCity(this.context.componentParent.selectedStateId);
        //  this.context.componentParent.selectedCityId = event.target.value;
      }
    }
  }
  getSelectedValue(event) {
    this.selectedClick = true; this.normalClcik = false;

    if (this.normalClcik = true) {
      if (this.params === 'country') {
        this.context.componentParent.selectedCountryId = event.target.value;
      } else if (this.params === 'state') {
        this.context.componentParent.selectedStateId = event.target.value;
        console.log(event.target.value);
      } else if (this.params === 'city') {
        this.context.componentParent.selectedCityId = event.target.value;
      }
    }
  }
  getAllCountry(): any {
    const universalBody = new UniversalBody();
    universalBody.userID = '1';
    this.countryService.countryDropdown(universalBody)
      .subscribe(
        data => {
          this.locationResponse = data;
          this.context.componentParent.selectedCountryId = this.locationResponse[0].commonId;
        }
      );
  }
  getAllState(countryID): any {
    var universalBody = new UniversalBody();
    universalBody.userID = '1';
    universalBody.countryID = countryID + '';
    this.countryService.stateDropdown(universalBody)
      .subscribe(
        data => {
          this.locationResponse = data;
          this.context.componentParent.selectedStateId = this.locationResponse[0].commonId;

        }
      );
  }

  getAllCity(stateID): any {
    var universalBody = new UniversalBody();
    universalBody.userID = '1';
    universalBody.stateID = stateID + '';
    console.log('zxcasczx  :' + JSON.stringify(universalBody));
    this.countryService.cityDropdown(universalBody)
      .subscribe(
        data => {
          this.locationResponse = data;
          this.context.componentParent.selectedCityId = this.locationResponse[0].commonId;

        }
      );
  }

}
