import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Book} from '../models/book';

@Injectable()
export class BookServiceMock {

    books(): Observable<Book[]> {
        return Observable.of([
            {title: 'Im Westen nichts Neues'},
            {title: 'Macbeth'},
            {title: 'The Idiot'},
            {title: 'The Great Gatsby'},
            {title: 'Ulysses'}
        ]);
    }

}