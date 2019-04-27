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
    console.log('this.params: ' + this.params);
    this.context = params.context;
    this.normalStateClcik = false; this.normalCityClcik = false;
    this.normalCountryClcik = false;
    if (this.params === 'location') {
      this.getAllLocation();
    } else if (this.params === 'department') {
      this.getAllDepartment();
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
    this.countryService.doGetLocation(locationBody)
      .subscribe(
        data => {
          this.locationResponse = data;
          var getAllLocationResponse = new GetAllLocationResponse();
          getAllLocationResponse.name = 'Select';
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
          getAllLocationResponse.name = 'Select';
          this.locationResponse.push(getAllLocationResponse);

        }

      );
  }

  onClick() {
   // this.normalCityClcik = false; this.normalStateClcik = false;
    console.log(this.normalStateClcik + " cdscs " + this.normalCityClcik);
    if (this.params === 'country') {
      // this.context.componentParent.selectedCountryId = event.target.value;
      // console.log(event.target.value);
      this.normalStateClcik = false;
      this.normalCityClcik = false;

    } else if (this.params === 'state') {
      if (this.normalStateClcik === false) {
        this.getAllState(this.context.componentParent.selectedCountryId);
        this.normalStateClcik = true;
      }
    } else if (this.params === 'city') {
      if (this.normalCityClcik === false) {
        this.getAllCity(this.context.componentParent.selectedStateId);
        this.normalCityClcik = true;
      }
    }
  }
  getSelectedValue(event) {
    this.normalCityClcik = false; this.normalStateClcik = false;
    console.log(this.normalStateClcik + "  " + this.normalCityClcik);
    if (this.params === 'country') {
      this.normalStateClcik = false;
      this.context.componentParent.selectedCountryId = event.target.value;
    } else if (this.params === 'state') {
      this.normalCityClcik = false; this.normalStateClcik = false;
      this.context.componentParent.selectedStateId = event.target.value;
    } else if (this.params === 'city') {
    this.normalCityClcik = false; this.normalStateClcik = false;

      this.context.componentParent.selectedCityId = event.target.value;
    }

  }
  getAllCountry(): any {
    const universalBody = new UniversalBody();
    universalBody.userID = '1';
    this.countryService.countryDropdown(universalBody)
      .subscribe(
        data => {
          this.locationResponse = data;
          this.context.componentParent.selectedCountryId = this.locationResponse[0].id;
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
          this.context.componentParent.selectedStateId = this.locationResponse[0].id;

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
          this.context.componentParent.selectedCityId = this.locationResponse[0].id;

        }
      );
  }

}
