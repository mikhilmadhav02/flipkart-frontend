import { Component, OnInit } from '@angular/core';
import { ApiService } from './service/api.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  spinners:boolean=true
leftproduct:any=[]
middleproduct:any=[]
rightproduct:any=[]
constructor(private data:ApiService){

}

ngOnInit(): void {

 



  setTimeout(() => {
    this.spinners=false
  },1500);
}



}
