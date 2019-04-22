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
  params:any;
  selectedLevel:Object={};
  


  locationResponse: GetAllLocationResponse[];
  selectedValue;
  action;
  context;
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
      this.getAllState();
    } else if (this.params === 'city') {
      this.getAllCity();
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
          this.locationResponse[0] = getAllLocationResponse;

        }

      );
  }
  getAllCountry(): any {
    const universalBody = new UniversalBody();
    this.countryService.countryDropdown(universalBody)
      .subscribe(
        data => {
          this.locationResponse = data;
          console.log('this.pa: ' + JSON.stringify(data));
          var getAllLocationResponse = new GetAllLocationResponse();
          getAllLocationResponse.name = 'Select';
          this.locationResponse[0] = getAllLocationResponse;
          //console.log('data:  ' + JSON.stringify(this.locationResponse));
        }
      );
  }
  getSelectedValue(event) {
    if (this.params === 'country') {
      this.context.componentParent.selectedCountryId=event.target.value;
      console.log("getted", this.context.componentParent.selectedCountryId);
    } else if (this.params === 'state') {
      this.context.componentParent.updateData(event.target.value,'state');
    } else if (this.params === 'city') {
      this.context.componentParent.updateData(event.target.value,'city');
    }
  }
  getAllState(): any {
    const universalBody = new UniversalBody();
    this.countryService.stateDropdown(universalBody)
      .subscribe(
        data => {
          this.locationResponse = data;
          var getAllLocationResponse = new GetAllLocationResponse();
          getAllLocationResponse.name = 'Select';
          this.locationResponse[0] = getAllLocationResponse;

        }
      );
  }

  getAllCity(): any {
    const universalBody = new UniversalBody();
    this.countryService.cityDropdown(universalBody)
      .subscribe(
        data => {
          this.locationResponse = data;
          var getAllLocationResponse = new GetAllLocationResponse();
          getAllLocationResponse.name = 'Select';
          this.locationResponse[0] = getAllLocationResponse;
        }
      );
  }

}
