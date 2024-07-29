import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserDTO } from '../models/user-dto.model';
@Injectable({
  providedIn: 'root'
})
export class UserService {
 
  constructor(private httpClient :HttpClient) { }
  EmailSender(email:any){
    return this.httpClient.post("https://localhost:7294/api/Register/SendEmail/"+email,email);
  }
  authoriseUser(user:any):Observable<any>{
    console.log(user);
    return this.httpClient.post<any>("https://localhost:7294/api/Register/CheckUserCred/",user)
  }
  GetUserDetail(){
    return this.httpClient.get("https://localhost:7294/api/Register")
  }
  PostUserData(userData: UserDTO): Observable<any> {
    return this.httpClient.post<any>("https://localhost:7294/api/Register", userData);
  }
}
