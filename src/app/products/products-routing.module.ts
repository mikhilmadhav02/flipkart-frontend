import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from './products.component';
import { GroceryComponent } from './grocery/grocery.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { CartComponent } from './cart/cart.component';
import { MobileComponent } from './mobile/mobile.component';
import { FashionComponent } from './fashion/fashion.component';

import { ToysComponent } from './toys/toys.component';
import { ApplianceComponent } from './appliance/appliance.component';
import { HomeComponent } from './home/home.component';
import { ElectronicComponent } from './electronic/electronic.component';
import { ViewProductComponent } from './view-product/view-product.component';
import { PlaincartComponent } from './plaincart/plaincart.component';
import { ProfileComponent } from './profile/profile.component';
import { OrderComponent } from './order/order.component';
import { authGuard } from '../guard/auth.guard';


const routes: Routes = [
  
  { path: '', component: ProductsComponent },
{path:'grocery',component:GroceryComponent},
{path:'mobile',component:MobileComponent},
{path:'fashion',component:FashionComponent},
{path:"electronic",component:ElectronicComponent},
{path:'home',component:HomeComponent},
{path:'appliance',component:ApplianceComponent},
{path:'toy',component:ToysComponent},
{path:'wishlist',component:WishlistComponent,canActivate:[authGuard]},
{path:'cart',component:CartComponent,canActivate:[authGuard]},
{path:'view/:id',component:ViewProductComponent},
{path:'plaincart',component:PlaincartComponent},
{path:'profile',component:ProfileComponent,canActivate:[authGuard]},
{path:'order',component:OrderComponent,canActivate:[authGuard]}



];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
