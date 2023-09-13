import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-grocery',
  templateUrl: './grocery.component.html',
  styleUrls: ['./grocery.component.css']
})
export class GroceryComponent implements OnInit{
  grocery:any=[]
searchkey:any
spinners:boolean=true
  constructor(private data:ApiService){}
  
  
  // grocerycall
  ngOnInit(): void {
// searckey
this.data.searchkey.subscribe({next:(res:any)=>{
  this.searchkey=res
  }})
  
  // call
  this.data.grocerycall().subscribe({next:(res:any)=>{
    console.log(res);
    setTimeout(() => {
      this.grocery = res
      this.spinners=false
    }, 1000);
   
  },error:(err:any)=>{
    console.log('error=',err.error);
    
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
