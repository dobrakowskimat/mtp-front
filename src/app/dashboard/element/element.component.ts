import { Component } from '@angular/core';
import { CdkDrag, CdkDragHandle } from '@angular/cdk/drag-drop';
@Component({
  selector: 'app-element',
  standalone: true,
  imports: [CdkDrag, CdkDragHandle],
  templateUrl: './element.component.html',
  styleUrl: './element.component.scss',
})
export class ElementComponent {}
