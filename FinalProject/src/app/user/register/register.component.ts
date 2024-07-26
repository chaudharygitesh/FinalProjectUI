import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

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

  constructor() {
    this.userForm = new FormGroup({
      image: new FormControl(null),
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      middleName: new FormControl(''),
      gender: new FormControl('', Validators.required),
      dateOfBirth: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      dateOfJoining: new FormControl('', Validators.required),
      phoneNumber: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{10}$')]),
      alternatePhone: new FormControl('', Validators.pattern('^[0-9]{10}$')),
      country: new FormControl('', Validators.required),
      state: new FormControl('', Validators.required),
      city: new FormControl('', Validators.required),
      address: new FormControl('', Validators.required),
      zipcode: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{6}$')]),
      secondaryAddress:new FormControl('',Validators.required),
      hasSecondaryAddress: new FormControl(true),
      inactive: new FormControl(true)
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

  onSubmit() {
    if (this.userForm.valid) {
      console.log(this.userForm.value);
      // Handle form submission
    } else {
      // Mark all fields as touched to show validation errors
      this.userForm.markAllAsTouched();
    }
  }
}
