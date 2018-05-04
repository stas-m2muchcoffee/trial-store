import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA , MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-modal-window',
  template: '<p>{{ message }}</p>' +
    '<button mat-raised-button (click)="choose(true)">Ok</button>' +
    '<button mat-raised-button *ngIf="twoBtn" (click)="choose(false)">No</button>',
  styles: [
    'p {text-align: center; margin-bottom: 20px;}',
    'button {width: 49%;}'
  ],
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
