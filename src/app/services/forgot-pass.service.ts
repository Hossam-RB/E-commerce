import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ForgotPassService {
  baseUrl: string = 'https://ecommerce.routemisr.com/api/v1/auth/';
  constructor(private _HttpClient:HttpClient) { }

forgotPass(uEmail:any):Observable<any>{
  return this._HttpClient.post(this.baseUrl +`forgotPasswords`,uEmail)
}
resetCode(rCode:any):Observable<any>{
  return this._HttpClient.post(
    this.baseUrl  +`verifyResetCode`,rCode
  )}
resetPass(newPass:any):Observable<any>{
  return this._HttpClient.put( this.baseUrl+`resetPassword`,newPass)
}

}
