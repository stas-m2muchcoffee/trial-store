import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material';

import { ModalService } from '../../core/services/modal.service';

@Component({
  selector: 'app-modal-window-new-invoice',
  templateUrl: './modal-window-new-invoice.component.html',
  styleUrls: ['./modal-window-new-invoice.component.scss']
})
export class ModalWindowNewInvoiceComponent {
  
  constructor(
    public dialogRef: MatDialogRef<ModalWindowNewInvoiceComponent>,
    public modalService: ModalService
  ) { }
  
  choose(choice: boolean): void {
    this.modalService.navigateAwaySelection$.next(choice);
    this.dialogRef.close();
  }
}
