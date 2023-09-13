import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';
import { FormBuilder, Validators } from '@angular/forms';
import { IPayPalConfig, ICreateOrderRequest } from 'ngx-paypal';
import { Router } from '@angular/router';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit{
  showSuccess:boolean=false
  showCancel:boolean=false
  showError:boolean=false
  
spinners:boolean=true
cart:any=[]
emptycart:boolean=false
cartotal:any
totalcartitems:any
pricediscount:any
check:boolean=true
saveadd:boolean=true
proceedpay:boolean=true
offers:boolean=false
discountm10:boolean=true
discountn50:boolean=true 
dis10:boolean=false
dis50:boolean=false
continuetoshop:boolean=false
continuetocheckout:boolean=false
responsetopaypal:boolean=false
universal:boolean=true


public payPalConfig ? : IPayPalConfig;

deliverydetails=this.form.group({
  name:['',[Validators.required]],
  mobile:['',[Validators.required]],
  email:['',[Validators.required]],
  address:[' ',[Validators.required]],
  state:['',[Validators.required]],
  pincode:['',[Validators.required]],
})

constructor(private data:ApiService , private form:FormBuilder ,private nav:Router){}

ngOnInit(): void {

const user = localStorage.getItem("username")
if(user){
// cart length
// carttotal
this.data.getcart().subscribe({next:(res:any)=>{
   setTimeout(() => {
    this.cart=res.cart
    this.spinners=false
    this.data.count.next(this.cart.length)
  this.carttotal()
  this.cartitems()
  this.carttotalprice()
  this.initConfig()
  this.data.cartvalue()
   }, 1000);
     
  
},error:(err:any)=>{
  alert(err.error)
}})
}else{
  alert('please login to continue')

}
}


// continue to checkout
// continuecheckout(){
//   this.data.getcart().subscribe({next:(res:any)=>{
//     this.cart=res.cart
//   }})
// }

// plus
plus(id:any){
this.data.plus(id).subscribe({next:(res:any)=>{
  this.cart=res.cart
  //  this.data.cartvalue()
  this.carttotal()
  this.cartitems()
  this.carttotalprice()
  this.data.cartvalue()
},error:(err:any)=>{
  console.log(err.error);
  
}})
}

// minus
minus(id:any){
  this.data.minus(id).subscribe({next:(res:any)=>{
    this.cart=res.cart
      // this.data.cartvalue()
    this.carttotal()
    this.cartitems()
    this.carttotalprice()
    this.data.cartvalue()
  },error:(err:any)=>{
    console.log(err.error);
    
  }})
}

// cart total
carttotal(){
  let total:any=0
  this.cart.forEach((item:any)=>{
    total+=item.total
    this.cartotal=Math.ceil(total)
  })
}

// cart total items
cartitems(){
  let items:any=0
  this.cart.forEach((item:any)=>{
      items+=item.quantity
      this.totalcartitems=items
  })
}

// cart total price
carttotalprice(){
  let items:any=0
  this.cart.forEach((item:any)=>{
      items+=item.totalprice
    this.pricediscount=items-this.cartotal
  })
}

// cartdelete
cartdelete(id:any){
  this.data.cartdelete(id).subscribe({next:(res:any)=>{
    this.cart=res.cart
    //  this.data.cartvalue()
    this.carttotal()
    this.cartitems()
    this.carttotalprice()
    this.data.cartvalue()
  },error:(err:any)=>{

  }})
}

// checkout
checkout(){
this.check=false
}

// save address
saveaddress(){

if(this.deliverydetails.valid){
const name= this.deliverydetails.value.name 
const email= this.deliverydetails.value.email
const mobile= this.deliverydetails.value.mobile
const address= this.deliverydetails.value.address 
const state= this.deliverydetails.value.state
const pincode= this.deliverydetails.value.pincode 

this.data.saveaddress(name,email,mobile,address,state,pincode).subscribe({next:(res:any)=>{
   this.saveadd=false
},error:(err:any)=>{
  alert(err.error)
}})

}else{
   alert('enter valid details')
}
}
// pay page
pay(){
if(this.saveadd==false){
  this.proceedpay=false
 
}else{
  alert('plz save address')
}
}
// offer
offer(){
this.offers=true

}

// discount10
discount10(){
  const newuser=Math.ceil(this.cartotal*.20)
  this.cartotal-=newuser
  this.pricediscount+=newuser
  this.dis10=true
  this.discountm10=false
  this.discountn50=false

}

// discount50
discount50(){
if(this.cartotal>=50000){
  const newuser=Math.ceil(this.cartotal*.50)
  this.cartotal-=newuser
  this.pricediscount+=newuser
this.dis50=true
  this.discountn50=false
  this.discountm10=false
}
}


// paypal function


private initConfig(): void {

  let amount = this.cartotal.toString()
  this.payPalConfig = {
  currency: 'USD',
  clientId: 'sb',
  createOrderOnClient: (data) => <ICreateOrderRequest>{
    intent: 'CAPTURE',
    purchase_units: [
      {
        amount: {
          currency_code: 'USD',
          value: amount,
          breakdown: {
            item_total: {
              currency_code: 'USD',
              value:amount
            }
          }
        },
        
      }
    ]
  },
  advanced: {
    commit: 'true'
  },
  style: {
    label: 'paypal',
    layout: 'vertical'
  },
  onApprove: (data, actions) => {
    console.log('onApprove - transaction was approved, but not authorized', data, actions);
    actions.order.get().then((details:any) => {
      console.log('onApprove - you can get full order details inside onApprove: ', details);
    });
  },
  onClientAuthorization: (data) => {
    console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
    this.showSuccess = true;
    this.continuetoshop=true
    this.dis10=false

    this.dis50=false
    this.offers=true
    this.universal=false
    this.discountm10=false
  this.discountn50=false
    this.responsetopaypal=true
    
    
    this.data.saveorder(this.cart)
   
     this.data.allcartdelete().subscribe({next:(res:any)=>{
       this.data.cartvalue()
    }})
    


  },
  onCancel: (data, actions) => {
    console.log('OnCancel', data, actions);
    this.dis10=false
    this.dis50=false
    this.offers=true
    this.discountm10=false
    this.discountn50=false
    this.responsetopaypal=true
    this.showCancel=true
    this.continuetocheckout=true
    
   
  },
  onError: err => {
    console.log('OnError', err);
    this.dis10=false
    this.dis50=false
    this.offers=true
    this.discountm10=false
    this.discountn50=false
    this.responsetopaypal=true
    this.showError=true
    this.continuetocheckout=true
  },
  onClick: (data, actions) => {
    console.log('onClick', data, actions);
  },
};
}

// payapal ends




}
