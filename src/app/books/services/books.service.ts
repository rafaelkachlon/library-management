import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {BookModel} from '../models/book.model';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {first, map} from 'rxjs/operators';
import {Item} from '../models/books-response.model';

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  private books$ = new BehaviorSubject<BookModel[]>([]);

  constructor(private http: HttpClient) {
    this.getBooksFromApi().pipe(first()).subscribe(books => this.books$.next(books));

  }

  private getBooksFromApi(): Observable<BookModel[]> {
    return this.http.get(environment.apiUrl).pipe(
      map((data: any) => data.items),
      map((items: Item[]) => items.filter(x => !!x.volumeInfo.authors)),
      map((items: Item[]) => {
        return items.map(apiBook => this.createBookModel(apiBook));
      })
    );
  }

  createBook(book: BookModel): void {
    book.coverPhoto = 'http://placeimg.com/185/285/Animals';
    book.catalogNumber = Math.floor(Math.random() * 10).toString();
    const books = this.books$.getValue();
    const updated = [...books, book];
    this.books$.next(updated);
  }

  updateBook(book: BookModel): void {
    const books = this.books$.getValue();
    const currentBook = books.find(b => b.catalogNumber === book.catalogNumber);
    if (currentBook) {
      const index = books.indexOf(currentBook);
      books[index] = book;
      this.books$.next(books);
    }

  }

  removeBook(book: BookModel): void {
    const books = this.books$.getValue();
    const updatedBooks = books.filter(b => b.catalogNumber !== book.catalogNumber);
    this.books$.next(updatedBooks);
  }

  getBooks(): Observable<BookModel[]> {
    return this.books$.asObservable();
  }

  createBookModel(apiBook: Item): BookModel {
    return {
      catalogNumber: apiBook.id,
      authorName: apiBook.volumeInfo.authors[0],
      bookName: apiBook.volumeInfo.title,
      coverPhoto: apiBook.volumeInfo.imageLinks.thumbnail,
      publicationDate: new Date(apiBook.volumeInfo.publishedDate)
    } as BookModel;
  }
}
