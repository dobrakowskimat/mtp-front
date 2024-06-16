import { Component, OnInit, inject } from '@angular/core';
import {
  FormsModule,
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {
  ElementTypes,
  type1Fields,
  type2Fields,
  type3Fields,
  ElementField,
} from '../../data/element';
import { CommonModule } from '@angular/common';
import { distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-add-element-dialog',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    CommonModule,
    ReactiveFormsModule,
    MatSelectModule,
  ],
  templateUrl: './add-element-dialog.component.html',
  styleUrl: './add-element-dialog.component.scss',
})
export class AddElementDialogComponent implements OnInit {
  readonly dialogRef = inject(MatDialogRef<AddElementDialogComponent>);
  type1Fields = type1Fields;
  type2Fields = type2Fields;
  type3Fields = type3Fields;

  public types = ElementTypes;

  elementForm = new FormGroup({
    name: new FormControl<string>('', [Validators.required]),
    type: new FormControl<ElementTypes>(ElementTypes.Type1, [
      Validators.required,
    ]),
    fields: new FormGroup({
      imp1: new FormControl<string>(''),
      imp2: new FormControl<string>(''),
      imp3: new FormControl<string>(''),
      imp7: new FormControl<string>(''),
    }),
  });

  ngOnInit(): void {
    this.elementForm.controls.fields.controls.imp3.disable();
    this.elementForm.controls.fields.controls.imp7.disable();
    this.elementForm.controls.type.valueChanges
      .pipe(distinctUntilChanged())
      .subscribe((value) => {
        if (value !== null) {
          Object.keys(this.elementForm.controls.fields.controls).forEach(
            (key) => {
              this.elementForm.controls.fields.get(key)?.disable();
            }
          );
          switch (value) {
            case this.types.Type1:
              this.enableFields(type1Fields);
              break;

            case this.types.Type2:
              this.enableFields(type2Fields);
              break;

            case this.types.Type3:
              this.enableFields(type3Fields);
              break;

            default:
              break;
          }
        }
      });
    this.elementForm.controls.fields.updateValueAndValidity();
  }

  enableFields(fields: ElementField[]) {
    fields.forEach((field) => {
      Object.keys(this.elementForm.controls.fields.controls).forEach(
        (control) => {
          if (field.name === control) {
            this.elementForm.controls.fields.get(control)?.enable();
          }
        }
      );
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit() {
    this.dialogRef.close(this.elementForm.value);
  }

  result() {
    return {};
  }

  // get fields() {
  //   return this.elementForm.controls.fields as FormArray;
  // }

  test() {
    console.log(this.elementForm.controls.fields.valid);
  }
}
