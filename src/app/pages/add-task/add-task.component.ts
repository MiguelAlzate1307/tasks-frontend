import {
  Component,
  inject,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
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
  submitted = false;

  private readonly tasksSer = inject(TasksService);

  constructor(private readonly form: FormBuilder) {
    this.addTaskForm = this.form.group({
      title: ['', Validators.required],
    });
  }

  withValue() {
    if (this.addTaskForm.get('title')?.valid) {
      this.submitted = false;
    }
  }

  hasErrors(controlName: string, errorType: string): boolean {
    return (
      (this.addTaskForm.get(controlName)?.hasError(errorType) || false) &&
      (this.addTaskForm.get(controlName)?.touched || false)
    );
  }

  addTask() {
    if (this.addTaskForm.valid) {
      this.tasksSer.addTask(this.addTaskForm.get('title')?.value);
      window.location.href = '';
    } else {
      this.submitted = true;
    }
  }
}
