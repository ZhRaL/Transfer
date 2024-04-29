import { CommunityMashupService } from '../communitymashup.service';
import { Classification } from './classification.model';

export class Tag extends Classification {

  constructor(item: any, public override service: CommunityMashupService) {
    super(item, service);
  }

  // TBD: getTagged()

}
