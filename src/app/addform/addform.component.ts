import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
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
  wineryFC = new FormControl();
  filteredWineries: Observable<String[]>;
  varietalFC = new FormControl();
  filteredVarietals: Observable<String[]>;

  constructor(private bottleService: BottleService) { 
    this.filteredWineries = this.wineryFC.valueChanges
      .pipe(
        startWith(''),
        map(winery => winery ? this._filterWineries(winery) : this.bottleService.wineries.slice())
      )

    this.filteredVarietals = this.varietalFC.valueChanges
      .pipe(
        startWith(''),
        map(varietal => varietal ? this._filterVarietals(varietal) : this.bottleService.varietals.slice())
      )
  }
  
  private _filterVarietals(value: string): String[] {
    const filterValue = value.toLowerCase();
    return this.bottleService.varietals.filter(varietal => varietal.toLowerCase().indexOf(filterValue) === 0);
  }

  private _filterWineries(value: string): String[] {
    const filterValue = value.toLowerCase();
    return this.bottleService.wineries.filter(winery => winery.toLowerCase().indexOf(filterValue) === 0);
  }

  ngOnInit() {
    this.theBottle = new Bottle();
    this.oldBottle = new Bottle();
    this.getSettings();
    this.bottleService.theBottle.subscribe(bottle => {
      this.oldBottle = this.theBottle;
      this.theBottle = bottle;
      this.wineryFC.setValue(this.theBottle.winery);
      this.varietalFC.setValue(this.theBottle.varietal);
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
    this.theBottle.bid = 0;
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
        this.bottleService.defRack = this.defs.rack;
        this.setBottleDefaults();
        this.makeYears();
        this.getRegions();
        this.getRacks();
      });
  }

  doAddOrEdit() {
    // Needed to work around angular bug with autocomplete
    this.theBottle.winery = this.wineryFC.value;
    this.theBottle.varietal = this.varietalFC.value;
    this.theBottle.vineyard = (<HTMLInputElement>document.getElementById("vineyard")).value;
    this.theBottle.price = Number((<HTMLInputElement>document.getElementById("price")).value);
    this.theBottle.pri = (<HTMLInputElement>document.getElementById("pri")).value;
    this.theBottle.sec = (<HTMLInputElement>document.getElementById("sec")).value;
    this.theBottle.drinkMin = (<HTMLInputElement>document.getElementById("drinkmin")).value;
    this.theBottle.drinkMax = (<HTMLInputElement>document.getElementById("drinkmax")).value;
    this.theBottle.score = Number((<HTMLInputElement>document.getElementById("score")).value);
    this.theBottle.note = (<HTMLInputElement>document.getElementById("notes")).value;
    this.theBottle.region = (<HTMLInputElement>document.getElementById("region")).value
    if (this.theBottle.score == undefined) {
      this.theBottle.score = 0;
    }
    if (this.theBottle.price == undefined) {
      this.theBottle.price = 0.00;
    }
    console.log('The Bottle', this.theBottle);
    if (this.theBottle.bid == 0) {
      this.bottleService.addWine(this.theBottle)
        .subscribe(result => {
          this.oldBottle = this.theBottle;
          this.theBottle = new Bottle();
          this.wineryFC.setValue(this.theBottle.winery);
          this.varietalFC.setValue(this.theBottle.varietal);
          this.setBottleDefaults();
          this.bottleService.setMessage("Added " + this.oldBottle.year + " " + this.oldBottle.winery +
          " " + this.oldBottle.varietal + " to " + this.lookupRack(this.oldBottle.rack) + " " +
          this.oldBottle.pri + " " + this.oldBottle.sec)
      });
    } else {
      this.bottleService.editWine(this.theBottle)
        .subscribe(result => {
          this.oldBottle = this.theBottle;
          this.theBottle = new Bottle();
          this.wineryFC.setValue(this.theBottle.winery);
          this.varietalFC.setValue(this.theBottle.varietal);
          this.setBottleDefaults();
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
    if (this.theBottle.bid != 0) {
      retval = "Edit";
    }
    return retval;
  }

  addOrEditButton() {
    var retval = "Submit";
    if (this.theBottle.bid != 0) {
      retval = "Update";
    }
    return retval;
  }

  doCancel() {
    this.theBottle = new Bottle();
    this.setBottleDefaults();
  }
/*
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
  */
  validateForm(): boolean {
    var retval = true;
    if (this.theBottle.winery != "" &&
        this.theBottle.varietal != "" &&
        this.theBottle.t != "A" &&
        (<HTMLInputElement>document.getElementById("pri")).value != "" &&
        (<HTMLInputElement>document.getElementById("sec")).value != "") {
          retval = false;
        }
    return retval;
  }

}
