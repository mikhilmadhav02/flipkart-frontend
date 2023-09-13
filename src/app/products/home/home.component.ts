import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
searchkey:any
  home:any=[]
  spinners:boolean=true
  constructor(private data:ApiService){}
  
  ngOnInit(): void {
// searckey
this.data.searchkey.subscribe({next:(res:any)=>{
  this.searchkey=res
  }})
  // search call
this.data.homecall().subscribe({next:(res:any)=>{
      setTimeout(() => {
        this.home=res
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
