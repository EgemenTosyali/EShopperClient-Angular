import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { CustomToastrService, MessagePosition, MessageType } from 'src/app/services/alerts/custom-toastr.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private jwtHelper: JwtHelperService,
    private router: Router,
    private customToastr: CustomToastrService) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const token: string = localStorage.getItem("accessToken")
    let expired: boolean
    try {
      expired = this.jwtHelper.isTokenExpired(token)
    }
    catch {
      expired = true
    }
    if (!token || expired) {
      this.router.navigate(["login"], { queryParams: { returnUrl: state.url } })
      this.customToastr.message("Please Login!", "Warning!", {
        messagePosition: MessagePosition.TopRight,
        messageType: MessageType.Warning
      })
    }

    return true;
  }

}
