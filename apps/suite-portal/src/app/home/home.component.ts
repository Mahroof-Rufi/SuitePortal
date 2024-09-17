import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ALL_SERVICE_TYPES } from '@suiteportal/api-interfaces';
import { MaintenanceService } from './services/maintenance.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogueComponent } from '../admin/components/confirmation-dialogue/confirmation-dialogue.component';

@Component({
  selector: 'pm-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  serviceTypes = ALL_SERVICE_TYPES;
  maintenanceForm:FormGroup;

  constructor(
    private _fb:FormBuilder,
    private _maintenanceService:MaintenanceService,
    private _dialogue:MatDialog,
  ) {}

  ngOnInit(): void {
    // initialize maintenance request form
    this.maintenanceForm = this._fb.group({
      unit: [null, [Validators.required]],
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      serviceType: ['', Validators.required],
      summary: ['', Validators.required],
      details: ['', Validators.required]
    });

    // to reset the form when the form is submitted
    this._maintenanceService.maintenanceFormReset$.subscribe({
      next: () => {
        this.maintenanceForm.reset()
      }
    })
  }

  // open form submission confirmation
  submitMaintenance() {
    if (this.maintenanceForm.valid) {
      this._dialogue.open(ConfirmationDialogueComponent, {
        data: {
          context: 'request confirmation',
          title: 'Confirm Request',
          message: 'Are you sure you want to submit this maintenance request?',
          reqData: this.maintenanceForm.value
        }
      });
      } else {
        this.maintenanceForm.markAllAsTouched()
    }
  }

}
