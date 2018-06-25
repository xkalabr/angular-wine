import { Component, OnInit } from '@angular/core';
import { BottleService } from '../bottle.service';
import { SimpleData } from '../simpledata';
import { Settings } from '../settings';

@Component({
  selector: 'app-addform',
  templateUrl: './addform.component.html',
  styleUrls: ['./addform.component.css']
})
export class AddformComponent implements OnInit {

  sizes = [".187 L", ".375 L", ".500 L", ".750 L", "1.5 L", "3 L", "6 L"];
  years: SimpleData[];
  year = "";
  defs: Settings;
  regions: SimpleData[] = [];
  region = "87";

  constructor(private bottleService: BottleService) { }

  ngOnInit() {
    this.getSettings();
  }

  makeYears(): void {
    this.years = [{id: "0000", name: "N/A"}];
    for (var i = +this.defs.maxyear; i >= +this.defs.minyear; i--) {
      this.years.push({id: String(i), name: String(i)});
    }
  }

  getRegions(): void {
    this.bottleService.getRegions()
      .subscribe(regions => {
        for (var reg of regions) {
          this.regions.push({id: reg.id, name: reg.name.replace(/#/g,'\xA0')});
        }
      });
  }

  getSettings(): void {
    this.bottleService.getSettings()
      .subscribe(defs => { 
        this.defs = defs;
        this.year = defs.year;
        this.makeYears();
        this.getRegions();
      });
  }
}
