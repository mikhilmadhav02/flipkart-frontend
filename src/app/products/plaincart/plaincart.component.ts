import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-plaincart',
  templateUrl: './plaincart.component.html',
  styleUrls: ['./plaincart.component.css']
})
export class PlaincartComponent implements OnInit {


constructor(private nav:Router){

}

ngOnInit(): void {
  this.nav.navigateByUrl('/products/cart')
}



}
