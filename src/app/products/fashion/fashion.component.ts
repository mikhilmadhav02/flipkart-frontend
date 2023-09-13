import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-fashion',
  templateUrl: './fashion.component.html',
  styleUrls: ['./fashion.component.css']
})
export class FashionComponent implements OnInit {
searchkey:any
  fashion:any=[]
spinners:boolean=true
  constructor(private data:ApiService){}
  
  ngOnInit(): void {

   this.data.searchkey.subscribe({next:(res:any)=>{
    this.searchkey=res
   }})

// fashion call
this.data.fashioncall().subscribe({next:(res:any)=>{
  setTimeout(() => {
    this.fashion = res
    this.spinners=false
  }, 1000);
 
},error:(err:any)=>{
  console.log(err.error);
  
}})
  
  }
  
  // wishlist
  wishlist(items:any){
    console.log(items);
    const value= localStorage.getItem("username")
    if(value){
      this.data.wishlist(items).subscribe({next:(res:any)=>{
        alert(res)
        },error:(err:any)=>{
        alert(err.error)
        }})
    }else{
      alert('please login to add product')
    }

  }

}
