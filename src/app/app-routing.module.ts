import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ProductsComponent } from './components/products/products.component';
import { CartComponent } from './components/cart/cart.component';
import { BrandsComponent } from './components/brands/brands.component';
import { LoginComponent } from './components/login/login.component';
import { RegiserComponent } from './components/regiser/regiser.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { BlankLayoutComponent } from './layouts/blank-layout/blank-layout.component';
import { authGuard } from './guard/auth.guard';
import { DetailsComponent } from './components/details/details.component';
import { PaymentComponent } from './components/payment/payment.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { WishListComponent } from './components/wish-list/wish-list.component';

const routes: Routes = [
{
path:"",component:BlankLayoutComponent ,canActivate:[authGuard], children:[

  {path:"",redirectTo:"home",pathMatch:"full"},
  {path:"home",component:HomeComponent,title:'home'},
  {path:'payment/:id',component:PaymentComponent ,title:'payment'},
  {path:"productDetails/:id",component:DetailsComponent ,title:'productDetails'},
  {path:"products",component:ProductsComponent ,title:'products'},
  {path:"cart",component:CartComponent ,title:'cart'},
  {path:"brands",component:BrandsComponent ,title:'brands'},
  {path:"categories",component:CategoriesComponent ,title:'categories'},
  {path:"forgotpass",component:ForgotPasswordComponent ,title:'forgotpass'},
  {path:"wishlist",component:WishListComponent ,title:'wishlist'}

]
},


{path:"",component:AuthLayoutComponent, children:[
  {path:"login",component:LoginComponent,title:'login'},
  {path:"regiser",component:RegiserComponent,title:'regiser'},
  {path:"forgotP",component:ForgotPasswordComponent,title:'forgotP'}

]
},



{path:"**",component:NotfoundComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
