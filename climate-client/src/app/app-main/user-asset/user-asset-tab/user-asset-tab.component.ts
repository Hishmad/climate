import {
  loadModelPostingsQueryUser,
  loadModelPostingsQueryLikes,
  destroyModelPostingsQuery,
  deleteModelPosting,
} from './../../store/model-posting-store/model-posting.actions';
import {
  selectModelPostingsQueryUser,
  selectModelPostingsQueryLikes,
} from './../../store/model-posting-store/model-posting.selecters';
import { selectModelUser } from './../../store/model-user-store/model-user.selecters';
import { Store, select } from '@ngrx/store';
import { DataModelService } from './../../../services/data-model.services';
import { GeoAddress } from './../../../../../../shared-logic/geo-document/geo-address';
import { ModelPostingLike } from './../../../../../../shared-logic/model-posting/model-posting-like';
import { WindowRefService } from './../../../services/window-ref.service';
import { Observable, Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ModelPosting } from '../../../../../../shared-logic/model-posting/model-posting';
import { ModelUser } from '../../../../../../shared-logic/model-user/model-user';
import { ModelUserState } from '../../store/model-user-store/model-user.reducer';
import { ModelPostingState } from '../../store/model-posting-store/model-posting.reducer';
import { ModelPostingLikeState } from '../../store/model-posting-like-store/model-posting-like.reducer';
import { updateModelPostingLike } from '../../store/model-posting-like-store/model-posting-like.actions';

@Component({
  selector: 'app-user-asset-tab',
  templateUrl: './user-asset-tab.component.html',
  styleUrls: ['./user-asset-tab.component.scss'],
})
export class UserAssetTabComponent implements OnInit, OnDestroy {
  listing$: Observable<ModelPosting[]>;
  likes$: Observable<ModelPosting[]>;

  user: ModelUser;

  subscription: Subscription = new Subscription();

  constructor(
    private winRef: WindowRefService,
    private route: ActivatedRoute,
    private router: Router,
    private localService: DataModelService,
    private storePosting: Store<ModelPostingState>,
    private storeUser: Store<ModelUserState>,
    private storeLikes: Store<ModelPostingLikeState>,
  ) { }

  ngOnInit(): void {
    this.fetchData();
  }

  onDetailPosting(model: ModelPosting): Promise<boolean> {
    return this.router.navigate(['/main/landing/listDetail', model.id]);
  }

  onLocation(address: GeoAddress) {
    const location = `https://www.google.com/maps/search/?api=1&query=${address.lat},${address.lng}`;
    this.winRef.nativeWindow.open(location, '_blank,noopener');
  }

  onUpdateLike(model: ModelPostingLike): void {
    const modelPostingLike = { ...model };
    this.storeLikes.dispatch(updateModelPostingLike({ modelPostingLike }));
  }

  onDeleteListing(model: ModelPosting): void {
    const modelPosting = { ...model };
    this.storePosting.dispatch(deleteModelPosting({modelPosting}))
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.storePosting.dispatch(destroyModelPostingsQuery());
  }

  private fetchData(): void {

    this.storePosting.dispatch(loadModelPostingsQueryUser({ id: this.route }));
    this.listing$ = this.storePosting.pipe(
      select(selectModelPostingsQueryUser)
    );

    this.storePosting.dispatch(loadModelPostingsQueryLikes({ id: this.route }));
    this.likes$ = this.storePosting.pipe(select(selectModelPostingsQueryLikes));

    const user$ = this.storeUser.pipe(select(selectModelUser));
    this.subscription.add(user$.subscribe((user) => (this.user = user)));
  }
}
