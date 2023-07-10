import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CustomToastrService, MessagePosition, MessageType } from 'src/app/services/alerts/custom-toastr.service';
import { AuthService } from 'src/app/services/common/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  authCheck: boolean
  constructor(public authService: AuthService, private router: Router, private customToastr: CustomToastrService) {
  }
  signOut() {
    localStorage.removeItem("accessToken")
    localStorage.removeItem("refreshToken")
    this.authService.authChecker()
    this.router.navigate([""])
    this.customToastr.message("Successfuly logged out", "Log out", {
      messagePosition: MessagePosition.TopRight,
      messageType: MessageType.Success
    })
  }
}
