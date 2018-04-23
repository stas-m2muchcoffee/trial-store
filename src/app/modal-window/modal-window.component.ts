import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA , MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-modal-window',
  templateUrl: './modal-window.component.html',
  styleUrls: ['./modal-window.component.scss']
})
export class ModalWindowComponent {
  message: string;
  constructor(
    public dialogRef: MatDialogRef<ModalWindowComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.message = this.data.message;
  }
  choose(choice: boolean) {
    this.dialogRef.close(choice);
  }
}
