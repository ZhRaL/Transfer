import { Component, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { HistoryService } from '../services/history.service';
import { CommunityMashupService } from '../services/communitymashup/communitymashup.service';
import { Content } from '../services/communitymashup/model/content.model';
import { Organisation } from '../services/communitymashup/model/organisation.model';
import { Person } from '../services/communitymashup/model/person.model';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent {

  constructor(private mashupService: CommunityMashupService, private historyService: HistoryService, private route: ActivatedRoute, private router: Router) { }

  getHistory(): Array<any> {
    return this.historyService.getHistory();
  }

  selectItem(id: string){
    this.router.navigate(
      ['/item/'+id],
    );
  }

}
