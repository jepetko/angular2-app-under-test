import {NgModule} from '@angular/core';
import {HttpModule} from '@angular/http';
import {GoogleBooksAPIService} from './google-books-api.service';
import {ThirdPartyObjectsService} from './third-party-objects.service';

@NgModule({
    imports: [HttpModule],
    providers: [
        GoogleBooksAPIService,
        ThirdPartyObjectsService
    ]
})
export class CoreModule {
}
