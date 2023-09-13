import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.css']
})
export class ViewProductComponent implements OnInit {
product:any
spinners:boolean=true

  constructor(private data:ApiService, private nav:Router,private route:ActivatedRoute){}


  // activated route
ngOnInit(): void {
  this.route.params.subscribe({next:(res:any)=>{
    console.log('params id ===',res);
    const {id}=res
     this.data.viewproduct(id).subscribe({next:(res:any)=>{
      setTimeout(() => {
        this.product=res
        this.spinners=false
      }, 1000);
     }})

  }})
}

  // add to cart
  addtocart(items:any){
    const value = localStorage.getItem("username")
    if(value){
      this.data.addcart(items).subscribe({next:(res:any)=>{
        this.data.cartvalue()
        alert(res)
  }})
    }else{
      alert("please login to add product")
    }

  }
// addtowish
  addtowishlist(items:any){
   const value= localStorage.getItem("username")
   if(value){
    this.data.wishlist(items).subscribe({next:(res:any)=>{
      this.data.cartvalue()
      alert(res)
}})
   }else{
    alert('please login to add product')
   }

  }


}
