import { Component, inject, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { initFlowbite } from 'flowbite';
import { AuthService } from './providers/auth.service';
import { User } from './models/user.interface';
import { AddTaskModalComponent } from './components/add-task-modal/add-task-modal.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, AddTaskModalComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  readonly authSer = inject(AuthService);

  user?: User | null = null;

  ngOnInit(): void {
    initFlowbite();
    this.authSer.$user.subscribe({
      next: (user: User | null) => {
        this.user = user;
      },
    });
  }

  logout() {
    this.authSer.logout();
  }
}
