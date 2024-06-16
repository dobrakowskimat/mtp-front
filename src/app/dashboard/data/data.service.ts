import { Injectable } from '@angular/core';
import { Connection } from './element';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  connectionsSubject = new Subject<Connection[]>();

  connections: Connection[] = [];

  constructor() {}

  addConnection(newConnection: Connection) {
    this.connections = [...this.connections, newConnection];
    this.connectionsSubject.next(this.connections);
  }
}
