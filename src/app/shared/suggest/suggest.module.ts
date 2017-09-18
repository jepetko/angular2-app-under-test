import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {MdAutocompleteModule, MdInputModule} from '@angular/material';
import {SuggestComponent} from './suggest.component';

@NgModule({
    imports: [CommonModule, ReactiveFormsModule, MdAutocompleteModule, MdInputModule],
    declarations: [SuggestComponent],
    exports: [SuggestComponent],
    providers: []
})
export class SuggestModule {
}
