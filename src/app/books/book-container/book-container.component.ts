import {Component, OnInit} from '@angular/core';
import {BooksService} from '../services/books.service';
import {Observable} from 'rxjs';
import {BookModel} from '../models/book.model';
import {map} from 'rxjs/operators';
import {DialogService, DynamicDialogRef} from 'primeng/dynamicdialog';
import {ModalMode} from '../models/modal-mode.enum';
import {AddUpdateBookComponent} from '../add-update-book/add-update-book.component';
import {ConfirmationService} from 'primeng/api';

@Component({
  selector: 'app-book-container',
  templateUrl: './book-container.component.html',
  styleUrls: ['./book-container.component.scss'],
  providers: [DialogService, ConfirmationService]
})
export class BookContainerComponent implements OnInit {

  books$: Observable<BookModel[]>;
  searchText: string;

  constructor(private booksService: BooksService,
              private dialogService: DialogService,
              private confirmation: ConfirmationService) {
  }

  ngOnInit(): void {
    this.books$ = this.booksService.getBooks();

  }

  filterBooks(event): void {
    const query = event.data;
    if (!query) {
      this.books$ = this.booksService.getBooks();
    } else {
      const filter = this.searchText.toLowerCase();
      this.books$ = this.booksService.getBooks().pipe(
        map(items => items.filter(item => item.bookName.toLowerCase().includes(filter)))
      );
    }
  }

  openEditModal(book: BookModel): void {
    const dialogRef = this.openCreateUpdateDialog(book, ModalMode.Update);
    dialogRef.onClose.subscribe((updatedBook: BookModel) => {
      if (updatedBook) {
        const {bookName, authorName, publicationDate} = updatedBook;
        const updated = {...book, bookName, authorName, publicationDate};
        this.booksService.updateBook(updated);
      }
    });
  }

  onCreate(book: BookModel): void {
    const ref = this.openCreateUpdateDialog(book, ModalMode.Create);
    ref.onClose.subscribe(createdBook => {
      if (createdBook) {
        const obj: BookModel = {
          bookName: createdBook.bookName,
          authorName: createdBook.authorName,
          publicationDate: createdBook.publicationDate,
        };
        this.booksService.createBook(obj);
      }
    });
  }

  confirmRemove(book: BookModel): void {
    this.confirmation.confirm({
      message: `Are you sure that you want to remove "${book.bookName}"?`,
      accept: () => {
        this.booksService.removeBook(book);
      }
    });
  }

  openCreateUpdateDialog(book: BookModel, mode: ModalMode): DynamicDialogRef {
    return this.dialogService.open(AddUpdateBookComponent, {
      data: {book, mode},
      contentStyle: {
        overflow: 'visible',
      }
    });
  }
}
