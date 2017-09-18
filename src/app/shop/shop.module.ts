import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {CommonModule} from '@angular/common';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ShopComponent} from './shop.component';
import {SuggestModule} from '../shared/suggest/suggest.module';
import {BookDetailsModule} from './book-details/book-details.module';
import {BookPreviewModule} from './book-preview/book-preview.module';

@NgModule({
    imports: [
        CommonModule,
        BrowserModule,
        HttpModule,
        ReactiveFormsModule,
        SuggestModule,
        BookDetailsModule,
        BookPreviewModule,
        BrowserAnimationsModule
    ],
    declarations: [
        ShopComponent
    ],
    exports: [ShopComponent]
})
export class ShopModule { }
