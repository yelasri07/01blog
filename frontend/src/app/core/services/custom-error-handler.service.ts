import { ErrorHandler, inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class CustomErrorHandlerService implements ErrorHandler {

  private snackbar = inject(MatSnackBar)

  handleError(error: any): void {
    let errMessage: string;
    if (error?.error?.detail) {
      errMessage = error.error.detail
    } else if (error?.message) {
      errMessage = error.message
    } else {
      errMessage = "Oops! something wrong."
    }

    this.snackbar.open(
      errMessage,
      'Close',
      {
        duration: 4000
      }
    )
    console.error(error)
  }

}
