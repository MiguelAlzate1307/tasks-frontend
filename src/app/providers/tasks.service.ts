import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { BehaviorSubject } from 'rxjs';
import { Task } from '../models/task.interface';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  private readonly tasksSub = new BehaviorSubject<Task[]>([]);
  tasks$ = this.tasksSub.asObservable();

  private readonly http = inject(HttpClient);

  getTasks() {
    const token = localStorage.getItem('token');
    return this.http
      .get(`${environment.apiUrl}/tasks`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .subscribe({
        next: (data: any) => {
          this.tasksSub.next(data.tasks);
        },
        error: ({ error }) => {
          console.log(error.message);
        },
      });
  }

  editTask(id: string | undefined, formValue: any) {
    const token = localStorage.getItem('token');
    return this.http
      .patch(`${environment.apiUrl}/tasks/${id}`, formValue, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .subscribe({
        next: () => {
          this.getTasks();
        },
        error: ({ error }) => {
          console.log(error.message);
        },
      });
  }

  deleteTask(id: string | undefined) {
    const token = localStorage.getItem('token');
    return this.http
      .delete(`${environment.apiUrl}/tasks/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .subscribe({
        next: () => {
          this.getTasks();
        },
        error: ({ error }) => {
          console.log(error.message);
        },
      });
  }
}
