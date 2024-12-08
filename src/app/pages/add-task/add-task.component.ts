import { Component, inject, OnInit } from '@angular/core';
import { TasksService } from '../../providers/tasks.service';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-task',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.css',
})
export class AddTaskComponent {
  addTaskForm: FormGroup;

  private readonly tasksSer = inject(TasksService);

  constructor(private readonly form: FormBuilder) {
    this.addTaskForm = this.form.group({
      title: ['', Validators.required],
    });
  }

  hasErrors(controlName: string, errorType: string): boolean {
    return (
      (this.addTaskForm.get(controlName)?.hasError(errorType) || false) &&
      (this.addTaskForm.get(controlName)?.touched || false)
    );
  }

  addTask() {
    this.tasksSer.addTask(this.addTaskForm.get('title')?.value);
    window.location.href = '';
  }
}
