import { Component, OnInit } from '@angular/core';
import { GridApi, ColumnApi, CellComp, CellClickedEvent } from 'ag-grid-community';
import { $ } from 'protractor';
import { DropdownComponent } from 'src/app/dropdown/dropdown.component';

@Component({
  selector: 'app-setup',
  templateUrl: './setup.component.html',
  styleUrls: ['./setup.component.css']
})
export class SetupComponent implements OnInit {
  cellStyleCustom;
  colDef: string;
  rowSelection: string;
  public components = {
    dropDownComponent: DropdownComponent
  };
  columnDefs1 = [
    {
      headerName: 'Department Code', field: 'departmentCode', sortable: true, filter: true, width: 160,
      cellClass: 'dropdown-cell', suppressMenu: true, suppressResize: true,
      cellRendererFramework: DropdownComponent,
      cellStyle: function (params) {
        if (params.value === '') {
          return { outline: '1px solid red' };
        } else {
          return { outline: '1px solid white' };
        }
      }
    },
    {
      headerName: 'Department Name', field: 'department', sortable: true, filter: true, editable: true, width: 240,
      cellStyle: function (params) {
        if (params.value === '') {
          return { outline: '1px solid red' };
        } else {
          return { outline: '1px solid white' };
        }
      }
    },
    {
      headerName: 'Description', field: 'description', sortable: true, filter: true, editable: true, width: 240,
      cellStyle: function (params) {
        if (params.value === '') {
          return { outline: '1px solid red' };
        } else {
          return { outline: '1px solid white' };
        }
      }
    }
  ];
  constructor() {
    this.noRowsOverlayComponent = 'customNoRowsOverlay';
    this.noRowsOverlayComponentParams = {
      noRowsMessageFunc: function () {
        return 'No Rows To Show';
      }
    };

   // this.rowSelection = 'single';

  }
  rowData1 = [{ departmentCode: '', department: '', description: '' },
  ];

  columnDefs2 = [
    { headerName: "All", checkboxSelection: true, field: "all", width: 150 },
    { headerName: 'Sr No.', field: 'serial', width: 200 },
    { headerName: 'Department', field: 'department', sortable: true, filter: true, editable: true, width: 250 },
    { headerName: 'Designation', field: 'designation', sortable: true, filter: true, editable: true, width: 240 }
  ];

  rowData2 = [
    { all: " ", checkboxSelection: true, serial: '1', department: 'IT', designation: 'Software Developer' },
    { all: " ", checkboxSelection: true, serial: '2', department: 'Finance', designation: 'Software Developer' },
    { all: " ", checkboxSelection: true, serial: '3', department: 'AX', designation: 'AX Technical' },
    { all: " ", checkboxSelection: true, serial: '4', department: 'Medical', designation: 'Doctor' },
    { all: " ", checkboxSelection: true, serial: '5', department: 'Accounts', designation: 'Accountant' }
  ];
  columnDefs3 = [
    { headerName: "All", checkboxSelection: true, field: "all", width: 200 },
    { headerName: 'Sr No.', field: 'serial', width: 250 },
    { headerName: 'Earnings', field: 'earnings', sortable: true, filter: true, editable: true, width: 390 }
  ];

  rowData3 = [
    { all: " ", checkboxSelection: true, serial: '1', earnings: ' ' },
    { all: " ", checkboxSelection: true, serial: '2', earnings: ' ' },
    { all: " ", checkboxSelection: true, serial: '3', earnings: ' ' },
    { all: " ", checkboxSelection: true, serial: '4', earnings: ' ' },
    { all: " ", checkboxSelection: true, serial: '5', earnings: ' ' }
  ];

  columnDefs4 = [
    { headerName: "All", checkboxSelection: true, field: "all", width: 200 },
    { headerName: 'Sr No.', field: 'serial', width: 250 },
    { headerName: 'Deductions', field: 'deductions', sortable: true, filter: true, editable: true, width: 390 }
  ];

  rowData4 = [
    { all: " ", checkboxSelection: true, serial: '1', deductions: ' ' },
    { all: " ", checkboxSelection: true, serial: '2', deductions: ' ' },
    { all: " ", checkboxSelection: true, serial: '3', deductions: ' ' },
    { all: " ", checkboxSelection: true, serial: '4', deductions: ' ' },
    { all: " ", checkboxSelection: true, serial: '5', deductions: ' ' }
  ];
  columnDefs5 = [
    { headerName: "All", checkboxSelection: true, field: "all", width: 200 },
    { headerName: 'Sr No.', field: 'serial', width: 250 },
    { headerName: 'Deductions', field: 'deductions', sortable: true, filter: true, editable: true, width: 390 }
  ];

  rowData5 = [
    { all: " ", checkboxSelection: true, serial: '1', deductions: ' ' },
    { all: " ", checkboxSelection: true, serial: '2', deductions: ' ' },
    { all: " ", checkboxSelection: true, serial: '3', deductions: ' ' },
    { all: " ", checkboxSelection: true, serial: '4', deductions: ' ' },
    { all: " ", checkboxSelection: true, serial: '5', deductions: ' ' }
  ];

  api: GridApi;
  columnApi: ColumnApi;
  private noRowsOverlayComponent;
  private noRowsOverlayComponentParams;
  public show = false;
  public hide = true;
  public buttonName: any = 'Add New';

  ngOnInit() {

  }
  onGridReady(params) {
    this.api = params.api;
    this.columnApi = params.columnApi;
    this.api.sizeColumnsToFit();
  }
  onAddClick() {
    let res = this.api.updateRowData({ add: [{ departmentCode: '', department: '', description: '' }] });
    res.add.forEach(function (rowNode) {
      console.log('Added Row Node', rowNode);
    });
  }
  onCellKeyDown(e) {
    const keyPressed = e.event.key;
    this.colDef = this.api.getFocusedCell().column.getColId();
    if (keyPressed === 'Enter') {
      const selectedNodes = this.api.getSelectedNodes();
      const selectedData = selectedNodes.map(node => node.data);
      var dataTest: Object;
      selectedData.map(node => dataTest = node as Object);
      if (dataTest['departmentCode'] === '') {
        alert('Please Enter Department Code');
      } else if (dataTest['department'] === '') {
        alert('Please Enter Department');
      } else if (dataTest['description'] === '') {
        alert('Please Enter Description');
      } else {

      }

    }
  }
  // onSingleCLick(event) {
  //   console.log('vcccccccccc');
  // }
  // onDoubleClicked(event) {
  //   console.log('vcvvvvvvvdsdfsdfsefsdfsdf');
  // }
}

