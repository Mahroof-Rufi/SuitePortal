import { Injectable } from '@nestjs/common';
import { MaintenanceRequest } from '@suiteportal/api-interfaces';
import * as low from 'lowdb';
import * as FileSync from 'lowdb/adapters/FileSync';
import * as nanoid from 'nanoid';

export interface MaintenanceRequestDB extends MaintenanceRequest {
  id: string;
  submittedAt: Date;
  isActive: boolean
}

export interface MaintenanceRequestData {
  requests: MaintenanceRequestDB[];
}

const adapter = new FileSync<MaintenanceRequestDB>('./db/maint-requests.json')
const db = low(adapter)

db.defaults({ requests: [] }).write();

@Injectable()
export class MaintenanceRequestDao {

  private get collection(): any {
    return db.get('requests');
  }

  constructor() {
    //
  }

  // insert new maintenance request to the DB
  async insertNewRequest(maintenanceRequest: MaintenanceRequest) {
    const id = { id: nanoid.nanoid(10) };
    await this.collection
      .push({
        ...id,
        ...maintenanceRequest,
        submittedAt: new Date(),
        isActive: true 
      })
      .write()
    return id;
  }

  // fetch all active maintenance requests from the DB
  async getAllMaintenanceRequests(): Promise<MaintenanceRequestDB[]> {
    return await this.collection.filter({ isActive: true }).value();
  }  

  // close maintenance request using id
  async closeMaintenanceRequest(id: string): Promise<MaintenanceRequestDB> {
    const maintenanceRequest = await this.collection.find({ id }).value();

    if (!maintenanceRequest) {
      throw new Error(`Maintenance request with id ${id} not found`);
    }

    this.collection
    .find({ id })
    .assign({ isActive: false, closedAt: new Date() }) 
    .write();

    return this.collection.find({ id }).value();
  }
}
