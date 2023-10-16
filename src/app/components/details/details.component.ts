import { Component, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/services/cart.service';
import { ProductsService } from 'src/app/services/products.service';
import { WishlistService } from 'src/app/services/wishlist.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  constructor(private _ActivatedRoute:ActivatedRoute, private _ProductsService:ProductsService
    ,private _Renderer2:Renderer2,
    private _CartService:CartService,
    private _ToastrService:ToastrService,
    private _WishlistService:WishlistService
    ){}
  prodId:string| null='';
prodData :any= null;
wishData:string[]=[];




  ngOnInit():void{
    this._ActivatedRoute.paramMap.subscribe({
      next:(prms)=>{
this.prodId= prms.get('id')
console.log(this.prodId);

      }
    })



    
this._ProductsService.getProdDetails(this.prodId).subscribe({
  next:(resp)=>{
    console.log(resp);
    this.prodData=resp.data;

  }
})
  

this._WishlistService.getWishList().subscribe({
  next:(resp:any)=>{
    if(resp.status=="success"){
// this.products=resp.data;
      console.log('wish',resp);
      const newData =resp.data.map((item:any)=>item._id)
    this.wishData=newData;
    this._WishlistService.wishnum.next(resp.data.length)

    
  }

    
  }
})




}



  addProd(pId:string ,btn:any){
    this._Renderer2.setAttribute(btn ,'disabled','true')
    this._CartService.addToCart(pId).subscribe({
      next:(response)=>{
        console.log(response)
      this._ToastrService.success(response.message)
      this._Renderer2.removeAttribute(btn ,'disabled')
      this._CartService.cartNumber.next(response.numOfCartItems)
      },
      error:(err)=>{
        this._Renderer2.removeAttribute(btn ,'disabled')
    
    
      }
    
      }
    )
    }

    addFavProd(prodId:string):void{
      this._WishlistService.addToWish(prodId).subscribe({
        next:(res:any)=>{
        console.log(res);
        this._ToastrService.success(res.message)
        this.wishData =res.data
        this._WishlistService.wishnum.next(res.data.length)
    
      }  
      })
        }
    
    
    removeFavProd(prodId:string):void{
    this._WishlistService.removeFav(prodId).subscribe({
      next:(res:any)=>{
        console.log(res)
      this._ToastrService.warning(res.message)
      this.wishData =res.data
      this._WishlistService.wishnum.next(res.data.length)
  
      }
    })
    }

  
  imageOptions: OwlOptions = {
  loop: true,
  mouseDrag: true,
  touchDrag: true,
  pullDrag: false,
  dots: false,
  navSpeed: 700,
  navText: ['', ''],
  items:1,
  nav: true
}


  }




