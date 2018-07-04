import { Component, OnInit } from '@angular/core';
import { BottleService } from '../bottle.service';

@Component({
  selector: 'app-msgline',
  templateUrl: './msgline.component.html',
  styleUrls: ['./msgline.component.css']
})
export class MsglineComponent implements OnInit {


  constructor(private bottleService: BottleService) { }

  ngOnInit() {
  }

}
