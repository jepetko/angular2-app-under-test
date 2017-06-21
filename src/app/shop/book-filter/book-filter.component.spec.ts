import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BookFilterComponent } from './book-filter.component';
import {ShopModule} from '../shop.module';

describe('BookFilterComponent', () => {
  let fixture: ComponentFixture<BookFilterComponent>;
  let comp: BookFilterComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ShopModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookFilterComponent);
    comp = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('emits the input value', () => {
    spyOn(comp.filterChanged, 'emit').and.callThrough();
    comp.control.setValue('Remarque');
    fixture.detectChanges();

    expect(comp.filterChanged.emit).toHaveBeenCalledWith('Remarque');
  });
});
