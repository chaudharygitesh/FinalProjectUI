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
   sortColumn: string = '';
   sortOrder: string = 'asc'; // Initial sorting order
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
  sortData(column: string) {
    // Toggle sort order if the same column is clicked
    this.sortOrder = (this.sortColumn === column && this.sortOrder === 'asc') ? 'desc' : 'asc';
    this.sortColumn = column;

    // Sort the storedData array
    this.storedData.sort((a: any, b: any) => {
      const isAsc = this.sortOrder === 'asc';
      switch (column) {
        case 'firstName': return isAsc ? a.firstName.localeCompare(b.firstName) : b.firstName.localeCompare(a.firstName);
        case 'middleName': return isAsc ? a.middleName.localeCompare(b.middleName) : b.middleName.localeCompare(a.middleName);
        case 'lastName': return isAsc ? a.lastName.localeCompare(b.lastName) : b.lastName.localeCompare(a.lastName);
        case 'dateOfBirth': return isAsc ? new Date(a.dateOfBirth).getTime() - new Date(b.dateOfBirth).getTime() : new Date(b.dateOfBirth).getTime() - new Date(a.dateOfBirth).getTime();
        case 'emailId': return isAsc ? a.emailId.localeCompare(b.emailId) : b.emailId.localeCompare(a.emailId);
        case 'phoneNumber': return isAsc ? a.phoneNumber - b.phoneNumber : b.phoneNumber - a.phoneNumber;
        case 'fpAddressGcs[0].city': return isAsc ? a.fpAddressGcs[0]?.city.localeCompare(b.fpAddressGcs[0]?.city) : b.fpAddressGcs[0]?.city.localeCompare(a.fpAddressGcs[0]?.city);
        case 'fpAddressGcs[0].state': return isAsc ? a.fpAddressGcs[0]?.state.localeCompare(b.fpAddressGcs[0]?.state) : b.fpAddressGcs[0]?.state.localeCompare(a.fpAddressGcs[0]?.state);
        default: return 0;
      }
    });
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
