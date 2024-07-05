import {Component, inject} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  private readonly formBuilder = inject(FormBuilder);
  protected form: FormGroup = this.formBuilder.group({
    name: [''],
    age: [''],
    institution: [null],
    subjects: [null],
    externalInstitutions:[null],
  });

  save(event: any) {
    console.log('event', event);
    this.form.patchValue(event);
    console.log('form', this.form.value);
  }

  register() {
    // this.agreementHttpServices.register(this.form.value).subscribe();
  }
}
