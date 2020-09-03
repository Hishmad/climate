import { signoutModelPostingLike } from './store/model-posting-like-store/model-posting-like.actions';
import { signoutModelPosting, destroyModelPostingsQuery } from './store/model-posting-store/model-posting.actions';
import { selectModelUserMemberv2 } from './store/model-user-member-store/model-user-member-v2.selecters';
import { selectModelUser } from './store/model-user-store/model-user.selecters';
import { PresenceService } from './../services/presence.service';
import { DataModelService } from './../services/data-model.services';
import { ModelUserMemberV2 } from './../../../../shared-logic/model-user/model-user-member-v2';
import { ModelUser } from './../../../../shared-logic/model-user/model-user';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { ModelUserState } from './store/model-user-store/model-user.reducer';
import {
  loadModelUser,
  signoutModelUser,
} from './store/model-user-store/model-user.actions';
import {
  loadModelUserMemberV2,
  signoutModelUserMemberV2,
} from './store/model-user-member-store/model-user-member-v2.actions';
import { ModelUserMemberV2State } from './store/model-user-member-store/model-user-member-v2.reducer';
import { ModelPostingState } from './store/model-posting-store/model-posting.reducer';
import { ModelPostingLikeState } from './store/model-posting-like-store/model-posting-like.reducer';

@Component({
  selector: 'app-app-main',
  templateUrl: './app-main.component.html',
  styleUrls: ['./app-main.component.scss'],
})
export class AppMainComponent implements OnInit {
  user$: Observable<ModelUser>;
  memberUser$: Observable<ModelUserMemberV2>;

  serverNotifications$: Observable<
    {
      timestamp: number;
      msg: string;
      longMsg: string;
    }[]
  >;


  constructor(
    private router: Router,
    private presence: PresenceService,
    private storeModelPosting: Store<ModelPostingState>,
    private storePostingLike: Store<ModelPostingLikeState>,
    private storeModelUser: Store<ModelUserState>,
    private storeModelUserMemberV2: Store<ModelUserMemberV2State>,
    private dataModelService: DataModelService
  ) { }

  ngOnInit(): void {
    this.fetchData();
  }

  userEdit(user: ModelUser): Promise<boolean> {
    return this.router.navigate(['/main/userEdit', user.id]);
  }

  userAsset(user: ModelUserMemberV2): Promise<boolean> {
    return this.router.navigate(['/main/user/asset', user.id]);
  }

  newPost(): Promise<boolean> {
    return this.router.navigate(['/main/newPost/newPost']);
  }

  signin(): Promise<boolean> {
    return this.router.navigate(['/akun/signin']);
  }

  home(): Promise<boolean> {
    return this.router.navigate(['/main/landing/welcome']);
  }

  async signout(): Promise<any> {
    this.storeModelPosting.dispatch(destroyModelPostingsQuery());
    this.storeModelPosting.dispatch(signoutModelPosting());
    this.storePostingLike.dispatch(signoutModelPostingLike());
    this.storeModelUser.dispatch(signoutModelUser());
    this.storeModelUserMemberV2.dispatch(signoutModelUserMemberV2());
    await this.presence.signOut();
    return this.router.navigate(['/main/landing/welcome']);
  }

  private fetchData(): void {
    this.storeModelUser.dispatch(loadModelUser());
    this.user$ = this.storeModelUser.pipe(select(selectModelUser));

    this.storeModelUserMemberV2.dispatch(
      loadModelUserMemberV2({ user$: this.user$ })
    );

    this.memberUser$ = this.storeModelUserMemberV2.pipe(
      select(selectModelUserMemberv2)
    );

    this.serverNotifications$ = this.dataModelService.getListOfNotifications$(
      3
    );
  }
}
