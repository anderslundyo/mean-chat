import { Component, OnInit } from '@angular/core';
import { LoginService } from 'app/services/login.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  title = 'Home Component';
  public onlineUsers = [];

  constructor(private loginService:LoginService) { }


  getOnlineUsers(){
    this.loginService.getUsers().subscribe(
      users => {
        this.onlineUsers = users;
      },
      error => this.title = <any>error
    )
  }


  ngOnInit() {
    console.log(this.onlineUsers);
  }

}
