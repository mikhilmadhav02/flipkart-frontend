import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';


@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent {
   searchkey:any
  wishlist:any=[]
  spinners:boolean=true
  constructor(private data:ApiService){}
  
  ngOnInit(): void {
    const user = localStorage.getItem("username")
             if(user){
              this.data.getwishlist().subscribe({next:(res:any)=>{
                console.log(res);
                console.log(res.wishlist);
                
                setTimeout(() => {
                  this.wishlist=res.wishlist
                this.spinners=false
                }, 800);
              },error:(err:any)=>{
            
              }})
             }else{
              alert('please login to continue')
             }

// searchkey
this.data.searchkey.subscribe({next:(res:any)=>{
  this.searchkey=res
}})


  }
  // addcart
addtocart(items:any){
  this.data.addcart(items).subscribe({next:(res:any)=>{
    this.data.cartvalue()
    console.log(res);
    alert(res)
  },error:(err:any)=>{
    console.log(err.error);
    
  }})
}
// deletewish
deletewishlist(id:any){
this.data.deletewish(id).subscribe({next:(res:any)=>{
  this.wishlist=res.wishlist
},error:(err:any)=>{
  alert(err.error)
}})
}

}
