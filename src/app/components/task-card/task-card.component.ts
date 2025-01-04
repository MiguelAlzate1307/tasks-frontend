import { AfterViewInit, Component, inject, Input } from '@angular/core';
import { Task } from '../../models/task.interface';
import { initModals } from 'flowbite';
import { EditTaskModalComponent } from '../edit-task-modal/edit-task-modal.component';
import { NgClass } from '@angular/common';
import { TasksService } from '../../providers/tasks.service';

@Component({
  selector: 'app-task-card',
  imports: [EditTaskModalComponent, NgClass],
  templateUrl: './task-card.component.html',
  styleUrl: './task-card.component.css',
})
export class TaskCardComponent implements AfterViewInit {
  private readonly tasksSer = inject(TasksService);

  @Input() task?: Task;

  ngAfterViewInit(): void {
    initModals();
  }

  deleteTask() {
    this.tasksSer.deleteTask(this.task?.id);
  }
}
