import { Component, OnInit, Renderer2 } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/services/cart.service';
import { ProductsService } from 'src/app/services/products.service';
import { WishlistService } from 'src/app/services/wishlist.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  products: any[] = [];
  categories: any[] = [];
  tearm :string|null=''
  wishData:string[]=[];

  constructor(
    private _ProductsService: ProductsService,
    private _CartService: CartService,
    private _ToastrService: ToastrService,
    private _Renderer2: Renderer2,
    private _WishListService:WishlistService,
  ) {}

  ngOnInit(): void {
    this._ProductsService.getProducts().subscribe({
      next: (response) => {this.products = response.data},
    });

    this._ProductsService.getCategories().subscribe({
      next: (categories) => {
        this.categories = categories.data;
      },
    });
 
 

    this._WishListService.getWishList().subscribe({
      next:(resp)=>{
        if(resp.status=="success"){
  // this.products=resp.data;
          console.log(resp);
          const newData =resp.data.map((item:any)=>item._id)
        this.wishData=newData;
        this._WishListService.wishnum.next(resp.data.length)

        
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
  categoriesOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    autoplay: true,
    autoplaySpeed: 1000,
    autoplayTimeout: 5000,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 3,
      },
      740: {
        items: 4,
      },
      940: {
        items: 6,
      },
    },
    nav: true,
  };

  mainSlideOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    navSpeed: 700,
    autoplay: true,
    autoplayTimeout: 3500,
    autoplaySpeed: 1000,
    items: 1,

    nav: false,
  };

  addFavProd(prodId:string):void{
    this._WishListService.addToWish(prodId).subscribe({
      next:(res)=>{
      console.log(res);
      this._ToastrService.success(res.message)
      this.wishData =res.data
      this._WishListService.wishnum.next(res.data.length)
  
    }  
    })
      }
  
  
  removeFavProd(prodId:string):void{
  this._WishListService.removeFav(prodId).subscribe({
    next:(res)=>{
      console.log(res)
    this._ToastrService.warning(res.message)
    this.wishData =res.data
    this._WishListService.wishnum.next(res.data.length)

    }
  })
  }
  }
