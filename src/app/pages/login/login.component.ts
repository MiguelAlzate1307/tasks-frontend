import { NgClass } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ValidatorService } from '../../providers/validator.service';
import { AuthService } from '../../providers/auth.service';
import { AlertComponent } from '../../components/alert/alert.component';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink, NgClass, AlertComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  private readonly fb = inject(FormBuilder);
  readonly validatorSer = inject(ValidatorService);
  readonly authSer = inject(AuthService);

  loginForm = this.fb.group({
    email: [
      '',
      [Validators.required, Validators.email, Validators.maxLength(50)],
    ],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  login() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.authSer.authenticate(this.loginForm.value, 'login');
  }
}
