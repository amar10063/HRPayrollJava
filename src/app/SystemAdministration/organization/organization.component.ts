import { Component, OnInit } from '@angular/core';
import { GridApi, ColumnApi, CellComp } from 'ag-grid-community';
import {LocationBody} from '../organization/LocationBody';
import {DepartmentBody}from '../organization/DepartmentBody';
import {DesignationBody} from '../organization/DesignationBody';
import {CountryService} from 'src/app/WebServices/country.service';
import { LocationResponse } from './LocationResponse';
import{DepartmentResponse} from './DepartmentResponse';
import { from } from 'rxjs';
import { DesignationResponse } from './DesignationResponse';
import {GetLocationBody} from './GetLocationBody';
import { DeleteLocationBody } from './DeleteLocationBody';
import {DeleteDepartmentBody} from './DeleteDepartmentBody';
import {DeleteDesignationBody} from './DeleteDesignationBody';


@Component({
  selector: 'app-organization',
  templateUrl: './organization.component.html',
  styleUrls: ['./organization.component.css']
})
export class OrganizationComponent implements OnInit {
  constructor(private countryService:CountryService) {
    this.rowSelection = 'single';
   
    
  }
  api: GridApi;
  columnApi: ColumnApi;

  departmentApi: GridApi;
  departmentColumnApi: ColumnApi;

  designationApi: GridApi;
  designationColumnApi: ColumnApi;
  
  locationResponse:LocationResponse;
  departmentResponse:DepartmentResponse;
  designationResponse:DesignationResponse;

  rowSelection: string;
  columnDefs = [
    {
      headerName: 'Location Code', field: 'LocationCode', sortable: true, filter: true, editable:true, width: 120,

      cellStyle: function (params) {
        if (params.value === '') {
          // bordercolor: 'red'
         // alert("Please Enter Location Code");

          return { outline: '1px solid red' };

          //color: 'red', backgroundColor: 'green',
        } else {
          return { outline: 'white' };
        }
      }

    },
    {
      headerName: 'Location Name', field: 'LocationName', sortable: true, filter: true, editable:true, width: 120,

      cellStyle: function (params) {
        if (params.value === '') {
          // bordercolor: 'red'
         // alert("Please Enter Location Name");

          return { outline: '1px solid red' };

          //color: 'red', backgroundColor: 'green',
        } else {
          return { outline: 'white' };
        }
      }

    },
    {
      headerName: 'Description', field: 'LocationDescription', sortable: true, filter: true, editable:true, width: 130,

      cellStyle: function (params) {
        if (params.value === '') {
          // bordercolor: 'red'
         // alert("Please Enter Description");

          return { outline: '1px solid red' };

          //color: 'red', backgroundColor: 'green',
        } else {
          return { outline: 'white' };
        }
      }

    },
   
    { headerName: '', field: '', width: 467 }
   ];

    rowData;
    // = [
  //       { LocationCode: '001', LocationName:'Noida', LocationDescription:'Noida Location'},
  //       { LocationCode: '002', LocationName:'Gurgaon', LocationDescription:'Gurgaon Location'},
  //       { LocationCode: '003', LocationName:'Faridabad', LocationDescription:'Faridabad Location'},
  //       { LocationCode: '004', LocationName:'Delhi', LocationDescription:'Delhi Location'},
  //       { LocationCode: '005', LocationName:'Ghaziabad', LocationDescription:'Ghaziabad Location'}
  //  ];

  columnDefs1 = [
    { headerName: 'Location Name', field: 'LocationName', sortable: true, editable: true, filter: true, width: 120,

    cellEditor: "select",
    cellEditorParams: { values: extractValues(locationMappings) },
    valueFormatter: function (params) {
      return lookupValue(locationMappings, params.value);
    },
    valueParser: function (params) {
      return lookupKey(locationMappings, params.newValue);
    },
  },
    
    { headerName: 'Department Code', field: 'DepartmentCode', sortable: true, editable:true, filter: true, width: 140,
    
    cellStyle: function (params) {
      if (params.value === '') {
        // bordercolor: 'red'
      //  alert("Please Enter Department Code");

        return { outline: '1px solid red' };

        //color: 'red', backgroundColor: 'green',
      } else {
        return { outline: 'white' };
      }
    }

  },
    { headerName: 'Department Name', field: 'DepartmentName', sortable: true, editable:true, filter: true, width: 120,
    
    cellStyle: function (params) {
      if (params.value === '') {
        // bordercolor: 'red'
       // alert("Please Enter Department Name");

        return { outline: '1px solid red' };

        //color: 'red', backgroundColor: 'green',
      } else {
        return { outline: 'white' };
      }
    }

  },
    { headerName: 'Description', field: 'Description', sortable: true,editable:true, filter: true, width: 130, 
    
    cellStyle: function (params) {
      if (params.value === '') {
        // bordercolor: 'red'
       // alert("Please Enter Description");

        return { outline: '1px solid red' };

        //color: 'red', backgroundColor: 'green',
      } else {
        return { outline: 'white' };
      }
    }

  },
    { headerName: '', field: '', width: 330 }
  ];

  rowData1 = [
    { LocationName: 'Noida', DepartmentCode: '001', DepartmentName: 'IT', Description:'IT description' },
    { LocationName: 'Gurgaon', DepartmentCode: '002', DepartmentName: 'Accounts', Description:'Accounts description' },
    { LocationName: 'Faridabad', DepartmentCode: '003', DepartmentName: 'Finance', Description:'Finance description' },
    { LocationName: 'Delhi', DepartmentCode: '004', DepartmentName: 'AX', Description:'AX description' },
    { LocationName: 'Ghaziabad', DepartmentCode: '005', DepartmentName: 'Management', Description:'Management description' }
  ];

  columnDefs2 = [
    { headerName: 'Location Name', field: 'LocationName', sortable: true, filter: true, editable:true, width: 120,

    cellEditor: "select",
    cellEditorParams: { values: extractValues(locationMappings) },
    valueFormatter: function (params) {
      return lookupValue(locationMappings, params.value);
    },
    valueParser: function (params) {
      return lookupKey(locationMappings, params.newValue);
    },
  },
    
    { headerName: 'Department', field: 'DepartmentName', sortable: true, editable:true, filter: true, width: 120 ,

    cellEditor: "select",
    cellEditorParams: { values: extractValues(departmentMappings) },
    valueFormatter: function (params) {
      return lookupValue(departmentMappings, params.value);
    },
    valueParser: function (params) {
      return lookupKey(departmentMappings, params.newValue);
    },
  },
    { headerName: 'Designation Code', field: 'DesignationCode', sortable: true, editable:true, filter: true, width: 140,
    
    cellStyle: function (params) {
      if (params.value === '') {
        // bordercolor: 'red'
        alert("Please Enter Designation Code");

        return { outline: '1px solid red' };

        //color: 'red', backgroundColor: 'green',
      } else {
        return { outline: 'white' };
      }
    }

  },
    { headerName: 'Designation', field: 'DesignationName', sortable: true, editable:true, filter: true, width: 140 ,
    
    cellStyle: function (params) {
      if (params.value === '') {
        // bordercolor: 'red'
        alert("Please Enter Designation Name");

        return { outline: '1px solid red' };

        //color: 'red', backgroundColor: 'green',
      } else {
        return { outline: 'white' };
      }
    }

  },
    { headerName: 'Description', field: 'Description', sortable: true,editable:true, filter: true, width: 130,

    cellStyle: function (params) {
      if (params.value === '') {
        // bordercolor: 'red'
        alert("Please Enter Description");

        return { outline: '1px solid red' };

        //color: 'red', backgroundColor: 'green',
      } else {
        return { outline: 'white' };
      }
    }

  },
    { headerName: '', field: '', width: 180 }
  ];

  rowData2 = [
    { LocationName: 'Noida', DepartmentName: 'IT', DesignationCode: '001', DesignationName:'Software Developer', Description:'IT description' },
    { LocationName: 'Gurgaon', DepartmentName: 'Accounts', DesignationCode: '002', DesignationName:'Accountant', Description:'Accounts description' },
    { LocationName: 'Faridabad', DepartmentName: 'Finance', DesignationCode: '003', DesignationName:'CA', Description:'Finance description' },
    { LocationName: 'Delhi', DepartmentName: 'AX', DesignationCode: '004', DesignationName:'Technical', Description:'AX description' },
    { LocationName: 'Ghaziabad', DepartmentName: 'Management', DesignationCode: '005', DesignationName:'Manager', Description:'Management description' }
  
  ];

  
  public show: boolean = false;
  public hide: boolean = true;
  public buttonName: any = 'Add New';
  
    
  count = 1;

  ngOnInit() {
  }
  onAddLocation() {
   alert("add");
    let res = this.api.updateRowData({ add: [{ class:"location" }] });
    res.add.forEach(function (rowNode) {
      console.log('Added Row Node', rowNode);
    });
  }
  onAddDepartment() {
    alert("add");
     let res = this.departmentApi.updateRowData({ add: [{ class:"department" }] });
     res.add.forEach(function (rowNode) {
       console.log('Added Row Node', rowNode);
     });
   }
   onAddDesignation() {
    alert("add");
     let res = this.designationApi.updateRowData({ add: [{ class:"designation" }] });
     res.add.forEach(function (rowNode) {
       console.log('Added Row Node', rowNode);
     });
   }
  onGridLocationReady(params) {
    this.api = params.api;
    this.columnApi = params.columnApi;
  }
  onGridDepartmentReady(params) {
    this.departmentApi = params.api;
    this.departmentColumnApi = params.columnApi;
  }
  onGridDesignationReady(params) {
    this.designationApi = params.api;
    this.designationColumnApi = params.columnApi;
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
  onSelectionDepartmentChanged() {
    const selectedRows = this.departmentApi.getSelectedRows();
    let selectedRowsString = '';
    selectedRows.forEach(function (selectedRow, index) {
      if (index !== 0) {
        selectedRowsString += ', ';
      }
      selectedRowsString += selectedRow.athlete;
    });
    document.querySelector('#selectedRows').innerHTML = selectedRowsString;
  }
  onSelectionDesignationChanged() {
    const selectedRows = this.designationApi.getSelectedRows();
    let selectedRowsString = '';
    selectedRows.forEach(function (selectedRow, index) {
      if (index !== 0) {
        selectedRowsString += ', ';
      }
      selectedRowsString += selectedRow.athlete;
    });
    document.querySelector('#selectedRows').innerHTML = selectedRowsString;
  }

  onDeleteLocation() {
   
      alert("Are you sure you want to delete this ?")
      const deleteLocationBody = new DeleteLocationBody();
        const selectedNodes = this.api.getSelectedNodes();
    
      if(selectedNodes.length === 0){
   
        alert("Please Select any row.");
       
      }else{
       this.api.removeItems(selectedNodes);
       this.countryService.doDeleteLocation(deleteLocationBody)
      
      .subscribe(
        data => {
          this.locationResponse = data;
          console.log("key",LocationResponse);
            alert(this.locationResponse.MESSAGE);
        }
      
    );
   }
  }
   
  onDeleteDepartment() {
    alert("Are you sure you want to delete this ?")
    const deleteDepartmentBody = new DeleteDepartmentBody();
      const selectedNodes = this.departmentApi.getSelectedNodes();
  
    if(selectedNodes.length === 0){
 
      alert("Please Select any row.");
     
    }else{
     this.departmentApi.removeItems(selectedNodes);
     this.countryService.doDeleteDepartment(deleteDepartmentBody)
    
    .subscribe(
      data => {
        this.locationResponse = data;
        console.log("key",LocationResponse);
          alert(this.locationResponse.MESSAGE);
      }
      
    );
   }
  }

  onDeleteDesignation() {
    alert("Are you sure you want to delete this ?")
    const deleteDesignationBody = new DeleteDesignationBody();
      const selectedNodes = this.designationApi.getSelectedNodes();
  
    if(selectedNodes.length === 0){
 
      alert("Please Select any row.");
     
    }else{
     this.designationApi.removeItems(selectedNodes);
     this.countryService.doDeleteDesignation(deleteDesignationBody)
    
    .subscribe(
      data => {
        this.locationResponse = data;
        console.log("key",LocationResponse);
          alert(this.locationResponse.MESSAGE);
      }
      
    );
   }
  }
  onCellKeyLocationDown(e) {
    const keyPressed = e.event.key;
    if (keyPressed === 'Enter') {
      // alert("Enter ");
      const locationBody = new LocationBody();
      const getLocationBody = new GetLocationBody();
      const selectedNodes = this.api.getSelectedNodes();

      const selectedData = selectedNodes.map(node => node.data);
      var dataTest: Object;
      selectedData.map(node => dataTest = node as Object);
      
      locationBody.LocationCode = dataTest['LocationCode'];
       locationBody.LocationName = dataTest['LocationName'];
       locationBody.LocationDescription=dataTest['LocationDescription']

       if(dataTest['LocationCode'] === '')
       {
         alert("Plesae Enter Location code");
              }
              else if(dataTest['LocationName'] === '')
                         {
                           alert("Please Enter Location Name");
                                }
                         else if(dataTest['description'] === '')
                         {
                           alert("Please Enter Description");
                         }
      else {
        this.countryService.doLocation(locationBody)
          .subscribe(
            data => {
              this.locationResponse = data;

              alert(this.locationResponse.MESSAGE);

              if (this.locationResponse.STATUS === 'Success') {

                alert("Location Details");

                this.countryService.doGetLocation(getLocationBody)
                  .subscribe(
                    data => {
                      this.locationResponse = data;
                      this.rowData = this.locationResponse;
                    }
                  )
              }
            }

          );
      }

    }
  }
  // onCellKeyLocationDown(e) {
  //   const keyPressed = e.event.key;
    
    
  //   if (keyPressed === 'Enter') {
  //     alert("Enter ");
  //     const locationBody = new LocationBody();
  //     const selectedNodes = this.api.getSelectedNodes();
     
  //     const selectedData = selectedNodes.map(node => node.data);
  //     var dataTest: Object;
  //     selectedData.map(node => dataTest = node as Object);
  //     // alert(dataTest['locationCode']);
     
  //     locationBody.LocationCode = dataTest['LocationCode'];
  //     locationBody.LocationName = dataTest['LocationName'];
  //     locationBody.LocationDescription=dataTest['LocationDescription']

  //    // console.log("key",dataTest);
      
  //    if(dataTest['LocationCode'] === '')
  //     {
  //       alert("Plesae Enter Location code");
  //            }

  //           else if(dataTest['LocationName'] === '')
  //            {
  //              alert("Please Enter Location Name");
  //                   }
  //                 else if(dataTest['description'] === '')
  //            {
  //              alert("Please Enter Description");
  //                   }
  //                   else{
                     
  //                   this.countryService.doLocation(locationBody)
                    
  //                   .subscribe(
  //                     data => {
  //                       this.locationResponse = data;
  //                       console.log("key",LocationResponse);
  //                         alert(this.locationResponse.MESSAGE);
  //                     }
                      
  //                   );
  //                   }
  //   }
  onCellKeyDepartmentDown(e) {
    const keyPressed = e.event.key;
    
    
    if (keyPressed === 'Enter') {
      alert("Enter ");
      const departmentBody= new DepartmentBody();
      const selectedNodes = this.departmentApi.getSelectedNodes();
     // console.log("key",selectedNodes);
      const selectedData = selectedNodes.map(node => node.data);
      var dataTest: Object;
      selectedData.map(node => dataTest = node as Object);
      
     
     
      departmentBody.DepartmentCode = dataTest['DepartmentCode'];
      departmentBody.DepartmentName=dataTest['DepartmentName']
      departmentBody.Description=dataTest['Description']
      console.log("key",departmentBody)
      
      
     if(dataTest['LocationName'] === '')
      {
        alert("Plesae Enter Location Name");
             }
             

            else if(dataTest['DepartmentCode'] === '')
             {
               alert("Please Enter Department Code");
                    }
                     
              if(dataTest['DepartmentName'] === '')
              {
                alert("Plesae Enter Department Name");
                      }
                  else if(dataTest['Description'] === '')
             {
               alert("Please Enter Description");
                    }
                    else{
                     
                    this.countryService.doDepartment(departmentBody)
                    
                    .subscribe(
                      data => {
                        this.locationResponse = data;
                        console.log("key",LocationResponse);
                          alert(this.locationResponse.MESSAGE);
                      }
                      
                    );
                    }
    }
  }
  onCellKeyDesignationDown(e) {
    const keyPressed = e.event.key;
    
    
    if (keyPressed === 'Enter') {
      alert("Enter ");
      const designationBody= new DesignationBody();
      const selectedNodes = this.designationApi.getSelectedNodes();
     // console.log("key",selectedNodes);
      const selectedData = selectedNodes.map(node => node.data);
      var dataTest: Object;
      selectedData.map(node => dataTest = node as Object);
      
     
     
      designationBody.DesignationCode = dataTest['DesignationCode'];
      designationBody.DesignationName=dataTest['DesignationName']
      designationBody.Description=dataTest['Description']
      console.log("key",designationBody)
      
      
     if(dataTest['LocationName'] === '')
      {
        alert("Plesae Enter Location Name");
             }
             

            else if(dataTest['DepartmentName'] === '')
             {
               alert("Please Enter Department Name");
                    }
                     
              if(dataTest['DesignationCode'] === '')
              {
                alert("Plesae Enter Designation Code");
                      }
                  else if(dataTest['Designation'] === '')
             {
               alert("Please Enter Designation");
                    }
                    else if(dataTest['Description']==='')
                    {
                      alert("Please Enter Description");
                    }
                    else{
                     
                    this.countryService.doDesignation(designationBody)
                    
                    .subscribe(
                      data => {
                        this.locationResponse = data;
                        console.log("key",LocationResponse);
                          alert(this.locationResponse.MESSAGE);
                      }
                      
                    );
                    }
    }
  }
  // onCellKeyDown(e) {
  //   const keyPressed = e.event.key;
  //   this.colDef = this.api.getFocusedCell().column.getColId();

  //   if (keyPressed === 'Enter') {
  //     if (this.colDef === 'location') {
  //       alert('onCellKeyDown  ' + keyPressed + ' ' + this.colDef);
  //     }
  //   }

  // }

}
var locationMappings = {
  201002: "Ghaziabad",
  202307: "Noida",
  325600: "Bengal",
  262010: "Jammu & Kashmir",
  204030: "Kerala"
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
var departmentMappings = {
  it: "IT",
  f: "Finance",
  s: "Sales",
  mkt: "Marketing",
  hr: "HR"
}; 