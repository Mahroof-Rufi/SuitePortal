import {Body, Controller, Post, Res } from '@nestjs/common';
import { AdminService } from './admin.service';
import { Response } from 'express';
import { AdminDB } from './admin.dao';

@Controller('admin')
export class AdminController {

    constructor(
        private _adminService:AdminService
    ) {}

    // admin login route
    @Post('login')
    async login(@Body() loginDto: AdminDB, @Res() res: Response): Promise<{ message: string }> {
        try { 
            const { email, password } = loginDto;

            const isValid = await this._adminService.validateUser(email, password);

            if (isValid) {
                return res.status(200).json({ message: 'Login successful' });
            } else {
                return res.status(401).json({ message: 'Invalid credentials' });
            }
        } catch (error) {
            return res.status(500).json({ message: error.message })
        }
  }
}
