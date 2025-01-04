import { AfterViewInit, Component, inject, OnInit } from '@angular/core';
import { UsersService } from '../../providers/users.service';
import { User } from '../../models/user.interface';
import { AuthService } from '../../providers/auth.service';

@Component({
  selector: 'app-users-list',
  imports: [],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.css',
})
export class UsersListComponent implements OnInit, AfterViewInit {
  private readonly usersSer = inject(UsersService);

  usersList: User[] = [];

  ngOnInit(): void {
    this.usersSer.getUsers();
  }

  ngAfterViewInit(): void {
    this.usersSer.users$.subscribe({
      next: (users) => (this.usersList = users),
      error: ({ error }) => console.error(error.message),
    });
  }
}
