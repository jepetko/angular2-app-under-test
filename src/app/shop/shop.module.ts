import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {ShopComponent} from './shop.component';
import {CommonModule} from '@angular/common';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {SuggestModule} from '../shared/suggest/suggest.module';
import {BookDetailsModule} from './book-details/book-details.module';

@NgModule({
    imports: [
        CommonModule,
        BrowserModule,
        HttpModule,
        ReactiveFormsModule,
        SuggestModule,
        BookDetailsModule,
        BrowserAnimationsModule
    ],
    declarations: [
        ShopComponent
    ],
    exports: [ShopComponent]
})
export class ShopModule { }
