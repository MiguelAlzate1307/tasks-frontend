import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ValidatorService } from '../../providers/validator.service';
import { NgClass } from '@angular/common';
import { TasksService } from '../../providers/tasks.service';

@Component({
  selector: 'app-add-task-modal',
  imports: [ReactiveFormsModule, NgClass],
  templateUrl: './add-task-modal.component.html',
  styleUrl: './add-task-modal.component.css',
})
export class AddTaskModalComponent {
  @ViewChild('closeModal') closeModal!: ElementRef;

  private readonly tasksSer = inject(TasksService);

  private readonly fb = inject(FormBuilder);
  readonly validatorsSer = inject(ValidatorService);

  readonly addTaskForm = this.fb.group({
    title: ['', [Validators.required, Validators.maxLength(30)]],
    description: ['', Validators.maxLength(300)],
  });

  addTask() {
    if (this.addTaskForm.invalid) {
      this.addTaskForm.markAllAsTouched();
      return;
    }

    if (!this.addTaskForm.value.description)
      delete this.addTaskForm.value.description;

    this.tasksSer.addTask(this.addTaskForm.value);
    this.addTaskForm.reset();
    this.closeModal.nativeElement.click();
    console.log('hello');
  }
}
