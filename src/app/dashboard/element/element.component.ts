import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { ElementTypes, MTPElement } from '../data/element';
@Component({
  selector: 'app-element',
  standalone: true,
  imports: [],
  templateUrl: './element.component.html',
  styleUrl: './element.component.scss',
})
export class ElementComponent {
  @Input() element: MTPElement = {
    name: 'First Item',
    type: ElementTypes.Type1,
    dragPosition: { x: 0, y: 0 },
  };

  @Output() connectItem = new EventEmitter<MTPElement>();

  constructor(public elementRef: ElementRef) {}

  connectNode(element: MTPElement) {
    this.connectItem.emit(element);
  }
}
