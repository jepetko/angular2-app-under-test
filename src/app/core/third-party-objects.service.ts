import {Injectable} from '@angular/core';
import {GoogleBooksViewerAPI} from '../../../typings/google-books-api.def';

@Injectable()
export class ThirdPartyObjectsService {

    getGoogleBooksPreviewObject(): GoogleBooksViewerAPI {
        return window['google']['books'];
    }
}