import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-toys',
  templateUrl: './toys.component.html',
  styleUrls: ['./toys.component.css']
})
export class ToysComponent implements OnInit {

  toy:any=[]
searchkey:any
spinners:boolean=true
  constructor(private data:ApiService){}
  
  ngOnInit(): void {
// searckey
this.data.searchkey.subscribe({next:(res:any)=>{
  this.searchkey=res
  }})
  // toyscall
this.data.toycall().subscribe({next:(res:any)=>{
     setTimeout(() => {
      this.toy=res
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
