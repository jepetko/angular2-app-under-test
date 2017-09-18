import {OnInit, Input, ElementRef, OnDestroy, Component} from '@angular/core';
import {ThirdPartyObjectsService} from '../../core/third-party-objects.service';
import {DefaultViewerType} from '../../../../typings/google-books-api.def';

@Component({
    selector: 'app-book-preview',
    templateUrl: './book-preview.component.html',
    styleUrls: ['./book-preview.component.scss']
})
export class BookPreviewComponent implements OnInit, OnDestroy {

    apiInstance: DefaultViewerType;
    lastIsbn: string;

    @Input()
    set isbn(isbn: string) {
        this.lastIsbn = isbn;
        if (this.lastIsbn) {
            this.createDefaultViewer();
            this.apiInstance.load(`ISBN:${this.lastIsbn}`);
        }
    }

    constructor(private elementRef: ElementRef,
                private thirdPartyObjectsService: ThirdPartyObjectsService) {
    }

    ngOnInit() {
        let previewObject = this.thirdPartyObjectsService.getGoogleBooksPreviewObject();
        previewObject.load();
        previewObject.setOnLoadCallback(() => {
            this.createDefaultViewer();
        });
    }

    ngOnDestroy() {
        this.apiInstance = undefined;
    }

    createDefaultViewer() {
        const previewEl = this.elementRef.nativeElement.querySelector('#preview');
        const defaultViewer = this.thirdPartyObjectsService.getGoogleBooksPreviewObject().DefaultViewer;
        this.apiInstance = new defaultViewer(previewEl);
    }
}