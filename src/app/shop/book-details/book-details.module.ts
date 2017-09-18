import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MdCardModule, MdChipsModule} from '@angular/material';
import {BookDetailsComponent} from './book-details.component';

@NgModule({
    imports: [CommonModule, MdCardModule, MdChipsModule],
    declarations: [BookDetailsComponent],
    exports: [BookDetailsComponent],
    providers: []
})
export class BookDetailsModule {
}
