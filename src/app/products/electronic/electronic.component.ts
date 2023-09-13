import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-electronic',
  templateUrl: './electronic.component.html',
  styleUrls: ['./electronic.component.css']
})
export class ElectronicComponent implements OnInit {
spinners:boolean=true
  electronic:any=[]
searchkey:any
constructor(private data:ApiService){}

ngOnInit(): void {
// searckey
this.data.searchkey.subscribe({next:(res:any)=>{
  this.searchkey=res
  }})
  // electronic call
this.data.electroniccall().subscribe({next:(res:any)=>{
  setTimeout(() => {
    this.electronic = res
    this.spinners=false
  }, 1000);
   console.log(res);
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
