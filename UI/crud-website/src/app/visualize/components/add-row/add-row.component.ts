import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-row',
  templateUrl: './add-row.component.html',
  styleUrls: ['./add-row.component.scss']
})
export class AddRowComponent implements OnInit {
  addEditRowFormGroup: FormGroup;
  mode = 'Add';

  constructor(public dialogRef: MatDialogRef<AddRowComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder) {
    this.addEditRowFormGroup = new FormGroup({})
    this.dialogRef.keydownEvents().subscribe(event => {
      if (event.key === 'Escape') {
        this.dialogRef.close();
      }
    });
  }

  onAddRow() {
    if (this.mode === 'View') {
      this.dialogRef.close();
      return;
    }
    if (this.mode === 'Add') {
      this.addEditRowFormGroup.controls['ID'].setValue(0)
    }
    let rowObj = {};
    Object.keys(this.addEditRowFormGroup.controls).forEach(key => {
      rowObj = {
        ...rowObj,
        [key]: this.addEditRowFormGroup.controls[key].value
      }
    });
    this.dialogRef.close(rowObj);
  }

  ngOnInit() {
    if (this.data.hasOwnProperty('mode')) {
      this.mode = this.data.mode;
    }
    this.data.columns.forEach(ele => this.addFormControl(ele));
    if (this.data.hasOwnProperty('mode') && this.data.mode.toLowerCase() === 'view') {
      this.addEditRowFormGroup.disable();
    }
  }

  addFormControl(element) {
    const requiredValidators = [];
    if (element.IS_NULLABLE.toLowerCase() === 'no') {
      requiredValidators.push(Validators.required);
    }
    if (element.CHARACTER_MAXIMUM_LENGTH) {
      // requiredValidators.push(Validators.length)
    }
    const frmControl = new FormControl('', requiredValidators);
    this.addEditRowFormGroup.addControl(element.COLUMN_NAME, frmControl);
    this.addEditRowFormGroup.controls[element.COLUMN_NAME].valueChanges.subscribe(val => {
      if (this.addEditRowFormGroup.controls[element.COLUMN_NAME].errors) {
        this.addEditRowFormGroup.controls[element.COLUMN_NAME].setErrors({ 'incorrect': false });
      }
    });
    if (element.COLUMN_NAME.toLowerCase() === 'id') {
      this.addEditRowFormGroup.controls[element.COLUMN_NAME].disable()
    }
    if (element.VALUE) {
      this.addEditRowFormGroup.controls[element.COLUMN_NAME].setValue(element.VALUE);
    }
  }

}
