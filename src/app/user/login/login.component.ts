import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {  Router } from '@angular/router';
import { RouterLink,RouterLinkActive } from '@angular/router';
import { UserService } from 'src/app/Service/user.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private router:Router , private userservice :UserService){}
  loginForm=new FormGroup({
    EmailId: new FormControl('', [Validators.required, Validators.minLength(3), Validators.email]),
    Password: new FormControl('', [Validators.required, Validators.minLength(8) ,Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')])
})
onlysymbolvalidate(e:any){
  return (e.charCode>=33 && e.charCode<=126)
}
response:any;

regsiterpage(){
  this.router.navigate(['register'])
}
  ngOnInit(): void {}
  visibility = false;
  passwordType: string = 'password';
  toggleVisibility(){
    this.visibility = !this.visibility;
    if (this.visibility){
      this.passwordType = 'text';
    }
    else this.passwordType = 'password';
  }
  onSubmit(): void {
    if (this.loginForm.valid) {
      console.log(this.loginForm.value,'Hello vradhi');
      // Handle login logic here
      this.userservice.authoriseUser(this.loginForm.value).subscribe((res:any)=>{
        this.response=res;
        localStorage.setItem('usertoken',this.response.token)
        this.router.navigate(['/']);
      })
      
    
    }
  }
}
