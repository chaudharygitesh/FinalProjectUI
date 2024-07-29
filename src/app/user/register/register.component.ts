import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/Service/user.service';
import { UserDTO } from 'src/app/models/user-dto.model';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})


export class RegisterComponent {
  userForm: FormGroup;
  countries = ['USA', 'Canada', 'UK']; 
  states = ['California', 'Texas', 'New York']; 
  cities = ['Los Angeles', 'Houston', 'New York City']; 
  genders = ['Male', 'Female', 'Other'];

  constructor(private router :Router , private userservice:UserService) {
    this.userForm = new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      middleName: new FormControl(''),
      gender: new FormControl('', Validators.required),
      dateOfBirth: new FormControl('', Validators.required),
      EmailId: new FormControl('', [Validators.required]),
      dateOfJoining: new FormControl('', Validators.required),
      phoneNumber: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{10}$')]),
      alternatePhone: new FormControl('', Validators.pattern('^[0-9]{10}$')),
      country: new FormControl('', Validators.required),
      state: new FormControl('', Validators.required),
      city: new FormControl('', Validators.required),
      address: new FormControl('', Validators.required),
      zipcode: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{6}$')]),
      secondaryAddress:new FormControl('',Validators.required),
      inactive: new FormControl(true),
      address1: new FormControl('', Validators.required),
      city1: new FormControl('', Validators.required),
      state1: new FormControl('', Validators.required),
      country1: new FormControl('', Validators.required),
      zipcode1: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{6}$')])

    });
  }
  onlysymbolvalidate(e:any){
    return (e.charCode>=33 && e.charCode<=126)
  }
  getCurrentDate(): string {
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    const day = today.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
}
dashboard(){
  this.router.navigate(['dashboard'])
}
  toggleSecondaryAddress() {
    const secondaryAddressControl = this.userForm.get('secondaryAddress');
    if (this.userForm.get('hasSecondaryAddress')?.value) {
      secondaryAddressControl?.setValidators([Validators.required]);
    } else {
      secondaryAddressControl?.clearValidators();
    }
    secondaryAddressControl?.updateValueAndValidity();
  }
  ngOnInit(): void {}

  onFileChange(event: any) {
    const file = event.target.files[0];
    this.userForm.patchValue({
      image: file
    });
  }
 
  storedData: any = [];
  onSubmit() {
    console.log('hii')
    if (this.userForm.valid) {
      console.log(this.userForm.value,'received');
    } else {
      this.userForm.markAllAsTouched();
    } 

      const userData: UserDTO = {
        firstName: this.userForm.value.firstName,
        lastName: this.userForm.value.lastName,
        middleName: this.userForm.value.middleName,
        gender: this.userForm.value.gender,
        dateOfBirth: this.userForm.value.dateOfBirth,
        EmailId: this.userForm.value.EmailId,
        dateOfJoining: this.userForm.value.dateOfJoining,
        phoneNumber: this.userForm.value.phoneNumber,
        alternatePhone: this.userForm.value.alternatePhone,
        country: this.userForm.value.country,
        state: this.userForm.value.state,
        city: this.userForm.value.city,
        address: this.userForm.value.address,
        zipcode: this.userForm.value.zipcode,
        secondaryAddress: this.userForm.value.secondaryAddress,
        inactive: this.userForm.value.inactive,
        address1: this.userForm.value.address1, // Bind this
        city1: this.userForm.value.city1,       // Bind this
        state1: this.userForm.value.state1,     // Bind this
        country1: this.userForm.value.country1, // Bind this
        zipcode1: this.userForm.value.zipcode1
      };
      console.log('User Data:', userData);
      console.log(this.userForm.value);
      this.userservice.PostUserData(userData)
        .subscribe((res: any) => {
          console.log(res);
        });
    
  }
}
