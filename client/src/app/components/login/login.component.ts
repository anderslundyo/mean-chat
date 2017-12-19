import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { User } from '../../models/user';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  title = 'Login Component';
  user = new User('')
  username: String;
  constructor(
    private router:Router,
    private loginService: LoginService
  ) { }


  ngOnInit() {
    
  }

  onLoginSubmit(){
    console.log("onLoginSubmit kørt");
    this.loginService.addUser(this.user).subscribe(user => {
      this.user = user;
    });
    this.router.navigate(['chat']);
  }
}