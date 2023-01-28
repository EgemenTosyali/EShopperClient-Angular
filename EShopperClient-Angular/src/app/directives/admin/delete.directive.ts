import { HttpErrorResponse } from '@angular/common/http';
import { Directive, ElementRef, EventEmitter, HostListener, Input, Output, Renderer2 } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { CommonDialogComponent, ConfirmState } from 'src/app/dialogs/common-dialog/common-dialog.component';
import { CustomToastrService, MessagePosition, MessageType } from 'src/app/services/alerts/custom-toastr.service';
import { HttpClientService } from 'src/app/services/common/http-client.service';
declare var $: any

@Directive({
  selector: '[appDelete]'
})
export class DeleteDirective {

  constructor(
    private dialog: MatDialog,
    private element: ElementRef, private _renderer: Renderer2,
    private httpClientService: HttpClientService,
    private customToastr: CustomToastrService,
    private spinner: NgxSpinnerService) {
    const img = _renderer.createElement("img");
    img.setAttribute("src", "../../../../../assets/delete_icon.png");
    img.setAttribute("style", "cursor: pointer;")
    img.width = 25;
    img.height = 25;
    _renderer.appendChild(element.nativeElement, img);
  }
  @Output() callback: EventEmitter<any> = new EventEmitter();
  @Input() id: string;
  @Input() controller: string;
  @Input() productName: string;
  @HostListener("click")
  async onClick() {
    this.openDialog(async () => {
      this.spinner.show("fire");
      const td: HTMLTableCellElement = this.element.nativeElement;
      this.httpClientService.delete({
        controller: this.controller
      }, this.id).subscribe(data => {
        $(td.parentElement).animate({
          opacity: 0,
          left: "+=50",
          height: "toggle"
        }, 800, () => {
          this.spinner.hide("fire");
          this.callback.emit();
          this.customToastr.message("Product Deleted Succesfully", "Success", {
            messagePosition: MessagePosition.TopRight,
            messageType: MessageType.Success
          })
        })
      }, (errorResponse: HttpErrorResponse) => {
        this.spinner.hide("fire");
        this.customToastr.message(`${errorResponse}`, "error", {
          messagePosition: MessagePosition.TopCenter,
          messageType: MessageType.Error
        })
      })
    })
  }

  openDialog(afterClosed: any): void {
    const dialogRef = this.dialog.open(CommonDialogComponent, {
      width: '300px',
      data: { title: "Delete!!!", message: `Are you sur for Delete ${this.productName} `, confirmState: ConfirmState.Yes }
    })

    dialogRef.afterClosed().subscribe(result => {
      if (result.confirmState == ConfirmState.Yes)
        afterClosed();
    })
  }
}
