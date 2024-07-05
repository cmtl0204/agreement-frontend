import {Component, EventEmitter, inject, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-component1',
  templateUrl: './component1.component.html',
  styleUrl: './component1.component.scss'
})
export class Component1Component {
  @Output() formOutput: EventEmitter<FormGroup> = new EventEmitter(); //add
  private readonly formBuilder = inject(FormBuilder);
  protected form!: FormGroup;

  protected form2!: FormGroup;
  protected form3!: FormGroup;

  constructor() {
    this.form3 = this.formBuilder.group({
      abc: ['Desarrollo', Validators.required],
    });

    this.form2 = this.formBuilder.group({
      code: ['Yavirac', Validators.required],
      career: this.form3,
    });

    this.form = this.formBuilder.group({
      name: ['Juan', Validators.required],
      institution: this.form2,
    });
  }

  save() {
    this.formOutput.emit(this.form.value); //add
  }
}
