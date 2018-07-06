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

  theBottle: Bottle;
  oldBottle: Bottle;

  constructor(private bottleService: BottleService) { }

  ngOnInit() {
    this.theBottle = new Bottle();
    this.oldBottle = new Bottle();
    this.getSettings();
    this.bottleService.theBottle.subscribe(bottle => {
      this.oldBottle = this.theBottle;
      this.theBottle = bottle;
    });
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
    this.theBottle.id = 0;
    this.bottleService.defRack = this.defs.rack;
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

  doAddOrEdit() {
    if (this.theBottle.id == 0) {
      this.bottleService.addWine(this.theBottle)
        .subscribe(result => {
          this.oldBottle = this.theBottle;
          this.theBottle = new Bottle();
          this.bottleService.setMessage("Added " + this.oldBottle.year + " " + this.oldBottle.winery +
          " " + this.oldBottle.varietal + " to " + this.lookupRack(this.oldBottle.rack) + " " +
          this.oldBottle.pri + " " + this.oldBottle.sec)
      });
    } else {
      this.bottleService.editWine(this.theBottle)
        .subscribe(result => {
          this.oldBottle = this.theBottle;
          this.theBottle = new Bottle();
          this.bottleService.setMessage("Updated " + this.oldBottle.year + " " + this.oldBottle.winery +
          " " + this.oldBottle.varietal + " in " + this.lookupRack(this.oldBottle.rack) + " " +
          this.oldBottle.pri + " " + this.oldBottle.sec)
      });
    }
  }

  lookupRack(rackID) {
    for (var r of this.racks) {
      if (rackID == r.id) {
        return r.name;
      }
    }
  }

  addOrEdit() {
    var retval = "Add";
    if (this.theBottle.id != 0) {
      retval = "Edit";
    }
    return retval;
  }

  addOrEditButton() {
    var retval = "Submit";
    if (this.theBottle.id != 0) {
      retval = "Update";
    }
    return retval;
  }

  doCancel() {
    this.theBottle = this.oldBottle;
    this.oldBottle = new Bottle();
  }

  validateForm(): boolean {
    var retval = true;
    if (this.theBottle.winery != "" &&
        this.theBottle.varietal != "" &&
        this.theBottle.t != "A" &&
        this.theBottle.pri != "" &&
        this.theBottle.sec != "") {
          retval = false;
        }
    return retval;
  }
}
