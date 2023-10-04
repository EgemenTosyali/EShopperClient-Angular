import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-authorize-menu-dialog',
  templateUrl: './authorize-menu-dialog.component.html',
  styleUrls: ['./authorize-menu-dialog.component.scss']
})
export class AuthorizeMenuDialogComponent {
  hidden = false;

  toggleBadgeVisibility() {
    this.hidden = !this.hidden;
  }
constructor(private dialogRef: MatDialogRef<AuthorizeMenuDialogComponent>, 
  @Inject(MAT_DIALOG_DATA) public data : any) {}
  close(){
    this.dialogRef.close()
  }
}

export enum ConfirmState {
  Yes,
  No
}