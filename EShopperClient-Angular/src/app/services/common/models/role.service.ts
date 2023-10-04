import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { Observable, firstValueFrom } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { List_Role } from 'src/app/contracts/role/List_Role';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(private httpClientService: HttpClientService) { }

  async getRoles(page:number , size:number , successCallBack?:()=>void,errorCallback?:(error)=>void){
    const observable : Observable<any> = this.httpClientService.get({
      controller:"roles"
    })

    const promiseData = firstValueFrom(observable)
    promiseData.then(d => successCallBack).catch((errorResponse: HttpErrorResponse) => errorCallback(errorResponse.message))

    return await promiseData
    
  }
  async createRole(name:string, successCallback?: ()=> void, errorCallback?:(error)=> void){
    const observable :Observable<any> = this.httpClientService.post({
      controller:"roles"
    },{name:name})

    const promiseData = firstValueFrom(observable)
    promiseData.then(successCallback)
      .catch(errorCallback)

    return await firstValueFrom(observable) as { succeeded:boolean }
  }
}
