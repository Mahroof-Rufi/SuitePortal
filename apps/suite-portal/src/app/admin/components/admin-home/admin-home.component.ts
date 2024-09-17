import { Component, OnInit } from '@angular/core';
import { MaintenanceService } from '../../../home/services/maintenance.service';
import { AdminService } from '../../services/admin.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogueComponent } from '../confirmation-dialogue/confirmation-dialogue.component';

@Component({
  selector: 'sp-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.scss']
})
export class AdminHomeComponent implements OnInit{

  // maintenance requests
  maintenanceRequests: any = [];

  constructor(
    private readonly _maintenanceService:MaintenanceService,
    private readonly _adminService:AdminService,
    private readonly _dialogue:MatDialog,
  ) {}

  ngOnInit(): void {
    // fetch all the maintenance requests from the DB
    this._maintenanceService.fetchAllMaintenanceRequests().subscribe({
      next: (res:any) => {
        if (res && res.requests) {
          this.maintenanceRequests = res.requests.sort((a: any, b: any) => {
            return new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime();
          });
        }
        
      },
      error: (err) => {
        console.log(err);
      }
    })

    // to change the updated data
    this.maintenanceRequests = this._maintenanceService.maintenanceRequestsSource$.subscribe(
      (closedRequestId: string) => {
        this.maintenanceRequests = this.maintenanceRequests.filter(
          request => request.id !== closedRequestId
        );
      }
    );
  }

  // open confirmation modal or dialogue to confirm the request close
  openConfirmDialog(requestId: string) {
    this._dialogue.open(ConfirmationDialogueComponent, {
      data: {
        context: 'close confirmation',
        id: requestId,
        title: 'Confirm Request Closure',
        message: 'Are you sure you want to close this maintenance request?'
      }
    });
  }

  // admin logout
  logout() {
    this._adminService.logout()
  }
}
