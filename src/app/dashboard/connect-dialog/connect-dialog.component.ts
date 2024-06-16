import { Component, OnInit, inject } from '@angular/core';
import { ConnectDialogData, MTPElement } from '../data/element';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-connect-dialog',
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
  templateUrl: './connect-dialog.component.html',
  styleUrl: './connect-dialog.component.scss',
})
export class ConnectDialogComponent implements OnInit {
  readonly dialogRef = inject(MatDialogRef<ConnectDialogComponent>);
  readonly data = inject<ConnectDialogData>(MAT_DIALOG_DATA);

  elementForm = new FormGroup({
    connection: new FormControl('', [Validators.required]),
  });

  ngOnInit(): void {
    this.data;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit() {
    this.dialogRef.close({
      from: this.data.item,
      to: this.elementForm.controls.connection.value,
    });
  }
}
