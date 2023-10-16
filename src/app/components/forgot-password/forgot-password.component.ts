import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ForgotPassService } from 'src/app/services/forgot-pass.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent {
s1:boolean=true;
s2:boolean=false;
s3:boolean=false;
constructor(private _ForgotPassService:ForgotPassService
  ,private _ToastrService:ToastrService
  ,private _Router:Router
  ){
}
forgotForm:FormGroup =new FormGroup ({
  email:new FormControl('')
})

resetCode:FormGroup =new FormGroup ({
  resetCode:new FormControl('')
})

resetPass:FormGroup =new FormGroup ({
  email:new FormControl(''),
  newPassword:new FormControl('')

})


forgot():void{
  var userEmail:any= this.forgotForm.value
  
  
this._ForgotPassService.forgotPass(userEmail).subscribe({
  next:(response) => {
    console.log(response);
   this.s1=false;
   this.s2=true;
   this._ToastrService.warning(response.message);
      },
error:(err)=>{
  console.log("Error", err); 
  this._ToastrService.error(err.error.message);
 
}

})
}

resCode():void{
  let resetCode:FormGroup =this.resetCode.value
  console.log(resetCode);
  
this._ForgotPassService.resetCode(resetCode).subscribe({
  next:(response)=>{
    console.log(response)
    this._ToastrService.success('Enter new Password','success');
    this.s2=false;
    this.s3=true;
  }, 
   error:(err)=>{
    console.log(err)
    this._ToastrService.warning(err.error.message);
   }
})}

newPass():void{
  let newPass:FormGroup =this.resetPass.value
  this._ForgotPassService.resetPass(newPass).subscribe({
    next:(response)=> {
      console.log(response);
      localStorage.setItem('userToken',response.token);
      this._Router.navigate(['/home'])
      
},
error:(err)=>{
  console.log("Error",err)
}})

}
}
