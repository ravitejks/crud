import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule, MatIconModule, MatButtonModule, MatTooltipModule, MatSelectModule,
    MatFormFieldModule, MatDialogModule, MatCardModule, MatInputModule } from '@angular/material';
import { AgGridModule } from 'ag-grid-angular';
import { FlexLayoutModule } from '@angular/flex-layout';

import { VisualizeRoutingModule } from './visualize-routing.module';
import { VisualizeComponent } from './components/visualize/visualize.component';
import { IconRendererComponent } from './components/icon-renderer/icon-renderer.component';
import { AddRowComponent } from './components/add-row/add-row.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [VisualizeComponent, IconRendererComponent, AddRowComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    AgGridModule.withComponents([]),
    FlexLayoutModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    MatSelectModule,
    MatFormFieldModule,
    MatDialogModule,
    MatCardModule,
    MatInputModule,
    VisualizeRoutingModule,
    SharedModule
  ],
  entryComponents: [
    IconRendererComponent,
    AddRowComponent
  ]
})
export class VisualizeModule { }
