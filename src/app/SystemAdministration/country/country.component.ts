import { Component, OnInit } from '@angular/core';
import { GridApi, ColumnApi, CellComp } from 'ag-grid-community';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.css']
})
export class CountryComponent implements OnInit {
  constructor() {
    this.rowSelection = 'single';

  }
  api: GridApi;
  columnApi: ColumnApi;
 
  stateApi: GridApi;
  stateColumnApi: ColumnApi;

  cityApi: GridApi;
  cityColumnApi: ColumnApi

  postalApi: GridApi;
  postalColomnApi: ColumnApi;

  rowSelection: string;
  columnDefs = [
    {
      id: 0, headerName: 'Country Code', field: 'countryCode', sortable: true, filter: true, width: 120, editable: true,
      cellStyle: function (params) {
        if (params.value === '') {
          alert("Enter country code");
          return { outline: '3px solid red' };
        } else {
          return { outline: 'white' };
        }
      }

    },
    // tslint:disable-next-line: max-line-length
    {
      id: 1, headerName: 'Country Name', field: 'country', sortable: true, //cellEditor: "agTextCellEditor",
      //cellEditorParams: { useFormatter: true },
      filter: true, width: 130, editable: true,

      cellStyle: function (params) {


        if (params.value === '') {

          alert("Enter country name");

          //this.api.FocusedCell(1, "country");
          return { outline: '1px solid red' };


          //color: 'red', backgroundColor: 'green',
        } else {
          return { outline: 'white' };
        }

      }

    },
    { headerName: '', field: '', width: 590 }
  ];

  rowData = [];


  columnDefs1 = [
    {
      headerName: 'Country', field: 'country', sortable: true, editable: true, filter: true, width: 120,
      
      cellEditor: "select",
      
      cellEditorParams: { values: extractValues(countryMappings) },
      valueFormatter: function (params) {
        return lookupValue(countryMappings, params.value);
      },
      valueParser: function (params) {
        return lookupKey(countryMappings, params.newValue);
      }


    },
    { headerName: 'State', field: 'state', sortable: true, filter: true, editable: true, width: 120 ,
  
    cellStyle: function (params) {
      if (params.value === '') {
        // bordercolor: 'red'
        alert("Enter State name");

        return { outline: '1px solid red' };

        //color: 'red', backgroundColor: 'green',
      } else {
        return { outline: 'white' };
      }
    }

  },
    { headerName: 'Description', field: 'description', sortable: true, filter: true, width: 130 },
    { headerName: '', field: '', width: 470 }
  ];

  rowData1 = [
    // { state: 'UP', country: 'India', description: 'State Name' },
    // { state: 'Punjab', country: 'India', description: 'State Name' },
    // { state: 'Haryana', country: 'India', description: 'State Name' },
    // { state: 'Sikkim', country: 'India', description: 'State Name' },
    // { state: 'Rajasthan', country: 'India', description: 'State Name' }
  ];

  columnDefs2 = [

    { headerName: 'Country', field: 'country', sortable: true, editable: true, filter: true, width: 120,

    cellEditor: "select",
    cellEditorParams: { values: extractValues(countryMappings) },
    valueFormatter: function (params) {
      return lookupValue(countryMappings, params.value);
    },
    valueParser: function (params) {
      return lookupKey(countryMappings, params.newValue);
    }
  },
    { headerName: 'State', field: 'state', sortable: true, filter: true, editable: true, width: 120 ,
    cellEditor: "select",
    cellEditorParams: { values: extractValues(stateMappings) },
    valueFormatter: function (params) {
      return lookupValue(stateMappings, params.value);
    },
    valueParser: function (params) {
      return lookupKey(stateMappings, params.newValue);
    }
  
  },
    { headerName: 'City', field: 'city', sortable: true, filter: true, editable: true, width: 120 ,
  
    cellStyle: function (params) {
      if (params.value === '') {
        // bordercolor: 'red'
        alert("Enter city");

        return { outline: '1px solid red' };

        //color: 'red', backgroundColor: 'green',
      } else {
        return { outline: 'white' };
      }
    }
  
  },
    { headerName: 'Description', field: 'description', sortable: true, filter: true, width: 130 },
    { headerName: '', field: '', width: 350 }
  ];

  rowData2 = [
    // { city: 'Noida', state: 'UP', country: 'India', description: 'City Name' },
    // { city: 'Chandigarh', state: 'Punjab', country: 'India', description: 'City Name' },
    // { city: 'Gurugram', state: 'Haryana', country: 'India', description: 'City Name' },
    // { city: 'Gangtok', state: 'Sikkim', country: 'India', description: 'City Name' },
    // { city: 'Jaipur', state: 'Rajasthan', country: 'India', description: 'City Name' }
  ];

  columnDefs3 = [

    { headerName: 'Country', field: 'country', sortable: true, editable: true, filter: true, width: 120 ,
  
    cellEditor: "select",
    cellEditorParams: { values: extractValues(countryMappings) },
    valueFormatter: function (params) {
      return lookupValue(countryMappings, params.value);
    },
    valueParser: function (params) {
      
      return lookupKey(countryMappings, params.newValue);
    }

  },
    { headerName: 'State', field: 'state', sortable: true, filter: true, editable: true, width: 120 ,

  
    cellEditor: "select",
    cellEditorParams: { values: extractValues(stateMappings) },
    valueFormatter: function (params) {
      return lookupValue(stateMappings, params.value);
    },
    valueParser: function (params) {
      return lookupKey(stateMappings, params.newValue);
    }
  
  
  },
    { headerName: 'City', field: 'city', sortable: true, filter: true, editable: true, width: 120 ,
  
    cellEditor: "select",
    cellEditorParams: { values: extractValues(cityMappings) },
    valueFormatter: function (params) {
      return lookupValue(cityMappings, params.value);
    },
    valueParser: function (params) {
      return lookupKey(cityMappings, params.newValue);
    }

  },
    { headerName: 'Postal Code', field: 'postal', sortable: true, filter: true, editable: true, width: 120 ,
  
    cellStyle: function (params) {
      if (params.value === '') {
        // bordercolor: 'red'
        alert("Enter postal code");

        return { outline: '1px solid red' };

        //color: 'red', backgroundColor: 'green',
      } else {
        return { outline: 'white' };
      }
    }
  
  },
    { headerName: 'Description', field: 'description', sortable: true, filter: true, width: 130 },
    { headerName: '', field: '', width: 230 }
  ];

  rowData3 = [
    // { city: 'Noida', state: 'UP', country: 'India', postal: '201301', description: 'Postal Code No' },
    // { city: 'Chandigarh', state: 'Punjab', country: 'India', postal: '201301', description: 'Postal Code No' },
    // { city: 'Gurugram', state: 'Haryana', country: 'India', postal: '201301', description: 'Postal Code No' },
    // { city: 'Gangtok', state: 'Sikkim', country: 'India', postal: '201301', description: 'Postal Code No' },
    // { city: 'Jaipur', state: 'Rajasthan', country: 'India', postal: '201301', description: 'Postal Code No' }

  ];

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

  count = 0;

  ngOnInit() {
  }
  onAddClick() {
    this.api.setFocusedCell(this.count, "countryCode");
    //this.api.setFocusedCell(1, "country");
    this.count++;
    let res = this.api.updateRowData({ add: [{ country: 'India', countryCode: 'ed' }] });
    res.add.forEach(function (rowNode) {
      console.log('Added Row Node', rowNode);
    });
  }
  
  onAddState() {
   //this.api.setFocusedCell(this.count, "countryCode");
    //this.api.setFocusedCell(1, "country");
    //this.count++;
    //alert("add state");
    let res = this.stateApi.updateRowData({ add: [{ state: 'UP', country: 'India', description: 'State Name' }] });
    res.add.forEach(function (rowNode) {
      console.log('Added Row Node', rowNode);
    });
    
  }

  onAddCity() {
    //this.api.setFocusedCell(this.count, "countryCode");
     //this.api.setFocusedCell(1, "country");
     //this.count++;
     //alert("add state");
     let res = this.cityApi.updateRowData({ add: [{ city: 'Noida', state: 'UP', country: 'India', description: 'City Name' }] });
     res.add.forEach(function (rowNode) {
       console.log('Added Row Node', rowNode);
     });
     
   }
   onAddPostal()
   {
    let res = this.postalApi.updateRowData({ add: [{ city: 'Noida', state: 'UP', country: 'India', postal: '201301', description: 'Postal Code No' }] });
    res.add.forEach(function (rowNode) {
      console.log('Added Row Node', rowNode);
    });
   }
  
  onGridReady(params) {
    this.api = params.api;
    this.columnApi = params.columnApi;
  }
  onStateGridReady(params) {
    this.stateApi = params.api;
    this.stateColumnApi = params.columnApi;
  }

  onCityGridReady(params)
  {
    this.cityApi = params.api;
    this.cityColumnApi = params.columnApi; 
  }
  onPostalGridReady(params)
  {
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
    this.colDef = this.api.getFocusedCell().column.getColId();

    if (keyPressed === 'Enter') {
      // if (this.api.getColumnDef('country') === '') {
      //   alert('Add Country Name');
      // } else if (this.api.getValue('countryCode', this.api.getDisplayedRowAtIndex(1)) === '') {
      //   alert('Add Country Code');
      // } else {
      //   alert('call service ');
      // }

      const selectedNodes = this.api.getSelectedNodes();
      const selectedData = selectedNodes.map(node => node.data);
      const selectedDataStringPresentation = selectedData.map(node => node.country + ' ' + node.countryCode).join(', ');
      console.log('Selected nodes: ${selectedDataStringPresentation}');

    }
  }

}
var countryMappings = {
  In: "India",
  Fr: "France",
  En: "England",
  Au: "Australia"
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
  kp: "Bengal",
  jk: "Jammu & Kashmir",
  ke: "Kerala"
};
