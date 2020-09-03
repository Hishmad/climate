import { filter, take } from 'rxjs/operators';
import { Subscription, fromEvent } from 'rxjs';
import { ModelUser } from '../../../../../shared-logic/model-user/model-user';
import { GeoAddress } from '../../../../../shared-logic/geo-document/geo-address';
import { ModelPosting } from '../../../../../shared-logic/model-posting/model-posting';
import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnDestroy,
  ViewChild,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { OverlayRef, Overlay } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';

@Component({
  selector: 'app-card-post-user-asset-v2',
  templateUrl: './card-post-user-asset-v2.component.html',
  styleUrls: ['./card-post-user-asset-v2.component.scss'],
})
export class CardPostUserAssetV2Component implements OnInit, OnDestroy {
  private _user: ModelUser;
  @Input()
  set user(user: ModelUser) {
    if (typeof user === 'undefined') this._user = null;
    this._user = user;
  }
  get user(): ModelUser {
    return this._user;
  }

  @ViewChild('userMenu') userMenu: TemplateRef<any>;
  @Input() card: ModelPosting;
  @Output() detailPosting = new EventEmitter();
  @Output() location = new EventEmitter();
  @Output() deleteListing = new EventEmitter();
  @Output() repostListing = new EventEmitter();
  @Output() assetDetail = new EventEmitter();

  isSpinner = false; // spin when reposting
  bannerColor: string;

  overlayRef: OverlayRef | null;
  private sub: Subscription;

  listOfImage: string[];
  listOfVideo: string[];

  constructor(
    public viewContainerRef: ViewContainerRef,
    public overlay: Overlay
  ) {}

  ngOnInit(): void {
    this.fetchData();
  }

  onDetail(model: ModelPosting): void {
    this.detailPosting.emit(model);
  }

  onLocation(address: GeoAddress) {
    this.location.emit(address);
  }

  open(event: MouseEvent, card: ModelPosting) {
    this.close();
    event.preventDefault();
    const positionStrategy = this.overlay
      .position()
      .flexibleConnectedTo({ x: event.x, y: event.y })
      .withPositions([
        {
          originX: 'end',
          originY: 'bottom',
          overlayX: 'end',
          overlayY: 'top',
        },
      ]);

    this.overlayRef = this.overlay.create({
      positionStrategy,
      scrollStrategy: this.overlay.scrollStrategies.close(),
    });

    this.overlayRef.attach(
      new TemplatePortal(this.userMenu, this.viewContainerRef, {
        $implicit: card,
      })
    );

    this.sub = fromEvent<MouseEvent>(document, 'click')
      .pipe(
        filter((event) => {
          const clickTarget = event.target as HTMLElement;
          return (
            !!this.overlayRef &&
            !this.overlayRef.overlayElement.contains(clickTarget)
          );
        }),
        take(1)
      )
      .subscribe(() => this.close());
  }

  close() {
    this.sub && this.sub.unsubscribe();
    if (this.overlayRef) {
      this.overlayRef.dispose();
      this.overlayRef = null;
    }
  }

  onEditAssetDetail(card: ModelPosting): void {
    const model = { ...card };
    model.idAdmin = this.user.id;
    this.assetDetail.emit(model);
    this.close();
  }

  onUserDeleteListing(card: ModelPosting): void {
    const model = { ...card };
    model.idAdmin = this.user.id;
    this.deleteListing.emit(model);
    this.close();
  }

  onRepostListing(card: ModelPosting): void {
    this.isSpinner = true;
    const model = { ...card };
    model.idAdmin = this.user.id;
    this.repostListing.emit(model);
    this.close();
    setTimeout(() => {
      // this.listOfImage = this.filterImages(this.card);
      // this.listOfVideo = this.filterVideos(this.card);
      this.isSpinner = false;
    }, 3000);
  }

  ngOnDestroy(): void {
    // context menu
    this.close();
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  private fetchData(): void {
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
