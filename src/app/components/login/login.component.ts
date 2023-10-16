import { Component } from '@angular/core';
import { FormControl, FormGroup ,Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  constructor(private _AuthService:AuthService , private _Router:Router){}
  isLoading:boolean =false;
  errMessage:string='';
loginForm:FormGroup=new FormGroup(
  {
    email  : new FormControl('',[Validators.required,Validators.email]),
    password  : new FormControl('',[Validators.required  ,Validators.pattern(/^[a-zA-z0-9_@]{6,}$/)])
  }
)

handelLogin(){
  this.isLoading = true;
if(this.loginForm.valid){
this._AuthService.loginForm(this.loginForm.value).subscribe({
  next:(response)=>{
    if(response.message === "success"){
      
      this._Router.navigate(['/home'])
      localStorage.setItem("userToken",response.token)
      localStorage.setItem("userName",response.user.name)

    }


    this.isLoading = false;

  },
  error:(err)=>{
    this.isLoading = false;
    this.errMessage=err.error.message ;
    console.log(err.error);
    


  }

})

}
}
}
