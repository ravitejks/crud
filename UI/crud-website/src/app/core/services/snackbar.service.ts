import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';

@Injectable()
export class SnackbarService {
  constructor(private snackBar: MatSnackBar) {}

  success(message: string) {
    this.showSnackbar(message, 'success-snackbar');
  }

  error(message: string) {
    this.showSnackbar(message, 'error-snackbar');
  }

  warn(message: string) {
    this.showSnackbar(message, 'warn-snackbar');
  }

  showSnackbar(message: string, cssClass: string) {
    this.snackBar.open(message, '', {
      duration: 2000,
      verticalPosition: 'top',
      horizontalPosition: 'end',
      panelClass: [ cssClass ]
    });
  }
}
