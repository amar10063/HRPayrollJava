import { Component, OnInit } from '@angular/core';
import { GetLocationBody } from '../SystemAdministration/organization/GetLocationBody';
import { GetAllDepartmentBody } from '../HRPayroll/employee/EmployeeApiResponse/GetAllDepartmentBody'
import { AllWeb } from "src/app/WebServices/AllWeb.service";
import { GetAllLocationResponse } from '../HRPayroll/employee/EmployeeApiResponse/GetAllLocationResponse';
import { INoRowsOverlayAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';
import { UniversalBody } from '../WebServices/WebServiceBody/UniversalBody';
import { GetCountryResponse } from '../WebServices/WebServiceResponse/CountryResponse/GetCountryResponse';

@Component({
  selector: 'app-location-dropdown',
  templateUrl: './location-dropdown.component.html',
  styleUrls: ['./location-dropdown.component.css']
})
export class LocationDropdownComponent implements INoRowsOverlayAngularComp {

  params: any;
  selectedLevel: Object = {};
  agInit(params: ICellRendererParams): void {
    this.params = params['value'];
    console.log('param: ' + this.params);
    if (this.params === 'location') { this.getAllLocation(); }
    else if (this.params === 'department') { this.getAllDepartment(); }

    else if (this.params === 'country') { this.getAllCountry(); }

    else if (this.params === 'state') {
      this.getAllState();
    }
    else if (this.params === 'city') {
      this.getAllCity();
    }
  }

  locationResponse: GetAllLocationResponse[];

  constructor(private countryService: AllWeb) {
  }

  getAllLocation(): any {
    var locationBody = new GetLocationBody();
    locationBody.userID = 1;
    this.countryService.doGetLocation(locationBody)
      .subscribe(
        data => {
          this.locationResponse = data;
          var getAllLocationResponse = new GetAllLocationResponse();
          getAllLocationResponse.name = 'Select';
          this.locationResponse[0] = getAllLocationResponse;
          console.log('data:  ' + JSON.stringify(this.locationResponse));
        }

      );
  }
  getAllDepartment(): any {
    var departmentBody = new GetAllDepartmentBody();
    departmentBody.userID = 1;
    this.countryService.getDepartment(departmentBody)
      .subscribe(
        data => {
          this.locationResponse = data;
          var getAllLocationResponse = new GetAllLocationResponse();
          getAllLocationResponse.name = 'Select';
          this.locationResponse[0] = getAllLocationResponse;
          console.log('data:  ' + JSON.stringify(this.locationResponse));
        }

      );
  }
  getAllCountry(): any {
    const universalBody = new UniversalBody();
    this.countryService.countryDropdown(universalBody)
      .subscribe(
        data => {
          this.locationResponse = data;
          var getAllLocationResponse = new GetAllLocationResponse();
          getAllLocationResponse.name = 'Select';
          this.locationResponse[0] = getAllLocationResponse;
          //console.log('data:  ' + JSON.stringify(this.locationResponse));
        }
      );
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
          //console.log('data:  ' + JSON.stringify(this.locationResponse));
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
          //console.log('data:  ' + JSON.stringify(this.locationResponse));
        }
      );
  }
  
  onGroupChange(event)
  {
    this.selectedLevel = event.target.value;
    alert(this.selectedLevel);
    //alert(event.target.value);
    
  }
}
