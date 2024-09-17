import { Injectable } from '@nestjs/common';
import { AdminDao } from './admin.dao';

@Injectable()
export class AdminService {

    constructor(
        private _adminDao: AdminDao
    ) {}

    // validate email and password
    async validateUser(email: string, password: string): Promise<boolean> {
        const admin = await this._adminDao.findAdminByEmail(email);
        if (admin && admin.password === password) {
          return true;
        }
        return false;
      }
}
