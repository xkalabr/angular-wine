import { Component, OnInit } from '@angular/core';
import { Bottle } from '../bottle';
import { BottleService } from '../bottle.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {

searched = false;
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
        this.searched = true;
      }
    });
  }

  checkRestricted(restr) {
    var retval = "nums";
    if (restr == "Y") {
      retval = "restricted"
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

  testing() {
    console.log("Testing");
  }

  testing_too() {
    console.log("Testing too");
  }

  showNote(note) {
    console.log('Received note: ', note);
    this.bottleService.setMessage(note);
  }

  drink(id, year, varietal) {
    if(confirm("Do you want to remove this " + year + " " + varietal + " from the database?")) {
      this.bottleService.drinkBottle(id)
        .subscribe(result => this.bottleService.setMessage(year + " " + varietal + " has been removed"));
    }

  }

  addOrEditBottle(bottle) {
    this.bottleService.setBottle(bottle);
  }
}
