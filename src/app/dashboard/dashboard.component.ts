import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  QueryList,
  ViewChildren,
  inject,
} from '@angular/core';
import { ElementComponent } from './element/element.component';
import { CdkDrag, CdkDragHandle, CdkDragEnd } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { SidepanelComponent } from './sidepanel/sidepanel.component';
import { initialItems } from './data/elements';
import {
  Connection,
  ElementType1,
  ElementType2,
  ElementType3,
  ElementTypes,
  ElementWithFields,
  MTPElement,
} from './data/element';
import { MatDialog } from '@angular/material/dialog';
import { ConnectDialogComponent } from './connect-dialog/connect-dialog.component';
import { DataService } from './data/data.service';
import { Subscription } from 'rxjs';

declare var LeaderLine: any;

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, ElementComponent, CdkDrag, SidepanelComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements AfterViewInit {
  initialItems = initialItems;
  readonly dialog = inject(MatDialog);
  readonly dataService = inject(DataService);
  subscription: Subscription = new Subscription();
  connections$ = this.dataService.connectionsSubject.asObservable();
  @ViewChildren(ElementComponent, { read: ElementComponent })
  elementsQuery!: QueryList<ElementComponent>;

  ngAfterViewInit(): void {
    this.subscription.add(
      this.connections$.subscribe((connections) =>
        connections.forEach((connection) => {
          new LeaderLine(
            this.findElementRef(connection.from, this.elementsQuery),
            this.findElementRef(connection.to, this.elementsQuery)
          );
        })
      )
    );
    console.log(this.elementsQuery);
  }
  dragEnd(event: CdkDragEnd, element: MTPElement) {
    console.log(event.distance);
    window.resizeBy(1, 1);
  }

  creteNewItem(item: ElementWithFields) {
    this.initialItems = [
      ...this.initialItems,
      { ...item, dragPosition: { x: 0, y: 0 } },
    ];
  }

  openAddDialog() {}

  connectItem(item: MTPElement) {
    const dialogRef = this.dialog.open(ConnectDialogComponent, {
      width: '450px',
      data: { item: item, items: this.filterItems(item, this.initialItems) },
    });

    dialogRef.afterClosed().subscribe((result: Connection) => {
      this.dataService.addConnection(result);
    });
  }

  filterItems(itemToConnect: MTPElement, items: MTPElement[]) {
    return items.filter(
      (item) =>
        item.name !== itemToConnect.name && item.type !== itemToConnect.type
    );
  }

  findElementRef(
    connectionFromTo: MTPElement,
    elRef: QueryList<ElementComponent>
  ) {
    let refs = elRef.toArray();
    connectionFromTo.name;
    return refs.find((ref) => ref.element.name === connectionFromTo.name)
      ?.elementRef.nativeElement;
  }
}
