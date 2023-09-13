import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { PlainpageComponent } from './plainpage/plainpage.component';


const routes: Routes = [
  
  {path:'',redirectTo:'products',pathMatch:'full'},
  
  { path: 'products', loadChildren: () => import('./products/products.module').then(m => m.ProductsModule) },
  {path:'login',component:LoginComponent},
  {path:'register',component:RegisterComponent},
  {path:'plainpage',component:PlainpageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
