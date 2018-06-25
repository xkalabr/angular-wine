import { Component, OnInit } from '@angular/core';
import { Bottle } from '../bottle';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {

bottle: Bottle = {
  id: 0,
  vineyard: "Caymus"
};

  constructor() { }

  ngOnInit() {
  }

}
