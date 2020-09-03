import { ModelUserMemberV2 } from './../../../../../shared-logic/model-user/model-user-member-v2';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ModelReviewV2 } from './../../../../../shared-logic/model-review/model-review-v2';
import { ModelPosting } from './../../../../../shared-logic/model-posting/model-posting';
import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef,
  AfterViewInit,
  OnDestroy,
} from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { EmojiButton } from '@joeattardi/emoji-button';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-raw-detail-post-v1',
  templateUrl: './raw-detail-post-v1.component.html',
  styleUrls: ['./raw-detail-post-v1.component.scss'],
})
export class RawDetailPostV1Component
  implements OnInit, AfterViewInit, OnDestroy {
  private _user: ModelUserMemberV2;
  @Input()
  set user(user: ModelUserMemberV2) {
    if (typeof user === 'undefined') this._user = null;
    this._user = user;
  }
  get user(): ModelUserMemberV2 {
    return this._user;
  }

  @Input() card: ModelPosting;
  @Output() message = new EventEmitter();
  @Output() wa = new EventEmitter();
  @Output() waShare = new EventEmitter();
  @Output() twitterShare = new EventEmitter();
  @Output() linkedinShare = new EventEmitter();
  @Output() youtubeShare = new EventEmitter();
  @ViewChild('textArea')
  textAreaEl: ElementRef;
  @ViewChild('videoPlayer')
  videoPlayerEl: ElementRef;

  detailForm: FormGroup;
  picker: EmojiButton;
  listOfImage: string[];
  listOfVideo: string[];
  hideArrows = true; // for the carousel, hide when only one image

  customOptions: OwlOptions;


  constructor(private fb: FormBuilder, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.initFormBuilder();
    this.fetchData();
  }

  ngAfterViewInit(): void {
    this.picker = new EmojiButton();
    this.onEmojiSelect(this.picker);
  }

  onTriggerEmoji(): void {
    this.picker.togglePicker(this.textAreaEl.nativeElement);
  }

  get comment(): FormControl {
    return <FormControl>this.detailForm.get('comment');
  }

  reset(): void {
    this.restForm();
  }

  onSubmit(formValues: any, card: ModelPosting, user: ModelUserMemberV2): void {
    if (!this.user) return;
    const dtoCreate = this.dtoCreate(formValues, card, user);
    this.restForm();
    this.message.emit(dtoCreate);
  }

  openSnackBar() {
    this._snackBar.open('Terima kasih posting telah berhasil terupdate', 'OK', {
      duration: 5000,
    });
  }

  onWaMe(card: ModelPosting): void {
    this.wa.emit(card);
  }

  onWaShare(card: ModelPosting, user: ModelUserMemberV2): void {
    this.waShare.emit([card, user]);
  }

  onTwitterShare(card: ModelPosting, user: ModelUserMemberV2): void {
    this.twitterShare.emit([card, user]);
  }

  onLinkedinShare(card: ModelPosting, user: ModelUserMemberV2): void {
    this.linkedinShare.emit([card, user]);
  }

  onYoutubeLinkUrl(assetCard: any): void {
   this.youtubeShare.emit(assetCard);
  }

  ngOnDestroy(): void {
    this.picker.destroyPicker();
  }

  private onEmojiSelect(picker: EmojiButton): void {
    picker.on('emoji', (selection) => {
      const comment = this.comment.value ? this.comment.value : '';
      const text = `${comment}${selection.emoji}`;
      this.comment.patchValue(text);
    });
  }

  private dtoCreate(
    formValues: any,
    model: ModelPosting,
    user: ModelUserMemberV2
  ): ModelReviewV2 {
    const message: ModelReviewV2 = new ModelReviewV2();
    message.idPosting = model.id;
    message.idHost = model.idUser;
    message.ratings = 0;
    message.comment = formValues.comment;
    message.photoUserUrl = this.passProfilePhoto(user.listOfCloudinaryImages);
    return message;
  }

  private restForm(): void {
    this.detailForm.reset();
  }

  private passProfilePhoto(listOfCloudinaryImages: any[]): string {
    if (typeof listOfCloudinaryImages !== 'undefined')
      return listOfCloudinaryImages[0].secure_url;
    return '';
  }

  private initFormBuilder(): void {
    this.detailForm = this.fb.group({
      comment: ['', [Validators.required, Validators.maxLength(250)]],
    });
  }

  private fetchData(): void {
    this.customOptions = this.initCarousel();
    this.listOfImage = this.filterImages(this.card);
    this.listOfVideo = this.filterVideos(this.card);
    const lengthlistOfImage = this.listOfImage.length;
    this.hideArrows = this.hideCarouselArrows(lengthlistOfImage);
  }

  private hideCarouselArrows(listOfImageLength: number): boolean {
    return listOfImageLength < 2;
  }

  private filterImages(card: ModelPosting): string[] {
    if (typeof card.listOfCloudinaryImages === 'undefined') return [];
    return card.listOfCloudinaryImages
      .filter((item) => item.resource_type && item.resource_type === 'image')
      .map(
        (item) =>
          `https://res.cloudinary.com/stockita/image/upload/c_fill,g_auto,f_auto,q_auto,w_260,h_200/${item.public_id}`
      );
  }

  private filterVideos(card: ModelPosting): string[] | null {
    if (typeof card.listOfCloudinaryImages === 'undefined') null;
    return card.listOfCloudinaryImages
      .filter((item) => item.resource_type && item.resource_type === 'video')
      .map(
        (item) =>
          `https://res.cloudinary.com/stockita/video/upload/c_fill,f_auto,q_auto,w_260,h_200/${item.public_id}`
      );
  }

  private initCarousel(): OwlOptions {
    return {
      loop: true,
      autoHeight: true,
      autoWidth: true,
      mouseDrag: true,
      touchDrag: true,
      pullDrag: true,
      dots: true,
      navSpeed: 700,
      responsive: {
        0: {
          items: 1,
        },
        400: {
          items: 1,
        },
        740: {
          items: 1,
        },
        940: {
          items: 1,
        },
      },
    };
  }
}
