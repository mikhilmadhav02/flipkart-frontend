import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../products/service/api.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  searchkey:any
  cartvalue:any
  value:any
  count:any
  username:any
  sign:boolean=false
  constructor(private nav:Router,private data:ApiService){}
  
    ngOnInit(): void {
      // user call
      this.data.uservalue()
      // user value
      this.data.user.subscribe({next:(res:any)=>{
             if(res){
              this.sign=true
              this.username=res
             }else{
              
              this.sign=false
             }
}})

 // cart value call
           this.data.cartvalue()
// cart value sunscribe
       this.data.count.subscribe({next:(res:any)=>{
        this.count=res
        }})
      }
  
// profileselect
profileselect(){
  const username:any = localStorage.getItem("username")
  if(username){
    this.nav.navigateByUrl('/products/profile')
  }else{
    alert('please login to see your profile')
  }
}

  logout(){
    localStorage.removeItem("token")
    localStorage.removeItem("username")
    this.data.uservalue()
    this.data.cartvalue()
    this.username= localStorage.getItem("username")
   this.sign=false
   this.nav.navigateByUrl('/products')
  }

  // searchkey
  search(event:any){
    const {value} = event.target
    this.data.searchkey.next(value)
  }
  
  // clickcart
  clickcart(){
    const username:any=localStorage.getItem("username")
    if(username){
      this.nav.navigateByUrl('/products/cart')
    }else{
      alert('Please login to access cart, ')
    }
  }

// clickwish
clickwish(){
  const username:any=localStorage.getItem("username")
  if(username){
    this.nav.navigateByUrl('/products/wishlist')
  }else{
    alert('Please login to access wishlist')
  }
}


// order
order(){
  const username=localStorage.getItem("username")
  if(username){
    this.nav.navigateByUrl('/products/order')
  }else{
    alert('Please login to see your orders')
  }
}



  }
