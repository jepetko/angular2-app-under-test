import {ComponentFixture, async, TestBed} from '@angular/core/testing';
import {BookListComponent} from './book-list.component';
import {ShopModule} from '../shop.module';
import {BookService} from './book.service';
import {BookServiceMock} from './book.service.mock';

describe('BookListComponent', () => {

    let fixture: ComponentFixture<BookListComponent>;
    let comp: BookListComponent;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [ShopModule],
            providers: [{provide: BookService, useClass: BookServiceMock}]
        }).compileComponents();
    }));

    beforeEach(async(() => {
        fixture = TestBed.createComponent(BookListComponent);
        comp = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('has a full list of the books', () => {
        expect(comp.allBooks.length).toBe(5);
    });

    it('has provides a list of the books', () => {
        expect(comp.books.length).toBe(5);
    });

    describe('filter', () => {

        describe('matching', () => {

            beforeEach(() => {
                comp.filter = 'Westen';
                fixture.detectChanges();
            });

            it('applies the filter on the book list', () => {
                expect(comp.books.length).toBe(1);
                expect(comp.books[0].title).toEqual('Im Westen nichts Neues');
            });

            it('preserves the full list of the books', () => {
                expect(comp.allBooks.length).toBe(5);
            });

            it('is case insensitive', () => {
                comp.filter = 'west';
                fixture.detectChanges();

                expect(comp.books.length).toBe(1);
                expect(comp.books[0].title).toEqual('Im Westen nichts Neues');
            });
        });

        describe('non matching', () => {
            it('shows a message if there is no match', () => {
                comp.filter = 'romeo';
                fixture.detectChanges();

                expect(comp.books.length).toBe(0);
                expect(fixture.nativeElement.querySelector('.msg').innerText).toContain('No matches');
            });

            it('does not filter at all if the keyword is empty string', () => {
                comp.filter = '';
                fixture.detectChanges();

                expect(comp.books.length).toBe(5);
            });

            it('does not filter at all if the keyword is undefined', () => {
                comp.filter = undefined;
                fixture.detectChanges();

                expect(comp.books.length).toBe(5);
            });


        });

    })
});