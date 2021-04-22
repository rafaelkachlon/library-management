import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BookContainerComponent} from './book-container/book-container.component';
import {HttpClientModule} from '@angular/common/http';
import {AutoCompleteModule} from 'primeng/autocomplete';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BookCardComponent} from './book-card/book-card.component';
import {DynamicDialogModule} from 'primeng/dynamicdialog';
import {AddUpdateBookComponent} from './add-update-book/add-update-book.component';
import {CalendarModule} from 'primeng/calendar';
import {ConfirmDialogModule} from 'primeng/confirmdialog';


@NgModule({
  declarations: [BookContainerComponent, BookCardComponent, AddUpdateBookComponent],
  exports: [
    BookContainerComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AutoCompleteModule,
    DynamicDialogModule,
    CalendarModule,
    ConfirmDialogModule
  ]
})
export class BooksModule {
}
