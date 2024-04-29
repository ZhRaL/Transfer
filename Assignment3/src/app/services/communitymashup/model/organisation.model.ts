import { InformationObject } from './informationobject.model';
import { Person } from './person.model';
import { CommunityMashupService } from './../communitymashup.service';

export class Organisation extends InformationObject {

  // no additional attributes
  // additional references
  // parentOrganisation:Organisation, members:Person, organizations:Organisation
  parentOrganisation: string = null as unknown as string;
  organisations: string[] = [];
  members: string[] = [];

  constructor(item : any, public override service: CommunityMashupService) {
    super(item, service);
    // reference parentOrganisation
    this.parentOrganisation = item['parentOrganisation'];
    // reference organisations
    var tmps = item['organisations'];
    if(tmps) {
      var tmpsArr = tmps.split(" ");
      tmpsArr.forEach((id: any) => this.organisations.push(id));
    }
    // reference members
    tmps = item['members'];
    if(tmps) {
      var tmpsArr = tmps.split(" ");
      tmpsArr.forEach((id: any) => this.members.push(id));
    }
  }

  getParentOrganisation(): Organisation {
    if (this.parentOrganisation) {
      return this.service.getItemById(this.parentOrganisation) as Organisation;
    }
    return null as any;
  }

  getChildOrganisations(): Organisation[] {
    var result: Organisation[] = [];
    this.organisations.forEach(id => result.push(this.service.getItemById(id) as Organisation));
    return result;
  }

  getMembers(): Person[] {
    var result: Person[] = [];
    this.members.forEach(id => result.push(this.service.getItemById(id) as Person));
    return result;
  }

}
