import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.scss']
})
export class BrandsComponent implements OnInit {

  brandData:any []=[];

 constructor(private _ProductsService:ProductsService){}
  ngOnInit(): void {
   this._ProductsService.getBrands().subscribe({
    next:(response)=>{
      console.log(response);
      
this.brandData = response.data ;
    }
   })
 }

}
