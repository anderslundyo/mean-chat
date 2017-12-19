import { Component, OnInit } from '@angular/core';
import {Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: String;
  constructor(
    private router:Router
  ) { }

  ngOnInit() {
  }


  onLoginSubmit(){
    const name = {
      username: this.username
    }

    localStorage.setItem('user', JSON.stringify(name.username));

    console.log(JSON.parse(localStorage.getItem('user')));
  }
}