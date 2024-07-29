import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-email-check',
  templateUrl: './email-check.component.html',
  styleUrls: ['./email-check.component.css']
})
export class EmailCheckComponent {
  constructor(private router:Router){}
  loginForm=new FormGroup({
    email: new FormControl('', [Validators.required, Validators.minLength(3)]),
})

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.loginForm.valid) {
      console.log(this.loginForm.value);
      // Handle login logic here
    }
  }
}
