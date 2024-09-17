import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MaintenanceRequest } from '@suiteportal/api-interfaces';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { environment } from 'apps/suite-portal/src/environments/environment';
import { Subject } from 'rxjs';

@Injectable()
export class MaintenanceService {

  maintenanceRequestsSource$ = new Subject();
  maintenanceFormReset$ = new Subject();

  constructor(
    private _http:HttpClient,
  ) { }

  // to notify the components the updation of maintenance requests
  emitMaintenanceUpdate(requestId: string) {
    this.maintenanceRequestsSource$.next(requestId);
  }

  // req for create new maintenance request
  sendMaintenanceRequest(maintenanceForm:MaintenanceRequest) {
    return this._http.post(`${environment.API_URL}/maintenance-requests`, maintenanceForm)
  }

  // req for fetch all the maintenance requests
  fetchAllMaintenanceRequests() {
    return this._http.get(`${environment.API_URL}/maintenance-requests`)
  }

  // req for close a particular maintenance request
  closeMaintenanceRequest(id:string) {
    return this._http.put(`${environment.API_URL}/maintenance-requests/${id}`, id)
  }
}
