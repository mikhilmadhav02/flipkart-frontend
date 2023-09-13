import { CanActivateFn, Router } from '@angular/router';
import { Injectable } from '@angular/core'

@Injectable({
providedIn:'root'
})

export class authGuard  {
constructor(private nav:Router){}
canActivate: CanActivateFn = () => {
 const username = localStorage.getItem("username")
  
if(username){
  return true
}else{
  alert('Please Relogin to continue,')
this.nav.navigateByUrl('')
  return false
}


}

}
