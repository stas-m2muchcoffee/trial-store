import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';

import { ModalWindowComponent } from '../../modal-window/modal-window.component';

@Injectable()
export class ModalService {

  constructor(
    private dialog: MatDialog
  ) {}

  confirmModal(message: string, twoBtn: boolean = true) {
    return this.dialog.open(
      ModalWindowComponent,
      {data: {message: message, twoBtn: twoBtn}}
      )
      .afterClosed();
  }
}
