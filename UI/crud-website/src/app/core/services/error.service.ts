import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { MatSnackBar } from '@angular/material';

// import { AppConfig } from '../../app-config';

/**
 * Service used for unifying how errors are handled
 */

const ERROR_SNACKBAR_DURATION = 10000;

@Injectable()
export class ErrorService {
  constructor(private http: HttpClient, private sb: MatSnackBar) {}

  get url(): string {
    return '/errors';
  }

  logErrorOnServer(msg: string, showSnackbar = false) {
    // IE10 and earlier do not support console in production:
    if (console) {
      console.log('Logging error to server', msg);
    }
    const params = new HttpParams().append('message', msg);
    // HTTP requests are automatically unsubscribed:
    this.http.post(this.url, {}, { params }).subscribe();
    if (showSnackbar) {
      this.sb.open(msg, 'Close', { duration: ERROR_SNACKBAR_DURATION });
    }
  }
}
