import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductsComponent } from './products.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {  HttpClientModule } from '@angular/common/http';
import { AllproductsComponent } from './allproducts/allproducts.component';
import { GroceryComponent } from './grocery/grocery.component';
import { MobileComponent } from './mobile/mobile.component';
import { FashionComponent } from './fashion/fashion.component';
import { ElectronicComponent } from './electronic/electronic.component';
import { HomeComponent } from './home/home.component';
import { ApplianceComponent } from './appliance/appliance.component';
import { ToysComponent } from './toys/toys.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { CartComponent } from './cart/cart.component';
import { NgxPayPalModule } from 'ngx-paypal';
import { FilterPipe } from './pipe/filter.pipe';
import { ViewProductComponent } from './view-product/view-product.component';
import { PlaincartComponent } from './plaincart/plaincart.component';
import { ProfileComponent } from './profile/profile.component';
import { OrderComponent } from './order/order.component';

@NgModule({
  declarations: [
    ProductsComponent,
    AllproductsComponent,
    GroceryComponent,
    MobileComponent,
    FashionComponent,
    ElectronicComponent,
    HomeComponent,
    ApplianceComponent,
    ToysComponent,
    WishlistComponent,
    CartComponent,
    FilterPipe,
    ViewProductComponent,
    PlaincartComponent,
    ProfileComponent,
    OrderComponent
     

  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    NgxPayPalModule,
    
  ]
})
export class ProductsModule { }
