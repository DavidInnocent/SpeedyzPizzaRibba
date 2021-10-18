import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { faGoogle,faFacebook } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  faGoogle = faGoogle;
  faFacebook = faFacebook;
  validation_messages = {
    'email': [
      { type: 'required', message: 'Email is required' },
      { type: 'email', message: 'Valid email is required' }
    ],
    'password': [
      { type: 'required', message: 'Password is required' },
      { type: 'minlength', message: 'Password must be at least 5 characters long' }
    ]}

  constructor(public authService:AuthService) { }
  loginForm=new FormGroup({
    email:new FormControl('',{validators:[Validators.required,Validators.email]}),
    password:new FormControl('',{validators:[Validators.required,Validators.minLength(5)]}),
  });

  ngOnInit(): void {
    this.authService.error$.subscribe(value=>alert(value))
  }
  login(){
    if(!this.loginForm.valid)
    {
      alert('Email and password has to be filled in to continue.')
      return
    }
    this.authService.SignIn(this.loginForm.controls['email'].value,this.loginForm.controls['password'].value)
  }

}
