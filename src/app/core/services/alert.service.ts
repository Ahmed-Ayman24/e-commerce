import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  confirmDeletion(message: string = 'for remove this?'): Promise<boolean> {
    return Swal.fire({
      title: 'Are you sure',
      text: message,
      icon: 'warning',
      showCancelButton: true,
      customClass: {
        confirmButton: 'bg-main'
      },
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, remove it!'
    }).then((result) => result.isConfirmed);
  }

  showSuccess(message: string = 'Done') {
    Swal.fire({
      title: 'Removed!',
      text: message,
      icon: 'success',
      customClass: {
        confirmButton: 'bg-main'
      },
    });
  }
  
  showError(message: string) {
    Swal.fire({
      title: 'Error!',
      text: message,
      icon: 'error'
    });
  }
}
