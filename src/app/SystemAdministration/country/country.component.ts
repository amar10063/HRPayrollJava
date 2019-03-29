import { Component, OnInit } from '@angular/core';
import { GridApi, ColumnApi } from 'ag-grid-community';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.css']
})
export class CountryComponent implements OnInit {
  api: GridApi;
  columnApi: ColumnApi;

  rowSelection: string;

  columnDefs = [
    { headerName: 'Country Code', field: 'countryCode', sortable: true, filter: true, width: 120, editable: true },
    // tslint:disable-next-line: max-line-length
    { headerName: 'Country Name', field: 'country', sortable: true, filter: true, width: 130, editable: true },
    { headerName: '', field: '', width: 590 }
  ];

  rowData = [];

  columnDefs1 = [
    { headerName: 'Country', field: 'country', sortable: true, editable: true, filter: true, width: 120 },
    { headerName: 'State', field: 'state', sortable: true, filter: true, editable: true, width: 120 },
    { headerName: '', field: '', width: 600 }
  ];

  rowData1 = [
    { state: 'UP', country: 'India' },
    { state: 'Punjab', country: 'India' },
    { state: 'Haryana', country: 'India' },
    { state: 'Sikkim', country: 'India' },
    { state: 'Rajasthan', country: 'India' }
  ];

  columnDefs2 = [
    { headerName: 'Country', field: 'country', sortable: true, editable: true, filter: true, width: 120 },
    { headerName: 'State', field: 'state', sortable: true, filter: true, editable: true, width: 120 },
    { headerName: 'City', field: 'city', sortable: true, filter: true, editable: true, width: 120 },
    { headerName: '', field: '', width: 480 }
  ];

  rowData2 = [
    { city: 'Noida', state: 'UP', country: 'India' },
    { city: 'Chandigarh', state: 'Punjab', country: 'India' },
    { city: 'Gurugram', state: 'Haryana', country: 'India' },
    { city: 'Gangtok', state: 'Sikkim', country: 'India' },
    { city: 'Jaipur', state: 'Rajasthan', country: 'India' }
  ];

  columnDefs3 = [
    { headerName: 'Department Code', field: 'departmentCode', sortable: true, filter: true, editable: true, width: 120 },
    { headerName: 'Department Name', field: 'department', sortable: true, filter: true, editable: true, width: 120 },
    { headerName: '', field: '', width: 600 }
  ];

  rowData3 = [
    { departmentCode: '001', department: 'IT' },
    { departmentCode: '002', department: 'Finance' },
    { departmentCode: '003', department: 'AX' },
    { departmentCode: '004', department: 'Medical' },
    { departmentCode: '005', department: 'Accounts' }
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
  constructor() {
    this.rowSelection = 'single';

  }

  public show = false;
  public hide = true;
  public buttonName: any = 'Add New';

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
    var selectedRows = this.api.getSelectedRows();
    var selectedRowsString = "";
    selectedRows.forEach(function (selectedRow, index) {
      if (index !== 0) {
        selectedRowsString += ', ';
      }
      selectedRowsString += selectedRow.athlete;
    });
    document.querySelector('#selectedRows').innerHTML = selectedRowsString;
  }
  onCellKeyDown(e) {
    const colDef = this.columnApi.getRowGroupColumns;
    const keyPressed = e.event.key;
    alert('onCellKeyDown  ' + keyPressed + ' ' + colDef);

  }
}
