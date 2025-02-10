import { Component, OnInit } from '@angular/core';
import { MailService } from 'src/app/services/mail.service';

@Component({
  selector: 'app-send-mail',
  templateUrl: './send-mail.component.html',
  styleUrls: ['./send-mail.component.scss'],
})
export class SendMailComponent  implements OnInit {

  constructor(private mailService: MailService) { }

  ngOnInit() {
    
  }

  getHelloWorld() {
    this.mailService.sendMail().subscribe((response) => {
      alert(response)
    });
  }

}
