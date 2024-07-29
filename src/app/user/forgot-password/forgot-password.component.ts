import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/Service/user.service';
@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {
  constructor(private router:Router,private userService:UserService){}
  loginForm=new FormGroup({
    email: new FormControl('', [Validators.required, Validators.minLength(3)]),
})

  ngOnInit(): void {}
  onlysymbolvalidate(e:any){
    return (e.charCode>=33 && e.charCode<=126)
  }
  onSubmit(): void {
    if (this.loginForm.valid) {
      console.log(this.loginForm.value);
      this.userService.EmailSender(this.loginForm.value.email).subscribe(res=>{
        console.log(res);
      })
    }
  }
}
