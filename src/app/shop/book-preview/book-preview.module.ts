import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BookPreviewComponent} from './book-preview.component';

@NgModule({
    imports: [CommonModule],
    declarations: [BookPreviewComponent],
    exports: [BookPreviewComponent],
    providers: []
})
export class BookPreviewModule {
}
