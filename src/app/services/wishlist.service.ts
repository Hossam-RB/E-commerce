import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
wishnum :BehaviorSubject<number>=new BehaviorSubject (0)

  baseUrl: string = 'https://ecommerce.routemisr.com/api/v1/';
  myToken: any = {
    token: localStorage.getItem('userToken')
  };

  constructor(private _HttpClient:HttpClient) { }

addToWish(prodId:string):Observable<any>{
  return this._HttpClient.post(this.baseUrl+`wishlist`,
  {
    productId:  prodId
}
 
  ,{
    headers:this.myToken
  })
}


getWishList():Observable<any>{
  return this._HttpClient.get(this.baseUrl+`wishlist`,
  
  {
    headers:this.myToken
  })
}

removeFav(prodId:string):Observable<any>{
  return this._HttpClient.delete(this.baseUrl+`wishlist/${prodId}`,
  
  {
    headers:this.myToken
  })
}









}
