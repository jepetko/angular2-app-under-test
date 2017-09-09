import {ComponentFixture, async, TestBed} from '@angular/core/testing';
import {BookDetailsComponent} from './book-details.component';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {ShopModule} from '../shop.module';
import {GoogleBooksAPI} from '../../../../typings/google-books-api.def';

describe('BookDetailsComponent', () => {

    const details = <GoogleBooksAPI.VolumeInfo> {
        title: 'The Google story',
        authors: [
            'David A. Vise',
            'Mark Malseed'
        ],
        description: 'Here is the story behind one of the most remarkable Internet successes ...',
        pageCount: 207,
        mainCategory: 'Business & Economics / Entrepreneurship',
        categories: [
            'Browsers (Computer programs)'
        ],
        imageLinks: {
            /*tslint:disable*/
            smallThumbnail: 'https://books.google.com/books?id=zyTCAlFPjgYC&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api',
            thumbnail: 'https://books.google.com/books?id=zyTCAlFPjgYC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
            small: 'https://books.google.com/books?id=zyTCAlFPjgYC&printsec=frontcover&img=1&zoom=2&edge=curl&source=gbs_api',
            medium: 'https://books.google.com/books?id=zyTCAlFPjgYC&printsec=frontcover&img=1&zoom=3&edge=curl&source=gbs_api',
            large: 'https://books.google.com/books?id=zyTCAlFPjgYC&printsec=frontcover&img=1&zoom=4&edge=curl&source=gbs_api',
            extraLarge: 'https://books.google.com/books?id=zyTCAlFPjgYC&printsec=frontcover&img=1&zoom=6&edge=curl&source=gbs_api'
            /*tslint:enable*/
        }
    };

    let fixture: ComponentFixture<BookDetailsComponent>;
    let comp: BookDetailsComponent;
    let el: any;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [ShopModule, NoopAnimationsModule]
        }).compileComponents();
    }));

    beforeEach(async(() => {
        fixture = TestBed.createComponent(BookDetailsComponent);
        comp = fixture.componentInstance;
        el = fixture.debugElement.nativeElement;
    }));

    it('shows the title, authors, description and cover of the book', () => {
        comp.details = details;
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('md-card-title').innerText)
            .toEqual('The Google story');
        /*tslint:disable*/
        expect(fixture.nativeElement.querySelector('[md-card-image]').src)
            .toEqual('https://books.google.com/books?id=zyTCAlFPjgYC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api');
        /*tslint:enable*/
        expect(fixture.nativeElement.querySelector('md-card-content').innerText)
            .toEqual('Here is the story behind one of the most remarkable Internet successes ...');
        expect(Array.from<HTMLElement>(fixture.nativeElement.querySelectorAll('md-chip'))
            .map((chip => chip.innerHTML.trim()))).toEqual(['David A. Vise', 'Mark Malseed']);
    });

    it('does not show image if there are no imageLinks', () => {
        comp.details = details;
        comp.details.imageLinks = null;
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('[md-card-image]')).toBeFalsy();
    });
});
