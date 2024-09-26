import {Pipe, PipeTransform} from '@angular/core';
import {format} from "date-fns";

@Pipe({
  name: 'customFormatDate'
})
export class CustomFormatDatePipe implements PipeTransform {

  transform(value: Date | null): string {
    if (value ) {
      return format(value,'dd/MM/yyyy');
    }

    return '';
  }

}
