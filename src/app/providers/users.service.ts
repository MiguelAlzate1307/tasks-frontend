import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../models/user.interface';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private readonly usersSub = new BehaviorSubject<User[]>([]);
  users$ = this.usersSub.asObservable();

  private readonly http = inject(HttpClient);

  getUsers() {
    const token = localStorage.getItem('token');
    this.http
      .get<User[]>(`${environment.apiUrl}/users`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .subscribe({
        next: (data: any) => this.usersSub.next(data.users),
        error: ({ error }) => console.error(error.message),
      });
  }
}
