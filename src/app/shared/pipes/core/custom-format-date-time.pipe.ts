import {Pipe, PipeTransform} from '@angular/core';
import {format} from "date-fns";

@Pipe({
  name: 'customFormatDateTime'
})
export class CustomFormatDateTimePipe implements PipeTransform {

  transform(value: Date | null | string): string {
    if (value?.toString().search('T') === -1) {
      value = value + 'T05:00:00';
    }

    if (value) {
      return format(value, 'dd/MM/yyyy HH:mm');
    }

    return '';
  }

}
