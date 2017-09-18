import {ComponentFixture, async, TestBed} from '@angular/core/testing';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {ShopModule} from '../shop.module';
import {BookPreviewComponent} from './book-preview.component';
import {CoreModule} from '../../core/core.module';
import {ThirdPartyObjectsService} from '../../core/third-party-objects.service';
import {GoogleBooksViewerAPI} from '../../../../typings/google-books-api.def';

class DefaultViewerImpl {
    load(id: string) {
        /*tslint:disable-next-line*/
        console.info('loading book: ' + id);
    }
}
class ThirdPartyObjectsServiceMock {
    mock: GoogleBooksViewerAPI;
    constructor() {
        this.mock = {
            load: function() {
                /*tslint:disable-next-line*/
                console.info('load...');
            },
            setOnLoadCallback: function(fun: Function) {
                /*tslint:disable-next-line*/
                console.info('google books API loaded');
                fun();
            },
            DefaultViewer: DefaultViewerImpl
        }
    }
    getGoogleBooksPreviewObject(): GoogleBooksViewerAPI {
        return this.mock;
    }
}

describe('BookPreviewComponent', () => {

    let fixture: ComponentFixture<BookPreviewComponent>;
    let comp: BookPreviewComponent;
    let el: any;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [CoreModule, ShopModule, NoopAnimationsModule],
            providers: [{
                provide: ThirdPartyObjectsService,
                useClass: ThirdPartyObjectsServiceMock
            }]
        }).compileComponents();
    }));

    beforeEach(async(() => {
        fixture = TestBed.createComponent(BookPreviewComponent);
        comp = fixture.componentInstance;
        el = fixture.debugElement.nativeElement;
    }));

    it('initializes the viewer', () => {
        expect(comp.apiInstance).toBeFalsy();
        fixture.detectChanges();

        expect(comp.apiInstance).toBeTruthy();
    });

    it('loads the preview of the book', () => {
        fixture.detectChanges();

        // don't recreate the viewer since it's not necessary for this test
        spyOn(comp, 'createDefaultViewer').and.callFake(() => {});
        spyOn(comp.apiInstance, 'load').and.callThrough();
        comp.isbn = '0738531367';
        fixture.detectChanges();

        expect(comp.lastIsbn).toEqual('0738531367');
        expect(comp.apiInstance.load).toHaveBeenCalledWith('ISBN:0738531367');
    });

    it('clears the viewer on destroy', () => {
        fixture.detectChanges();
        expect(comp.apiInstance).toBeTruthy();

        comp.ngOnDestroy();
        expect(comp.apiInstance).toBeFalsy();
    });
});