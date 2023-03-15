import { Component, Inject, OnInit, Output } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { List_Product_Image } from 'src/app/contracts/product/list-product-image';
import { CustomToastrService, MessagePosition, MessageType } from 'src/app/services/alerts/custom-toastr.service';
import { FileUploadOptions } from 'src/app/services/common/file-upload/file-upload.component';
import { ProductService } from 'src/app/services/common/product.service';
import { CommonDialogComponent, ConfirmState } from '../common-dialog/common-dialog.component';
declare var $: any

@Component({
  selector: 'app-product-image-dialog',
  templateUrl: './product-image-dialog.component.html',
  styleUrls: ['./product-image-dialog.component.scss']
})
export class ProductImageDialogComponent extends BaseComponent implements OnInit {
  constructor(public dialogRef: MatDialogRef<ProductImageDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ProductConfirmState | string,
    private productService: ProductService,
    spinner: NgxSpinnerService,
    private dialog: MatDialog,
    private customToastr: CustomToastrService) {
    super(spinner)
  }

  images: List_Product_Image[];

  async ngOnInit() {
    this.spinner.show(SpinnerType.Ball)
    this.images = await this.productService.readImages(this.data as string, () => {
      this.spinner.hide(SpinnerType.Ball)
    })
  }

  @Output() options: Partial<FileUploadOptions> = {
    accept: ".png, .jpg, .jpeg, .gif",
    action: "upload",
    controller: "product",
    explanation: "Select Product Images",
    queryString: `id=${this.data}`
  };

  close() {
    this.dialogRef.close();
  }

  async deleteImage(imageId: string, event: any) {
    this.openDialog(async () => {
      this.spinner.show(SpinnerType.Fire)
      await this.productService.deleteImages(this.data as string, imageId, () => {
        this.spinner.hide(SpinnerType.Fire)
        var element = $(event.srcElement).parent().parent().parent();
        element.fadeOut(750)
        this.customToastr.message("Image Deleted Successfully", "Success", { messagePosition: MessagePosition.BottomCenter, messageType: MessageType.Success })
      })
    })
  }
  openDialog(afterClosed: any): void {
    const dialogRef = this.dialog.open(CommonDialogComponent, {
      width: '300px',
      data: { title: "Delete Warning!", message: "Are you sure for delete this image", confirmState: ConfirmState.Yes }
    })

    dialogRef.afterClosed().subscribe(result => {
      if (result.confirmState == ConfirmState.Yes)
        afterClosed();
    })
  }
}
export enum ProductConfirmState {
  Cancel
}