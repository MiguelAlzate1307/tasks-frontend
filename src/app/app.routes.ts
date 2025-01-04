import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { TasksListComponent } from './pages/tasks-list/tasks-list.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'tasks',
    component: TasksListComponent,
    canActivate: [authGuard],
  },
  {
    path: '**',
    redirectTo: '/tasks',
    pathMatch: 'full',
  },
];
