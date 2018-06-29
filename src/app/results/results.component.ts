import { Component, OnInit } from '@angular/core';
import { Bottle } from '../bottle';
import { BottleService } from '../bottle.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {

results: Bottle[];

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
        this.bottleService.doSearch(query)
          .subscribe(results => this.results = results)
      }
    });
  }


  addOrEditBottle() {
    this.bottleService.setBottle(this.bottle);
  }
}
