import { Router } from '@angular/router';
import { selectModelPostings } from './../../store/model-posting-store/model-posting.selecters';
import { loadModelPostings } from './../../store/model-posting-store/model-posting.actions';
import { ModelPostingState } from './../../store/model-posting-store/model-posting.reducer';
import { selectModelUserMemberv2 } from './../../store/model-user-member-store/model-user-member-v2.selecters';
import { selectModelUser } from './../../store/model-user-store/model-user.selecters';
import { environment } from './../../../../../../climate-client/src/environments/environment.prod';
import { ModelPostingLike } from './../../../../../../shared-logic/model-posting/model-posting-like';
import { WindowRefService } from './../../../services/window-ref.service';
import { ModelUserMemberV2 } from './../../../../../../shared-logic/model-user/model-user-member-v2';
import { ModelPosting } from './../../../../../../shared-logic/model-posting/model-posting';
import { Observable, Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ModelUser } from '../../../../../../shared-logic/model-user/model-user';
import { Store, select } from '@ngrx/store';
import { ModelUserState } from '../../store/model-user-store/model-user.reducer';
import { ModelUserMemberV2State } from '../../store/model-user-member-store/model-user-member-v2.reducer';
import { ModelPostingLikeState } from '../../store/model-posting-like-store/model-posting-like.reducer';
import { updateModelPostingLike } from '../../store/model-posting-like-store/model-posting-like.actions';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
})
export class WelcomeComponent implements OnInit, OnDestroy {
  list$: Observable<ModelPosting[]>;
  userMember: ModelUserMemberV2;
  user: ModelUser;
  config: ConfigAlgolia;
  private subscription: Subscription = new Subscription();

  constructor(
    private router: Router,
    private winRef: WindowRefService,
    private storePostings: Store<ModelPostingState>,
    private storePostingLike: Store<ModelPostingLikeState>,
    private storeUser: Store<ModelUserState>,
    private storeUserMember: Store<ModelUserMemberV2State>
  ) { }

  ngOnInit(): void {
    this.fetchData();
  }

  onDetailPosting(model: ModelPosting): Promise<boolean> {
    return this.router.navigate(['/main/landing/listDetail', model.id]);
  }

  onDetailUserLising(model: ModelPosting): Promise<boolean> {
    return this.router.navigate(['/main/user/public', model.idAdmin]);
  }

  onUpdateLike(model: ModelPostingLike): void {
    const modelPostingLike = { ...model };
    this.storePostingLike.dispatch(updateModelPostingLike({ modelPostingLike }))
  }

  onLocation(model: ModelPosting) {
    const location = `https://www.google.com/maps/search/?api=1&query=${model.lat},${model.lng}`;
    this.winRef.nativeWindow.open(location, '_blank,noopener');
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private fetchData(): void {
    /**  */
    this.storePostings.dispatch(loadModelPostings());
    this.list$ = this.storePostings.pipe(select(selectModelPostings));

    this.config = this.configAlgolia();

    this.subscription.add(
      this.storeUser.select(selectModelUser).subscribe((user) => {
        if (user) {
          this.user = user;
        } else {
          this.user = null;
        }
      })
    );

    this.subscription.add(
      this.storeUserMember.select(selectModelUserMemberv2).subscribe((user) => {
        if (user) {
          this.userMember = user;
        } else {
          this.userMember = null;
        }
      })
    );

  }

  private configAlgolia(): ConfigAlgolia {
    return {
      apiKey: environment.algolia.apiKey,
      appId: environment.algolia.appId,
      indexName: environment.algolia_indexName_model_posting,
      routing: true,
      useHash: true,
    };
  }
}

interface ConfigAlgolia {
  apiKey: string;
  appId: string;
  indexName: string;
  routing: boolean;
  useHash: boolean;
}
