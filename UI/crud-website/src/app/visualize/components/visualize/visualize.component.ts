import { Component, OnInit, OnChanges } from '@angular/core';
import { GridOptions } from 'ag-grid-community';

import { IconRendererComponent } from '../icon-renderer/icon-renderer.component';
import { TableService } from '../../services/table.service';
import { MatDialog } from '@angular/material';
import { AddRowComponent } from '../add-row/add-row.component';
import { ConfirmationDialogComponent } from '../../../shared/components/confirmation-dialog/confirmation-dialog.component';

const iconRenderer = {
  headerName: '',
  filter: false,
  cellRendererFramework: IconRendererComponent,
  cellStyle: { textAlign: 'center' },
  cellRendererParams: {
    dataValue: 'view-component'
  }
}

@Component({
  selector: 'app-visualize',
  templateUrl: './visualize.component.html',
  styleUrls: ['./visualize.component.scss']
})

export class VisualizeComponent implements OnInit, OnChanges {

  tableNames;
  tables;
  selectedTable; // To handle current worksheet when we are having multiple worksheets
  columnDefs = [];
  tableColumnNames = [];
  rowData = [];

  gridOptions = {
    rowData: this.rowData,
    // enableBrowserTooltips: true,
    // floatingFilter: true,
    suppressCellSelection: true,
    suppressNoRowsOverlay: true,
  } as GridOptions;

  /*onGridReady(gridOptions: GridOptions) {
    if (gridOptions.api) {
      gridOptions.api.sizeColumnsToFit();
      gridOptions.api.showLoadingOverlay();
      gridOptions.suppressNoRowsOverlay = false;
      // gridOptions.api.setRowData(this.data);
    }
  }*/

  constructor(public dialog: MatDialog, private tableService: TableService) {
  }

  addRow() {
    /*let columns: any = Object.values(this.tables)[0];
    let row = [];
    let rowObj = {};
    columns.forEach(col => {
      rowObj = {
        ...rowObj,
        [col.COLUMN_NAME]: 'Hello'
      }
    });
    row.push(rowObj);
    this.gridOptions.api.updateRowData({ add: row });*/
    const addRowDialogRef = this.dialog.open(AddRowComponent, {
      width: '1050px',
      data: {
        columns: Object.values(this.tables)[0]
      }
    });
    addRowDialogRef.afterClosed().subscribe(res => {
      this.gridOptions.api.updateRowData({ add: [res] });
      this.rowData.push(res);
      this.gridOptions.api.setRowData(this.rowData);
      this.tableService.addTableRow({table: this.selectedTable, payload: res}).subscribe(res => {
        this.loadDataGrid();
      });
    });
  }

  onTableSelectionChange(table) {
    this.selectedTable = table;
    this.initializeGrid();
  }

  ngOnChanges(changes) {}

  updateData = (data) => {
    const rowNode = this.gridOptions.api.getRowNode(data.rowIndex);
    rowNode.setData(data.updatedData);
    this.gridOptions.rowData.splice(data.rowIndex, 1, rowNode.data);
    this.gridOptions.api.setRowData(this.gridOptions.rowData);
    this.tableService.updateTableRow({
      table: this.selectedTable,
      id: data.updatedData[this.tableColumnNames[0]],
      payload: data.updatedData }).subscribe(res => {
        this.loadDataGrid();
      });
  }

  deleteRow = (data) => {
    const delConfirmDialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '400px',
      data: {
        title: 'Delete Row',
        message: 'Do you want to delete this Row?'
      }
    });
    delConfirmDialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.gridOptions.rowData.splice(data.rowIndex, 1);
        this.gridOptions.api.setRowData(this.gridOptions.rowData);
        this.tableService.deleteTableRow({table: this.selectedTable, id: data.row[this.tableColumnNames[0]]})
          .subscribe(res => {
            this.loadDataGrid();
          });
      }
    });
  }

  loadDataGrid() {
    this.tableService.getAllTableRows(this.selectedTable).subscribe((res:any[]) => {
      this.gridOptions.api.setRowData(res);
    });
  }

  initializeGrid() {
    this.tableService.getAllTables().subscribe(res => {
      this.tables = res;
      this.tableNames = Object.keys(this.tables);
      if (!this.selectedTable) {
        this.selectedTable = this.tableNames[0];
      }
      let columns: any = Object.values(this.tables)[this.tableNames.indexOf(this.selectedTable)];
      this.tableColumnNames = columns.map(c => c.COLUMN_NAME);
      this.columnDefs = [];
      columns.forEach(col => {
        const obj = {
          field: col.COLUMN_NAME,
          floatingFilter: true,
          filter: true,
          cellStyle: { textAlign: 'left' }
        }
        this.columnDefs.push(obj);
      });
      if (this.gridOptions.api) {
        const cellRenderParams = {
          headerName: '',
          filter: false,
          cellRendererFramework: IconRendererComponent,
          cellStyle: { textAlign: 'center' },
          cellRendererParams: {
            dataValue: Object.values(this.tables)[0],
            updateFn: this.updateData,
            deleteFn: this.deleteRow,
            // allRows: this.gridOptions.api.refreshRows
          }
        }
        // this.columnDefs.push(iconRenderer);
        this.columnDefs.push(cellRenderParams);
        this.gridOptions.api.setColumnDefs(this.columnDefs);
        // this.gridOptions.getRowNodeId = (data) => {return this.tableColumnNames[0]}
        this.gridOptions.api.sizeColumnsToFit();
        this.loadDataGrid();
      }
    });
  }

  ngOnInit() {
    this.initializeGrid();
  }

}
