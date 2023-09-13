import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit{
profiledetails:any
spinners:boolean=true
address:any
add:boolean=true
cpass:boolean=false

deleteacc=this.form.group({
  confirmpass:['',[Validators.required]]
})

addressform= this.form.group({
  name:['',[Validators.required]],
  email:['',[Validators.required]],
  mobile:['',[Validators.required]],
  address:['',[Validators.required]],
  state:['',[Validators.required]],
  pincode:['',[Validators.required]]
})

constructor(private data:ApiService ,private nav:Router ,private form:FormBuilder){}

ngOnInit(): void {
  
  this.data.getcart().subscribe({next:(res:any)=>{
      setTimeout(() => {
        this.spinners=false
        this.profiledetails=res
        this.address=res.address
      }, 800);
      
    }})
  
}

deleteaccount(){
  if(this.deleteacc.valid){
    this.spinners=true
    const confirmpass = this.deleteacc.value.confirmpass
    this.data.deleteaccount(confirmpass).subscribe({next:(res:any)=>{
      localStorage.removeItem("username")
      localStorage.removeItem("token")
      
         this.spinners=false
          this.nav.navigateByUrl('')
          this.data.uservalue()
          this.data.cartvalue()
         
         
    },error:(err:any)=>{
      alert('wrong password')
      this.spinners=false
      this.deleteacc.reset()
    }})
  }else{
    alert('please enter valid details')
    this.deleteacc.reset()
  }
  
}

// delete address
deleteaddress(name:any){
  this.data.deleteaddress(name).subscribe({next:(res:any)=>{
    this.ngOnInit()
  }})
}

// add address
addaddress(){
this.add=false
}

// addfromaddress
addfromaddress(){
  const name=this.addressform.value.name
  const email= this.addressform.value.address
  const mobile= this.addressform.value.mobile
  const address= this.addressform.value.address
  const state= this.addressform.value.state
  const pincode = this.addressform.value.pincode

  this.data.saveaddress(name,email,mobile,address,state,pincode).subscribe({next:(res:any)=>{
    this.addressform.reset()
    this.address=res.address
  }})
  this.add=true
}
}
