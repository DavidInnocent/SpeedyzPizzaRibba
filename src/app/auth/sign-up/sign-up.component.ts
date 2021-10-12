import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  registrationForm=new FormGroup({
    username:new FormControl('',[Validators.required,Validators.minLength(5)]),
    email:new FormControl('',[Validators.required,Validators.email]),
    password:new FormControl('',[Validators.required,Validators.minLength(5)]),
    passwordRetry:new FormControl('',[Validators.required,Validators.minLength(5)]),
    
  })
  constructor(public authService:AuthService) { }

  ngOnInit(): void {
  }

  finishSignUP(){
this.authService.SignUp(this.registrationForm.controls['email'].value,this.registrationForm.controls['password'].value,this.registrationForm.controls['username'].value)
    
  }

}
