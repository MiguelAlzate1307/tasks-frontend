import {
  Component,
  inject,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { TasksService } from '../../providers/tasks.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tasks-list',
  imports: [CommonModule],
  templateUrl: './tasks-list.component.html',
  styleUrl: './tasks-list.component.css',
})
export class TasksListComponent implements OnInit {
  tasksList: string[] = [];

  private readonly tasksSer = inject(TasksService);

  ngOnInit(): void {
    this.tasksList = this.tasksSer.getTasks();
  }

  deleteTask(index: number) {
    this.tasksSer.deleteTask(index);
    this.tasksList = this.tasksSer.getTasks();
  }
}
