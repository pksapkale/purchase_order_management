import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ApiResponse } from '../model/ApiResponse';
import { Docket } from '../model/Docket';

@Injectable({
  providedIn: 'root',
})
export class DocketsServiceService {
  constructor(private _http: HttpClient) {}

  get getDocketList() {
    // For getting dockets list
    return this._http.get<ApiResponse>(`${environment.api_path}/get_docket_list`);
  }


  get getPoData() {
    // For getting purchase order data
    return this._http.get<ApiResponse>(`${environment.api_path}/get_po_data`);
  }


  deleteDocket(obj: any) {
    return this._http.post<ApiResponse>(`${environment.api_path}/delete_docket`, obj);
  }


  upsertDockets(obj: Docket) {
    // For update or insert new docket
    return this._http.post<ApiResponse>(`${environment.api_path}/upsert_docket`, obj);
  }


}
