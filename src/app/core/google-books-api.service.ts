import {Injectable} from '@angular/core';
import {Http, URLSearchParams, RequestMethod, Response, Headers} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {GoogleBooksAPI} from '../../../typings/google-books-api.def';
import {environment} from '../../environments/environment';
import 'rxjs/add/operator/map';

@Injectable()
export class GoogleBooksAPIService {

    constructor(private http: Http) {
    }

    query(q: string): Observable<GoogleBooksAPI.QueryResult> {
        let url = '/books/v1/volumes';
        return this.doGet(url, {q: q});
    }

    private doGet<T>(url: string, params: {[key: string]: any}): Observable<T> {
        let search = new URLSearchParams();
        Object.keys(params).forEach(key => search.append(key, params[key]));
        let headers = new Headers({key: environment.GOOGLE_BOOKS_API_KEY});
        let options = {method: RequestMethod.Get, search: search, headers: headers};
        return this.http.get(url, options).map(response => this.onSuccess(response));
    }

    private onSuccess<T>(response: Response): T {
        return <T> response.json();
    }
}
