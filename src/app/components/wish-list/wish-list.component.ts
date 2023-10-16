import { Component, OnInit, Renderer2 } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/services/cart.service';
import { WishlistService } from 'src/app/services/wishlist.service';

@Component({
  selector: 'app-wish-list',
  templateUrl: './wish-list.component.html',
  styleUrls: ['./wish-list.component.scss']
})
export class WishListComponent implements OnInit{
  products: any[] = [];
  wishData:string[]=[];
constructor (
private _WishlistService:WishlistService,
private _Renderer2:Renderer2,
private _CartService:CartService,
private _ToastrService:ToastrService
){}
  ngOnInit(): void {
  this._WishlistService.getWishList().subscribe({
    next:(resp)=>{
      if(resp.status=="success"){
this.products=resp.data;
        console.log(resp);
        const newData =resp.data.map((item:any)=>item._id)
      this.wishData=newData;
      }

      
    }
  })
}



addProd(pId: string, btn: any) {
  this._Renderer2.setAttribute(btn, 'disabled', 'true');
  this._CartService.addToCart(pId).subscribe({
    next: (response) => {
      console.log(response);
      this._ToastrService.success(response.message);
      this._Renderer2.removeAttribute(btn, 'disabled');
      this._CartService.cartNumber.next(response.numOfCartItems);
    },
    error: (err) => {
      this._Renderer2.removeAttribute(btn, 'disabled');
    },
  });
}


addFavProd(prodId:string):void{
  this._WishlistService.addToWish(prodId).subscribe({
    next:(res)=>{
    console.log(res);
    this._ToastrService.success(res.message)
    this.wishData =res.data

  }  
  })
    }


removeFavProd(prodId:string):void{
this._WishlistService.removeFav(prodId).subscribe({
  next:(res)=>{
    console.log(res)
  this._ToastrService.warning(res.message)
  this.wishData =res.data
  this._WishlistService.wishnum.next(res.data.length)


  this._WishlistService.getWishList().subscribe({
    next:(resp)=>{
this.products=resp.data;
    }
  })
}})

}


}
