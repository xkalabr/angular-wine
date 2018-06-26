import { Component, OnInit } from '@angular/core';
import { BottleService } from '../bottle.service';
import { Settings } from '../settings';
import { SimpleData } from '../simpledata';

@Component({
  selector: 'app-searchform',
  templateUrl: './searchform.component.html',
  styleUrls: ['./searchform.component.css']
})
export class SearchformComponent implements OnInit {

  vineyards: string[];
  varietals: string[];
  years: SimpleData[];
  racks: SimpleData[];
  year = "";
  defs: Settings;

  constructor(private bottleService: BottleService) { }

  ngOnInit() {
    this.getSettings();
    this.getYears();
    this.getVineyards();
    this.getVarieties();
    this.getRacks();
  }

  getVineyards(): void {
    this.bottleService.getVineyards()
      .subscribe(vineyards => this.vineyards = vineyards);
  }

  getVarieties(): void {
    this.bottleService.getVarieties()
      .subscribe(varieties => this.varietals = varieties);
  }

  getYears(): void {
    this.bottleService.getYears()
      .subscribe(years => {
        this.years = [{id: "0000", name: "N/A"}];
        for (var yr of years) {
          this.years.push({id: yr, name: yr});
        }
      });
  }

  getRacks(): void {
    this.bottleService.getRacks()
      .subscribe(racks => this.racks = racks);
  }

  getSettings(): void {
    this.bottleService.getSettings()
      .subscribe(defs => { 
        this.defs = defs;
        this.year = defs.year;
      });
  }

}
