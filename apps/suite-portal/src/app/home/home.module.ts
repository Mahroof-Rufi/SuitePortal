import { NgModule } from '@angular/core';
import { HomeComponent } from './home.component';
import { SharedModule } from '../shared.module';
import { MaintenanceService } from './services/maintenance.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    SharedModule,
    HttpClientModule
  ],
  declarations: [HomeComponent],
  exports: [HomeComponent],
  providers: [MaintenanceService]
})
export class HomeModule { }
