import {Component, OnInit} from '@angular/core';
import {GoogleBooksAPI} from '../../../typings/google-books-api.def';

@Component({
    selector: 'app-shop',
    template: `
        <app-suggest (onBookSelected)="showBookDetails($event)"></app-suggest>
        <app-book-details
            *ngIf="currentBookDetails"
            [details]="currentBookDetails">
        </app-book-details>
    `
})
export class ShopComponent implements OnInit {

    currentBookDetails: GoogleBooksAPI.VolumeInfo;

    ngOnInit() {
    }

    showBookDetails(details: GoogleBooksAPI.VolumeInfo) {
        this.currentBookDetails = details;
    }
}
