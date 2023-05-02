import { Component } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { SpinnerType } from 'src/app/base/base.component';
import { BaseComponent } from 'src/app/base/base.component';
import { UserService } from 'src/app/services/common/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends BaseComponent {
  constructor(
    private userService: UserService,
    spinner: NgxSpinnerService) {
    super(spinner)
  }

  async login(txtUsernameOrEmail: string, txtPassword: string) {
    this.showSpinner(SpinnerType.Ball)
    await this.userService.login(txtUsernameOrEmail, txtPassword)
    this.hideSpinner(SpinnerType.Ball)
  }
}
