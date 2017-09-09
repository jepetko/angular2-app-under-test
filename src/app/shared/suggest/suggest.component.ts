import {Component, Output, EventEmitter, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {GoogleBooksAPIService} from '../../core/google-books-api.service';
import 'rxjs/add/operator/debounceTime';
import {MdOptionSelectionChange} from '@angular/material';
import {GoogleBooksAPI} from '../../../../typings/google-books-api.def';

export enum SuggestSignal {
    start = <any> 'start',
    success = <any> 'success',
    error = <any> 'error'
}

export interface SuggestEvent {
    signal: SuggestSignal;
    totalItems?: number;
}

@Component({
    selector: 'app-suggest',
    templateUrl: 'suggest.component.html'
})
export class SuggestComponent implements OnInit {
    control = new FormControl('');
    options = [];

    @Output()
    onEvent = new EventEmitter<SuggestEvent>();

    @Output()
    onBookSelected = new EventEmitter<GoogleBooksAPI.VolumeInfo>();

    constructor(private googleBooksAPI: GoogleBooksAPIService) {
    }

    ngOnInit() {
        this.control.valueChanges.debounceTime(300).subscribe(value => {
            this.options = [];
            this.onEvent.emit({signal: SuggestSignal.start});
            this.suggest(value);
        });
    }

    suggest(q: string) {
        if (!q) {
            return;
        }
        this.googleBooksAPI.query(q).subscribe(result => {
            if (result) {
                this.options = result.items.map(item => item.volumeInfo);
                this.onEvent.emit({signal: SuggestSignal.success, totalItems: result.totalItems});
            } else {
                this.onEvent.emit({signal: SuggestSignal.success, totalItems: 0});
            }
        }, () => {
            this.onEvent.emit({signal: SuggestSignal.error});
        });
    }

    optionSelected(evt: MdOptionSelectionChange, volumeInfo: GoogleBooksAPI.VolumeInfo) {
        this.onBookSelected.emit(volumeInfo);
    }
}
