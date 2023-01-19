import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class CustomToastrService {
  constructor(private customToastr: ToastrService) { }

  message(message: string, title: string, toastrOptions: Partial<ToastrOptions>,) {
    this.customToastr[toastrOptions.messageType](message, title, {
      positionClass: toastrOptions.messagePosition
    })
  }

}

export class ToastrOptions {
  messageType: MessageType;
  messagePosition: MessagePosition;
}

export enum MessageType {
  Success = "success",
  Warning = "warning",
  Info = "info",
  Error = "error"
}

export enum MessagePosition {
  TopRight = "toast-top-right",
  BottomRight = "toast-bottom-right",
  BottomLeft = "toast-bottom-left",
  TopLeft = "toast-top-left",
  TopFullWidth = "toast-top-full-widht",
  BottomFullWidth = "toast-bottom-full-width",
  TopCenter = "toast-top-center",
  BottomCenter = "toast-bottom-center"
}