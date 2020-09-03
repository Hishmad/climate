import { CommonItemModule } from './../../common-item/common-item.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  NgAisModule,
  NgAisInstantSearchModule,
  NgAisHitsModule,
  NgAisSearchBoxModule,
} from 'angular-instantsearch';
import { WelcomeComponent } from './welcome/welcome.component';

const routes: Routes = [
  { path: '', redirectTo: '/landing/welcome', pathMatch: 'full' },
  {
    path: 'welcome',
    component: WelcomeComponent,
  },
  {
    path: 'listDetail',
    loadChildren: () =>
      import('./list-detail-v1/list-detail.module').then(
        (m) => m.ListDetailModule
      ),
  },
  { path: '**', redirectTo: '/landing/welcome' },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    NgAisInstantSearchModule.forRoot(),
    NgAisHitsModule,
    NgAisSearchBoxModule,
    NgAisModule,
    CommonItemModule
  ],
  declarations: [WelcomeComponent],

  providers: [],
  entryComponents: [],
})
export class AppLandingModule { }
