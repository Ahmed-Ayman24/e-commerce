import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from './../../../core/services/auth/auth.service';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { Router, RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink, TranslatePipe],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  isLoading: boolean = false;
  msgError: string = '';
  successMsg: string = '';

  loginForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.pattern(/^[A-Z]\w{7,}$/)]),
  });

  submitForm(): void {
    this.isLoading = true;
    this.authService.sendLoginForm(this.loginForm.value).subscribe({
      next: (res) => {
        if (res.message === 'success') {
          this.isLoading = false;
          this.msgError = '';
          setTimeout(() => {
            localStorage.setItem('token', res.token);
            this.authService.getUserData();
            this.router.navigate(['/home']);
          }, 3000);
          this.successMsg = res.message;
        }
      },
      error: (err: HttpErrorResponse) => {
        this.msgError = err.error.message;
        this.isLoading = false;
      }
    })
  }
}
