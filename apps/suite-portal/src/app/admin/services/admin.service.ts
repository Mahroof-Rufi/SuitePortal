import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { environment } from 'apps/suite-portal/src/environments/environment';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable()
export class AdminService {

  isAuthenticated:Subject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(
    private _http:HttpClient,
    private _router:Router,
  ) { }

  // login req
  login(email: string, password: string) {
    return this._http.post(`${environment.API_URL}/admin/login`, {email, password})
  }

  // logout req
  logout() {
    this.isAuthenticated.next(false);
    this._router.navigateByUrl('/admin/login')
  }

}
