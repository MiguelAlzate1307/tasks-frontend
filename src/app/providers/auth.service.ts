import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment.development';
import { BehaviorSubject } from 'rxjs';
import { User } from '../models/user.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly userSubject = new BehaviorSubject<User | null>(null);

  private readonly http = inject(HttpClient);
  private readonly router = inject(Router);

  message: string | undefined = undefined;

  isLogged() {
    return !!localStorage.getItem('token');
  }

  authenticate(formValue: any, type: 'login' | 'register') {
    this.http.post(`${environment.apiUrl}/auth/${type}`, formValue).subscribe({
      next: (data: any) => {
        localStorage.setItem('token', data.token);
        this.userSubject.next(data.user);
        this.router.navigate(['/tasks']);
      },
      error: ({ error }) => {
        this.message = error.message;
        this.userSubject.next(null);
        setTimeout(() => {
          this.message = undefined;
        }, 3000);
      },
    });
  }

  get $user() {
    return this.userSubject.asObservable();
  }

  logout() {
    localStorage.removeItem('token');
    this.userSubject.next(null);
  }
}
