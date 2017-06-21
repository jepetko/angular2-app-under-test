import {Component, OnInit, OnDestroy, EventEmitter, Output} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-book-filter',
  templateUrl: './book-filter.component.html',
  styleUrls: ['./book-filter.component.scss']
})
export class BookFilterComponent implements OnInit, OnDestroy {

  control: FormControl;
  subscription: Subscription;

  @Output()
  filterChanged: EventEmitter<string> = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
    this.control = new FormControl('');
    this.subscription = this.control.valueChanges.subscribe(value => {
      this.filterChanged.emit(value);
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
