import { Component, Input } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { CommunityMashupService } from '../services/communitymashup/communitymashup.service';
import { Item } from '../services/communitymashup/model/item.model';
import { Organisation } from '../services/communitymashup/model/organisation.model';
import { Person } from '../services/communitymashup/model/person.model';
import { Content } from '../services/communitymashup/model/content.model';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent {

  activeButton: number | null = null;
  results: Array<Item> = [];

  constructor(private mashupService: CommunityMashupService, private router : Router, private route: ActivatedRoute) { }

  selectItem(id: string){
    this.router.navigate(
      ['/item/'+id],
    );
  }

  setActiveButton(buttonNumber: number): void {
    this.activeButton = buttonNumber;
    this.clear();
    let type = buttonNumber == 1 ? Person : buttonNumber == 2 ? Organisation : Content;
    this.mashupService.getItems()
    .filter(i => i instanceof type)
    .sort((a, b) => a.getItemName().localeCompare(b.getItemName()))
    .forEach(i => this.results.push(i));
  }

  clear() {
    this.results = [];
  }
}
