import {Component, OnInit} from '@angular/core';
import {GoogleBooksAPI} from '../../../typings/google-books-api.def';

@Component({
    selector: 'app-shop',
    templateUrl: './shop.component.html'
})
export class ShopComponent implements OnInit {

    currentBookDetails: GoogleBooksAPI.VolumeInfo;

    ngOnInit() {
    }

    showBookDetails(details: GoogleBooksAPI.VolumeInfo) {
        this.currentBookDetails = details;
    }
}
