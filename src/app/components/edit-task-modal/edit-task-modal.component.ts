import {
  Component,
  ElementRef,
  inject,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Task } from '../../models/task.interface';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { TasksService } from '../../providers/tasks.service';
import { ValidatorService } from '../../providers/validator.service';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-edit-task-modal',
  imports: [ReactiveFormsModule, NgClass],
  templateUrl: './edit-task-modal.component.html',
  styleUrl: './edit-task-modal.component.css',
})
export class EditTaskModalComponent implements OnInit {
  @Input() task?: Task;
  @ViewChild('closeButton') closeButton!: ElementRef;

  private readonly fb = inject(FormBuilder);
  private readonly tasksSer = inject(TasksService);
  readonly validatorSer = inject(ValidatorService);

  editTaskForm = this.fb.group({
    title: [this.task?.title, Validators.maxLength(30)],
    description: [this.task?.description, Validators.maxLength(300)],
    done: [this.task?.done],
  });

  ngOnInit(): void {
    this.editTaskForm.get('title')?.setValue(this.task?.title);
    this.editTaskForm.get('description')?.setValue(this.task?.description);
    this.editTaskForm.get('done')?.setValue(this.task?.done);
  }

  editTask() {
    if (this.editTaskForm.invalid) {
      this.editTaskForm.markAllAsTouched();
      return;
    }

    this.editTaskForm.value.done =
      this.editTaskForm.value.done === 'true' ? true : false;

    this.tasksSer.editTask(this.task?.id, this.editTaskForm.value);
    this.closeButton.nativeElement.click();
  }
}
