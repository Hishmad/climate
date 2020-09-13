import { DataModelService } from './../../../services/data-model.services';
import { selectModelReviews } from './../../store/model-review-store/model-review.selecters';
import { destroyModelReview, loadModelReviews, createModelReview, updateModelReviewReply } from './../../store/model-review-store/model-review.actions';
import { selectModelUserMemberv2 } from './../../store/model-user-member-store/model-user-member-v2.selecters';
import { selectModelPosting } from './../../store/model-posting-store/model-posting.selecters';
import { loadModelPosting, loadModelPostingDestroy } from './../../store/model-posting-store/model-posting.actions';
import { ModelPostingState } from './../../store/model-posting-store/model-posting.reducer';
import { Store, select } from '@ngrx/store';
import { WindowRefService } from './../../../services/window-ref.service';
import { ModelUserMemberV2 } from './../../../../../../shared-logic/model-user/model-user-member-v2';
import { ModelPosting } from './../../../../../../shared-logic/model-posting/model-posting';
import { Observable, Subscription } from 'rxjs';
import { ModelReviewV2 } from './../../../../../../shared-logic/model-review/model-review-v2';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModelUserMemberV2State } from '../../store/model-user-member-store/model-user-member-v2.reducer';
import { ModelReviewState } from '../../store/model-review-store/model-review.reducer';

@Component({
  selector: 'app-list-detail-v1',
  templateUrl: './list-detail-v1.component.html',
  styleUrls: ['./list-detail-v1.component.scss']
})
export class ListDetailV1Component implements OnInit, OnDestroy {
  model$: Observable<ModelPosting>;
  chats$: Observable<ModelReviewV2[]>;
  user: ModelUserMemberV2;

  private subscription: Subscription = new Subscription();

  constructor(
    private route: ActivatedRoute,
    private winRef: WindowRefService,
    private storePosting: Store<ModelPostingState>,
    private storeUserMember: Store<ModelUserMemberV2State>,
    private storeReview: Store<ModelReviewState>
  ) { }

  ngOnInit(): void {
    this.fetchData();
  }

  onMessage(model: ModelReviewV2): void {
    const modelReview = { ...model };
    modelReview.idUser = this.user.id;
    modelReview.idAdmin = this.user.id;
    modelReview.userFullName = this.user.userFullName;
    if (typeof this.user.listOfCloudinaryImages !== 'undefined') {
      modelReview.photoUserUrl = this.user.listOfCloudinaryImages[0].secure_url;
    }
    this.storeReview.dispatch(createModelReview({ modelReview }));
  }

  onReplyMessage(model: ModelReviewV2): void {
    const modelReview = { ...model };
    this.storeReview.dispatch(updateModelReviewReply({ modelReview }));
  }

  onWaMe(model: ModelPosting): void {
    const card = { ...model };
    const url = `https://climate.id%2F%23%2Fmain%2Flanding%2FlistDetail%2F${card.id}`;
    const share = `https://wa.me/62${model.userMobileNumber}?text=How%20can%20we%20help?%0A${url}`;
    this.winRef.nativeWindow.open(share, '_blank,noopener');
  }

  onWaShare(container: any[]): void {
    const [card, user] = container;

    const url = `https://climate.id%2F%23%2Fmain%2Flanding%2FlistDetail%2F${card.id}`;
    const message = `${card.alertStatus}%0A${card.message}%0A${card.address}%0A${card.city}%0A${card.postCode}%0A${card.userName}`;
    const share = `whatsapp://send?text=${message}%0A${url}`;
    this.winRef.nativeWindow.open(share, '_blank,noopener');
  }

  onTwitterShare(container: any[]): void {
    const [card, user] = container;

    const url = `https://climate.id%2F%23%2Fmain%2Flanding%2FlistDetail%2F${card.id}`;
    const message = `${card.alertStatus}%0A${card.message}%0A${card.address}%0A${card.city}%0A${card.postCode}%0A${card.userName}`;
    const share = `https://twitter.com/intent/tweet?text=${message}%0A${url}`;
    this.winRef.nativeWindow.open(share, '_blank,noopener');
  }

  onLinkedinShare(container: any[]): void {
    const [card, user] = container;

    const url = `https://lessgo.id%2F%23%2Fmain%2Flanding%2FlistDetail%2F${card.id}`;
    const message = `${card.message}%0A${card.address}%0A${card.city}%0A${card.postCode}%0A${card.userName}`;
    const share = `https://www.linkedin.com/shareArticle?mini=true&url=${url}&title=${card.alertStatus}&summary=${message}&source=LinkedIn`;
    this.winRef.nativeWindow.open(share, '_blank,noopener');
  }

  onYoutubeLinkUrl(assetCard: any): void {
    this.winRef.nativeWindow.open(assetCard.youtubeUrl, '_blank,noopener');
  }

  ngOnDestroy(): void {
    this.storePosting.dispatch(loadModelPostingDestroy());
    this.storeReview.dispatch(destroyModelReview());
    this.subscription.unsubscribe();
  }


  private fetchData(): void {

    this.storePosting.dispatch(loadModelPosting({ id: this.route }));
    this.model$ = this.storePosting.pipe(select(selectModelPosting));

    const user$ = this.storeUserMember.pipe(select(selectModelUserMemberv2));
    this.subscription.add(
      user$.subscribe(user => this.user = user)
    );

    this.storeReview.dispatch(loadModelReviews({ id: this.route }));
    this.chats$ = this.storeReview.pipe(select(selectModelReviews));

  }

}
