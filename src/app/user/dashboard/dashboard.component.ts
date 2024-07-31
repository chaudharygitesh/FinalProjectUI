import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/Service/user.service';
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  storedData: any = [];
  constructor(private router: Router, private userService: UserService) { }
   ActiveUser: number = 0;
   InactiveUser: number = 0;
   userDetails:any;
   subscription:any;
   p1:any;
   fileName="User_Details.xlsx";
   editUser(){

   }
   deleteUser(id:any){
    this.userService.UpdateIsActive(id)
    .subscribe((res) => {
      if(res){
        console.log("received",res);
      }
    });
   }
  ngOnInit(){
    this.getuserdetails();
  }
  getuserdetails(){
  this.subscription=this.userService.GetUserData().subscribe(
    {
      next : (res:any)=>{
        console.log(res);
        this.storedData=res;
        let active=this.storedData.filter((user:any)=>user.isActive);
        let inactive=this.storedData.filter((user:any)=>!user.isActive);
        this.ActiveUser=active.length;
        this.InactiveUser=inactive.length;
      }
    }
  )
  }
  ExcelExport(){
    let data=document.getElementById("tblData");
    const ws : XLSX.WorkSheet=XLSX.utils.table_to_sheet(data);
    const wb : XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb,ws,'Sheet1');
    XLSX.writeFile(wb,this.fileName);
  }
  visibility = false;
  
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
