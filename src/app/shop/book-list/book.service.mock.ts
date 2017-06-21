import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';
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
