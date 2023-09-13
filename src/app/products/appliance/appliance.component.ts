import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-appliance',
  templateUrl: './appliance.component.html',
  styleUrls: ['./appliance.component.css']
})
export class ApplianceComponent implements OnInit {

  appliance:any=[]
searchkey:any
spinners:boolean=true
  constructor(private data:ApiService){}
  
  
  ngOnInit(): void {
// searckey
this.data.searchkey.subscribe({next:(res:any)=>{
this.searchkey=res
}})
// appliance call
this.data.appliancecall().subscribe({next:(res:any)=>{
  setTimeout(() => {
    this.appliance =res
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
  // searchkey
  

}
