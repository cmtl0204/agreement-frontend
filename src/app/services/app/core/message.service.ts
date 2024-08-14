import {Injectable} from '@angular/core';
import {ServerResponse} from '@models/http-response';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor() {
  }

  error(error: ServerResponse) {
    return {};
  }

  success(serverResponse: ServerResponse) {
    return {};
  }

  successCustom(title: string, text: string) {
    return {}
  }

  errorCustom(title: string, text: string) {
    return {};
  }

  errorsFields(errors: string[] = []) {
    let html = '<ul>';
    for (let i = 0; i < errors.length; i++) {
      html += `<li>${errors[i]}</li>`;
    }
    html += '</ul>';
    return null;
  }

  get requiredFields(): string {
    return `Todos los campos con <b class="p-error">*</b> son obligatorios.`;
  }

  paginatorTotalRegisters(totalItems: number): string {
    return 'En total hay ' + (totalItems) + ' registros.';
  }

  get paginatorNoRecordsFound(): string {
    return 'No se encontraron registros.';
  }

  get buttonFormSaveOrUpdate(): string {
    return `Guardar`;
  }

  get buttonFormClose(): string {
    return `Cerrar`;
  }

  get progressBarProcess(): string {
    return `Procesando...`;
  }

  get progressBarSaveOrUpdate(): string {
    return `Guardando...`;
  }

  get progressBarDownload(): string {
    return `Descargando...`;
  }

  get progressBarUpload(): string {
    return `Cargando...`;
  }

  get progressBarLogin(): string {
    return `Ingresando...`;
  }

  get progressBarRequestPasswordReset(): string {
    return `Enviando correo...`;
  }

  get progressBarDelete(): string {
    return `Eliminando...`;
  }

  get messageSuccessDelete(): string {
    return `Se eliminó correctamente`;
  }

  get exceededMaxAttempts(): string {
    return 'Exceeded the maximum number of attempts allowed';
  }
}
