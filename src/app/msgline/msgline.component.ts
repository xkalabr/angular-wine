import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-msgline',
  templateUrl: './msgline.component.html',
  styleUrls: ['./msgline.component.css']
})
export class MsglineComponent implements OnInit {

  message = "Message: This is some test text"

  constructor() { }

  ngOnInit() {
  }

}
