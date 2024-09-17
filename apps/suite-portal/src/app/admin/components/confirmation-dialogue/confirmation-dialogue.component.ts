import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MaintenanceService } from '../../../home/services/maintenance.service';
import { MaintenanceRequest } from '@suiteportal/api-interfaces';

@Component({
  selector: 'sp-confirmation-dialogue',
  templateUrl: './confirmation-dialogue.component.html',
  styleUrls: ['./confirmation-dialogue.component.scss']
})
export class ConfirmationDialogueComponent {

  constructor(
    private _dialogRef: MatDialogRef<ConfirmationDialogueComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { context:string; id:string; title: string; message: string, reqData:MaintenanceRequest },
    private readonly _maintenanceService: MaintenanceService
  ) {}

  // cancel or close the confirmation modal
  onCancel(): void {
    this._dialogRef.close(false);
  }

  // to close the maintenance request 
  onCloseConfirm(): void {
    this._maintenanceService.closeMaintenanceRequest(this.data.id).subscribe({
      next: () => {
        this._maintenanceService.emitMaintenanceUpdate(this.data.id)
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        this.onCancel()
      }
    })
  }

  // to submit a new maintenance request
  onRequestConfirm(): void {
    console.log('sss');
    
    this._maintenanceService.sendMaintenanceRequest(this.data.reqData).subscribe({
      next: () => {
        this._maintenanceService.maintenanceFormReset$.next(true)
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        this.onCancel()
      }
    })
  }
} 
