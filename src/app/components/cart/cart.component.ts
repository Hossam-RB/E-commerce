import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
 cartDetails:any= null;
 constructor(private _CartService:CartService){}
  ngOnInit(): void {
     this._CartService.getCat().subscribe({
      next:(resp)=>{
        console.log(resp.data);
        this.cartDetails=resp.data
      }
     })
 }


 removeItem(pordId:string):any{
  this._CartService.removeCatItem(pordId).subscribe({
    next:(res)=>{
 this.cartDetails= res.data;
 this._CartService.cartNumber.next(res.numOfCartItems)

    }
  })
 }

 changeCount(count:number ,id:string){

  if(count>=1){
this._CartService.updateCatItem(count,id).subscribe({
  next:(response)=>{
    this.cartDetails= response.data;
  }
})
 }
}


clearCart(){
  this._CartService.removeCat().subscribe({
    next:(response)=>{
      if(response.message ==="success"){
        this.cartDetails=null;
        this._CartService.cartNumber.next(0)

      }
      
    }
  })
}
}
