import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';
import {Book} from '../models/book';

@Injectable()
export class BookService {

    constructor(private http: Http) {
    }

    books(): Observable<Book[]> {
        return this.http.get('assets/books.json').map(response => <Book[]> response.json());
    }

}