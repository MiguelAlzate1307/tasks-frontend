import { AfterViewInit, Component, inject, OnInit } from '@angular/core';
import { initDropdowns } from 'flowbite';
import { Task } from '../../models/task.interface';
import { TasksService } from '../../providers/tasks.service';
import { TaskCardComponent } from '../../components/task-card/task-card.component';

@Component({
  selector: 'app-tasks-list',
  imports: [TaskCardComponent],
  templateUrl: './tasks-list.component.html',
  styleUrl: './tasks-list.component.css',
})
export class TasksListComponent implements OnInit, AfterViewInit {
  private readonly tasksSer = inject(TasksService);

  tasksList: Task[] = [];

  ngOnInit(): void {
    initDropdowns();

    this.tasksSer.getTasks();
  }

  ngAfterViewInit(): void {
    this.tasksSer.tasks$.subscribe({
      next: (data: any) => {
        console.log(data);

        this.tasksList = data;
      },
      error: ({ error }) => {
        console.log(error);
      },
    });
  }
}
