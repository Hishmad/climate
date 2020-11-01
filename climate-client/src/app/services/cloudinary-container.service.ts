import { DtoUrl } from './../../../../shared-logic/dto-container/dto-url';
import { PresenceService } from './presence.service';

import { Injectable } from '@angular/core';
import { DatabaseReference } from '@angular/fire/database/interfaces';
import { AngularFireDatabase } from '@angular/fire/database';
import { CloudinaryContainer, Dto } from '../../../../shared-logic';

@Injectable({
  providedIn: 'root',
})
export class CloudinaryContainerService {
  constructor(
    private db: AngularFireDatabase,
    private presence: PresenceService,
  ) {}

  deleteAnyImages(model: CloudinaryContainer): void {
    const dtoCreate = { ...model };
    const databaseRef = this.presence.firebase.database();
    const refOne: DatabaseReference = databaseRef
      .ref(DtoUrl.DTO_USER)
      .child(dtoCreate.idAdmin)
      .push();

    dtoCreate.id = refOne.key;
    dtoCreate.timestamp = this.presence.timestamp;

    const dto: Dto = new Dto();
    dto.id = refOne.key;
    dto.url = CloudinaryContainer.DTO_DELETE_ANY_FROM_CLOUDINARY;
    dto.timestamp = this.presence.timestamp;

    dto.payload = dtoCreate;

    this.db
      .object(
        `${DtoUrl.DTO_USER}/${CloudinaryContainer.DTO_DELETE_ANY_FROM_CLOUDINARY}/${dtoCreate.idAdmin}/${dto.id}`
      )
      .set(Object.assign({}, dto));
  }
}
