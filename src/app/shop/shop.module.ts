import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {BookFilterComponent} from './book-filter/book-filter.component';
import {BookListComponent} from './book-list/book-list.component';
import {ShopComponent} from './shop.component';
import {CommonModule} from '@angular/common';
import {BookService} from './book-list/book.service';

@NgModule({
    imports: [
        CommonModule,
        BrowserModule,
        HttpModule,
        ReactiveFormsModule
    ],
    declarations: [
        BookFilterComponent,
        BookListComponent,
        ShopComponent
    ],
    exports: [ShopComponent],
    providers: [BookService]
})
export class ShopModule { }
