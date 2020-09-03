import { ModelPostingLike } from './../../../../../shared-logic/model-posting/model-posting-like';
import { ModelUser } from './../../../../../shared-logic/model-user/model-user';
import { ModelPosting } from './../../../../../shared-logic/model-posting/model-posting';
import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';

@Component({
  selector: 'app-card-post-v2',
  templateUrl: './card-post-v2.component.html',
  styleUrls: ['./card-post-v2.component.scss'],
})
export class CardPostV2Component implements OnInit {
  private _user: ModelUser;
  @Input()
  set user(user: ModelUser) {
    if (typeof user === 'undefined') this._user = null;
    this._user = user;
  }
  get user(): ModelUser {
    return this._user;
  }

  @Input() card: ModelPosting;
  @Output() detailPosting = new EventEmitter();
  @Output() location = new EventEmitter();
  @Output() updateLike = new EventEmitter();
  @Output() detailUser = new EventEmitter();

  bannerColor: string;
  like: boolean;

  listOfImage: string[];
  listOfVideo: string[];

  constructor() { }

  ngOnInit(): void {
    this.fetchData();
  }

  onDetail(model: ModelPosting): void {
    this.detailPosting.emit(model);
  }

  onLocation(model: ModelPosting) {
    this.location.emit(model);
  }

  onDetailUser(model: ModelPosting): void {
    this.detailUser.emit(model);
  }

  onLike(): void {
    if (typeof this.user === 'undefined') return;
    this.like = !this.like ? true : false;
    const dtoCreate = this.dtoCreate(this.like, this.card, this.user);
    this.updateLike.emit(dtoCreate);
  }

  private fetchData(): void {
    this.like = this.checkLikes(this.user, this.card);
    this.bannerColor = this.bannerColorSelector(this.card);
    this.listOfImage = this.filterImages(this.card);
    this.listOfVideo = this.filterVideos(this.card);
  }

  private bannerColorSelector(card: ModelPosting): string {
    switch (card.alertStatus) {
      case 'CRITICAL': return '#e91e63';
      case 'DANGER': return '#ff9292';
      case 'ALERT': return '#55190f';
      case 'ATTENTION': return '#e91e63';
      default: return '#C0C0C0';
    }
  }

  private checkLikes(user: ModelUser, card: ModelPosting): boolean {
    if (!user) return false;
    if (typeof user.listOfLikes === 'undefined') return false;
    if (typeof card.listOfLikes === 'undefined') return false;
    return card.listOfLikes.includes(user.id);
  }

  private dtoCreate(
    like: boolean,
    card: ModelPosting,
    user: ModelUser
  ): ModelPostingLike {
    const dtoCreate = new ModelPostingLike();
    dtoCreate.like = like;
    dtoCreate.idPosting = card.id;
    dtoCreate.idUser = user.id;
    dtoCreate.idAdmin = user.id;
    return dtoCreate;
  }

  private filterImages(card: ModelPosting): string[] {
    if (typeof card.listOfCloudinaryImages === 'undefined') return [];
    return card.listOfCloudinaryImages.map(
      (item) =>
        `https://res.cloudinary.com/stockita/image/upload/c_fill,g_auto,f_auto,q_auto,h_200/${item.public_id}`
    );
  }

  private filterVideos(card: ModelPosting): string[] | null {
    if (typeof card.listOfCloudinaryImages === 'undefined') return [];
    return card.listOfCloudinaryImages
      .filter((item) => item.resource_type && item.resource_type === 'video')
      .map(
        (item) =>
          `https://res.cloudinary.com/stockita/video/upload/c_fill,f_auto,q_auto,h_200/${item.public_id}`
      );
  }
}
