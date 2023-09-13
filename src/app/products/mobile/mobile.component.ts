import { Component,OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-mobile',
  templateUrl: './mobile.component.html',
  styleUrls: ['./mobile.component.css']
})
export class MobileComponent implements OnInit{
searchkey:any
  mobile:any=[]
  spinners:boolean=true
  constructor(private data:ApiService){}
  
  ngOnInit(): void {
    
   
     
     
   
    
    
// searckey
this.data.searchkey.subscribe({next:(res:any)=>{
  this.searchkey=res
  }})
  // mobile call
  this.data.mobilecall().subscribe({next:(res:any)=>{
    console.log(res);
    setTimeout(() => {
      this.mobile=res
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
