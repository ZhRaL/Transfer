import { Component, Input } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { CommunityMashupService } from '../services/communitymashup/communitymashup.service';
import { Item } from '../services/communitymashup/model/item.model';
import { Organisation } from '../services/communitymashup/model/organisation.model';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent {

  results: Array<Item> = [];

  constructor(private mashupService: CommunityMashupService, private router : Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if(this.mashupService.isInitialized) 
        this.Init();
      else {
        this.mashupService.getInitializedEvent().subscribe(() => {
          this.Init();
        });
      }
    });
  }

  Init() {
    this.mashupService.getItems()
      .filter(i => i instanceof Organisation)
      .forEach(i => this.results.push(i));
  }

  selectItem(id: string){
    this.router.navigate(
      ['/item/'+id],
    );
  }
}
