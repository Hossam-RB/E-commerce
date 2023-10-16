import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {
constructor(private _ActivatedRoute:ActivatedRoute ,private _ReactiveFormsModule:ReactiveFormsModule ,private _CartService:CartService ){}
cId:string|null=''  

ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next:(parm)=>{
this.cId =parm.get('id')
console.log(this.cId);

      }
    })
}

payForm:FormGroup= new FormGroup({
  details:new FormControl(''),
  phone:new FormControl(''),
  city:new FormControl(''),
})

handelForm(){
  this._CartService.chekOut(this.cId,this.payForm.value).subscribe({
    next:(response)=>{
      console.log(response);
      if(response.status==="success"){
        window.open(response.session.url)
      }
      

    }
  })
  
}

}
