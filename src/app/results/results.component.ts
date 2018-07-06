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

  fetchBottle(id,edit) {
    this.bottleService.fetchBottle(id)
      .subscribe(result => {
        this.addOrEditBottle(this.packageBottle(result, edit))
      });
  }

  testing_too() {
    console.log("Testing too");
  }

  showNote(note) {
    this.bottleService.setMessage(note);
  }

  drink(id, year, varietal) {
    if(confirm("Do you want to remove this " + year + " " + varietal + " from the database?")) {
      this.bottleService.drinkBottle(id)
        .subscribe(result => this.bottleService.setMessage(year + " " + varietal + " has been removed"));
    }
  }

  sortBy(name: string) {
    this.bottleService.sortBy(name);
  }
  byLocation() {
    this.bottleService.sortByLocation();
  }

  addOrEditBottle(bottle) {
    this.bottleService.setBottle(bottle);
  }

  packageBottle(bottle, edit) {
    var retval = new Bottle();
    if (edit) {
      retval.id = bottle.id;
      retval.rack = bottle.rack;
      retval.pri = bottle.pri;
      retval.sec = bottle.sec;
    } else {
      retval.id = 0;
      retval.rack = this.bottleService.defRack;
      retval.pri = '';
      retval.sec = '';
    }
    retval.winery = bottle.winery;
    retval.varietal = bottle.varietal;
    retval.vineyard = bottle.vineyard;
    retval.t = bottle.t;
    retval.year = bottle.year;
    if (retval.year == '0') {
      retval.year = '0000';
    }
    retval.price = bottle.price;
    retval.drinkMin = bottle.drinkmin;
    retval.drinkMax = bottle.drinkmax;
    retval.score = bottle.score;
    retval.note = bottle.note;
    retval.size = bottle.size;
    retval.restricted = bottle.restricted;
    retval.region = bottle.region;
    return retval;
  }
}
