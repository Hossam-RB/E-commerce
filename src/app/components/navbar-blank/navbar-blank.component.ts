import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { WishlistService } from 'src/app/services/wishlist.service';

@Component({
  selector: 'app-navbar-blank',
  templateUrl: './navbar-blank.component.html',
  styleUrls: ['./navbar-blank.component.scss']
})
export class NavbarBlankComponent implements OnInit {
 userName:string|null= localStorage.getItem('userName')
  cartNum:number=0;
  wishNum:number=0;
  constructor(private _Router:Router ,private _CartService:CartService,private _WishlistService:WishlistService){}
  signOut():void{
localStorage.removeItem('userToken');

this._Router.navigate(['./login'])
  }

  ngOnInit(): void {
    this._CartService.cartNumber.subscribe({
      next:(data)=>{
this.cartNum=data;

      }
    })
    this._WishlistService.wishnum.subscribe({
      next:(resp)=>{
        console.log(resp);
        this.wishNum=resp

      }
    })

    this._CartService.getCat().subscribe({
      next:(r)=>{
        this.cartNum= r.numOfCartItems;
        
      }
    })

this._WishlistService.getWishList().subscribe({
  next:(resp)=>{
this.wishNum=resp.data.length
  }
})




   }


}
