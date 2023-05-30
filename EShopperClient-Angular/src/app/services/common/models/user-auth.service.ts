import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { CustomToastrService } from '../../alerts/custom-toastr.service';
import { Router } from '@angular/router';
import { Observable, firstValueFrom } from 'rxjs';
import { TokenResponse } from 'src/app/contracts/tokens/token-response';
import { SocialUser } from '@abacritt/angularx-social-login';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  constructor(private httpClientService: HttpClientService,
    private customToastr: CustomToastrService,
    private router: Router) { }

  async login(usernameOrEmail: string, password: string, successCallBack?: () => void, errorCallBack?: (errorMessage: string) => void): Promise<any> {
    const observable: Observable<any | TokenResponse> = this.httpClientService.post<any | TokenResponse>({
      controller: "auth",
      action: "login"
    }, { usernameOrEmail, password })

    let tokenRespose: TokenResponse = null
    try {
      tokenRespose = await firstValueFrom(observable)
    }
    catch { }
    if (tokenRespose) {
      localStorage.setItem("accessToken", tokenRespose.token.accessToken)
      successCallBack()
    }
    errorCallBack("Connected successfuly but user not found!")
  }
  async googleLogin(user: SocialUser, successCallBack?: () => void, errorCallBack?: (errorMessage: string) => void): Promise<any> {
    const observable = this.httpClientService.post<SocialUser | TokenResponse>({
      action: "googlelogin",
      controller: "auth"
    }, user)

    const tokenRespose = await firstValueFrom(observable) as TokenResponse

    if (tokenRespose) {
      localStorage.setItem("accessToken", tokenRespose.token.accessToken)
      successCallBack()
    }
    errorCallBack("Connected successfuly but user not found!")
  }
}
