import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { faGoogle,faFacebook } from '@fortawesome/free-brands-svg-icons';
import { ToastrService } from 'ngx-toastr';

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

  constructor(public authService:AuthService,public toastr: ToastrService) { }
  loginForm=new FormGroup({
    email:new FormControl('',{validators:[Validators.required,Validators.email]}),
    password:new FormControl('',{validators:[Validators.required,Validators.minLength(5)]}),
  });

  ngOnInit(): void {
    this.authService.error$.subscribe(value=>this.showError(value))
  }
  login(){
    
    
    if(!this.loginForm.valid)
    {
      this.showError('Valid email and password required to continue');
      return
    }
    else
    {
      this.authService.SignIn(this.loginForm.controls['email'].value,this.loginForm.controls['password'].value)
    }
    
  }

  
  showError(value:string) {
    this.toastr.error( value,'Error Encountered');
  }

}
