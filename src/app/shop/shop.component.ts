import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-shop',
    template: `
        <app-book-filter (filterChanged)="filterChanged($event)"></app-book-filter>
        <app-book-list [filter]="filter"></app-book-list>
    `
})
export class ShopComponent implements OnInit {

    filter: string;

    ngOnInit() {
    }

    filterChanged(filter: string) {
        this.filter = filter;
    }
}
