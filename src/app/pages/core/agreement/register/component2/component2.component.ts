import {Component, EventEmitter, inject, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-component2',
  templateUrl: './component2.component.html',
  styleUrl: './component2.component.scss'
})
export class Component2Component {
  @Output() formOutput: EventEmitter<FormGroup> = new EventEmitter(); //add
  private readonly formBuilder = inject(FormBuilder);
  protected form: FormGroup = this.formBuilder.group({
    age: [25, Validators.required],
    subjects: this.formBuilder.array([{a: 'dato1', b: 'dato2'}]),
  });

  save() {
    this.formOutput.emit(this.form.value); //add
  }
}
