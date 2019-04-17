import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-general',
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.css']
})
export class GeneralComponent implements OnInit {

  columnDefs = [
    { headerName: 'Country', field: 'country', sortable: true, filter: true, editable:true, width: 120 },
    { headerName: 'Language Code', field: 'languageCode', sortable: true, filter: true, editable:true, width: 150 },
    { headerName: 'Language', field: 'language', sortable: true, filter: true, editable:true, width: 120 },
    { headerName: 'Description', field: 'description', sortable: true, filter: true, editable:true, width: 150 },
    { headerName: '', field: '', width:460, }
   ];

  rowData = [
    { country:'India', languageCode: '001', language:'Hindi', description:'Language'},
    { country:'USA', languageCode: '002', language:'English', description:'Language'},
    { country:'Oman', languageCode: '003', language:'Arabic', description:'Language'},
    { country:'UAE', languageCode: '004', language:'Arabic', description:'Language'},
    { country:'Japan', languageCode: '005', language:'Japanese', description:'Language'}
  ];

  columnDefs1 = [
    { headerName: 'Country', field: 'country', sortable: true, filter: true, editable:true, width:120 },
    { headerName: 'Currency Code', field: 'currencyCode', sortable: true, filter: true, editable:true, width:150 },
    { headerName: 'Currency', field: 'currency', sortable: true, filter: true, editable:true, width: 120 },
    { headerName: 'Description', field: 'description', sortable: true, filter: true, editable:true, width: 150 },
    { headerName: '', field: '', width:460, }
  ];

  rowData1 = [
    { country:'India', currencyCode: '001', currency:'INR', description:'currency'},
    { country:'USA', currencyCode: '002', currency:'Dollar', description:'currency'},
    { country:'Oman', currencyCode: '003', currency:'Rial', description:'currency'},
    { country:'UAE', currencyCode: '004', currency:'Dirham', description:'currency'},
    { country:'Japan', currencyCode: '005', currency:'Yen', description:'currency'}
  ];

  columnDefs2 = [
    { headerName: 'Country', field: 'country', sortable: true, filter: true, editable:true, width: 120 },
    { headerName: 'Time Zone', field: 'timezone', sortable: true, filter: true, editable:true, width: 120 },
    {headerName: 'Description', field: 'description', sortable: true, filter: true, editable:true, width: 150 },
    { headerName: '', field: '', width:610, }
  ];

  rowData2 = [
    { country:'India', timezone: 'UTC+05:30 (IST)', description:'Time Zone'},
    { country:'USA', timezone: 'UTC−12:00', description:'Time Zone'},
    { country:'Oman', timezone: 'UTC+04:00', description:'Time Zone'},
    { country:'UAE', timezone: 'UTC+04:00', description:'Time Zone'},
    { country:'Japan', timezone: 'UTC+09:00 (JST)', description:'Time Zone'}
  ];

   
  constructor() { }

  public show: boolean = false;
  public hide: boolean = true;
  public buttonName: any = 'Add New';

  ngOnInit() {
  }

}
