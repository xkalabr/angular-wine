import { Component, OnInit } from '@angular/core';
import { Bottle } from '../bottle';
import { BottleService } from '../bottle.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {


bottle: Bottle = {
  id: 0,
  vineyard: "Caymus",
  varietal: "Cabernet Sauvignon",
  designation: "Napa Valley",
  size: ".750 L",
  year: "2014",
  t: "R",
  price: 59.99,
  drinkMin: "2017",
  drinkMax: "2030",
  score: 94,
  region: "87",
  restricted: false,
  note: "",
  rack: 4,
  pri: "0",
  sec: "0"
};

  constructor(private bottleService: BottleService) { }

  ngOnInit() {
    this.bottleService.queryString.subscribe(query => {
      if (query.limit != -1) {
        this.bottleService.runQuery(query);
      }
    });
  }

  sparklingYear(vyear, pyear) {
    var retval = vyear;
    if (vyear < 1) {
      retval = pyear;
    }
    return retval;
  }

  checkYear(year) {
    var retval = "normal";
    if (year == 0) {
      retval = "italic";
    }
    return retval;
  }

  getRack(rack, pri, sec) {
    var retval = "";
    if (rack != "") {
      retval = rack + ": " + pri + " " + sec;
    }
    return retval;
  }

  getNote(note) {
    var retval = " \xA0 ";
    if (note != "") {
      retval = " X ";
    }
    return retval;
  }

  addOrEditBottle(bottle) {
    this.bottleService.setBottle(bottle);
  }
}
