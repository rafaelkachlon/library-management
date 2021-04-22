import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {BookModel} from '../models/book.model';
import {DynamicDialogConfig, DynamicDialogRef} from 'primeng/dynamicdialog';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ModalMode} from '../models/modal-mode.enum';

@Component({
  selector: 'app-add-update-book',
  templateUrl: './add-update-book.component.html',
  styleUrls: ['./add-update-book.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddUpdateBookComponent implements OnInit {

  book: BookModel;
  form: FormGroup;
  isNew: boolean;

  constructor(private fb: FormBuilder,
              private config: DynamicDialogConfig,
              private ref: DynamicDialogRef) {
  }

  ngOnInit(): void {
    this.book = this.config.data.book;
    const mode = this.config.data.mode as ModalMode;
    this.isNew = mode === ModalMode.Create;

    this.form = this.fb.group({
      bookName: [
        this.isNew ? '' : this.book.bookName,
        [Validators.required]
      ],
      authorName: [
        this.isNew ? '' : this.book.authorName,
        [Validators.required]
      ],
      publicationDate: [
        this.isNew ? '' : this.book.publicationDate,
        [Validators.required]
      ]
    });
  }

  get title(): string {
    return this.isNew ? 'Add new book' : `Edit ${this.book.bookName}`;
  }
  required(fieldName: string): boolean {
    return this.form.get(fieldName).hasError('required') && this.form.get(fieldName).touched;
  }
  submit(): void {
    this.ref.close(this.form.value);
  }
}
