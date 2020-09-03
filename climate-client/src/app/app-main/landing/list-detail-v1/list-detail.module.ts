import { CommonItemModule } from './../../../common-item/common-item.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListDetailV1Component } from './list-detail-v1.component';

const routes: Routes = [
  { path: '', redirectTo: 'listDetail', pathMatch: 'full' },
  {
    path: ':id',
    component: ListDetailV1Component,
  },
  { path: '**', redirectTo: '/landing/welcome' },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    CommonItemModule
  ],
  declarations: [ListDetailV1Component],

  providers: [],
  entryComponents: [],
})
export class ListDetailModule { }
