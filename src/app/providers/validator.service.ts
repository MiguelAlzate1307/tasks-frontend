import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class ValidatorService {
  hasErrors(formGroup: FormGroup, controlName: string, errorType?: string) {
    const control = formGroup.get(controlName);
    return errorType
      ? (control?.touched || false) && (control.hasError(errorType) || false)
      : (control?.touched || false) && (control.invalid || false);
  }
}
