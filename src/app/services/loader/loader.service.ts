import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  status: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  show(): void {
    this.status.next(true);
  }

  hide(): void {
    this.status.next(false);
  }

  constructor() { }
}
