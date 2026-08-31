import { Component, inject } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  ReactiveFormsModule,
  ValidationErrors,
  Validators
} from '@angular/forms';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.css'
})
export class TaskFormComponent {
  private readonly fb = inject(FormBuilder);

  isEditMode = false;

  taskForm = this.fb.group({
    title: [
      '',
      [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(100)
      ]
    ],

    status: [
      'Pending',
      Validators.required
    ],

    dueDate: [
      '',
      [
        Validators.required,
        this.futureDateValidator
      ]
    ]
  });

  get title() {
    return this.taskForm.controls.title;
  }

  get status() {
    return this.taskForm.controls.status;
  }

  get dueDate() {
    return this.taskForm.controls.dueDate;
  }

  private futureDateValidator(
    control: AbstractControl
  ): ValidationErrors | null {
    if (!control.value) {
      return null;
    }

    const selectedDate = new Date(control.value);
    const today = new Date();

    today.setHours(0, 0, 0, 0);
    selectedDate.setHours(0, 0, 0, 0);

    if (selectedDate < today) {
      return {
        pastDate: true
      };
    }

    return null;
  }

  onSubmit(): void {
    if (this.taskForm.invalid) {
      this.taskForm.markAllAsTouched();
      return;
    }

    console.log('Task submitted:', this.taskForm.getRawValue());

    alert(
      this.isEditMode
        ? 'Task updated successfully!'
        : 'Task added successfully!'
    );
  }

  onCancel(): void {
    this.taskForm.reset({
      title: '',
      status: 'Pending',
      dueDate: ''
    });

    this.taskForm.markAsPristine();
    this.taskForm.markAsUntouched();
  }
}





