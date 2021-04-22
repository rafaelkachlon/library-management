import {Component, ViewChild} from '@angular/core';
import {BookContainerComponent} from './books/book-container/book-container.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Welcome to the library';

  @ViewChild(BookContainerComponent) books: BookContainerComponent;

  onCreate(): void {
    this.books.onCreate(null);
  }
}
