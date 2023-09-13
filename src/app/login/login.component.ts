import { Component } from '@angular/core';
import { ApiService } from '../products/service/api.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  login=this.form.group({
    username:['',[Validators.required]],
    password:['',[Validators.required]]
  })
  
  
  constructor(private data:ApiService, private form:FormBuilder, private nav:Router){}
  
  
  alllogin(){
  if(this.login.valid){
  const  username=this.login.value.username
   const  password=this.login.value.password
    this.data.login(username,password).subscribe({next:(res:any)=>{
      
      const{user,token}=res
      localStorage.setItem("token",token)
      localStorage.setItem("username",user.username)
      this.data.uservalue()
      this.data.cartvalue()
      this.nav.navigateByUrl('')
      console.log(user);
      console.log(token);
      
      
      
            
    },error:(err:any)=>{
      alert(err.error)
    }})
  }else{
    alert("enter valid details")
  }
   
  }
// pageridirect
pageridirect(){
  this.nav.navigateByUrl('')
}

}
