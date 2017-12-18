import { Component, OnInit } from '@angular/core';
import { Msg } from './Msg/msg';
import './rxjs-operators';
import { MsgService } from './Msg/msg.service';
import { LoginService } from './Login/login.service';
import { User } from './Login/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [MsgService, LoginService]
})
export class AppComponent implements OnInit {
  isSubmitted = false;
  title = 'MEAN app with Socket IO';
  model = new Msg('', '');
  public blogMessages = [];

  constructor (private msgService: MsgService) {}

  submitMsg() {
    this.msgService.addMsg(this.model)
      .subscribe(
        message => {
          // console.log("Messages:", messages);
          this.model = message;
          // this.getBlogs();
        },
        error =>  this.title = <any>error
      );
  }

  getMsgs() {
    console.log('Subscribe to service');
    this.msgService.getMsgs()
      .subscribe(
        messages => {
          // console.log("Messages:",messages);
          this.blogMessages = messages;
        },
        error =>  this.title = <any>error
      );
  }

  ngOnInit() {
    this.getMsgs();
  }
}
