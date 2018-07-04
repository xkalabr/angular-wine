import { Component, OnInit } from '@angular/core';
import { BottleService } from '../bottle.service';
import { SimpleData } from '../simpledata';
import { Settings } from '../settings';
import { Bottle } from '../bottle';

@Component({
  selector: 'app-addform',
  templateUrl: './addform.component.html',
  styleUrls: ['./addform.component.css']
})
export class AddformComponent implements OnInit {

  sizes = [".187 L", ".375 L", ".500 L", ".750 L", "1.5 L", "3 L", "6 L"];
  defs: Settings;
  years: SimpleData[];
  regions: SimpleData[] = [];
  racks: SimpleData[];

  theBottle = new Bottle();
  oldBottle = new Bottle();

  constructor(private bottleService: BottleService) { }

  ngOnInit() {
    this.getSettings();
    this.bottleService.theBottle.subscribe(bottle => this.theBottle = bottle);
  }

  makeYears(): void {
    this.years = [{id: "0000", name: "N/A"}];
    for (var i = +this.defs.maxyear; i >= +this.defs.minyear; i--) {
      this.years.push({id: String(i), name: String(i)});
    }
  }

  setBottleDefaults(): void {
    // Needed to workaround angular bug that ignores selected in forms
    this.theBottle.year = this.defs.year;
    this.theBottle.region = String(this.defs.region);
    this.theBottle.size = this.defs.size;
    this.theBottle.rack = this.defs.rack;
  }

  getRacks(): void {
    this.bottleService.getRacks()
      .subscribe(racks => this.racks = racks);
  }

  getRegions(): void {
    this.bottleService.getRegions("add")
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
        this.setBottleDefaults();
        this.makeYears();
        this.getRegions();
        this.getRacks();
      });
  }
}
