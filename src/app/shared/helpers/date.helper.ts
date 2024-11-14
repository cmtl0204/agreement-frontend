import {format} from "date-fns";

export function getFormattedDate(value: string | Date) {
  // return new Date(value)
  if (value.toString().includes('T')) {
    console.log('1')
    return format(value, 'dd/MM/yyyy')
  }

  console.log('2')
  return format(value + 'T05:00:00', 'dd/MM/yyyy');
}
