import { CommonItemModule } from '../../common-item/common-item.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserAssetTabComponent } from './user-asset-tab/user-asset-tab.component';
import { MatTabsModule } from '@angular/material/tabs';
import * as Hammer from 'hammerjs';
import {
  HammerGestureConfig,
  HAMMER_GESTURE_CONFIG,
} from '@angular/platform-browser';
import { UserPublicTabComponent } from './user-public-tab/user-public-tab.component';
import {
  AngularFireAuthGuard,
  redirectUnauthorizedTo,
} from '@angular/fire/auth-guard';

const redirectUnauthorizedToLogin = () =>
  redirectUnauthorizedTo(['/main/landing/welcome']);

export class MyHammerConfig extends HammerGestureConfig {
  overrides = <any>{
    swipe: { direction: Hammer.DIRECTION_ALL },
  };
}

const routes: Routes = [
  { path: '', redirectTo: '/user/asset', pathMatch: 'full' },
  {
    path: 'asset/:id',
    component: UserAssetTabComponent,
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin },
  },
  {
    path: 'public/:id',
    component: UserPublicTabComponent,
  },


  { path: '**', redirectTo: '/user/asset' },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    CommonItemModule,
    MatTabsModule,
  ],
  declarations: [
    UserAssetTabComponent,
    UserPublicTabComponent,
  ],

  providers: [
    {
      provide: HAMMER_GESTURE_CONFIG,
      useClass: HammerGestureConfig,
    },
  ],
  entryComponents: [],
})
export class AppUserModule {}
