import {Directive, ElementRef, inject, Input, Renderer2} from '@angular/core';
import {ValidationErrors} from '@angular/forms';

@Directive({
  selector: '[appErrorMessage]'
})
export class ErrorMessageDirective {
  private elementRef: ElementRef<HTMLInputElement> = inject(ElementRef);
  private renderer = inject(Renderer2);
  private _errors: ValidationErrors | null = null;
  private _dirty: boolean = false;
  private _touched: boolean = false;
  private _nativeElement: HTMLInputElement;

  constructor() {
    this._nativeElement = this.elementRef.nativeElement;
  }

  @Input() set touched(value: boolean) {
    this._touched = value;
    this.setErrorMessage();
  };

  @Input() set dirty(value: boolean) {
    this._dirty = value;
  };

  @Input() set errors(value: ValidationErrors | null) {
    this._errors = value;
    this.setErrorMessage();
  }

  setErrorMessage() {
    let text = '';

    if ((this._touched || this._dirty) && this._errors) {
      if (this._errors['required']) {
        text = this.fieldRequired;
      }
      if (this._errors['requiredTrue']) {
        text = this.fieldRequired;
      }
      if (this._errors['email']) {
        text = this.fieldEmail;
      }
      if (this._errors['minlength']) {
        text = this.fieldMinLength(this._errors);
      }
      if (this._errors['maxlength']) {
        text = this.fieldMaxLength(this._errors);
      }
      if (this._errors['min']) {
        text = this.fieldMin(this._errors);
      }
      if (this._errors['max']) {
        text = this.fieldMax(this._errors);
      }
      if (this._errors['pattern']) {
        text = this.fieldPattern;
      }
      if (this._errors['identification']) {
        text = this.fieldIdentification;
      }
      if (this._errors['noPasswordMatch']) {
        text = this.fieldNoPasswordMatch;
      }
      if (this._errors['userNotAvailable']) {
        text = this.fieldUserNotAvailable;
      }
      if (this._errors['userAvailable']) {
        text = this.fieldUserAvailable;
      }
      if (this._errors['emailNotAvailable']) {
        text = this.fieldEmailNotAvailable;
      }
      if (this._errors['phoneNotAvailable']) {
        text = this.fieldPhoneNotAvailable;
      }
      if (this._errors['dateInvalid']) {
        text = this.fieldDateValid;
      }
      if (this._errors['dateMax']) {
        text = this.fieldDateMax(this._errors);
      }
      if (this._errors['dateMin']) {
        text = this.fieldDateMin(this._errors);
      }

      this.renderer.addClass(this._nativeElement, 'p-error');
    }

    this._nativeElement.innerText = text;
  }

  private get fieldRequired(): string {
    return 'El campo es obligatorio.';
  }

  private get fieldEmail(): string {
    return 'Correo electrónico no es válido.';
  }

  private fieldMinLength(errors: ValidationErrors) {
    return `Debe contener como mínimo ${errors['minlength']['requiredLength']} caracteres.`;
  }

  private fieldMaxLength(errors: ValidationErrors): string {
    return `Debe contener como máximo de caracteres ${errors['maxlength']['requiredLength']}.`;
  }

  private fieldMin(errors: ValidationErrors) {
    return `Número mínimo permitido es ${errors['min']['min']}.`;
  }

  private fieldMax(errors: ValidationErrors): string {
    return `Número maximo permitido es ${errors['max']['max']}.`;
  }

  private get fieldPattern() {
    return `No cumple con el formato.`;
  }

  private get fieldNoPasswordMatch(): string {
    return 'Las contraseñas no coinciden.';
  }

  private get fieldDateValid(): string {
    return 'No es una fecha válida.';
  }

  private fieldDateMax(errors: ValidationErrors): string {
    return `La fecha ${errors['dateMax']['actualDate']} no puede ser mayor a ${errors['dateMax']['requiredDate']}.`;
  }

  private fieldDateMin(errors: ValidationErrors): string {
    return `La fecha ${errors['dateMin']['actualDate']} no puede ser menor a ${errors['dateMin']['requiredDate']}.`;
  }

  private get fieldIdentification() {
    return `No cumple con el formato de una cédula Ecuatoriana.`;
  }

  private get fieldUserNotAvailable(): string {
    return 'Este usuario ya se encuentra registrado.';
  }

  private get fieldUserAvailable(): string {
    return 'Usuario está disponible.';
  }

  private get fieldEmailNotAvailable(): string {
    return 'Este correo electrónico no está disponible.';
  }

  private get fieldPhoneNotAvailable(): string {
    return 'Este teléfono no está disponible.';
  }
}
