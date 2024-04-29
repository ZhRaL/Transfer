import { CommunityMashupService } from '../communitymashup.service';
import { Attachment } from './attachment.model';

export class Binary extends Attachment {

  // TBD: bytes
  constructor(item: Attachment, public override service: CommunityMashupService) {
    super(item, service);
  }

}
