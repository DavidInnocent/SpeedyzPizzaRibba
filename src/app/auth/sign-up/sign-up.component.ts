import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { faGoogle, faFacebook } from '@fortawesome/free-brands-svg-icons';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  // registrationForm=new FormGroup({
  //   username:new FormControl('',[Validators.required,Validators.minLength(5)]),
  //   email:new FormControl('',[Validators.required,Validators.email]),
  //   password:new FormControl('',[Validators.required,Validators.minLength(5)]),
  //   passwordRetry:new FormControl('',[Validators.required,Validators.minLength(5)]),
    
  // }) 
  
  faGoogle = faGoogle;
  faFacebook = faFacebook;
  validation_messages = {
    'email': [
      { type: 'required', message: 'Email is required' },
      { type: 'email', message: 'Valid email is required' }
    ],
    'password': [
      { type: 'required', message: 'Email is required' },
      { type: 'minlength', message: 'Country must be at least 5 characters long' }
    ]}

  constructor(public authService:AuthService) { }
  signUpForm=new FormGroup({
    email:new FormControl('',{
      validators:[Validators.required,Validators.email],
      updateOn:'change'
    
    }),
    username:new FormControl('',{
      validators:[Validators.required,Validators.minLength(5)],
      updateOn:'change'
    
    }),
    password:new FormControl('',{
      validators:[Validators.required,Validators.minLength(5)],
      updateOn:'change'
    
    }),
  });

  ngOnInit(): void {
    this.authService.error$.subscribe(value=>alert(value))
  }
  signUp(){
    if(!this.signUpForm.valid)
    {
      alert('Email and password has to be filled in to continue.')
      return
    }
    this.authService.SignUp(this.signUpForm.controls['email'].value,this.signUpForm.controls['password'].value,this.signUpForm.controls['username'].value)
  }

}
