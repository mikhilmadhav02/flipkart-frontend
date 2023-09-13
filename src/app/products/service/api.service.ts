import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from  '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

const options = {
  headers:new HttpHeaders
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  searchkey= new BehaviorSubject('')
  count=new BehaviorSubject(0)
  user=new BehaviorSubject('')
  base_url="http://localhost:3000"

  
  constructor(private api:HttpClient) {
    
   }
  // user value 
  uservalue(){
    let username:any = localStorage.getItem("username")
      this.user.next(username)
  }


// loginc all
login(username:any,password:any){
  const body={
    username,password
  }
  return this.api.post(`${this.base_url}/login`,body)
}

// registercall
register(name:any,mobile:any,mail:any,username:any,password:any){
  const body={
name,mobile,mail,username,password
  }
  return this.api.post(`${this.base_url}/register`,body)
}

// grocery call
grocerycall(){
  return this.api.get(`${this.base_url}/grocery`)
}

 // mobile call
 mobilecall(){
  return this.api.get(`${this.base_url}/mobile`)
}
// fashio call
fashioncall(){
return this.api.get(`${this.base_url}/fashion`)
}
// electronic call
electroniccall(){
return this.api.get(`${this.base_url}/electronic`)
}
// appliances
appliancecall(){
return this.api.get(`${this.base_url}/appliance`)
}
// toyscall
toycall(){
return this.api.get(`${this.base_url}/toy`)
}
// homecall
homecall(){
return this.api.get(`${this.base_url}/home`)
}

// viewproduct
viewproduct(id:any){
return this.api.get(`${this.base_url}/viewproduct/${id}`)
}


//add wishlsit
wishlist(items:any){
  const body={
    id:items.id,
    image:items.image,
    brand:items.brand,
    title:items.title,
    offerprice:items.offerprice,
    price:items.price,
    percentage:items.percentage
  }
  console.log('service=',body);
  
  return this.api.post(`${this.base_url}/wishlist`,body,this.getoken())
}

// gettoke
getoken(){
  const token = localStorage.getItem("token")
 if(token){
  let headers = new HttpHeaders()
  headers = headers.append("token",token)
  options.headers = headers
 }else{
  alert("error in web token")
 }
  return options
}
// getwishlist
getwishlist(){
  return this.api.get(`${this.base_url}/getwishlist`,this.getoken())
}
// addtocart
addcart(items:any){
  const body={
    id:items.id,
    image:items.image,
    brand:items.brand,
    title:items.title,
    offerprice:items.offerprice,
    price:items.price,
    percentage:items.percentage
  }
  return this.api.post(`${this.base_url}/addcart`,body,this.getoken())
}

// deletewish
deletewish(id:any){
 
return this.api.delete(`${this.base_url}/deletewishlist/${id}`,this.getoken())
}
// getcart
getcart(){
  return this.api.get(`${this.base_url}/getcart`,this.getoken())
}

// plus
plus(id:any){
 return this.api.get(`${this.base_url}/plus/${id}`,this.getoken())
}

// minus
minus(id:any){
 return this.api.get(`${this.base_url}/minus/${id}`,this.getoken())
}

// cartdelete
cartdelete(id:any){
return  this.api.delete(`${this.base_url}/cartdelete/${id}`,this.getoken())
}


// cart value
cartquantity(){
  const username= localStorage.getItem("username")
return this.api.get(`${this.base_url}/cartvalue/${username}`)

}
// cartvalue
  cartvalue(){
    let value:any
     this.cartquantity().subscribe({next:(res:any)=>{
      console.log('response of cart value======',res);
      
      if(res==null){
        value=0
        console.log('value ,if nul ====',value);
        
      }else{
        value=res.cart.length
        console.log('value ,if nul ====',value);
      }
      this.count.next(value)
     },error:(err:any)=>{

    }})
 }
// new cart value
// newcartvalue(){
//   let value:any=0
//   const storage= localStorage.getItem("token")
//   if(storage){
//           this.cartvalue()
//   }else{
    
//   this.count.next(value)
//   }
// }



// save address
saveaddress(name:any,email:any,mobile:any,address:any,state:any,pincode:any){
  const body={
    name,email,mobile,address,state,pincode
  }
  return this.api.post(`${this.base_url}/saveaddress`,body,this.getoken())
}

// allcartdelete
allcartdelete(){
  return this.api.delete(`${this.base_url}/allcartdelete`,this.getoken())
}


// save order
saveorder(cart:any){
  

cart.forEach((item:any)=>{
  var t= new Date()
  var d = t.getDate()
  var m = t.getMonth()
   var y = t.getFullYear()
let body={
  d,
  m,
  y,
   id:item.id,
   image:item.image,
   brand:item.brand,
   title:item.title,
   offerprice:item.offerprice,
   price:item.price,
   percentage:item.percentage,
   quantity:item.quantity,
   total:item.total,
   totalprice:item.totalprice
  }
console.log('order details',body);
this.calltosaveaddress(body).subscribe({next:(res:any)=>{
console.log(res);

}})
  
})
}


// callfor save address
calltosaveaddress(body:any){
  console.log('order details',body);

 return this.api.post(`${this.base_url}/saveorder`,body,this.getoken())
}


// deleteaccount\\
deleteaccount(confirm:any){
 const  body={
    confirm
  }
  return this.api.post(`${this.base_url}/deleteaccount`,body,this.getoken())
}

// deleteaddress
deleteaddress(name:any){
  return this.api.delete(`${this.base_url}/deleteaddress/${name}`,this.getoken())
}

// getorder


}
