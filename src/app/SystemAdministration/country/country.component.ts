import { Component, OnInit } from '@angular/core';
import { GridApi, ColumnApi } from 'ag-grid-community';

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

  rowSelection: string;

  columnDefs = [
    { id: 0, headerName: 'Country Code', field: 'countryCode', sortable: true, filter: true, width: 120, editable: true },
    // tslint:disable-next-line: max-line-length
    { id: 1, headerName: 'Country Name', field: 'country', sortable: true, filter: true, width: 130, editable: true },
    { headerName: '', field: '', width: 590 }
  ];

  rowData = [];


  columnDefs1 = [
    { headerName: 'Country', field: 'country', sortable: true, editable: true, filter: true, width: 120 },
    { headerName: 'State', field: 'state', sortable: true, filter: true, editable: true, width: 120 },
    { headerName: 'Description', field: 'description', sortable: true, filter: true, width: 130 },
    { headerName: '', field: '', width: 470 }
  ];

  rowData1 = [
    { state: 'UP', country: 'India', description: 'State Name' },
    { state: 'Punjab', country: 'India', description: 'State Name' },
    { state: 'Haryana', country: 'India', description: 'State Name' },
    { state: 'Sikkim', country: 'India', description: 'State Name' },
    { state: 'Rajasthan', country: 'India', description: 'State Name' }
  ];

  columnDefs2 = [

    { headerName: 'Country', field: 'country', sortable: true, editable: true, filter: true, width: 120 },
    { headerName: 'State', field: 'state', sortable: true, filter: true, editable: true, width: 120 },
    { headerName: 'City', field: 'city', sortable: true, filter: true, editable: true, width: 120 },
    { headerName: 'Description', field: 'description', sortable: true, filter: true, width: 130 },
    { headerName: '', field: '', width: 350 }
  ];

  rowData2 = [
    { city: 'Noida', state: 'UP', country: 'India', description: 'City Name' },
    { city: 'Chandigarh', state: 'Punjab', country: 'India', description: 'City Name' },
    { city: 'Gurugram', state: 'Haryana', country: 'India', description: 'City Name' },
    { city: 'Gangtok', state: 'Sikkim', country: 'India', description: 'City Name' },
    { city: 'Jaipur', state: 'Rajasthan', country: 'India', description: 'City Name' }
  ];

  columnDefs3 = [

    { headerName: 'Country', field: 'country', sortable: true, editable: true, filter: true, width: 120 },
    { headerName: 'State', field: 'state', sortable: true, filter: true, editable: true, width: 120 },
    { headerName: 'City', field: 'city', sortable: true, filter: true, editable: true, width: 120 },
    { headerName: 'Postal Code', field: 'postal', sortable: true, filter: true, editable: true, width: 120 },
    { headerName: 'Description', field: 'description', sortable: true, filter: true, width: 130 },
    { headerName: '', field: '', width: 230 }
  ];

  rowData3 = [
    { city: 'Noida', state: 'UP', country: 'India', postal: '201301', description: 'Postal Code No' },
    { city: 'Chandigarh', state: 'Punjab', country: 'India', postal: '201301', description: 'Postal Code No' },
    { city: 'Gurugram', state: 'Haryana', country: 'India', postal: '201301', description: 'Postal Code No' },
    { city: 'Gangtok', state: 'Sikkim', country: 'India', postal: '201301', description: 'Postal Code No' },
    { city: 'Jaipur', state: 'Rajasthan', country: 'India', postal: '201301', description: 'Postal Code No' }

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

  ngOnInit() {
  }
  onAddClick() {
    let res = this.api.updateRowData({ add: [{ country: 'India', countryCode: 'ed' }] });
    res.add.forEach(function (rowNode) {
      console.log('Added Row Node', rowNode);
    });
  }
  onGridReady(params) {
    this.api = params.api;
    this.columnApi = params.columnApi;
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
      if (this.colDef === 'country') {
        alert('onCellKeyDown  ' + keyPressed + ' ' + this.colDef);
      }
    }

  }
}
