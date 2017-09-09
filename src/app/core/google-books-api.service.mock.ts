import {Observable} from 'rxjs/Observable';
import {GoogleBooksAPI} from '../../../typings/google-books-api.def';
import queryResult from './google-books-api.fixture';
import 'rxjs/add/observable/of';

export class GoogleBooksAPIServiceMock {

    query(q: string): Observable<GoogleBooksAPI.QueryResult> {
        return Observable.of(queryResult);
    }
}
