import { MetaTag } from './metatag.model';
import { Connection } from './connection.model';
import { InformationObject } from './informationobject.model';
import { CommunityMashupService } from '../communitymashup.service';

export class Item {

  // reference to service
  communitymashupservice: CommunityMashupService;

  // attributes
  ident: string;
  uri: string;
  stringValue: string;
  created: string;
  lastModified: string;
  // references - store idents
  connectedBy: string[] = [];   // Connections
  connectedItemsBy: string[] = [];   // Items via Connections
  connectedItemsFrom: string[] = []; // Items via Connections
  identifiedBy: string[] = [];  // Identifier
  metaTags: string[] = [];

  // initialize attributes and relations from attribute value pairs in parameter object
  constructor(itemRaw: any, public service: CommunityMashupService) {
    this.communitymashupservice = service;
    // attributes
    this.ident = itemRaw['ident'];
    this.uri = itemRaw['uri'];
    this.stringValue = itemRaw['stringValue'];
    this.lastModified = itemRaw['lastModified'];
    this.created = itemRaw['created'];
    // reference connectedTo
    var tmps = itemRaw['connectedBy'];
    if (tmps) {
      var tmpsArr = (tmps as unknown as string).split(" ");
      tmpsArr.forEach((id: string) => this.connectedBy.push(id));
    }
    // reference identifiedBy
    tmps = itemRaw['identifiedBy'];
    if(tmps) {
      var tmpsArr = (tmps as unknown as string).split(" ");
      tmpsArr.forEach((id: string) => this.identifiedBy.push(id));
    }
    // reference metaTags
    tmps = itemRaw['metaTags'];
    if(tmps) {
      var tmpsArr = (tmps as unknown as string).split(" ");
      tmpsArr.forEach((id: string) => this.metaTags.push(id));
    }
  }

  getIdent(): string {
    return this.ident;
  }

  getUri(): string {
    return this.uri;
  }

  getText(): string {
    return this.stringValue;
  }

  getMetaTags(): MetaTag[] {
    var result: MetaTag[] = [];
    this.metaTags.forEach(id => result.push(this.service.getItemById(id) as MetaTag));
    return result;
  }

  getMetaTagsAsString(): string {
    var result: string = "";
    this.metaTags.forEach(id => { result = result + "," + (this.service.getItemById(id) as MetaTag).name } );
    return result;
  }

  // get all items connected to this item
  // (either directly or via connectedTo)
  getConnectedItems() : Item[] {
    var result:Item[] = [];
    this.connectedItemsBy.forEach(id => {
      var item : Item = this.service.getItemById(id);
      result.push(item);
    } );
    return result;
  }
  getConnectedToItems() : Item[] {
    return this.getConnectedItems();
  } 
    
  // get all items that connect to this item
  getConnectedFromItems() : Item[] {
    var result:Item[] = [];
    this.connectedItemsFrom.forEach(id => {
      var item : Item = this.service.getItemById(id);
      result.push(item);
    } );
    return result;
  }

  getClassName(): string {
    return this.constructor.name;
  }

  getType(): string {
    return this.getClassName().toLowerCase();
  }

  getItemName(): string {
    if (this instanceof InformationObject) {
      return (this as InformationObject).getName();
    }
    return this.getType()+this.getIdent();
  }

}
