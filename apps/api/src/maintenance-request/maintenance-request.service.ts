import { Injectable } from '@nestjs/common';
import { MaintenanceRequest } from '@suiteportal/api-interfaces';
import { MaintenanceRequestDao, MaintenanceRequestDB } from './maintenance-request.dao';

@Injectable()
export class MaintenanceRequestService {

  constructor(
    private readonly _maintReqDao: MaintenanceRequestDao,
  ) {
    //
  }

  // create new maintenance request 
  async createMaintenanceRequest(maintenanceRequest: MaintenanceRequest) {
    return await this._maintReqDao.insertNewRequest(maintenanceRequest);
  }

  // fetch all active maintenance requests
  async getAllMaintenanceRequest(): Promise<MaintenanceRequestDB[]> {
    return await this._maintReqDao.getAllMaintenanceRequests();
  }

  // close maintenance request using id
  async closeMaintenanceRequest(id: string): Promise<MaintenanceRequestDB> {
    return await this._maintReqDao.closeMaintenanceRequest(id);
  }
}
