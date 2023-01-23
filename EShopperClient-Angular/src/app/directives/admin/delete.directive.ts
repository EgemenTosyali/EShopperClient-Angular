import { HttpErrorResponse } from '@angular/common/http';
import { Directive, ElementRef, EventEmitter, HostListener, Input, Output, Renderer2 } from '@angular/core';
import { CustomToastrService, MessagePosition, MessageType } from 'src/app/services/alerts/custom-toastr.service';
import { HttpClientService } from 'src/app/services/common/http-client.service';
declare var $: any

@Directive({
  selector: '[appDelete]'
})
export class DeleteDirective {

  constructor(
    private element: ElementRef, private _renderer: Renderer2, private httpClientService: HttpClientService, private customToastr: CustomToastrService) {
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
  @HostListener("click")
  async onClick() {
    const td: HTMLTableCellElement = this.element.nativeElement;
    this.httpClientService.delete({
      controller: this.controller
    }, this.id).subscribe(data => {
      alert("done")
      this.callback.emit();
    }, (errorResponse: HttpErrorResponse) => {
      this.customToastr.message(`${errorResponse}`,"error",{
        messagePosition: MessagePosition.TopCenter,
        messageType: MessageType.Error
      })
    })
  }
}
