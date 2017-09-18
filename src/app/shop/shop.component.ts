import {Component, OnInit} from '@angular/core';
import {GoogleBooksAPI} from '../../../typings/google-books-api.def';

@Component({
    selector: 'app-shop',
    templateUrl: './shop.component.html'
})
export class ShopComponent implements OnInit {

    currentBookDetails: GoogleBooksAPI.VolumeInfo;
    identifier: string;

    ngOnInit() {
    }

    showBookDetails(details: GoogleBooksAPI.VolumeInfo) {
        this.currentBookDetails = details;
        this.identifier = this.detectIndustryIdentifier();
    }

    private detectIndustryIdentifier(): string {
        if (!this.currentBookDetails) {
            return;
        }
        if (this.currentBookDetails.industryIdentifiers && this.currentBookDetails.industryIdentifiers.length > 0) {
            const isbn13 = this.currentBookDetails.industryIdentifiers.find(id => id.type === 'ISBN_13');
            return isbn13 ? isbn13.identifier : undefined;
        }
    }

}
