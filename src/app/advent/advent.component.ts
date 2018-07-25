import { Component, OnInit } from '@angular/core';
import { BottleService } from '../bottle.service';

@Component({
  selector: 'app-advent',
  templateUrl: './advent.component.html',
  styleUrls: ['./advent.component.css']
})
export class AdventComponent implements OnInit {

    date = new Date();
    yr = this.date.getFullYear();
    month = this.date.getMonth();
    today = this.date.getDate();
    targetMonth = 6;
    weeks: string[][];

    constructor(private bottleService: BottleService) { }

    ngOnInit() {
        this.updateDisplay();
    }

    updateDisplay(): void {
        this.bottleService.getAdvent()
            .subscribe(results => this.weeks = results);
    }

    pick(day): void {
        this.bottleService.pickAdvent(day)
            .subscribe(results => this.weeks = results);
    }
}
