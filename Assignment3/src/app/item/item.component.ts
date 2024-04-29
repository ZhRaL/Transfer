import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Observable, of, shareReplay } from 'rxjs';
import { NgOptimizedImage } from '@angular/common';

import { HistoryService } from '../services/history.service';
import { CommunityMashupService } from '../services/communitymashup/communitymashup.service';
import { UserService } from '../services/user/user.service';
import { SSEService } from '../services/sse/sse.service';
import { Content } from '../services/communitymashup/model/content.model';
import { Item } from '../services/communitymashup/model/item.model';
import { Image } from '../services/communitymashup/model/image.model';
import { MetaTag } from '../services/communitymashup/model/metatag.model';
import { Organisation } from '../services/communitymashup/model/organisation.model';
import { Person } from '../services/communitymashup/model/person.model';
import { InformationObject } from '../services/communitymashup/model/informationobject.model';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit {

  item$: Observable<Item> | undefined;

  item: Item | undefined;
  itemId: string = '';

  activeInfoParticles: any;

  person: Person | undefined;
  organisation: Organisation | undefined;
  content: Content | undefined;

  mirrorid: string = "";


  constructor(private mashupService: CommunityMashupService, private sseService: SSEService, private historyService: HistoryService, private router: Router, private route: ActivatedRoute, public userService: UserService) { 
}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.itemId = this.route.snapshot.paramMap.get('id') as string;
      this.setItem(this.itemId);
    });
    const params = this.route.queryParams
      .subscribe(params => {
        this.mirrorid = params['mirrorid'];
      }
    );
    if (!this.mirrorid) {
      this.mirrorid = 'cmn_test';
    }

    const promise = this.userService.login("admin","test");
    promise.then((value) => {
      this.sseService.pushLogMessage(this.mirrorid, 'FOLLOW_QRCODE:'+this.itemId);
      this.activeInfoParticles = this.sseService.getActiveInfoParticles(this.mirrorid);
    });

  }

  private setItem(id: string) {
    this.item$ = this.mashupService.getItemById$(id);
    this.item$.subscribe(i => {
      this.item = i;
      if (this.isPerson()) { this.person = this.item as Person; }
      if (this.isOrganisation()) { this.organisation = this.item as Organisation; }
      if (this.isContent()) { this.content = this.item as Content; }
      this.historyService.addToHistory(this.item);
    });
  }

  isPerson() : boolean {
    if (this.item instanceof Person) {
      return true;
    }
    return false;
  }
  isOrganisation() : boolean {
    if (this.item instanceof Organisation) {
      return true;
    }
    return false;
  }
  isContent() : boolean {
    if (this.item instanceof Content) {
      return true;
    }
    return false;
  }
  isMetaTag() : boolean {
    if (this.item instanceof MetaTag) {
      return true;
    }
    return false;
  }

  getImageUrl(): string {
    if (this.item instanceof InformationObject) {
      let images: Image[] = (this.item as InformationObject).getImages();
      if (images) {
        return images[0]?.fileUrl;
      }
    }
    return "assets/profile_pic.png";
  }

  selectItem(id: string){
    this.router.navigate(
      ['/item/'+id],
    );
  }

}
