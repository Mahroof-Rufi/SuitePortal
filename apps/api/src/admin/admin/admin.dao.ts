import { Injectable } from '@nestjs/common';
import * as low from 'lowdb';
import * as FileSync from 'lowdb/adapters/FileSync';
import { Admin } from '@suiteportal/api-interfaces';

export interface AdminDB extends Admin {
    email: string,
    password: string,
}

const adapter = new FileSync<AdminDB[]>('./db/admins.json');
const db = low(adapter);

db.defaults({ admins: [] }).write();

@Injectable()
export class AdminDao {

  private get collection() {
    return db.get('admins');
  }

  // find admin data from lowdb using email
  async findAdminByEmail(email: string): Promise<AdminDB | undefined> {
    return this.collection.find({ email }).value();
  }
}
