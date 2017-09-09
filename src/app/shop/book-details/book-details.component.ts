import {Component, Input} from '@angular/core';
import {GoogleBooksAPI} from '../../../../typings/google-books-api.def';

@Component({
    selector: 'app-book-details',
    templateUrl: './book-details.component.html',
    styleUrls: ['./book-details.component.scss']
})
export class BookDetailsComponent {
    @Input()
    details: GoogleBooksAPI.VolumeInfo;
}
