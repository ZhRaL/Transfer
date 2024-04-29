import { Injectable } from '@angular/core';

import { Item } from './communitymashup/model/item.model';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {

  public history: Array<any> = [];

  private lastAdded: Item | undefined = undefined;

  constructor() { 
    console.log("new HistoryService");
  }

  getHistory(): Array<any> {
    return this.history;
  }

  addToHistory(item: Item | undefined): void {
    if (item) {
      if (item != this.lastAdded) {
        this.history.push(item);
        this.lastAdded = item;
      }
    }
  }

}
