import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { SpinnerType } from 'src/app/base/base.component';
import { BaseComponent } from 'src/app/base/base.component';
import { CustomToastrService, MessagePosition, MessageType } from 'src/app/services/alerts/custom-toastr.service';
import { AuthService } from 'src/app/services/common/auth.service';
import { UserService } from 'src/app/services/common/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends BaseComponent {
  constructor(
    private userService: UserService,
    private authService: AuthService,
    private socialAuthService: SocialAuthService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private customToastr: CustomToastrService,
    spinner: NgxSpinnerService) {
    super(spinner)

    socialAuthService.authState.subscribe(async (user: SocialUser) => {
      this.showSpinner(SpinnerType.Ball)
      await userService.googleLogin(user, () => {
        this.hideSpinner(SpinnerType.Ball)
        this.customToastr.message("Welcome!", "Welcome!", {
          messagePosition: MessagePosition.TopCenter,
          messageType: MessageType.Success
        })
        this.authService.authChecker()
        this.activatedRoute.queryParams.subscribe(params => {
          const returnUrl: string = params["returnUrl"]
          if (returnUrl)
            this.router.navigate([returnUrl])
          else
            this.router.navigate(["/"])
        })
      })
    }, (errorMessage: string) => {
      this.customToastr.message(errorMessage, "Error!", {
        messagePosition: MessagePosition.TopRight,
        messageType: MessageType.Error
      })
    })
  }

  async login(txtUsernameOrEmail: string, txtPassword: string) {
    this.showSpinner(SpinnerType.Ball)
    await this.userService.login(txtUsernameOrEmail, txtPassword, () => {
      this.hideSpinner(SpinnerType.Ball)
      this.customToastr.message("Welcome!", "Welcome!", {
        messagePosition: MessagePosition.TopCenter,
        messageType: MessageType.Success
      })
      this.authService.authChecker()
      this.activatedRoute.queryParams.subscribe(params => {
        const returnUrl: string = params["returnUrl"]
        if (returnUrl)
          this.router.navigate([returnUrl])
        else
          this.router.navigate(["/"])
      })
    })
  }
}
