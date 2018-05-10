import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA , MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-modal-window',
  template: '<div mat-dialog-content>{{ message }}</div>' +
  '<div mat-dialog-actions>' +
  '<button mat-raised-button (click)="choose(true)">Ok</button>' +
  '<button mat-raised-button *ngIf="twoBtn" (click)="choose(false)">No</button>' +
  '</div>',
})
export class ModalWindowComponent {
  message: string;
  twoBtn: boolean;

  constructor(
    public dialogRef: MatDialogRef<ModalWindowComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.message = this.data.message;
    this.twoBtn = this.data.twoBtn;
  }

  choose(choice: boolean) {
    this.dialogRef.close(choice);
  }
}
