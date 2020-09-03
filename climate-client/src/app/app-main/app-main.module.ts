import { ModelPostingLikeEffects } from './store/model-posting-like-store/model-posting-like.effects';
import { ModelPostingEffects } from './store/model-posting-store/model-posting.effects';
import { ModelUserMemberV2Effects } from './store/model-user-member-store/model-user-member-v2.effects';
import { reducers } from './store/index';
import { ModelUserEffects } from './store/model-user-store/model-user.effects';
import { AppMainComponent } from './app-main.component';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { appMainStateKey } from './store';
import { ModelReviewEffects } from './store/model-review-store/model-review.effects';

const routes: Routes = [
  {
    path: '',
    component: AppMainComponent,
    children: [
      {
        path: 'landing',
        loadChildren: () =>
          import('./landing/app.landing.module').then(
            (m) => m.AppLandingModule
          ),
      },
      {
        path: 'user',
        loadChildren: () =>
          import('./user-asset/app.user.module').then(m => m.AppUserModule)
      },
      {
        path: 'userEdit',
        loadChildren: () =>
          import('./edit-user-member/user-edit.module').then(
            (m) => m.UserEditModule
          ),
      },
      {
        path: 'newPost',
        loadChildren: () =>
          import('./new-post-v1/new-post.module').then((m) => m.NewPostModule),
      },
    ],
  },

  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    StoreModule.forFeature(appMainStateKey, reducers),
    EffectsModule.forFeature([
      ModelUserEffects,
      ModelUserMemberV2Effects,
      ModelPostingEffects,
      ModelPostingLikeEffects,
      ModelReviewEffects
    ]),
  ],
  declarations: [AppMainComponent],
  providers: [],
  entryComponents: [],
})
export class AppMainModule {}
