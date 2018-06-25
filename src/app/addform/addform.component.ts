import { Component, OnInit } from '@angular/core';
import { BottleService } from '../bottle.service';
import { Year } from '../year';
import { Settings } from '../settings';

@Component({
  selector: 'app-addform',
  templateUrl: './addform.component.html',
  styleUrls: ['./addform.component.css']
})
export class AddformComponent implements OnInit {

  years: Year[];
  year = "";
  defs: Settings;

  constructor(private bottleService: BottleService) { }

  ngOnInit() {
    this.getSettings();
    this.getYears();
  }

  getYears(): void {
    this.bottleService.getYears()
      .subscribe(years => {
        this.years = [{id: "0000", value: "N/A"}];
        for (var yr of years) {
          this.years.push({id: yr, value: yr});
        }
      });
  }

  getSettings(): void {
    this.bottleService.getSettings()
      .subscribe(defs => { 
        this.defs = defs;
        this.year = defs.year;
      });
  }
}
