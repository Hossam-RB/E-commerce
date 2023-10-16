import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
 
categData:any []=[];

 constructor(private _ProductsService:ProductsService){}
  ngOnInit(): void {
   this._ProductsService.getCategories().subscribe({
    next:(response)=>{
this.categData = response.data ;
    }
   })
 }
}
