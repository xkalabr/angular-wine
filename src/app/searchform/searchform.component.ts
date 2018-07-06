import { Component, OnInit } from '@angular/core';
import { BottleService } from '../bottle.service';
import { SimpleData } from '../simpledata';
import { DBQuery } from '../dbquery';

@Component({
  selector: 'app-searchform',
  templateUrl: './searchform.component.html',
  styleUrls: ['./searchform.component.css']
})
export class SearchformComponent implements OnInit {

  query = new DBQuery();
  vineyards: string[];
  varietals: string[];
  years: SimpleData[];
  racks: SimpleData[];
  regions: SimpleData[] = [];

  constructor(private bottleService: BottleService) { }

  ngOnInit() {
    this.getYears();
    this.getVineyards();
    this.getVarieties();
    this.getRacks();
    this.getRegions();
  }

  getVineyards(): void {
    this.bottleService.getStringValues("vineyards")
      .subscribe(vineyards => this.vineyards = vineyards);
  }

  getVarieties(): void {
    this.bottleService.getStringValues("varieties")
      .subscribe(varieties => this.varietals = varieties);
  }

  getYears(): void {
    this.bottleService.getStringValues("years")
      .subscribe(years => {
        this.years = [{id: "Any", name: "Any"}];
        this.years.push({id: "0000", name: "N/A"});
        for (var yr of years) {
          this.years.push({id: yr, name: yr});
        }
      });
  }

  getRacks(): void {
    this.bottleService.getRacks()
      .subscribe(racks => this.racks = racks);
  }

  getRegions(): void {
    this.bottleService.getRegions("search")
      .subscribe(regions => {
        for (var reg of regions) {
          this.regions.push({id: reg.id, name: reg.name.replace(/#/g,'\xA0')});
        }
      });
  }

  doSearch(lucky: number) {
    this.query.limit = lucky;
    var regionFix = [];
    for (var r of this.query.regions) {
      regionFix.push(String(r));
    }
    this.query.regions = regionFix;
    this.bottleService.setQuery(this.query);
  }

}
