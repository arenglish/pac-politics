import { Component, OnInit } from '@angular/core';
import { CYCLE_YEARS } from './cycles.constants';

@Component({
    selector: 'pac-cycle-picker',
    templateUrl: './cycle-picker.component.html',
    styleUrls: ['./cycle-picker.component.scss']
})
export class CyclePickerComponent implements OnInit {
    cycles = CYCLE_YEARS.sort();
    numberOfCycles = this.cycles.length;

    constructor() { }

    ngOnInit() {
    }

}
