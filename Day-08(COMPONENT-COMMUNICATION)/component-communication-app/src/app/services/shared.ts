import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  count = signal(0);

  increase() {
    this.count.update(v => v + 1);
  }

  decrease() {
    this.count.update(v => v - 1);
  }

}