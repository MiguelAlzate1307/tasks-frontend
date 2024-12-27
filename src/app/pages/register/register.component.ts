import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ValidatorService } from '../../providers/validator.service';
import { NgClass } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../providers/auth.service';
import { AlertComponent } from '../../components/alert/alert.component';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, NgClass, RouterLink, AlertComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  private readonly fb = inject(FormBuilder);
  readonly validatorSer = inject(ValidatorService);
  readonly authSer = inject(AuthService);

  registerForm = this.fb.group({
    name: ['', [Validators.required, Validators.maxLength(30)]],
    username: ['', [Validators.required, Validators.maxLength(20)]],
    email: [
      '',
      [Validators.required, Validators.maxLength(50), Validators.email],
    ],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  register() {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    this.authSer.authenticate(this.registerForm.value, 'register');
  }
}
