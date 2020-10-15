import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import {
  MatFormFieldModule, MatInputModule, MatIconModule, MatDialogModule, MatChipsModule,
  MatAutocompleteModule, MatTooltipModule, MatButtonModule, MatCheckboxModule
} from '@angular/material';

import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';

@NgModule({
  declarations: [
    ConfirmationDialogComponent
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatDialogModule,
    MatChipsModule,
    MatAutocompleteModule,
    MatTooltipModule,
    MatButtonModule,
    MatCheckboxModule
  ],
  exports: [ConfirmationDialogComponent],
  entryComponents: [ConfirmationDialogComponent]
})
export class SharedModule { }
