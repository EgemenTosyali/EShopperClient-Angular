import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonDialogComponent } from './common-dialog/common-dialog.component';
import { ProductImageDialogComponent } from './product-image-dialog/product-image-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { FileUploadModule } from '../services/common/file-upload/file-upload.module';
import { MatCardModule } from '@angular/material/card';



@NgModule({
  declarations: [
    CommonDialogComponent,
    ProductImageDialogComponent
  ],
  imports: [
    CommonModule,
    MatDialogModule, MatButtonModule, FileUploadModule, MatCardModule
  ]
})
export class DialogsModule { }
