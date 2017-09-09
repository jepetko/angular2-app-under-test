import {NgModule} from '@angular/core';
import {HttpModule} from '@angular/http';
import {GoogleBooksAPIService} from './google-books-api.service';

@NgModule({
    imports: [HttpModule],
    providers: [GoogleBooksAPIService]
})
export class CoreModule {
}
