import { Component, Inject, Output } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FileUploadOptions } from 'src/app/services/common/file-upload/file-upload.component';

@Component({
  selector: 'app-product-image-dialog',
  templateUrl: './product-image-dialog.component.html',
  styleUrls: ['./product-image-dialog.component.scss']
})
export class ProductImageDialogComponent {
  constructor(public dialogRef: MatDialogRef<ProductImageDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ConfirmState | string) { }

  @Output() options: Partial<FileUploadOptions> = {
    accept: ".png, .jpg, .jpeg, .gif",
    action: "upload",
    controller: "product",
    
  };

  close() {
    this.dialogRef.close();
  }
}
export enum ConfirmState {
  Cancel
}