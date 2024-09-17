import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from '../../services/admin.service';
import { Router } from '@angular/router';

@Component({
  selector: 'sp-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.scss']
})
export class AdminLoginComponent implements OnInit{
  loginForm: FormGroup;
  errMessage: string;

  constructor(
    private readonly _fb: FormBuilder, 
    private readonly _adminService: AdminService,
    private readonly _router: Router
  ) {}

  ngOnInit(): void {
    // initialize admin login form
    this.loginForm = this._fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    // send login request to the server conditionally
    if (this.loginForm.valid) {      
      this._adminService.login(this.loginForm.get('email').value, this.loginForm.get('password').value).subscribe({
        next: () => {  
          this._adminService.isAuthenticated.next(true);  
          this._router.navigateByUrl('/admin/home')
        },
        error: (err) => {  
          console.log(err);
          this.errMessage = err.error.message
        },
      });
    }
  }
}
