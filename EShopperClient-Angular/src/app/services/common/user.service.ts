import { Injectable } from '@angular/core';
import { HttpClientService } from './http-client.service';
import { User } from 'src/entities/user';
import { Create_User } from 'src/app/contracts/product/users/create_user';
import { Observable, firstValueFrom } from 'rxjs';
import { TokenResponse } from 'src/app/contracts/tokens/token-response';
import { CustomToastrService, MessagePosition, MessageType } from '../alerts/custom-toastr.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private httpClientService: HttpClientService,
    private customToastr: CustomToastrService) { }

  async create(user: User) {
    const observable: Observable<Create_User | User> = this.httpClientService.post<Create_User | User>({
      controller: "users"
    }, user)

    return await firstValueFrom(observable) as Create_User
  }

  async login(usernameOrEmail: string, password: string, callBackFunc?: () => void): Promise<any> {
    const observable: Observable<any | TokenResponse> = this.httpClientService.post<any | TokenResponse>({
      controller: "users",
      action: "login"
    }, { usernameOrEmail, password })

    const tokenRespose: TokenResponse = await firstValueFrom(observable)
    if (tokenRespose) {
      localStorage.setItem("accessToken", tokenRespose.token.accessToken)
      this.customToastr.message("Welcome!", "Welcome!", {
        messagePosition: MessagePosition.TopRight,
        messageType: MessageType.Success
      })
    }
    else{
      this.customToastr.message("Login Failed!", "Login Failed!", {
        messagePosition: MessagePosition.TopRight,
        messageType: MessageType.Error
      })
    }
    callBackFunc()
  }
}
