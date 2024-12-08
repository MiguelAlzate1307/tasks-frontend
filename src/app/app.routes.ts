import { Routes } from '@angular/router';
import { TasksListComponent } from './pages/tasks-list/tasks-list.component';
import { AddTaskComponent } from './pages/add-task/add-task.component';

export const routes: Routes = [
  {
    path: '',
    component: TasksListComponent,
  },
  {
    path: 'add-task',
    component: AddTaskComponent,
  },
  {
    path: '*',
    redirectTo: '',
    pathMatch: 'full',
  },
];
