import { Module } from '@nestjs/common';
import { MaintenanceRequestModule } from '../maintenance-request/maintenance-request.module';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdminModule } from '../admin/admin/admin.module';

@Module({
  imports: [MaintenanceRequestModule,AdminModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
