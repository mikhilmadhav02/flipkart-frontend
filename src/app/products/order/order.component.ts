import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
spinners:boolean=true
searchkey:any
order:any=[]

constructor(private data:ApiService){}

ngOnInit(): void {

// searchkey
this.data.searchkey.subscribe({next:(res:any)=>{
  this.searchkey=res
}})



  this.data.getcart().subscribe({next:(res:any)=>{
    setTimeout(() => {
      this.order=res.order
      this.spinners=false
    }, 1000);
  },error:(err:any)=>{

  }})
}

}
