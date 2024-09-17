import { NgModule } from '@angular/core';
import { SharedModule } from '../shared.module';
import { AdminLoginComponent } from './components/admin-login/admin-login.component';
import { AdminService } from './services/admin.service';
import { HttpClientModule } from '@angular/common/http';
import { AdminHomeComponent } from './components/admin-home/admin-home.component';
import { ConfirmationDialogueComponent } from './components/confirmation-dialogue/confirmation-dialogue.component';



@NgModule({
  imports: [
    SharedModule,
    HttpClientModule,
  ],
  declarations: [AdminLoginComponent, AdminHomeComponent, ConfirmationDialogueComponent],
  exports: [AdminLoginComponent,SharedModule],
  providers: [AdminService]
})
export class AdminModule { }
