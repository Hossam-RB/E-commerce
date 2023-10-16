import { Component, OnInit, Renderer2 } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/services/cart.service';
import { ProductsService } from 'src/app/services/products.service';
import { WishlistService } from 'src/app/services/wishlist.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  products: any[] = [];
  wishData:string[]=[];
  tearm :string|null=''

constructor(private _ProductsService:ProductsService ,private _Renderer2:Renderer2 ,private _CartService:CartService , 
  private _ToastrService:ToastrService,
  private _WishlistService:WishlistService
  ){}
  ngOnInit(): void {
  this._ProductsService.getProducts().subscribe({
    next: (response) => {
      this.products= response.data;
      console.log(response);
    }
    });


    this._WishlistService.getWishList().subscribe({
      next:(resp)=>{
        if(resp.status=="success"){
  // this.products=resp.data;
          console.log(resp);
          const newData =resp.data.map((item:any)=>item._id)
        this.wishData=newData;
        this._WishlistService.wishnum.next(resp.data.length)

        
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
    this._WishlistService.wishnum.next(res.data.length)

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

  }
})
}


}
