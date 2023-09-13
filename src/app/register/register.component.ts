import { Component } from '@angular/core';
import { ApiService } from '../products/service/api.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  register = this.form.group({
    name:['',[Validators.required]],
    mobile:['',[Validators.required]],
    mail:['',[Validators.required]],
    username:['',[Validators.required]],
    password:['',[Validators.required]],
    confirmpassword:['',[Validators.required]]
  })

constructor(private data:ApiService, private form:FormBuilder,private nav:Router){}


registerclick(){
 if(this.register.valid){
  const name=this.register.value.name
  const mobile=this.register.value.mobile
  const mail=this.register.value.mail
  const username=this.register.value.username
  const password=this.register.value.password
  const confirm=this.register.value.confirmpassword
if(password==confirm){
  this.data.register(name,mobile,mail,username,password).subscribe({next:(res:any)=>{
    alert(res)
    this.nav.navigateByUrl('/login')
  },error:(err:any)=>{
    alert(err.error)
    console.log(err.error);
    
  }})
}else{
  alert('Your two password doesnt match')
}

  
 } else{
  alert('enter valid details')
 }
 
}

}
