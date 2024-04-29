import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, shareReplay } from 'rxjs';
import { Subject, BehaviorSubject } from 'rxjs';

import { Connection } from './model/connection.model';
import { Content } from './model/content.model';
import { Identifier } from './model/identifier.model';
import { Item } from './model/item.model';
import { MetaTag } from './model/metatag.model';
import { Organisation } from './model/organisation.model';
import { Person } from './model/person.model';
import { Tag } from './model/tag.model';
import { Image } from './model/image.model';

import { environment } from 'src/environments/environment';

/*
  This library/service implements an interface to CommunityMashup servers.
  Data is loaded from the CommunityMashup and made available as objects.
  The classes implementing the data model can be found in the "model" subpackage.
  For more information about the data mode see the documentation of the CommunityMashup
  at https://publicwiki.unibw.de/display/MCI/CommunityMashup
  We currently implement an interface to v2 of the CommunityMashup(Server) - which is
  described at https://publicwiki.unibw.de/display/MCI/CommunityMashup2

 */

@Injectable({
  providedIn: 'root'
})
export class CommunityMashupService {

  sourceUrl: string = environment.serverUrl;

  // dataset raw data from server
  private datasetCache$: Observable<any> = this.getDataSet();

  // processed data from dataset raw data
  public items: Array<Item> = [];
  public created: any;
  public lastModified: any;

  // indexed for quicker access
  public itemIdentMap = new Map();
  public itemTypeMap = new Map();


  constructor(private http: HttpClient) { 
    console.log("new CommunityMashupService");
    this.processDataSet();
  }


  /*
   * Request all items from Community Mashup Server
   */
  private requestDataSet() {
    return this.http.get(this.sourceUrl, { responseType: 'text' });
  }
 
  // return an Observable for the dataset raw data
  private getDataSet() : Observable<any> {
    if (this.datasetCache$) {
      return this.datasetCache$;
    }
    return this.requestDataSet().pipe( shareReplay(1) );
  }

  /**
   * Process dataset raw data ...
   */
  private processDataSet() {
    // first subscribe to it and get the real data ...
    // then parse the json content, retrieve the dataset attributes and initialize the dataset
    let self = this;
    this.getDataSet()
      .toPromise()
      .then(json => {
         let result = JSON.parse(json);
         self.created = result.dataset.created;
         self.lastModified = result.dataset.lastModified;
         self.initializeDataSet(result.dataset.items);
         console.log("processDataSet - finished with size "+self.items.length);
         self.notifySubjects();
       });
  }

  toNotifyIds: Array<string> = [];
  toNotifySubjects: Array<Subject<Item>> = [];

  // notify the BehaviorSubjects with which getItemById$ is waiting for
  // the completion of the initial loading
  private notifySubjects() {
    for (var i = 0; i < this.toNotifyIds.length; i++) { 
      let res : Item = this.getItemById(this.toNotifyIds[i]);
      this.toNotifySubjects[i].next(res);
    }
    this.toNotifyIds = [];
    this.toNotifySubjects = [];
  }

  /* ********************************************************************** */

  getItemById$(id: string) : Observable<Item> {
    if (this.itemIdentMap.size>0) {
      return of(this.itemIdentMap.get(id));
    } else {
      const subject = new Subject<Item>();
      //const subject = new BehaviorSubject<Item | undefined>(undefined);
      this.toNotifySubjects.push(subject);
      this.toNotifyIds.push(id);
      return ((subject.asObservable() as Observable<Item>).pipe( shareReplay(1) ));
    }
  }

  getItemById(id: string) : Item {
      return this.itemIdentMap.get(id);
  }

  getItems(): Array<Item> {
    return this.items;
  }

  /* ********************************************************************** */

  getPersons(metaTagString: string): Person[] | null {
    if (!metaTagString) {
      return this.itemTypeMap.get('person');
    }
    var metaTag = this.getMetaTag(metaTagString);
    if (!metaTag) { return null; console.log("metatag " + metaTagString + " not known"); }
    // iterate through items metatagged with requested metatag and filter person items
    var itemArr: Item[] = metaTag.getMetaTaggedItems();
    var result: Person[] = [];
    itemArr.forEach(item => { if (item instanceof Person) { result.push(item); } });
    return result;
  }

  getContents(metaTagString: string) {
    if (!metaTagString) {
      return this.itemTypeMap.get('content');
    }
    var metaTag = this.getMetaTag(metaTagString);
    if (!metaTag) { return null; console.log("metatag " + metaTagString + " not known"); }
    // iterate through items metatagged with requested metatag and filter content items
    var itemArr = metaTag.getMetaTaggedItems();
    var result: Content[] = [];
    itemArr.forEach(item => { if (item instanceof Content) { result.push(item); } });
    return result;
  }

  getOrganisations(metaTagString: string) {
    if (!metaTagString) {
      return this.itemTypeMap.get('organisation');
    }
    var metaTag = this.getMetaTag(metaTagString);
    if (!metaTag) { return null; console.log("metatag " + metaTagString + " not known"); }
    // iterate through items metatagged with requested metatag and filter organisation items
    var itemArr = metaTag.getMetaTaggedItems();
    var result: Organisation[] = [];
    itemArr.forEach(item => { if (item instanceof Organisation) { result.push(item); } });
    return result;
  }

  getMetaTags(): MetaTag[] {
    return this.itemTypeMap.get('metaTag');
  }

  getMetaTag(metaTagString: string): MetaTag | null {
    let metaTags: MetaTag[] = this.getMetaTags();
    if (!metaTags) { return null; }
    var result: MetaTag | null = null;
    metaTags.forEach(metaTag => { if (metaTag.name == metaTagString) { result = metaTag; } });
    return result;
  }

  getConnections(fromId: string): Connection[] {
    if (!fromId) {
      return this.itemTypeMap.get('connection');
    }
    var result: Connection[] = [];
    // TBD
    return result;
  }

  getItemCount(itemType: string) {
    if (!itemType) {
      return this.itemIdentMap.size;
    }
    var tmpArr = this.itemTypeMap.get(itemType);
    if (tmpArr) {
      return tmpArr.length;
    }
    return 0;
  }


  initializeDataSet(itemRawArr: Array<any>) {
    // check if DataSet is already initialized ...
    if (this.itemIdentMap.size > 0) {
      return;
    }
    // iterate through the items and create correct classes and indexes
    for (let i = 0; i < itemRawArr.length; i++) {
      var itemRaw = itemRawArr[i];
      var itemIdent = itemRaw['ident'];
      var itemType = itemRaw['type'].substring(5);;
      var item : Item = new Item(itemRaw, this);
      switch (itemType) {
        case 'person':
          item = new Person(itemRaw, this);
          break;
        case 'content':
          item = new Content(itemRaw, this);
          break;
        case 'organisation':
          item = new Organisation(itemRaw, this);
          break;
        case 'metatag':
          item = new MetaTag(itemRaw, this);
          break;
        case 'tag':
          item = new Tag(itemRaw, this);
          break;
        case 'identifier':
          item = new Identifier(itemRaw, this);
          break;
        case 'connection':
          item = new Connection(itemRaw, this);
          break;
        case 'image':
          item = new Image(itemRaw, this);
          break;
      }
      this.items.push(item);
      // now store item object in different Maps for quick retrieval
      // a map indexing items by id
      this.itemIdentMap.set(itemIdent, item);
      // a map storing item arrays for the different types
      var typeArr = this.itemTypeMap.get(itemType);
      if (typeArr == null) {
        typeArr = [];
        this.itemTypeMap.set(itemType, typeArr);
      }
      typeArr.push(item);
    }
    // in item connectedBy is a set of Connections
    // calculate connectedItemsBy as set of Item idents
    this.items.forEach(item => {
      item.connectedBy.forEach(id => {
        var connection = this.getItemById(id) as Connection;
        if (!connection) { console.log("could not find Connection object for "+id); }
        else {
          item.connectedItemsBy.push(connection.toId)
        }
      } );
    });
    // now all items have been processed -
    // so we can generate the connectedItemsFrom attribute
    var connections = this.getConnections(null as any);
    connections?.forEach(connection => {
      var tmpitem = this.getItemById(connection.toId);
      if(tmpitem!=null)
        tmpitem.connectedItemsFrom.push(connection.fromId);
    });
  }

}
