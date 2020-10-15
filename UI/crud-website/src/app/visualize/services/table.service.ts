import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TableService {

  webApiBaseURL = environment.crudWebServerURL; 
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'withCredentials': 'true'
    })
  };

  constructor(private httpClient: HttpClient) { }

  getAllTables() {
    return this.httpClient.get(this.webApiBaseURL + '/Default')
    // return this.httpClient.get('../../assets/data/table1.json');
  }

  getAllTableRows(obj) {
    return this.httpClient.get(this.webApiBaseURL + '/' + obj);
  }

  addTableRow(obj) {
    return this.httpClient.post(this.webApiBaseURL + '/' + obj.table, obj.payload);
  }

  updateTableRow(obj) {
    return this.httpClient.put(this.webApiBaseURL + '/' + obj.table + '/' + obj.id, obj.payload);
  }

  deleteTableRow(obj) {
    return this.httpClient.delete(this.webApiBaseURL + '/' + obj.table + '/' + obj.id);
  }
}
