import {Component, OnInit, Input} from '@angular/core';
import {BookService} from './book.service';
import {Book} from '../models/book';

@Component({
    selector: 'app-book-list',
    templateUrl: './book-list.component.html',
    styleUrls: ['./book-list.component.scss']
})
export class BookListComponent implements OnInit {

    allBooks: Book[] = [];

    @Input()
    filter: string;

    constructor(private bookService: BookService) {
    }

    ngOnInit() {
        this.bookService.books().subscribe(books => this.allBooks = books);
    }

    get books(): Book[] {
        if (!this.filter) {
            return this.allBooks;
        }
        return this.allBooks.filter(book => book.title.toLowerCase().indexOf(this.filter.toLowerCase()) !== -1);
    }
}
