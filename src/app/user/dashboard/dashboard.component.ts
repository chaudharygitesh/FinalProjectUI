import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
   ActiveUser: number = 0;
   InactiveUser: number = 0;
  //  let isActive=
  visibility = false;
  constructor(private router:Router) { }
  passwordType: string = 'password';
  toggleVisibility(){
    this.visibility = !this.visibility;
    if (this.visibility){
      this.passwordType = 'text';
    }
    else this.passwordType = 'password';
  }
  adduser(){
    this.router.navigate(['/Register']);
  }
}
