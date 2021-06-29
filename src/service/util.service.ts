import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  constructor() { }

  errorHandler(error: any): void {
    switch (error.status) {
      case 400:
        Swal.fire({
          icon: 'error',
          title: 'Error en la solicitud',
          text: error.error.detail
        });
        break;
      case 404:
        Swal.fire({
          icon: 'error',
          title: 'No encontrado',
          text: error.error.detail
        });
        break;
      case 500:
        Swal.fire({
          icon: 'error',
          title: 'Error del servidor',
          text: error.error.detail
        });
        break;
      default:
        Swal.fire({
          icon: 'error',
          title: 'Error desconocido',
          text: error
        });
        break;
    }
  }
}
