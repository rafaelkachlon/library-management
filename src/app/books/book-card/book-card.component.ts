import {ChangeDetectionStrategy, Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {BookModel} from '../models/book.model';

@Component({
  selector: 'app-book-card',
  templateUrl: './book-card.component.html',
  styleUrls: ['./book-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookCardComponent implements OnInit {
  @Input() book: BookModel;
  @Output() OnEditBook = new EventEmitter<any>();
  @Output() OnRemoveBook = new EventEmitter<any>();

  constructor() {
  }

  ngOnInit(): void {
  }

  editBook(): void {
    this.OnEditBook.emit(this.book);
  }

  onRemove(): void {
    this.OnRemoveBook.emit(this.book);
  }
}
