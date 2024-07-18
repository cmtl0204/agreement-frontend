import { format } from "date-fns";

export function getFormattedDate(value: string | Date) {
  return new Date(value)
  if(value.toString().includes('T')){
    return format(value,'MM-dd-yyyy')
  }
  return '';
}
