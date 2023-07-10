import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { CustomToastrService, MessagePosition, MessageType } from '../alerts/custom-toastr.service';
import { UserAuthService } from './models/user-auth.service';

@Injectable({
  providedIn: 'root'
})
export class GlobalErrorHandlerInterceptorService implements HttpInterceptor {

  constructor(private customToastr: CustomToastrService, private userAuthService: UserAuthService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(catchError(error => {
      switch (error.status) {
        case HttpStatusCode.Unauthorized:
          this.customToastr.message("Error: Unauthorized", `${error.status} ${error.statusText}`, {
            messagePosition: MessagePosition.TopRight, messageType: MessageType.Error
          })
          break
        case HttpStatusCode.InternalServerError:
          this.customToastr.message("Error: InternalServerError", `${error.status} ${error.statusText}`, {
            messagePosition: MessagePosition.TopRight, messageType: MessageType.Error
          })
          break
        case HttpStatusCode.BadRequest:
          this.customToastr.message("Error: BadRequest", `${error.status} ${error.statusText}`, {
            messagePosition: MessagePosition.TopRight, messageType: MessageType.Error
          })
          break
        case HttpStatusCode.BadGateway:
          this.customToastr.message("Error: BadGateway", `${error.status} ${error.statusText}`, {
            messagePosition: MessagePosition.TopRight, messageType: MessageType.Error
          })
          break
        case HttpStatusCode.NotFound:
          this.customToastr.message("Error: NotFound", `${error.status} ${error.statusText}`, {
            messagePosition: MessagePosition.TopRight, messageType: MessageType.Error
          })
          break
        default:
          this.customToastr.message("Error: Unexpected error", "Unexpected error", {
            messagePosition: MessagePosition.TopRight, messageType: MessageType.Error
          })
          break
      }
      return of(error)
    }))
  }
}
