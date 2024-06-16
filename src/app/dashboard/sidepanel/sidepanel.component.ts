import { Component, Inject, inject } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AddElementDialogComponent } from './add-element-dialog/add-element-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { ElementWithFields } from '../data/element';

export interface DialogData {
  animal: string;
  name: string;
}
@Component({
  selector: 'app-sidepanel',
  standalone: true,
  imports: [],
  templateUrl: './sidepanel.component.html',
  styleUrl: './sidepanel.component.scss',
})
export class SidepanelComponent {
  @Output() newItemToCreate = new EventEmitter<ElementWithFields>();
  readonly dialog = inject(MatDialog);

  constructor() {}
  openAddDialog() {
    const dialogRef = this.dialog.open(AddElementDialogComponent, {
      width: '450px',
      data: { fields: {} },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.newItemToCreate.emit(result);
    });
  }
}
