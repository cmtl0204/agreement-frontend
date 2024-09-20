import {Component, forwardRef, Input, OnInit} from '@angular/core';
import {ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR} from "@angular/forms";

@Component({
  selector: 'app-input-switch',
  templateUrl: './input-switch.component.html',
  styleUrl: './input-switch.component.scss',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: InputSwitchComponent,
    multi: true
  }]
})
export class InputSwitchComponent implements OnInit, ControlValueAccessor {
  @Input() selected: string = 'Si';
  @Input() unselected: string = 'No';
  @Input() disabled: boolean = false;

  protected value: FormControl = new FormControl(false);
  private _onChanged: Function = (_value: boolean) => {
  };

  ngOnInit(): void {
    this.value.valueChanges.subscribe(value => {
      this._onChanged(value);
    });
    if(this.disabled) {
      this.value.disable();
    }
  }

  registerOnChange(fn: Function): void {
    this._onChanged = fn;
  }

  registerOnTouched(fn: any): void {
  }

  writeValue(value: boolean): void {
    if (value) this.value.patchValue(value);
  }
}
