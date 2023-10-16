import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cartNumber: BehaviorSubject<number> = new BehaviorSubject(0);

  baseUrl: string = 'https://ecommerce.routemisr.com/api/v1/';

    myToken: any = {
    token: localStorage.getItem('userToken')
  };

  constructor(private _HttpClient: HttpClient) {}

  addToCart(prodId: string): Observable<any> {
    return this._HttpClient.post(
      this.baseUrl + 'cart',
      {
        productId: prodId,
      },

      {
        headers: this.myToken,
      }
    );
  }

  getCat(): Observable<any> {
    return this._HttpClient.get(this.baseUrl + `cart`, {
      headers: this.myToken,
    });
  }

  removeCatItem(prodId: string): Observable<any> {
    return this._HttpClient.delete(this.baseUrl + `cart/${prodId}`, {
      headers: this.myToken,
    });
  }

  updateCatItem(count: number, prodId: string): Observable<any> {
    return this._HttpClient.put(
      this.baseUrl + `cart/${prodId}`,
      {
        count: count,
      },
      {
        headers: this.myToken,
      }
    );
  }

  removeCat(): Observable<any> {
    return this._HttpClient.delete(this.baseUrl + `cart`, {
      headers: this.myToken,
    });
  }

  chekOut(cartId: string | null, detailsObj: any): Observable<any> {
    return this._HttpClient.post(
      this.baseUrl +
        `orders/checkout-session/${cartId}?url=https://github.com/Hossam-RB/E-commerce`,
      {
        shippingAddress: detailsObj,
      },
      {
        headers: this.myToken,
      }
    );
  }
}
