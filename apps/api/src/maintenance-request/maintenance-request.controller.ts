import { BadRequestException, Body, Controller, Post, Get, Param, Put, Res } from '@nestjs/common';
import { MaintenanceRequest } from '@suiteportal/api-interfaces';
import { Response } from 'express';
import { MaintenanceRequestService } from './maintenance-request.service';

@Controller('maintenance-requests')
export class MaintenanceRequestController {

  constructor(
    private readonly _maintenanceRequestService: MaintenanceRequestService,
  ) {
    //
  }

  // maintenance request submission route
  @Post('/')
  public async createMaintenanceRequest(
    @Body() maintenanceRequest: MaintenanceRequest, @Res() res: Response
  ) {
    try {
      if (!maintenanceRequest?.summary) {
        throw new BadRequestException('Must provide a valid summary');
      }
      if (!maintenanceRequest?.serviceType) {
        throw new BadRequestException('Must provide a valid Service Type');
      }
      const request = await this._maintenanceRequestService.createMaintenanceRequest(maintenanceRequest);
      return res.status(200).json({ message: 'Request submission successful', req:request })
    } catch (error) {
      return res.status(500).json({ message: error.message })
    }
  }

  // route for fetch all existing maintenance requests
  @Get('/')
  public async getAllMaintenanceRequest(@Res() res: Response) {
    try {
      const reqs = await this._maintenanceRequestService.getAllMaintenanceRequest();
      res.status(200).json({ message:'Requests found successfully', requests:reqs })
    } catch (error) {
      return res.status(500).json({ message: error.message })
    }
  }

  // route for close maintenance request using id
  @Put('/:id')
  public async getMaintenanceRequest(
    @Param('id') id: string, @Res() res: Response
  ) {
    try {
      if (!id) {
        throw new BadRequestException('No id provided');
      }
      const updatedData = await this._maintenanceRequestService.closeMaintenanceRequest(id);
      res.status(200).json({ message: 'Request updated successfully', updatedData:updatedData })
    } catch (error) {
      return res.status(500).json({ message: error.message })
    }
  }

}
