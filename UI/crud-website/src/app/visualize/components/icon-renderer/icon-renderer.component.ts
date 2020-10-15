import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';

import { AddRowComponent } from '../add-row/add-row.component';

@Component({
  selector: 'app-icon-renderer',
  templateUrl: './icon-renderer.component.html',
  styleUrls: ['./icon-renderer.component.scss']
})
export class IconRendererComponent implements OnInit {
  data: any;
  cellRenderParam: any;
  initParams: any

  constructor(public dialog: MatDialog) { }

  viewEditRowData(data, mode) {
    const dialogData = [];
    if (mode === 'Delete') {
      this.initParams.deleteFn({rowIndex: this.initParams.rowIndex, row: data});
      return;
    }
    Object.keys(data).forEach(key => {
      const column = {
        ...this.cellRenderParam.find(col => col.COLUMN_NAME === key),
        VALUE: data[key]
      }
      dialogData.push(column);
    });
    const viewRowDialogRef = this.dialog.open(AddRowComponent, {
      width: '1050px',
      data: {
        columns: dialogData,
        mode: mode
      }
    });
    viewRowDialogRef.afterClosed().subscribe(res => {
      if (mode === 'Edit') {
        const data = {
          updatedData: res,
          rowIndex: this.initParams.rowIndex.toString()
        }
        this.initParams.updateFn(data);
      }
    });
  }

  agInit(params: any) {
    this.initParams = params;
    this.data = params.data;
    this.cellRenderParam = params.dataValue;
  }

  ngOnInit() {
  }

}
